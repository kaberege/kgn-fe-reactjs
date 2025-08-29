import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import L, { Map, LeafletMouseEvent } from "leaflet"; // Import Leaflet library
import fuel from "../assets/fuel.jpg";
import { useTripStore } from "../state-store/useStore";
import RouteDetails from "./RouteDetails";
import checkTokenExpiration from "../redirect/checkToken";

const MapView = () => {
  const setTripDetails = useTripStore((state) => state.setTripDetails);
  const {
    currentLocation,
    pickupLocation,
    dropoffLocation,
    currentCycleUsed,
    currentLocationName,
    pickupLocationName,
    dropoffLocationName,
  } = useTripStore((state) => state);
  const [routeDistance, setRouteDistance] = useState<number | null>(null); // State to store distance
  const [routeDuration, setRouteDuration] = useState<number | null>(null); // State to store duration
  const [loading, setLoading] = useState<boolean>(false); // State to handle loading
  const [error, setError] = useState<string | null>(null); // State to handle errors
  const mapRef = useRef<Map | null>(null);

  const navigate = useNavigate();

  // Check the liftime of access token and handle redirection
  useEffect(() => {
    const token = localStorage.getItem("access_token") || "";
    if (!token || checkTokenExpiration(token)) {
      navigate("/"); // Redirect to the register/login page
    }
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("driverTripData");
    const driverTripData = storedData ? JSON.parse(storedData) : {};
    if (driverTripData && Object.keys(driverTripData).length > 0) {
      setTripDetails(driverTripData);
    }
  }, []);

  useEffect(() => {
    var container = L.DomUtil.get("map");

    if (container != null) {
      (container as any)._leaflet_id = null;
    }

    // Initialize the map only if it's not already initialized
    const [currentLat, currentLng] = currentLocation.split(",").map(Number);

    if (currentLocation) {
      // Initialize the map and set the view currentLat, currentLng
      mapRef.current = L.map("map").setView([currentLat, currentLng], 5);

      // Add tile layer and other map setup
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        mapRef.current
      );
    }
    // Cleanup function to remove map instance on component unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [currentLocation]); // Make sure it runs when currentLocation changes

  useEffect(() => {
    // Iterate through all layers and remove them
    mapRef.current?.eachLayer(function (layer) {
      if (
        layer instanceof L.Marker ||
        layer instanceof L.Polyline ||
        layer instanceof L.Circle
      ) {
        mapRef.current?.removeLayer(layer);
      }
    });

    // Create a custom icon with the default Leaflet marker shape and custom color
    const createCustomIcon = (color: string) => {
      return L.icon({
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png", // Default marker image
        iconSize: [25, 41], // Size of the icon (width, height)
        iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
        popupAnchor: [1, -34], // Popup position relative to the marker
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png", // Optional shadow for marker
        shadowSize: [41, 41], // Size of the shadow
        shadowAnchor: [12, 41], // Anchor point of the shadow
        className: `custom-icon ${color}`, // Adding the color class for styling
      });
    };
    // Only add markers if mapRef.current is initialized
    if (mapRef.current) {
      // Adding custom icons for different locations
      const currentIcon = createCustomIcon("blue");
      const pickupIcon = createCustomIcon("green");
      const dropoffIcon = createCustomIcon("red");

      // Adding currentLocation marker
      if (currentLocation) {
        const [lat, lng] = currentLocation.split(",").map(Number);
        L.marker([lat, lng], { icon: currentIcon }).addTo(mapRef.current)
          .bindPopup(`
           <b>Current Location: ${currentLocationName}</b><br>
           This is your current location.
        `);
      }

      // Adding pickupLocation marker
      if (pickupLocation) {
        const [lat, lng] = pickupLocation.split(",").map(Number);
        L.marker([lat, lng], { icon: pickupIcon }).addTo(mapRef.current)
          .bindPopup(`
          <b>Pickup Location: ${pickupLocationName}</b><br>
          (1 hour break)
        `);
      }

      // Adding dropoffLocation marker
      if (dropoffLocation) {
        const [lat, lng] = dropoffLocation.split(",").map(Number);
        L.marker([lat, lng], { icon: dropoffIcon }).addTo(mapRef.current)
          .bindPopup(`
          <b>Dropoff Location: ${dropoffLocationName}</b><br>
          (1 hour break)
        `);
      }
      fetchRoute(); // Invoking fetchRoute
    }
    // Defining the onMapClick function
    var popup = L.popup();
    const onMapClick = (e: LeafletMouseEvent) => {
      popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mapRef.current!);
    };

    // Adding the event listener for the map click
    if (mapRef.current) {
      mapRef.current.on("click", onMapClick);
    }

    // Cleanup map on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.off("click", onMapClick);
      }
    };
  }, [currentLocation, pickupLocation, dropoffLocation]);

  // Function to fetch the route from OSRM API
  const fetchRoute = async () => {
    // Set loading to true when the fetch starts
    setLoading(true);
    setError(null); // Clear any previous error

    // Split the locations into lat/lng
    const [currentLat, currentLng] = currentLocation.split(",").map(Number);
    const [pickupLat, pickupLng] = pickupLocation.split(",").map(Number);
    const [dropoffLat, dropoffLng] = dropoffLocation.split(",").map(Number);

    // Construct route URL from current location to pickup and then to dropoff
    const routeUrl = `https://router.project-osrm.org/route/v1/driving/${currentLng},${currentLat};${pickupLng},${pickupLat};${dropoffLng},${dropoffLat}?geometries=geojson&steps=true`;

    try {
      const response = await fetch(routeUrl);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const routeGeoJSON = data.routes[0].geometry;
        const routeLength = data.routes[0].distance; // In meters
        const routeDurationInSeconds = data.routes[0].duration; // In seconds
        const routeGeometry = routeGeoJSON.coordinates; // Array of coordinates
        // Calculating total route distance including the current location, pickup, and dropoff
        setRouteDistance(routeLength); // Updating routeDistance // In meters
        setRouteDuration(routeDurationInSeconds); // Updating routeDuration
        const storedData = localStorage.getItem("driverTripData");
        const driverTripData = storedData ? JSON.parse(storedData) : {};
        const newData = {
          ...driverTripData,
          estimatedRouteLength: routeLength,
          estimatedRouteDuration: routeDurationInSeconds,
        };
        localStorage.setItem("driverTripData", JSON.stringify(newData)); // Send updated trip details to the local storage

        // Clear previous route (if any)
        mapRef.current?.eachLayer((layer) => {
          if (layer instanceof L.GeoJSON) {
            mapRef.current?.removeLayer(layer);
          }
        });

        // Display the route on the map
        if (mapRef.current) {
          L.geoJSON(routeGeoJSON).addTo(mapRef.current);

          // Add waypoints (stops) to the map
          const waypoints = data.routes[0].legs.flatMap((leg: any) =>
            leg.steps.map((step: any) => [
              step.maneuver.location[1],
              step.maneuver.location[0],
            ])
          );

          // Custom divIcon for route stops
          const routeStopDivIcon = L.divIcon({
            className: "route-stop-icon",
            html: '<div class="route-stop-marker"></div>',
            iconSize: [12, 12], // Tiny size for route stops
            iconAnchor: [6, 12], // Center the icon
            popupAnchor: [0, -12],
          });

          waypoints.forEach((point: [number, number], index: number) => {
            if (mapRef.current) {
              L.marker(point, { icon: routeStopDivIcon })
                .addTo(mapRef.current)
                .bindPopup(`Stop ${index + 1}`);
            }
          });

          // Calculate fueling stations based on the route distance (every 1,000 miles)
          const fuelingInterval = 1000 * 1609.34; // 1,000 miles in meters
          let accumulatedDistance = 0;

          const createFuelIcon = () => {
            return L.icon({
              iconUrl: `${fuel}`, // Path to the local icon
              iconSize: [20, 20], // Size of the icon
              iconAnchor: [10, 20], // Anchor
              popupAnchor: [0, -20], // Popup position
            });
          };
          const fuelIcon = createFuelIcon();
          let fuelStation: number = 0; // Fueling station after every 1,000 miles
          for (let i = 1; i < routeGeometry.length; i++) {
            const [lng1, lat1] = routeGeometry[i - 1];
            const [lng2, lat2] = routeGeometry[i];

            // Calculate the distance between consecutive points (Haversine formula)
            const distance = L.latLng(lat1, lng1).distanceTo(
              L.latLng(lat2, lng2)
            ); // In meters
            accumulatedDistance += distance;
            if (accumulatedDistance >= fuelingInterval) {
              fuelStation += 1;
              // Place a fueling station here
              L.marker([lat2, lng2], { icon: fuelIcon })
                .addTo(mapRef.current)
                .bindPopup(`Fueling Station ${fuelStation}`);
              accumulatedDistance = 0; // Reset distance for the next fueling station
            }
          }
        }
      }
    } catch (error) {
      setError("Error fetching route data");
    } finally {
      // Set loading to false once the fetch is complete
      setLoading(false);
    }
  };

  return (
    <div className="container grow flex flex-col relative mt-3 mx-auto">
      {/* Back to Home Button */}
      <div className="flex justify-between items-center">
        <Link
          to="/truck"
          className=" bg-blue-500 text-xs text-amber-300 hover:bg-blue-600 transition-colors p-1 rounded-lg shadow-md"
        >
          Back to Home
        </Link>
        <Link
          to="/truck/history"
          className=" bg-blue-500 text-xs text-amber-300 hover:bg-blue-600 transition-colors p-1 rounded-lg shadow-md"
        >
          Go to history
        </Link>
      </div>
      {/* Map container */}
      <div className="my-3 grow flex flex-col items-center justify-center">
        <div
          id="map"
          style={{ flexGrow: 1, width: "100%", borderRadius: "10px" }}
        />
      </div>

      {/* Route details component*/}
      <RouteDetails
        error={error}
        loading={loading}
        fetchRoute={fetchRoute}
        routeDistance={routeDistance}
        routeDuration={routeDuration}
        currentCycleUsed={currentCycleUsed}
      />
    </div>
  );
};

export default MapView;
