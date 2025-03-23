import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const ELDLogView = () => {
  const [logs, setLogs] = useState<any[]>([]); // Log sheet data state
  const [error, setError] = useState<string | null>(null); // For displaying errors
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Track if form has been submitted
  const [signature, setSignature] = useState(''); // Signature state
  const { cycleId } = useParams<{ cycleId: string }>();
  const { state } = useLocation(); // Contains estimated route time in seconds
  const { estimatedRouteTime } = state; // Estimated total route time in seconds
  const [statusMessage, setStatusMessage] = useState<string>(''); // The message to display to the user

  // States for storing driver details and logs
  const [driverDetails, setDriverDetails] = useState({
    name: '',
    truckNumber: '',
    product: '',
  });

  useEffect(() => {
    if (cycleId && isFormSubmitted) {
      const cycleUsed = parseFloat(cycleId);
      if (isNaN(cycleUsed)) {
        setError('Invalid cycle used value');
        return;
      }

      setError(null);
      generateLogs(cycleUsed);
    }
  }, [cycleId, isFormSubmitted]);

  useEffect(() => {
    if (cycleId && estimatedRouteTime !== null) {
      const cycleUsedInSeconds = parseFloat(cycleId) * 3600; // Convert hours to seconds
  
      if (isNaN(cycleUsedInSeconds)) {
        setError('Invalid cycle used value');
        return;
      }
  
      // Calculate the difference between estimated time and actual time used
      const timeDifference = estimatedRouteTime - cycleUsedInSeconds;

      if (timeDifference > 0) {
        // If the actual time used is less than the estimated time
        setStatusMessage(`You're on track! You still have ${formatTime(timeDifference)} remaining.`);
      } else if (timeDifference < 0) {
        // If the actual time used exceeds the estimated time
        setStatusMessage(`There's a delay. You've exceeded the estimated time by ${formatTime(Math.abs(timeDifference))}.`);
      } else {
        // If the actual time used exactly matches the estimated time
        setStatusMessage("You're right on track and have used the exact time estimated so far. Keep going!");
      }
    }
  }, [estimatedRouteTime, cycleId]);
  
  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400); // 1 day = 86400 seconds
    const hours = Math.floor((seconds % 86400) / 3600); // 1 hour = 3600 seconds
    const minutes = Math.floor((seconds % 3600) / 60); // 1 minute = 60 seconds
    const remainingSeconds = seconds % 60;
  
    let timeString = '';
  
    if (days > 0) {
      timeString += `${days} day${days > 1 ? 's' : ''}`;
    }
  
    if (hours > 0) {
      if (timeString) timeString += ' ';
      timeString += `${hours} hour${hours > 1 ? 's' : ''}`;
    }
  
    if (minutes > 0) {
      if (timeString) timeString += ' ';
      timeString += `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
  
    if (remainingSeconds > 0 || timeString === '') {
      if (timeString) timeString += ' ';
      timeString += `${remainingSeconds.toFixed(2)} second${remainingSeconds > 1 ? 's' : ''}`;
    }
  
    return timeString;
  }
  
  // Handle form input changes for driver details
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDriverDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle form submission for driver details
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (driverDetails.name && driverDetails.truckNumber && driverDetails.product) {
      setIsFormSubmitted(true);
    } else {
      setError('Please fill in all the fields.');
    }
  };

  // Signature input change handler
  const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignature(e.target.value);
  };

  // Generate logs based on the cycle usedimport { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const ELDLogView = () => {
  const [logs, setLogs] = useState<any[]>([]); // Log sheet data state
  const [error, setError] = useState<string | null>(null); // For displaying errors
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Track if form has been submitted
  const [signature, setSignature] = useState(''); // Signature state
  const { cycleId } = useParams<{ cycleId: string }>();
  const { state } = useLocation(); // Contains estimated route time in seconds
  const { estimatedRouteTime } = state; // Estimated total route time in seconds
  const [statusMessage, setStatusMessage] = useState<string>(''); // The message to display to the user

  // States for storing driver details and logs
  const [driverDetails, setDriverDetails] = useState({
    name: '',
    truckNumber: '',
    product: '',
  });

  const [dutyTimes, setDutyTimes] = useState({
    drivingHours: { '0-11': 0, '12-17': 0, '18-23': 0 },
    offDutyHours: { '0-11': 0, '12-17': 0, '18-23': 0 },
    onDutyHours: { '0-11': 0, '12-17': 0, '18-23': 0 },
  });

  useEffect(() => {
    if (cycleId && isFormSubmitted) {
      const cycleUsed = parseFloat(cycleId);
      if (isNaN(cycleUsed)) {
        setError('Invalid cycle used value');
        return;
      }

      setError(null);
      generateLogs(cycleUsed);
    }
  }, [cycleId, isFormSubmitted]);

  useEffect(() => {
    if (cycleId && estimatedRouteTime !== null) {
      const cycleUsedInSeconds = parseFloat(cycleId) * 3600; // Convert hours to seconds
  
      if (isNaN(cycleUsedInSeconds)) {
        setError('Invalid cycle used value');
        return;
      }
  
      // Calculate the difference between estimated time and actual time used
      const timeDifference = estimatedRouteTime - cycleUsedInSeconds;

      if (timeDifference > 0) {
        // If the actual time used is less than the estimated time
        setStatusMessage(`You're on track! You still have ${formatTime(timeDifference)} remaining.`);
      } else if (timeDifference < 0) {
        // If the actual time used exceeds the estimated time
        setStatusMessage(`There's a delay. You've exceeded the estimated time by ${formatTime(Math.abs(timeDifference))}.`);
      } else {
        // If the actual time used exactly matches the estimated time
        setStatusMessage("You're right on track and have used the exact time estimated so far. Keep going!");
      }
    }
  }, [estimatedRouteTime, cycleId]);
  
  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400); // 1 day = 86400 seconds
    const hours = Math.floor((seconds % 86400) / 3600); // 1 hour = 3600 seconds
    const minutes = Math.floor((seconds % 3600) / 60); // 1 minute = 60 seconds
    const remainingSeconds = seconds % 60;
  
    let timeString = '';
  
    if (days > 0) {
      timeString += `${days} day${days > 1 ? 's' : ''}`;
    }
  
    if (hours > 0) {
      if (timeString) timeString += ' ';
      timeString += `${hours} hour${hours > 1 ? 's' : ''}`;
    }
  
    if (minutes > 0) {
      if (timeString) timeString += ' ';
      timeString += `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
  
    if (remainingSeconds > 0 || timeString === '') {
      if (timeString) timeString += ' ';
      timeString += `${remainingSeconds.toFixed(2)} second${remainingSeconds > 1 ? 's' : ''}`;
    }
  
    return timeString;
  }

  // Handle form input changes for driver details
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDriverDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle form input changes for duty times
  const handleDutyTimeChange = (timePeriod: string, type: 'driving' | 'offDuty' | 'onDuty', value: number) => {
    setDutyTimes((prev) => ({
      ...prev,
      [type + 'Hours']: {
        ...prev[type + 'Hours'],
        [timePeriod]: value,
      },
    }));
  };

  // Handle form submission for driver details
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (driverDetails.name && driverDetails.truckNumber && driverDetails.product) {
      setIsFormSubmitted(true);
    } else {
      setError('Please fill in all the fields.');
    }
  };

  // Generate logs based on the cycle used
  const generateLogs = (cycleUsed: number) => {
    const maxHoursPerDay = 8.75;
    const totalDays = Math.ceil(cycleUsed / maxHoursPerDay);

    const newLogs = [];
    let remainingHours = cycleUsed;

    for (let day = 1; day <= totalDays; day++) {
      const drivingHoursForDay = remainingHours > maxHoursPerDay ? maxHoursPerDay : remainingHours;
      const offDutyHours = 24 - drivingHoursForDay; // Only off-duty if not driving

      newLogs.push({
        date: new Date(new Date().setDate(new Date().getDate() - totalDays + day)).toLocaleDateString(),
        drivingHours: drivingHoursForDay,
        offDutyHours: drivingHoursForDay < maxHoursPerDay ? offDutyHours : 0, // No off-duty if driving max hours
        sleeperBirthHours: 0, // Assume no sleeper birth for simplicity
        onDutyHours: 0, // Assume no on-duty hours except for driving and off-duty
        driverName: driverDetails.name,
        truckNumber: driverDetails.truckNumber,
        carriedProduct: driverDetails.product,
        isBelowAverage: drivingHoursForDay < maxHoursPerDay,
      });

      remainingHours -= drivingHoursForDay;
    }
    setLogs(newLogs);
  };

  return (
    <div className="container mx-auto p-6 dark:bg-gray-900 dark:text-white">
      {/* Form for Driver Details */}
      {!isFormSubmitted ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">Driver Information</h1>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block">Driver Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={driverDetails.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="truckNumber" className="block">Truck Number</label>
              <input
                type="text"
                id="truckNumber"
                name="truckNumber"
                value={driverDetails.truckNumber}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="product" className="block">Carried Product</label>
              <input
                type="text"
                id="product"
                name="product"
                value={driverDetails.product}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            {/* Duty Hours Input for 0-11, 12-17, and 18-23 */}
            <div className="mb-4">
              <h2 className="text-lg font-bold">Duty Hours</h2>
              {['0-11', '12-17', '18-23'].map((timePeriod) => (
                <div key={timePeriod} className="mb-4">
                  <h3 className="font-semibold">{`Time Period: ${timePeriod}`}</h3>
                  
                  <div className="flex space-x-4">
                    <div>
                      <label>Driving Hours</label>
                      <input
                        type="number"
                        min="0"
                        max="12"
                        value={dutyTimes.drivingHours[timePeriod]}
                        onChange={(e) => handleDutyTimeChange(timePeriod, 'driving', parseFloat(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>

                    <div>
                      <label>Off Duty Hours</label>
                      <input
                        type="number"
                        min="0"
                        max="12"
                        value={dutyTimes.offDutyHours[timePeriod]}
                        onChange={(e) => handleDutyTimeChange(timePeriod, 'offDuty', parseFloat(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>

                    <div>
                      <label>On Duty Hours</label>
                      <input
                        type="number"
                        min="0"
                        max="12"
                        value={dutyTimes.onDutyHours[timePeriod]}
                        onChange={(e) => handleDutyTimeChange(timePeriod, 'onDuty', parseFloat(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button type="submit" className="bg-green-500 text-white p-2 rounded dark:bg-green-600">
              Submit Driver Info
            </button>
          </form>
        </div>
      ) : (
        <div>
          {/* Display error message if there's an error */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Status Message */}
          {statusMessage && <p className="mt-2 text-lg font-medium">{statusMessage}</p>}

          {logs.length > 0 ? (
            logs.map((log, index) => (
              <div key={index} className="border-b py-4 dark:border-gray-700">
                <div className="mb-4">
                  <p><strong>Driver:</strong> {log.driverName}</p>
                  <p><strong>Truck Number:</strong> {log.truckNumber}</p>
                  <p><strong>Carried Product:</strong> {log.carriedProduct}</p>
                </div>
                <h3 className="text-lg font-semibold">Date: {log.date}</h3>

                {/* Add horizontal scrolling for tables on small screens */}
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
                      <tr>
                        <td className="p-2 border whitespace-nowrap">OFF DUTY</td>
                        <td className="p-2 border whitespace-nowrap">{log.offDutyHours >= 8 ? '8' : 'N/A'}</td>
                        <td className="p-2 border whitespace-nowrap">{log.offDutyHours > 8 ? log.offDutyHours - 8 : 'N/A'}</td>
                        <td className="p-2 border whitespace-nowrap">N/A</td>
                        <td className="p-2 border whitespace-nowrap">{log.offDutyHours}</td>
                      </tr>
                      <tr>
                        <td className="p-2 border whitespace-nowrap">DRIVING</td>
                        <td className="p-2 border whitespace-nowrap">{log.drivingHours >= 8 ? '8' : 'N/A'}</td>
                        <td className="p-2 border whitespace-nowrap">{log.drivingHours > 8 ? log.drivingHours - 8 : 'N/A'}</td>
                        <td className="p-2 border whitespace-nowrap">{log.drivingHours < 8 ? log.drivingHours : 'N/A'}</td>
                        <td className="p-2 border whitespace-nowrap">{log.drivingHours}</td>
                      </tr>
                      <tr>
                        <td className="p-2 border whitespace-nowrap">SLEEPER BIRTH</td>
                        <td className="p-2 border whitespace-nowrap">{log.sleeperBirthHours}</td>
                        <td className="p-2 border whitespace-nowrap">{log.sleeperBirthHours}</td>
                        <td className="p-2 border whitespace-nowrap">{log.sleeperBirthHours}</td>
                        <td className="p-2 border whitespace-nowrap">{log.sleeperBirthHours}</td>
                      </tr>
                      <tr>
                        <td className="p-2 border whitespace-nowrap">ON DUTY</td>
                        <td className="p-2 border whitespace-nowrap">{log.onDutyHours}</td>
                        <td className="p-2 border whitespace-nowrap">{log.onDutyHours}</td>
                        <td className="p-2 border whitespace-nowrap">{log.onDutyHours}</td>
                        <td className="p-2 border whitespace-nowrap">{log.onDutyHours}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {log.isBelowAverage && (
                  <p className="text-red-500 mt-2">Driving time is below the expected average (8.75 hrs/day).</p>
                )}

                {/* Signature Section */}
                <div className="mt-4">
                  <label htmlFor={`signature-${index}`} className="block text-sm font-semibold">Driver's Signature:</label>
                  <input
                    id={`signature-${index}`}
                    type="text"
                    className="w-full p-2 border mt-1 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Enter your name to sign"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No logs generated yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ELDLogView;

  const generateLogs = (cycleUsed: number) => {
    const maxHoursPerDay = 8.75;
    const totalDays = Math.ceil(cycleUsed / maxHoursPerDay);

    const newLogs = [];
    let remainingHours = cycleUsed;

    for (let day = 1; day <= totalDays; day++) {
      const drivingHoursForDay = remainingHours > maxHoursPerDay ? maxHoursPerDay : remainingHours;
      const offDutyHours = 24 - drivingHoursForDay; // Only off-duty if not driving

      newLogs.push({
        date: new Date(new Date().setDate(new Date().getDate() - totalDays + day)).toLocaleDateString(),
        drivingHours: drivingHoursForDay,
        offDutyHours: drivingHoursForDay < maxHoursPerDay ? offDutyHours : 0, // No off-duty if driving max hours
        sleeperBirthHours: 0, // Assume no sleeper birth for simplicity
        onDutyHours: 0, // Assume no on-duty hours except for driving and off-duty
        driverName: driverDetails.name,
        truckNumber: driverDetails.truckNumber,
        carriedProduct: driverDetails.product,
        isBelowAverage: drivingHoursForDay < maxHoursPerDay,
      });

      remainingHours -= drivingHoursForDay;
    }
    setLogs(newLogs);
  };

  return (
    <div className="container mx-auto p-6 dark:bg-gray-900 dark:text-white">
      {/* Form for Driver Details */}
      {!isFormSubmitted ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">Driver Information</h1>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block">Driver Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={driverDetails.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="truckNumber" className="block">Truck Number</label>
              <input
                type="text"
                id="truckNumber"
                name="truckNumber"
                value={driverDetails.truckNumber}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="product" className="block">Carried Product</label>
              <input
                type="text"
                id="product"
                name="product"
                value={driverDetails.product}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button type="submit" className="bg-green-500 text-white p-2 rounded dark:bg-green-600">
              Submit Driver Info
            </button>
          </form>
        </div>
      ) : (
        <div>
          {/* Display error message if there's an error */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Status Message */}
          {statusMessage && <p className="mt-2 text-lg font-medium">{statusMessage}</p>}

          {logs.length > 0 ? (
            logs.map((log, index) => (
              <div key={index} className="border-b py-4 dark:border-gray-700">
                <div className="mb-4">
                  <p><strong>Driver:</strong> {log.driverName}</p>
                  <p><strong>Truck Number:</strong> {log.truckNumber}</p>
                  <p><strong>Carried Product:</strong> {log.carriedProduct}</p>
                </div>
                <h3 className="text-lg font-semibold">Date: {log.date}</h3>

                {/* Add horizontal scrolling for tables on small screens */}
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
                      <tr>
                        <td className="p-2 border whitespace-nowrap">OFF DUTY</td>
                        <td className="p-2 border whitespace-nowrap">{log.offDutyHours >= 8 ? '8' : 'N/A'}</td>
                        <td className="p-2 border whitespace-nowrap">{log.offDutyHours > 8 ? log.offDutyHours - 8 : 'N/A'}</td>
                        <td className="p-2 border whitespace-nowrap">N/A</td>
                        <td className="p-2 border whitespace-nowrap">{log.offDutyHours}</td>
                      </tr>
                      <tr>
                        <td className="p-2 border whitespace-nowrap">DRIVING</td>
                        <td className="p-2 border whitespace-nowrap">{log.drivingHours >= 8 ? '8' : 'N/A'}</td>
                        <td className="p-2 border whitespace-nowrap">{log.drivingHours > 8 ? log.drivingHours - 8 : 'N/A'}</td>
                        <td className="p-2 border whitespace-nowrap">{log.drivingHours < 8 ? log.drivingHours : 'N/A'}</td>
                        <td className="p-2 border whitespace-nowrap">{log.drivingHours}</td>
                      </tr>
                      <tr>
                        <td className="p-2 border whitespace-nowrap">SLEEPER BIRTH</td>
                        <td className="p-2 border whitespace-nowrap">{log.sleeperBirthHours}</td>
                        <td className="p-2 border whitespace-nowrap">{log.sleeperBirthHours}</td>
                        <td className="p-2 border whitespace-nowrap">{log.sleeperBirthHours}</td>
                        <td className="p-2 border whitespace-nowrap">{log.sleeperBirthHours}</td>
                      </tr>
                      <tr>
                        <td className="p-2 border whitespace-nowrap">ON DUTY</td>
                        <td className="p-2 border whitespace-nowrap">{log.onDutyHours}</td>
                        <td className="p-2 border whitespace-nowrap">{log.onDutyHours}</td>
                        <td className="p-2 border whitespace-nowrap">{log.onDutyHours}</td>
                        <td className="p-2 border whitespace-nowrap">{log.onDutyHours}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {log.isBelowAverage && (
                  <p className="text-red-500 mt-2">Driving time is below the expected average (8.75 hrs/day).</p>
                )}

                {/* Signature Section */}
                <div className="mt-4">
                  <label htmlFor={`signature-${index}`} className="block text-sm font-semibold">Driver's Signature:</label>
                  <input
                    id={`signature-${index}`}
                    type="text"
                    className="w-full p-2 border mt-1 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Enter your name to sign"
                    value={signature}
                    onChange={handleSignatureChange}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No logs generated yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ELDLogView;
