import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DriverDetails, Logs, DutyTimes, DutyHours } from '../types-store/types';

const ELDLogView = () => {

  const [logs, setLogs] = useState<Logs>(); // Log sheet data state

  const [error, setError] = useState<string | null>(null); // For displaying errors
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Track if form has been submitted
  const [signature, setSignature] = useState(''); // Signature state
  const [statusMessage, setStatusMessage] = useState<string>(''); // Status message for errors
  const { cycleId } = useParams<{ cycleId: string }>();

  // States for storing driver details and logs
  const [driverDetails, setDriverDetails] = useState<DriverDetails>({
    name: '',
    truckNumber: '',
    product: '',
  });

  const [dutyTimes, setDutyTimes] = useState<DutyTimes>({
    drivingHours: { '0-11': 0, '12-17': 0, '18-23': 0 },
    offDutyHours: { '0-11': 0, '12-17': 0, '18-23': 0 },
    onDutyHours: { '0-11': 0, '12-17': 0, '18-23': 0 },
  });

  console.log(dutyTimes);
  useEffect(() => {
    if (cycleId && isFormSubmitted) {
      const cycleUsed = parseFloat(cycleId);
      if (isNaN(cycleUsed)) {
        setError('Invalid cycle used value');
        return;
      }

      setError(null);
    }
  }, [cycleId, isFormSubmitted]);

  // Handle form input changes for driver details
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDriverDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle form input changes for duty times
  const handleDutyTimeChange = (timePeriod: keyof DutyHours, type: 'driving' | 'offDuty' | 'onDuty', value: number) => {
    // Validate the total driving hours to ensure they do not exceed the cycle limit
    const totalDrivingHours = Object.values(dutyTimes.drivingHours).reduce((acc, hours) => acc + hours, 0);
    const currentCycleUsed = cycleId ? parseFloat(cycleId) : 8.75; // Current Cycle Used (hrs)
    console.log("currentCyle", currentCycleUsed);
    if (totalDrivingHours + value <= currentCycleUsed) {
      setDutyTimes((prev) => {
        const updatedTimes = {
          ...prev,
          [type + 'Hours']: {
            ...prev[type + 'Hours'],
            [timePeriod]: value,
          },
        };

        // Validate total hours do not exceed 24 for any time period
        const totalHours = ['driving', 'offDuty', 'onDuty'].reduce((acc, key) => {
          acc += Object.values(updatedTimes[key + 'Hours']).reduce((sum, hours) => sum + hours, 0);
          return acc;
        }, 0);

        if (totalHours > 24) {
          setError('Total hours (driving, off-duty, and on-duty) cannot exceed 24 hours for any period.');
          return prev; // Prevent state update if the total exceeds 24
        } else {
          setError(null);
          return updatedTimes;
        }
      });
    } else {
      setError(`Driving hours cannot exceed the Current Cycle Used (hrs) of ${currentCycleUsed}.`);
    }
  };

  // Handle form submission for driver details
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (driverDetails.name && driverDetails.truckNumber && driverDetails.product) {
      generateLogs();
      setIsFormSubmitted(true);
    } else {
      setError('Please fill in all the fields.');
    }
  };

  // Generate logs based on the cycle used
  const generateLogs = () => {
    const maxHoursPerDay = 8.75; // Property-carrying driver, 70hrs/8days, no adverse driving conditions
    const totalDrivingHours = Object.values(dutyTimes.drivingHours).reduce((acc, hours) => acc + hours, 0);
    const totalOffDutyHours = Object.values(dutyTimes.offDutyHours).reduce((acc, hours) => acc + hours, 0);
    const totalOnDutyHours = Object.values(dutyTimes.onDutyHours).reduce((acc, hours) => acc + hours, 0);

    // Calculate the sleeper berth hours dynamically (Ensure the total hours do not exceed 24)
    const sleeperBerthHours = Math.max(0, 24 - (totalDrivingHours + totalOffDutyHours + totalOnDutyHours));

    const isBelowAverage = totalDrivingHours < maxHoursPerDay;
    const statusMessage = isBelowAverage
      ? `Driving time is below the expected average (${maxHoursPerDay} hrs/day).`
      : `Driving time is within the expected range.`;

    const newLogs = {
      date: new Date().toLocaleDateString(),
      drivingHours: dutyTimes.drivingHours,
      offDutyHours: dutyTimes.offDutyHours,
      sleeperBerthHours, // Use dynamically calculated sleeper berth hours
      onDutyHours: dutyTimes.onDutyHours,
      driverName: driverDetails.name,
      truckNumber: driverDetails.truckNumber,
      carriedProduct: driverDetails.product,
      isBelowAverage: totalDrivingHours < maxHoursPerDay,
    };

    setLogs(newLogs); // Set the generated log
    setStatusMessage(statusMessage); // Set the status message
  };

  console.log("mylogs", logs);

  return (
    <div className="container mx-auto p-6 dark:bg-gray-900 dark:text-white">
      {/* Form for Driver Details */}
      {!isFormSubmitted ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">Driver Information</h1>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Driver Name */}
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Driver Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={driverDetails.name}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                required
              />
            </div>

            {/* Truck Number */}
            <div className="mb-6">
              <label htmlFor="truckNumber" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Truck Number</label>
              <input
                type="text"
                id="truckNumber"
                name="truckNumber"
                value={driverDetails.truckNumber}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                required
              />
            </div>

            {/* Carried Product */}
            <div className="mb-6">
              <label htmlFor="product" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Carried Product</label>
              <input
                type="text"
                id="product"
                name="product"
                value={driverDetails.product}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                required
              />
            </div>

            {/* Duty Hours */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Duty Hours</h2>
              {['0-11', '12-17', '18-23'].map((timePeriod) => (
                <div key={timePeriod} className="space-y-6">
                  <h3 className="text-md font-semibold text-gray-800 dark:text-gray-300">{`Time Period: ${timePeriod}`}</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Driving Hours */}
                    <div>
                      <label className="text-sm text-gray-700 dark:text-gray-300">Driving Hours</label>
                      <input
                        type="number"
                        min="0"
                        max="12"
                        value={dutyTimes.drivingHours[timePeriod]}
                        onChange={(e) => handleDutyTimeChange(timePeriod, 'driving', parseFloat(e.target.value))}
                        className="w-full p-4 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                      />
                    </div>

                    {/* Off Duty Hours */}
                    <div>
                      <label className="text-sm text-gray-700 dark:text-gray-300">Off Duty Hours</label>
                      <input
                        type="number"
                        min="0"
                        max="12"
                        value={dutyTimes.offDutyHours[timePeriod]}
                        onChange={(e) => handleDutyTimeChange(timePeriod, 'offDuty', parseFloat(e.target.value))}
                        className="w-full p-4 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                      />
                    </div>

                    {/* On Duty Hours */}
                    <div>
                      <label className="text-sm text-gray-700 dark:text-gray-300">On Duty Hours</label>
                      <input
                        type="number"
                        min="0"
                        max="12"
                        value={dutyTimes.onDutyHours[timePeriod]}
                        onChange={(e) => handleDutyTimeChange(timePeriod, 'onDuty', parseFloat(e.target.value))}
                        className="w-full p-4 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
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
                className="w-full bg-green-500 text-white py-4 rounded-md font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              >
                Submit Driver Info
              </button>
            </div>
          </form>

        </div>
      ) : (
        <div>
          {/* Display error message if there's an error */}
          {error && <p className="text-red-500">{error}</p>}
          <div className="border-b py-4 dark:border-gray-700">
            <div className="mb-4">
              <p><strong>Driver:</strong> {logs && logs.driverName}</p>
              <p><strong>Truck Number:</strong> {logs && logs.truckNumber}</p>
              <p><strong>Carried Product:</strong> {logs && logs.carriedProduct}</p>
            </div>
            <h3 className="text-lg font-semibold">Date: {logs && logs.date}</h3>
            {
              logs && Object.keys(logs).length > 0 && (

                <div className="overflow-x-auto">
                  <table className="table-auto w-full text-sm mt-4 border-collapse table-layout-fixed">
                    <thead className="bg-gray-800 text-white">
                      <tr>
                        <th className="p-2 border text-left whitespace-nowrap">Duty Status</th>
                        <th className="p-2 border text-left whitespace-nowrap">0:00 - 11:59</th>
                        <th className="p-2 border text-left whitespace-nowrap">12:00 - 17:59</th>
                        <th className="p-2 border text-left whitespace-nowrap">18:00 - 23:59</th>
                        <th className="p-2 border text-left whitespace-nowrap">Total</th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-100 dark:bg-gray-800">
                      {/* OFF DUTY ROW */}
                      <tr>
                        <td className="p-2 border whitespace-nowrap">OFF DUTY</td>
                        {['0-11', '12-17', '18-23'].map((period) => (
                          <td className="p-2 border whitespace-nowrap" key={`offDuty-${period}`}>
                            {logs.offDutyHours[period]}
                          </td>
                        ))}
                        {/* Calculate Total Off Duty Hours */}
                        <td className="p-2 border whitespace-nowrap">
                          {Object.values(logs.offDutyHours).reduce((sum, hours) => sum + hours, 0)}
                        </td>
                      </tr>

                      {/* DRIVING ROW */}
                      <tr>
                        <td className="p-2 border whitespace-nowrap">DRIVING</td>
                        {['0-11', '12-17', '18-23'].map((period) => (
                          <td className="p-2 border whitespace-nowrap" key={`driving-${period}`}>
                            {logs.drivingHours[period]}
                          </td>
                        ))}
                        {/* Calculate Total Driving Hours */}
                        <td className="p-2 border whitespace-nowrap">
                          {Object.values(logs.drivingHours).reduce((sum, hours) => sum + hours, 0)}
                        </td>
                      </tr>

                      {/* SLEEPER BERTH ROW */}
                      <tr>
                        <td className="p-2 border whitespace-nowrap">SLEEPER BERTH</td>
                        {['0-11', '12-17', '18-23'].map((period) => (
                          <td className="p-2 border whitespace-nowrap" key={`sleeperBerth-${period}`}>
                            ...
                          </td>
                        ))}
                        {/* Calculate Total Sleeper Berth Hours */}
                        <td className="p-2 border whitespace-nowrap">
                          {logs.sleeperBerthHours}
                        </td>
                      </tr>

                      {/* ON DUTY ROW */}
                      <tr>
                        <td className="p-2 border whitespace-nowrap">ON DUTY</td>
                        {['0-11', '12-17', '18-23'].map((period) => (
                          <td className="p-2 border whitespace-nowrap" key={`onDuty-${period}`}>
                            {logs.onDutyHours[period]}
                          </td>
                        ))}
                        {/* Calculate Total On Duty Hours */}
                        <td className="p-2 border whitespace-nowrap">
                          {Object.values(logs.onDutyHours).reduce((sum, hours) => sum + hours, 0)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              )
            }

            {/* Status Message */}
            {logs && logs.isBelowAverage && (
              <p className="text-red-500 mt-2">{statusMessage}</p>
            )}

            {/* Signature Section */}
            <div className="mt-4">
              <label htmlFor="signature" className="block text-sm font-semibold">Driver's Signature:</label>
              <input
                id='signature'
                type="text"
                className="w-full p-2 border mt-1 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter your name to sign"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ELDLogView;
