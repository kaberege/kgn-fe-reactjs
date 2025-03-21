import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TripForm = () => {
  const [currentLocation, setCurrentLocation] = useState<string>('');
  const [pickupLocation, setPickupLocation] = useState<string>('');
  const [dropoffLocation, setDropoffLocation] = useState<string>('');
  const [currentCycleUsed, setCurrentCycleUsed] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  // Defining coords of searched location
  interface LocationData {
    lat: string;
    lng: string;
  }

  // Fetching coords of a specific location
  const fetchCoordinates = async (location: string) => {
    setLoading(true); // Set loading state to true when submitting
    setErrorMessage(""); // Removing error message

    try {
      const apiKey = 'f86b21a4cf3c4f1db07849b46709d6c8'; // The OpenCage 
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${apiKey}`
      );

      const data: LocationData = response.data.results[0].geometry;
      const result: string = `${data.lat}, ${data.lng}`;
      const resultFormatted: string = response.data.results[0].formatted;
      return { coords: result, name: resultFormatted };
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      setErrorMessage("Failed to fetch!");
      return null;
    } finally {
      setLoading(false);  // Reset loading state
    }
  };

  // Handle submit and send data
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Constants for the driver's time limits
    const MAX_HOURS_PER_DAY: number = 8.75; // MAX_HOURS_PER_8_DAYS = 70;

    // Validate the current cycle used input
    const cycleUsed = parseFloat(currentCycleUsed);

    // Ensure the current cycle used is a valid number and is non-negative
    if (isNaN(cycleUsed) || cycleUsed < 0) {
      setErrorMessage('Please enter a valid non-negative number for the hours.');
      return;
    }

    // Check if the current cycle used exceeds the max hours per day (8.75 hours)
    if (cycleUsed > MAX_HOURS_PER_DAY) {
      setErrorMessage(`You cannot exceed ${MAX_HOURS_PER_DAY} hours per day. Please adjust your hours.`);
      return;
    }

    // Clear error message if validation passes
    setErrorMessage('');

    const currentCoords = await fetchCoordinates(currentLocation);
    const pickupCoords = await fetchCoordinates(pickupLocation);
    const dropoffCoords = await fetchCoordinates(dropoffLocation);
    if (currentCoords && pickupCoords && dropoffCoords) {
      // Navigate and pass the coordinates/location as state to MapView
      navigate('/map', {
        state: {
          currentLocation: currentCoords.coords,
          pickupLocation: pickupCoords.coords,
          dropoffLocation: dropoffCoords.coords,
          currentCycleUsed: currentCycleUsed,
          currentLocationName: currentCoords.name,
          pickupLocationName: pickupCoords.name,
          dropoffLocationName: dropoffCoords.name
        }
      });
    } else {
      alert('One or more locations could not be geocoded.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Trip Details</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Current Location"
          value={currentLocation}
          onChange={(e) => setCurrentLocation(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          placeholder="Pickup Location"
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          placeholder="Dropoff Location"
          value={dropoffLocation}
          onChange={(e) => setDropoffLocation(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="number"
          placeholder="Current Cycle Used (hrs)"
          value={currentCycleUsed}
          onChange={(e) => setCurrentCycleUsed(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        {/* Display error message if any */}
        {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}

        <button
          type="submit"
          className={`w-full p-2 rounded ${loading ? 'bg-gray-400' : 'bg-blue-500'} text-white`}
          disabled={loading}  // Disable button while loading
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default TripForm;
