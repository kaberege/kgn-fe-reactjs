import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TripDetails, LocationData } from "../types-store/types"
import { useTripStore } from '../state-store/useStore';

const TripForm = () => {
  // Set driver trip details
  const [formData, setFormData] = useState<TripDetails>({
    currentLocation: '',
    pickupLocation: '',
    dropoffLocation: '',
    currentCycleUsed: '',
  });

  const [errorMessage, setErrorMessage] = useState<string>('');  // Set error message
  const [loading, setLoading] = useState<boolean>(false); // Set loading state
  const setTripDetails = useTripStore((state) => state.setTripDetails);

  const navigate = useNavigate();

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

    // Validate the current cycle used input
    const cycleUsed = parseFloat(formData.currentCycleUsed);

    // Ensure the current cycle used is a valid number and is non-negative
    if (isNaN(cycleUsed) || cycleUsed < 0) {
      setErrorMessage('Please enter a valid non-negative number for the hours.');
      return;
    }

    // Ensure the current cycle used is a valid number <= to 8.75,
    //  Property-carrying driver, 70hrs/8days
    if (cycleUsed > 8.75) {
      setErrorMessage("Driving hours cannot exceed the allowed maximum of 8.75 hrs/day");
      return;
    }

    // Clear error message if validation passes
    setErrorMessage('');

    const currentCoords = await fetchCoordinates(formData.currentLocation);
    const pickupCoords = await fetchCoordinates(formData.pickupLocation);
    const dropoffCoords = await fetchCoordinates(formData.dropoffLocation);
    if (currentCoords && pickupCoords && dropoffCoords) {
      const driverTripData = {
        currentLocation: currentCoords.coords,
        pickupLocation: pickupCoords.coords,
        dropoffLocation: dropoffCoords.coords,
        currentCycleUsed: formData.currentCycleUsed,
        currentLocationName: currentCoords.name,
        pickupLocationName: pickupCoords.name,
        dropoffLocationName: dropoffCoords.name,
      };
      setTripDetails(driverTripData);
      localStorage.setItem("driverTripData", JSON.stringify(driverTripData)); // Send trip details to the local storage
      // Navigate and pass the coordinates/location as state to MapView
      navigate('/map');
    } else {
      alert('One or more locations could not be geocoded.');
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Trip Details</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="currentLocation"
          placeholder="Current Location"
          value={formData.currentLocation}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="pickupLocation"
          placeholder="Pickup Location"
          value={formData.pickupLocation}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="dropoffLocation"
          placeholder="Dropoff Location"
          value={formData.dropoffLocation}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="number"
          name="currentCycleUsed"
          placeholder="Current Cycle Used (hrs)"
          value={formData.currentCycleUsed}
          onChange={handleChange}
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
