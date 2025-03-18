import { useEffect, useRef, useState } from "react";
import L, { Map, LeafletMouseEvent } from "leaflet"; // Import Leaflet library
import "leaflet/dist/leaflet.css"; // Import the Leaflet styles
import { TripDetails } from '../typesStore/types';

//{ currentLocation, pickupLocation, dropoffLocation }: TripDetails
const MapView = () => {
  // Set different locations within Paris
  // Set different locations in Africa
  const [currentLocation, setCurrentLocation] = useState<string>("-4.4419,15.2663"); // Cape Town, South Africa
  const [pickupLocation, setPickupLocation] = useState<string>("-1.286389,39.2083"); // Nairobi, Kenya
  const [dropoffLocation, setDropoffLocation] = useState<string>("6.5244,3.3792"); // Lagos, Nigeria
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    const [lat, lng] = currentLocation.split(",").map(Number);
    mapRef.current = L.map('map').setView([lat, lng], 13); // Dynamically set the map's center
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapRef.current);

    // Add currentLocation marker
    if (currentLocation) {
      const [lat, lng] = currentLocation.split(",").map(Number);
      L.marker([lat, lng]).addTo(mapRef.current).bindPopup("Current Location");
    }

    // Add pickupLocation marker
    if (pickupLocation) {
      const [lat, lng] = pickupLocation.split(",").map(Number);
      L.marker([lat, lng]).addTo(mapRef.current).bindPopup("Pickup Location");
    }

    // Add dropoffLocation marker
    if (dropoffLocation) {
      const [lat, lng] = dropoffLocation.split(",").map(Number);
      L.marker([lat, lng]).addTo(mapRef.current).bindPopup("Dropoff Location");
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
    mapRef.current.on('click', onMapClick);

    // Cleanup map on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current.off('click', onMapClick);
      }
    };
  }, [currentLocation, pickupLocation, dropoffLocation]);

  return <div id="map" style={{ height: "500px", width: "100%" }} />;
};

export default MapView;

