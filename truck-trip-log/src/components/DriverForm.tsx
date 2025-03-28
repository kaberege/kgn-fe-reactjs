import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { DriverDetails, DutyTimes, DutyHours } from '../types-store/types';
import { useDriverStore } from '../state-store/useDriverStore';
import ErrorModal from './ErrorModal';
import checkTokenExpiration from '../redirect/checkToken';

const DriverForm = ({ handleSuccessMessage }: { handleSuccessMessage: () => void }) => {
    const [loading, setLoading] = useState<boolean>(false); // Set loading state
    const [error, setError] = useState<string | null>(null); // For displaying errors
    const [isModalOpen, setIsModalOpen] = useState(false); // For error modal
    const { isFormSubmitted, setLogs, setIsFormSubmitted, setStatusMessage, cycleIdHrs } = useDriverStore();

    // States for storing driver details and logs
    const [driverDetails, setDriverDetails] = useState<DriverDetails>({
        name: '',
        truckNumber: '',
        product: '',
        miles: 0,
    });

    const [dutyTimes, setDutyTimes] = useState<DutyTimes>({
        drivingHours: { '0-11': 0, '12-17': 0, '18-23': 0 },
        offDutyHours: { '0-11': 0, '12-17': 0, '18-23': 0 },
        onDutyHours: { '0-11': 0, '12-17': 0, '18-23': 0 },
        sleeperBerthHours: { '0-11': 0, '12-17': 0, '18-23': 0 },
    });

    const navigate = useNavigate();

    // Check the liftime of access token and handle redirection
    useEffect(() => {
        const token = localStorage.getItem("access_token") || '';
        if (!token || checkTokenExpiration(token)) {
            navigate("/"); // Redirect to the register/login page
        }

    }, [loading]);

    useEffect(() => {
        if (cycleIdHrs && isFormSubmitted) {
            const cycleUsed = parseFloat(cycleIdHrs);
            if (isNaN(cycleUsed)) {
                setError('Invalid cycle used value');
                return;
            }

            setError(null);
        }
    }, [cycleIdHrs, isFormSubmitted]);

    // Handle form input changes for driver details
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDriverDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    // Handle form input changes for duty times
    const handleDutyTimeChange = (timePeriod: keyof DutyHours, type: 'driving' | 'offDuty' | 'onDuty' | 'sleeperBerth', input: number) => {
        // Validate the total driving hours to ensure they do not exceed the cycle limit
        const value: number = isNaN(input) ? 0 : input;
        const currentCycleUsed: number = cycleIdHrs ? parseFloat(cycleIdHrs) : 8.75; // Current Cycle Used (hrs)

        setDutyTimes((prev) => {
            const updatedTimes = {
                ...prev,
                [type + 'Hours']: {
                    ...prev[type + 'Hours'],
                    [timePeriod]: value,
                },
            };

            // Validate total hours do not exceed 24 for any time period
            const totalHours = ['driving', 'offDuty', 'onDuty', 'sleeperBerth'].reduce((acc, key) => {
                acc += Object.values(updatedTimes[key + 'Hours']).reduce((sum, hours) => sum + hours, 0);
                return acc;
            }, 0);

            // Validate total driving hours do not exceed Current Cycle Used (hrs)
            const totalDrivingHours = Object.values(updatedTimes.drivingHours).reduce((acc, hours) => acc + hours, 0);

            if (totalDrivingHours > currentCycleUsed) {
                setError(`Driving hours cannot exceed the Current Cycle Used (hrs) of ${currentCycleUsed}.`);
                return prev; // Prevent state update if the total driving hrs exceed Current Cycle Used (hrs)
            } else if (totalHours > 24) {
                setError('Total hours (driving, off-duty, and on-duty, sleeper-berth) cannot exceed 24 hours for any period.');
                return prev; // Prevent state update if the total exceeds 24
            } else {
                setError(null);
                return updatedTimes;
            }
        });
    };

    // Handle form submission for driver details
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const totalDrivingHours = Object.values(dutyTimes.drivingHours).reduce((acc, hours) => acc + hours, 0);
        const totalOffDutyHours = Object.values(dutyTimes.offDutyHours).reduce((acc, hours) => acc + hours, 0);
        const totalOnDutyHours = Object.values(dutyTimes.onDutyHours).reduce((acc, hours) => acc + hours, 0);
        const totalSleeperBerthHours = Object.values(dutyTimes.sleeperBerthHours).reduce((acc, hours) => acc + hours, 0);
        const currentCycleUsed = cycleIdHrs ? parseFloat(cycleIdHrs) : 8.75; // Current Cycle Used (hrs)

        // Calculate the overall hours (Ensure the total hours do not exceed 24)
        const overallDutyHours: number = (totalDrivingHours + totalOffDutyHours + totalOnDutyHours + totalSleeperBerthHours);

        if (overallDutyHours < 24 || overallDutyHours > 24) {
            setError('The Total activity hours should be 24.');
        } else if (driverDetails.miles > 0 && totalDrivingHours <= 0) {
            setError('You can not drive without moving. Check total miles and driving hours:');
        } else if (driverDetails.miles <= 0 && totalDrivingHours > 0) {
            setError('You can not drive without moving. Check total miles and driving hours');
        } else if (currentCycleUsed !== totalDrivingHours) {
            setError(`Adjust your hours! Your Current Cycle Used (hrs): ${currentCycleUsed}, but you are sending: ${totalDrivingHours}`);
        } else {
            sendDataToBackend();
        }
    };

    // Generate logs based on the cycle used
    const generateLogs = (totalDHrs: number, mxHrs: number, message: string): void => {

        const newLogs = {
            date: new Date().toLocaleDateString(),
            drivingHours: dutyTimes.drivingHours,
            offDutyHours: dutyTimes.offDutyHours,
            sleeperBerthHours: dutyTimes.sleeperBerthHours,
            onDutyHours: dutyTimes.onDutyHours,
            driverName: driverDetails.name,
            truckNumber: driverDetails.truckNumber,
            carriedProduct: driverDetails.product,
            totalMiles: driverDetails.miles,
            isBelowAverage: totalDHrs < mxHrs,
        };

        setLogs(newLogs); // Set the generated log
        setStatusMessage(message); // Set the status message
    };

    // Send the driver trip data to the backend using Axios
    const sendDataToBackend = async () => {
        setLoading(true); // Set loading state to true when submitting
        const maxHoursPerDay = 8.75; // Property-carrying driver, 70hrs/8days, no adverse driving conditions
        const totalDrivingHours = Object.values(dutyTimes.drivingHours).reduce((acc, hours) => acc + hours, 0);
        const isBelowAverage = totalDrivingHours < maxHoursPerDay;
        const statusMessage = isBelowAverage
            ? `Driving time is below the expected average (${maxHoursPerDay} hrs/day).`
            : `Driving time is within the expected range.`;
        const storedData = localStorage.getItem("driverTripData");  // Get stored driver input details
        const driverTripData = storedData ? JSON.parse(storedData) : {}
        const currentCycleUsed = driverTripData.currentCycleUsed ? parseFloat(driverTripData.currentCycleUsed) : 8.75; // Current Cycle Used (hrs)

        // Data fields to be sent to the database
        const data = {
            current_cycle_used: currentCycleUsed,  //number
            route_estimated_distance: driverTripData.estimatedRouteLength,
            route_estimated_duration: driverTripData.estimatedRouteDuration,
            current_location_name: driverTripData.currentLocationName,
            pickup_location_name: driverTripData.pickupLocationName,
            dropoff_location_name: driverTripData.dropoffLocationName,
            truck_number: driverDetails.truckNumber,
            carried_product_name: driverDetails.product,
            total_daily_miles: driverDetails.miles,
            duty_status: statusMessage,
            driving_hours_0_11: dutyTimes.drivingHours['0-11'],
            driving_hours_12_17: dutyTimes.drivingHours['12-17'],
            driving_hours_18_23: dutyTimes.drivingHours['18-23'],
            off_duty_hours_0_11: dutyTimes.offDutyHours['0-11'],
            off_duty_hours_12_17: dutyTimes.offDutyHours['12-17'],
            off_duty_hours_18_23: dutyTimes.offDutyHours['18-23'],
            on_duty_hours_0_11: dutyTimes.onDutyHours['0-11'],
            on_duty_hours_12_17: dutyTimes.onDutyHours['12-17'],
            on_duty_hours_18_23: dutyTimes.onDutyHours['18-23'],
            sleeper_berth_hours_0_11: dutyTimes.sleeperBerthHours['0-11'],
            sleeper_berth_hours_12_17: dutyTimes.sleeperBerthHours['12-17'],
            sleeper_berth_hours_18_23: dutyTimes.sleeperBerthHours['18-23'],
        };

        try {
            const token = localStorage.getItem("access_token");
            const response = await axios.post(
                'https://kaberege123.pythonanywhere.com/log/trips/',
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response);
            generateLogs(totalDrivingHours, maxHoursPerDay, statusMessage,);
            handleSuccessMessage();
            setIsFormSubmitted(true);
        } catch (error) {
            setIsModalOpen(true); // Open the modal if an error occurs
        } finally {
            setLoading(false);  // Reset loading state
        }
    };

    return (
        <div className='pt-2'>
            {/* Back to Map Button */}
            <Link to="/truck/map" className=" bg-blue-500 text-xs text-amber-300 hover:bg-blue-600 transition-colors p-1 rounded-lg shadow-md">
                Back to Map
            </Link>
            <div className="max-w-2xl mx-auto bg-stone-100 border border-stone-600 rounded-lg p-1 mt-2 mb-7 sm:p-6 shadow-lg dark:bg-gray-800">
                <h1 className="text-[19px] sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">Driver Information</h1>
                <form onSubmit={handleFormSubmit} className="space-y-6">

                    {/* Driver Name */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Driver Name</label>
                        <input
                            type="text"
                            id="name"
                            maxLength={30}
                            name="name"
                            value={driverDetails.name}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                            required
                        />
                    </div>

                    {/* Truck Number */}
                    <div className="mb-4">
                        <label htmlFor="truck" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Truck Number</label>
                        <input
                            type="text"
                            id="truck"
                            maxLength={15}
                            name="truckNumber"
                            value={driverDetails.truckNumber}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                            required
                        />
                    </div>

                    {/* Carried Product */}
                    <div className="mb-4">
                        <label htmlFor="product" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Carried Product</label>
                        <input
                            type="text"
                            id="product"
                            maxLength={15}
                            name="product"
                            value={driverDetails.product}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                            required
                        />
                    </div>

                    {/* Total Miles */}
                    <div className="mb-4">
                        <label htmlFor="miles" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Total Miles</label>
                        <input
                            type="number"
                            min={0}
                            max={10000}
                            id="miles"
                            name="miles"
                            value={driverDetails.miles}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                            required
                        />
                    </div>

                    {/* Duty Hours */}
                    <div className="mb-4 mt-9">
                        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Duty Hours</h2>
                        {['0-11', '12-17', '18-23'].map((timePeriod) => (
                            <div key={timePeriod} className="space-y-1 mt-4">
                                <h3 className="text-md text-center font-semibold text-gray-800 dark:text-gray-300">{`Time Period: ${timePeriod}`}</h3>

                                {/* Use flexbox for large screens, stack for small */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {/* Driving Hours */}
                                    <div>
                                        <label htmlFor={`driving-${timePeriod}`} className="text-sm text-gray-700 dark:text-gray-300">Driving Hours</label>
                                        <input
                                            type="number"
                                            id={`driving-${timePeriod}`}
                                            min={0}
                                            max={12}
                                            step="0.1"
                                            value={dutyTimes.drivingHours[timePeriod]}
                                            onChange={(e) => handleDutyTimeChange(timePeriod, 'driving', parseFloat(e.target.value))}
                                            className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                                        />
                                    </div>

                                    {/* Off Duty Hours */}
                                    <div>
                                        <label htmlFor={`offDuty-${timePeriod}`} className="text-sm text-gray-700 dark:text-gray-300">Off Duty Hours</label>
                                        <input
                                            type="number"
                                            id={`offDuty-${timePeriod}`}
                                            min={0}
                                            max={12}
                                            step="0.1"
                                            value={dutyTimes.offDutyHours[timePeriod]}
                                            onChange={(e) => handleDutyTimeChange(timePeriod, 'offDuty', parseFloat(e.target.value))}
                                            className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                                        />
                                    </div>

                                    {/* On Duty Hours */}
                                    <div>
                                        <label htmlFor={`onDuty-${timePeriod}`} className="text-sm text-gray-700 dark:text-gray-300">On Duty Hours</label>
                                        <input
                                            type="number"
                                            id={`onDuty-${timePeriod}`}
                                            min={0}
                                            max={12}
                                            step="0.1"
                                            value={dutyTimes.onDutyHours[timePeriod]}
                                            onChange={(e) => handleDutyTimeChange(timePeriod, 'onDuty', parseFloat(e.target.value))}
                                            className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                                        />
                                    </div>

                                    {/* Sleeper Berth Hours */}
                                    <div>
                                        <label htmlFor={`sleeperBerth-${timePeriod}`} className="text-sm text-gray-700 dark:text-gray-300">Sleeper Berth Hours</label>
                                        <input
                                            type="number"
                                            id={`sleeperBerth-${timePeriod}`}
                                            min={0}
                                            max={12}
                                            step="0.1"
                                            value={dutyTimes.sleeperBerthHours[timePeriod]}
                                            onChange={(e) => handleDutyTimeChange(timePeriod, 'sleeperBerth', parseFloat(e.target.value))}
                                            className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full text-white py-3 rounded-md font-semibold
                             ${loading ? 'bg-gray-400' : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800'} 
                            text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" cursor-pointer`}
                        >
                            {loading ? "Sending..." : "Submit Driver Info"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Show error modal if there's an error */}
            {isModalOpen && (
                <ErrorModal
                    message="There was an error submitting the data. Please try again."
                    onRetry={() => {
                        setIsModalOpen(false);
                        sendDataToBackend(); // Retry form submission
                    }}
                />
            )}
        </div>
    );
};

export default DriverForm;
