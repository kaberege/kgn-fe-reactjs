import { useLocation } from "react-router-dom";
import MapView from "./MapView";

const MapPage = () => {
  const { currentLocation, pickupLocation, dropoffLocation } = useLocation().state;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Trip Map</h1>
      <MapView
        currentLocation={currentLocation}
        pickupLocation={pickupLocation}
        dropoffLocation={dropoffLocation}
      />
    </div>
  );
};

export default MapPage;
