import { useEffect, useRef, useState } from "react";
import L, { Map, LeafletMouseEvent } from "leaflet"; // Import Leaflet library
import fuel from "../assets/fuel.jpg"

const MapView = () => {
  // Set different locations within Paris
  const [currentLocation, setCurrentLocation] = useState<string>("-4.4419,15.2663"); // Cape Town, South Africa
  const [pickupLocation, setPickupLocation] = useState<string>("-1.286389,39.2083"); // Nairobi, Kenya
  const [dropoffLocation, setDropoffLocation] = useState<string>("6.5244,3.3792"); // Lagos, Nigeria
  const [routeDistance, setRouteDistance] = useState<number | null>(null);  // State to store distance
  const [routeDuration, setRouteDuration] = useState<number | null>(null);  // State to store duration
  const [loading, setLoading] = useState<boolean>(false); // State to handle loading
  const [error, setError] = useState<string | null>(null); // State to handle errors
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    // Initializing the map with the current location as the center
    const [currentLat, currentLng] = currentLocation.split(",").map(Number);
    mapRef.current = L.map('map').setView([currentLat, currentLng], 5); // Set zoom level to fit entire route

    // This adds OpenStreetMap tile layer to the map
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapRef.current);

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

    // Adding custom icons for different locations
    const currentIcon = createCustomIcon("blue");
    const pickupIcon = createCustomIcon("green");
    const dropoffIcon = createCustomIcon("red");

    // Adding currentLocation marker
    if (currentLocation) {
      const [lat, lng] = currentLocation.split(",").map(Number);
      L.marker([lat, lng], { icon: currentIcon }).addTo(mapRef.current).bindPopup("Current Location");
    }

    // Adding pickupLocation marker
    if (pickupLocation) {
      const [lat, lng] = pickupLocation.split(",").map(Number);
      L.marker([lat, lng], { icon: pickupIcon }).addTo(mapRef.current).bindPopup("Pickup Location (1 hour break)");
    }

    // Adding dropoffLocation marker
    if (dropoffLocation) {
      const [lat, lng] = dropoffLocation.split(",").map(Number);
      L.marker([lat, lng], { icon: dropoffIcon }).addTo(mapRef.current).bindPopup("Dropoff Location (1 hour break)");
    }

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
              leg.steps.map((step: any) => [step.maneuver.location[1], step.maneuver.location[0]])
            );

            // Custom divIcon for route stops
            const routeStopDivIcon = L.divIcon({
              className: 'route-stop-icon',
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

            for (let i = 1; i < routeGeometry.length; i++) {
              const [lng1, lat1] = routeGeometry[i - 1];
              const [lng2, lat2] = routeGeometry[i];

              // Calculate the distance between consecutive points (Haversine formula)
              const distance = L.latLng(lat1, lng1).distanceTo(L.latLng(lat2, lng2)); // In meters
              accumulatedDistance += distance;

              if (accumulatedDistance >= fuelingInterval) {
                // Place a fueling station here
                L.marker([lat2, lng2], { icon: fuelIcon })
                  .addTo(mapRef.current)
                  .bindPopup(`Fueling Station`);
                accumulatedDistance = 0; // Reset distance for the next fueling station
              }
            }
          }

          // Calculating total route distance including the current location, pickup, and dropoff
          const distance = data.routes[0].distance / 1000; // Convert from meters to kilometers
          const duration = data.routes[0].duration / 60; // Convert from seconds to minutes

          // Setting state to update UI with the calculated distance and duration
          setRouteDistance(distance);
          setRouteDuration(duration);
        }
      } catch (error) {
        console.error("Error fetching route data:", error);
        setError("Error fetching route data");
      } finally {
        // Set loading to false once the fetch is complete
        setLoading(false);
      }
    };

    fetchRoute(); // Invoking fetchRoute

    // Defining the onMapClick function
    var popup = L.popup();
    const onMapClick = (e: LeafletMouseEvent) => {
      popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mapRef.current!);
    };

    // Adding the event listener for the map click
    mapRef.current.on('click', onMapClick);


    // Cleanup map on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current.off('click', onMapClick);
      }
    };
  }, [currentLocation, pickupLocation, dropoffLocation]);

  return <div>
    {/* Map container */}
    <div id="map" style={{ height: "500px", width: "100%" }} />

    {/* Display route information */}
    <div className="absolute top-9 sm:top-13 right-2 z-[1000] cursor-pointer p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-[150px] sm:max-w-[180px] md:max-w-[200px] lg:max-w-[250px] xl:max-w-[300px] w-full">
      <h3 className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-white mb-1">Route Information</h3>

      <div className="text-xs sm:text-xs font-medium text-gray-700 dark:text-gray-300">
        <strong>Distance: </strong>
        {/* Show loading spinner or error message */}
        {loading ? (
          <span className="text-yellow-500 flex items-center">
            <div className="animate-spin rounded-full border-t-2 border-yellow-500 h-4 w-4 mr-2"></div>
            Loading...
          </span>
        ) : routeDistance ? (
          `${routeDistance.toFixed(2)} km`
        ) : error ? (
          <span className="text-red-500">{error}</span>
        ) : (
          "Unknown error"
        )}
      </div>

      <div className="text-xs sm:text-xs font-medium text-gray-700 dark:text-gray-300">
        <strong>Duration: </strong>
        {/* Show loading spinner or error message */}
        {loading ? (
          <span className="text-yellow-500 flex items-center">
            <div className="animate-spin rounded-full border-t-2 border-yellow-500 h-4 w-4 mr-2"></div>
            Loading...
          </span>
        ) : routeDuration ? (
          `${routeDuration.toFixed(2)} minutes`
        ) : error ? (
          <span className="text-red-500">{error}</span>
        ) : (
          "Unknown error"
        )}
      </div>
    </div>

  </div>;
};

export default MapView;

