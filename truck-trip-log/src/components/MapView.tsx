import { useEffect, useRef, useState } from "react";
import L, { Map, LeafletMouseEvent } from "leaflet"; // Import Leaflet library
import fuel from "../assets/fuel.jpg"
import { useLocation } from 'react-router-dom';
import { MdAdd, MdRemove } from 'react-icons/md';


const MapView = () => {
  const { state } = useLocation();
  const { currentLocation, pickupLocation, dropoffLocation, currentCycleUsed, currentLocationName, pickupLocationName, dropoffLocationName } = state;
  const [routeDistance, setRouteDistance] = useState<number | null>(null);  // State to store distance
  const [routeDuration, setRouteDuration] = useState<number | null>(null);  // State to store duration
  const [loading, setLoading] = useState<boolean>(false); // State to handle loading
  const [error, setError] = useState<string | null>(null); // State to handle errors
  const mapRef = useRef<Map | null>(null);
  const [isExpanded, setIsExpanded] = useState(true); // State to handle route information toggle visibility

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
      L.marker([lat, lng], { icon: currentIcon })
        .addTo(mapRef.current)
        .bindPopup(`
           <b>Current Location: ${currentLocationName}</b><br>
           This is your current location.
        `);
    }

    // Adding pickupLocation marker
    if (pickupLocation) {
      const [lat, lng] = pickupLocation.split(",").map(Number);
      L.marker([lat, lng], { icon: pickupIcon })
        .addTo(mapRef.current)
        .bindPopup(`
          <b>Pickup Location: ${pickupLocationName}</b><br>
          (1 hour break)
        `);
    }

    // Adding dropoffLocation marker
    if (dropoffLocation) {
      const [lat, lng] = dropoffLocation.split(",").map(Number);
      L.marker([lat, lng], { icon: dropoffIcon })
        .addTo(mapRef.current)
        .bindPopup(`
          <b>Dropoff Location: ${dropoffLocationName}</b><br>
          (1 hour break)
        `);
    }

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
        setRouteDistance(routeLength); // Updating routeDistance
        setRouteDuration(routeDurationInSeconds); // Updating routeDuration
        console.log(`Distance:${routeLength}  Duration: ${routeDurationInSeconds}`);

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
          let fuelStation: number = 0; // Fueling station after every 1,000 miles
          for (let i = 1; i < routeGeometry.length; i++) {
            const [lng1, lat1] = routeGeometry[i - 1];
            const [lng2, lat2] = routeGeometry[i];

            // Calculate the distance between consecutive points (Haversine formula)
            const distance = L.latLng(lat1, lng1).distanceTo(L.latLng(lat2, lng2)); // In meters
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
      console.error("Error fetching route data:", error);
      setError("Error fetching route data");
    } finally {
      // Set loading to false once the fetch is complete
      setLoading(false);
    }
  };

  //Function for Distance Handling
  const formatDistance = (distance: number | null) => {
    if (distance === null) return "No results found!";
    return distance < 1000 ? `${distance.toFixed(2)} meter${distance > 1 ? "s" : ""}` : `${(distance / 1000).toFixed(2)} km`;
  };

  // Function for Duration Handling
  const formatDuration = (duration: number | null) => {
    if (duration === null) return "No results found!";

    // Handling duration in seconds, minutes, hours, and days
    const days = Math.floor(duration / 86400); // Number of days (86400 seconds in a day)
    const hours = Math.floor((duration % 86400) / 3600); // Remaining hours
    const minutes = Math.floor((duration % 3600) / 60); // Remaining minutes
    const seconds = Math.round(duration % 60); // Remaining seconds

    // Formatting the duration output based on the days, hours, minutes, and seconds
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ${seconds} second${seconds > 1 ? 's' : ''}`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''}`;
    }
  };

  // Function for expanding or collapsing route information section
  const toggleExpanded = () => {
    setIsExpanded(prevState => !prevState);
  };

  // Navigate to ELDLogView with currentCycleUsed passed as state
  const viewLogs = () => ({
    state: currentCycleUsed
  });

  return (
    <div className="relative">
      {/* Map container */}
      <div id="map" style={{ height: "500px", width: "100%" }} />

      {/* Display route information */}
      <div className={`absolute top-1 right-2 z-[1000] p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all ${isExpanded ? "h-auto" : "h-12 overflow-hidden"}`}>
        <h3 className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-white mb-1 flex justify-between items-center">
          Route Information
          <button
            onClick={toggleExpanded}
            className="text-xs text-gray-600 cursor-pointer dark:text-white hover:text-gray-800 dark:hover:text-gray-200 transition-all transform hover:scale-110"
            title={isExpanded ? "Collapse section" : "Expand section"}
          >
            {isExpanded ? (
              <MdRemove className="text-xl transition-all duration-200" />
            ) : (
              <MdAdd className="text-xl transition-all duration-200" />
            )}
          </button>
        </h3>

        {/* Show loading spinner or error message */}
        <div className={`text-xs sm:text-xs font-medium text-gray-700 dark:text-gray-300 transition-all ${isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          {loading ? (
            <span className="text-yellow-500 flex items-center">
              <div className="animate-spin rounded-full border-t-2 border-yellow-500 h-4 w-4 mr-2"></div>
              Loading...
            </span>
          ) : error ? (
            <span className="text-red-500">{error}</span>
          ) : (
            <>
              <div className="text-[11px]"><strong>Distance: </strong>{formatDistance(routeDistance)}</div>
              <div className="text-[11px]"><strong>Duration: </strong>{formatDuration(routeDuration)}</div>
            </>
          )}
        </div>

        {/* Buttons for retry or viewing logs */}
        <div className={`transition-all ${isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          {error && (
            <button onClick={fetchRoute} className="mt-2 text-xs text-blue-600 hover:text-blue-500 underline transition-colors duration-300 cursor-pointer">
              Retry
            </button>
          )}

          {!loading && !error && (
            <button onClick={viewLogs} className="mt-2 w-17 text-[11px] cursor-pointer font-semibold bg-green-500 p-1 rounded">
              View Logs
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapView;

