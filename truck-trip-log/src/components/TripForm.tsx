import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TripDetails, LocationData } from "../types-store/types"
import { useTripStore } from '../state-store/useStore';
import checkTokenExpiration from '../redirect/checkToken';

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

  // Check the liftime of access token and handle redirection
  useEffect(() => {
    const token = localStorage.getItem("access_token") || '';
    if (!token || checkTokenExpiration(token)) {
      navigate("/"); // Redirect to the register/login page
    }
  }, []);

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
      navigate('/truck/map');
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
    <div className="container px-1 py-6 sm:p-6">
      <h2 className="text-[19px] sm:text-2xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-4">
        Fill out the driver details below:
      </h2>
      <h3 className="text-[18px] sm:text-xl font-bold text-center text-blue-600 dark:text-blue-400 mb-3">
        Trip Details
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-5 max-w-2xl mx-auto">
        <input
          type="text"
          name="currentLocation"
          placeholder="Current Location"
          value={formData.currentLocation}
          onChange={handleChange}
          className="w-full p-2 sm:p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
          required
        />
        <input
          type="text"
          name="pickupLocation"
          placeholder="Pickup Location"
          value={formData.pickupLocation}
          onChange={handleChange}
          className="w-full p-2 sm:p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
          required
        />
        <input
          type="text"
          name="dropoffLocation"
          placeholder="Dropoff Location"
          value={formData.dropoffLocation}
          onChange={handleChange}
          className="w-full p-2 sm:p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
          required
        />
        <input
          type="number"
          min={0}
          max={9}
          step="0.1"
          name="currentCycleUsed"
          placeholder="Current Cycle Used (hrs)"
          value={formData.currentCycleUsed}
          onChange={handleChange}
          className="w-full p-2 sm:p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
          required
        />

        {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}

        <button
          type="submit"
          className={`w-full max-sm:w-[100px] p-1 sm:p-3 rounded-md text-white cursor-pointer
             ${loading ? 'bg-gray-400' : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800'}`}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default TripForm;