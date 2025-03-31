import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TripLogsResponse, TripLog } from '../types-store/historyTypes';
import checkTokenExpiration from '../redirect/checkToken';

// Component for displaying driver's history data
const History = () => {
  const [tripLogs, setTripLogs] = useState<TripLog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [driverName, setDriverName] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check the liftime of access token and handle redirection
  useEffect(() => {
    const token = localStorage.getItem("access_token") || '';
    if (!token || checkTokenExpiration(token)) {
      navigate("/"); // Redirect to the register/login page
    }

  }, [tripLogs]);

  useEffect(() => {
    fetchTripLogs();
  }, []);

  const fetchTripLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("access_token");

      // https://kaberege123.pythonanywhere.com/ | http://127.0.0.1:8000/
      const response = await axios.get<TripLogsResponse>('https://kaberege123.pythonanywhere.com/log/trips/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDriverName(response.data.username);
      setTripLogs(response.data.trip_logs);
    } catch (err: any) {
      setError('Failed to fetch trip data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      {
        loading ? <div className="text-center text-red-600 font-semibold py-2">Loading...</div> : error ? (
          <div className="text-center py-10">
            <p className="text-red-500">{error}</p>
            <button
              onClick={fetchTripLogs}
              disabled={loading}
              className={`mt-4 p-1 ${loading ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded-md hover:bg-blue-600 cursor-pointer`}
            >
              {loading ? 'Retrying...' : 'Retry'}
            </button>
          </div>
        ) : tripLogs.length === 0 ? (
          <div className="text-center py-10 dark:text-slate-200 font-semibold">
            <p>No trip records found.</p>
          </div>
        ) : <div>
          <div className="flex gap-2 my-4">
            <Link to="/truck">
              <button className="bg-blue-500 text-xs text-amber-300 hover:bg-blue-600 p-1 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all cursor-pointer">
                Back to Home
              </button>
            </Link>

            <Link to="/truck/map">
              <button className="p-1 bg-blue-500 text-amber-300 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all text-xs cursor-pointer">
                Back to Map
              </button>
            </Link>
          </div>
          <div>
            <div className="text-xl font-semibold mb-4 dark:text-slate-100">
              <p>Driver: {driverName || 'Unknown'}</p>
            </div>

            {tripLogs.map((log, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-lg sm:text-xl font-semibold mt-4 dark:text-slate-100">{new Date(log.created_at).toLocaleDateString()}</h2>
                <div className="overflow-x-auto mb-2">
                  <table className="table-auto w-full text-sm mt-4 border-collapse">
                    <thead className="bg-gray-800 text-white">
                      <tr>
                        <th className="p-2 border text-left whitespace-nowrap">Truck Number</th>
                        <th className="p-2 border text-left whitespace-nowrap">Pickup Location</th>
                        <th className="p-2 border text-left whitespace-nowrap">Dropoff Location</th>
                        <th className="p-2 border text-left whitespace-nowrap">Carried Product</th>
                        <th className="p-2 border text-left whitespace-nowrap">Duty Status</th>
                        <th className="p-2 border text-left whitespace-nowrap">Created At</th>
                        <th className="p-2 border text-left whitespace-nowrap">Updated At</th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-100 dark:bg-gray-800 dark:text-slate-100">
                      <tr className="hover:bg-gray-200 dark:hover:bg-gray-700">
                        <td className="p-2 border whitespace-nowrap">{log.truck_number}</td>
                        <td className="p-2 border whitespace-nowrap">{log.pickup_location_name}</td>
                        <td className="p-2 border whitespace-nowrap">{log.dropoff_location_name}</td>
                        <td className="p-2 border whitespace-nowrap">{log.carried_product_name}</td>
                        <td className="p-2 border whitespace-nowrap">{log.duty_status}</td>
                        <td className="p-2 border whitespace-nowrap">
                          {new Date(log.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-2 border whitespace-nowrap">
                          {new Date(log.updated_at).toLocaleDateString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h2 className="text-lg sm:text-xl font-semibold my-4 dark:text-slate-100">Detailed Log Information</h2>
                  <div className="mb-8">
                    <h3 className="text-lg sm:text-xl font-medium dark:text-slate-100">
                      {log.current_location_name} to {log.dropoff_location_name}
                    </h3>
                    <div className="overflow-x-auto mt-4">
                      <table className="table-auto w-full text-sm border-collapse table-layout-fixed">
                        <thead className="bg-gray-800 text-white">
                          <tr>
                            <th className="p-2 border text-left whitespace-nowrap">Duty Status</th>
                            <th className="p-2 border text-left whitespace-nowrap">0:00 - 11:59</th>
                            <th className="p-2 border text-left whitespace-nowrap">12:00 - 17:59</th>
                            <th className="p-2 border text-left whitespace-nowrap">18:00 - 23:59</th>
                            <th className="p-2 border text-left whitespace-nowrap">Total</th>
                          </tr>
                        </thead>
                        <tbody className="bg-gray-100 dark:bg-gray-800 dark:text-slate-100">
                          {/* Off Duty */}
                          <tr>
                            <td className="p-2 border">OFF DUTY</td>
                            <td className="p-2 border">{log.off_duty_hours_0_11}</td>
                            <td className="p-2 border">{log.off_duty_hours_12_17}</td>
                            <td className="p-2 border">{log.off_duty_hours_18_23}</td>
                            <td className="p-2 border">{log.off_duty_hours_0_11 + log.off_duty_hours_12_17 + log.off_duty_hours_18_23}</td>
                          </tr>
                          {/* Driving */}
                          <tr>
                            <td className="p-2 border">DRIVING</td>
                            <td className="p-2 border">{log.driving_hours_0_11}</td>
                            <td className="p-2 border">{log.driving_hours_12_17}</td>
                            <td className="p-2 border">{log.driving_hours_18_23}</td>
                            <td className="p-2 border">{log.driving_hours_0_11 + log.driving_hours_12_17 + log.driving_hours_18_23}</td>
                          </tr>
                          {/* Sleeper Berth */}
                          <tr>
                            <td className="p-2 border">SLEEPER BERTH</td>
                            <td className="p-2 border">{log.sleeper_berth_hours_0_11}</td>
                            <td className="p-2 border">{log.sleeper_berth_hours_12_17}</td>
                            <td className="p-2 border">{log.sleeper_berth_hours_18_23}</td>
                            <td className="p-2 border">{log.sleeper_berth_hours_0_11 + log.sleeper_berth_hours_12_17 + log.sleeper_berth_hours_18_23}</td>
                          </tr>
                          {/* On Duty */}
                          <tr>
                            <td className="p-2 border">ON DUTY</td>
                            <td className="p-2 border">{log.on_duty_hours_0_11}</td>
                            <td className="p-2 border">{log.on_duty_hours_12_17}</td>
                            <td className="p-2 border">{log.on_duty_hours_18_23}</td>
                            <td className="p-2 border">{log.on_duty_hours_0_11 + log.on_duty_hours_12_17 + log.on_duty_hours_18_23}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      }

    </div>
  );
};

export default History;
