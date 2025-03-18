import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ELDLogView = () => {
  const { currentCycleUsed } = useLocation().state;
  const [logs, setLogs] = useState([]);

  const generateLogs = () => {
    // Logic to generate logs based on the cycle used
    const log = {
      date: new Date().toLocaleDateString(),
      drivingHours: Math.min(11, 24 - currentCycleUsed),
      offDutyHours: 10, // Example logic for off-duty time
    };
    setLogs([...logs, log]);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">ELD Logs</h1>
      <button onClick={generateLogs} className="bg-green-500 text-white p-2 rounded mb-4">Generate Logs</button>
      <div>
        {logs.length > 0 ? (
          logs.map((log, index) => (
            <div key={index} className="border-b py-2">
              <p><strong>Date:</strong> {log.date}</p>
              <p><strong>Driving Hours:</strong> {log.drivingHours} hrs</p>
              <p><strong>Off Duty Hours:</strong> {log.offDutyHours} hrs</p>
            </div>
          ))
        ) : (
          <p>No logs generated yet.</p>
        )}
      </div>
    </div>
  );
};

export default ELDLogView;
