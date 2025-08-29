import { useDriverStore } from "../state-store/useDriverStore";
import DownloadShare from "./DownloadShare";
import { Link } from "react-router";

const DriverLogs = () => {
  const { logs, setIsFormSubmitted, statusMessage, signature, setSignature } =
    useDriverStore();

  return (
    <div className="p-5">
      <div className="flex gap-2">
        {/* Back to Home Button */}
        <Link to="/truck">
          <button
            className=" bg-blue-500 text-xs text-amber-300 hover:bg-blue-600 
                     p-1 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400
                  focus:ring-opacity-75 transition-all cursor-pointer
                  "
          >
            Back to Home
          </button>
        </Link>
        {/* Back to Form Link */}
        <Link
          to="/truck/map"
          onClick={() => setIsFormSubmitted(false)}
          className="p-1 bg-blue-500  text-amber-300 rounded-lg shadow-md
                 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400
                  focus:ring-opacity-75 transition-all text-xs cursor-pointer"
        >
          Back to map
        </Link>
      </div>

      <div className="border-b py-4 dark:border-gray-700">
        <div className="mb-4">
          <p>
            <strong>Driver:</strong> {logs && logs.driverName}
          </p>
          <p>
            <strong>Truck Number:</strong> {logs && logs.truckNumber}
          </p>
          <p>
            <strong>Carried Product:</strong> {logs && logs.carriedProduct}
          </p>
          <p>
            <strong>Total Miles:</strong> {logs && logs.totalMiles}
          </p>
        </div>
        <h3 className="text-lg font-semibold">Date: {logs && logs.date}</h3>
        {logs && Object.keys(logs).length > 0 && (
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-sm mt-4 border-collapse table-layout-fixed">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="p-2 border text-left whitespace-nowrap">
                    Duty Status
                  </th>
                  <th className="p-2 border text-left whitespace-nowrap">
                    0:00 - 11:59
                  </th>
                  <th className="p-2 border text-left whitespace-nowrap">
                    12:00 - 17:59
                  </th>
                  <th className="p-2 border text-left whitespace-nowrap">
                    18:00 - 23:59
                  </th>
                  <th className="p-2 border text-left whitespace-nowrap">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-100 dark:bg-gray-800">
                {/* OFF DUTY ROW */}
                <tr>
                  <td className="p-2 border whitespace-nowrap">OFF DUTY</td>
                  {["0:00-11:59", "12:00-17:59", "18:00-23:59"].map(
                    (period) => (
                      <td
                        className="p-2 border whitespace-nowrap"
                        key={`offDuty-${period}`}
                      >
                        {logs.offDutyHours[period]}
                      </td>
                    )
                  )}
                  {/* Calculate Total Off Duty Hours */}
                  <td className="p-2 border whitespace-nowrap">
                    {Object.values(logs.offDutyHours).reduce(
                      (sum, hours) => sum + hours,
                      0
                    )}
                  </td>
                </tr>

                {/* DRIVING ROW */}
                <tr>
                  <td className="p-2 border whitespace-nowrap">DRIVING</td>
                  {["0:00-11:59", "12:00-17:59", "18:00-23:59"].map(
                    (period) => (
                      <td
                        className="p-2 border whitespace-nowrap"
                        key={`driving-${period}`}
                      >
                        {logs.drivingHours[period]}
                      </td>
                    )
                  )}
                  {/* Calculate Total Driving Hours */}
                  <td className="p-2 border whitespace-nowrap">
                    {Object.values(logs.drivingHours).reduce(
                      (sum, hours) => sum + hours,
                      0
                    )}
                  </td>
                </tr>

                {/* SLEEPER BERTH ROW */}
                <tr>
                  <td className="p-2 border whitespace-nowrap">
                    SLEEPER BERTH
                  </td>
                  {["0:00-11:59", "12:00-17:59", "18:00-23:59"].map(
                    (period) => (
                      <td
                        className="p-2 border whitespace-nowrap"
                        key={`sleeperBerth-${period}`}
                      >
                        {logs.sleeperBerthHours[period]}
                      </td>
                    )
                  )}
                  {/* Calculate Total Sleeper Berth Hours */}
                  <td className="p-2 border whitespace-nowrap">
                    {Object.values(logs.sleeperBerthHours).reduce(
                      (sum, hours) => sum + hours,
                      0
                    )}
                  </td>
                </tr>

                {/* ON DUTY ROW */}
                <tr>
                  <td className="p-2 border whitespace-nowrap">ON DUTY</td>
                  {["0:00-11:59", "12:00-17:59", "18:00-23:59"].map(
                    (period) => (
                      <td
                        className="p-2 border whitespace-nowrap"
                        key={`onDuty-${period}`}
                      >
                        {logs.onDutyHours[period]}
                      </td>
                    )
                  )}
                  {/* Calculate Total On Duty Hours */}
                  <td className="p-2 border whitespace-nowrap">
                    {Object.values(logs.onDutyHours).reduce(
                      (sum, hours) => sum + hours,
                      0
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Status Message */}
        {logs && logs.isBelowAverage && (
          <p className="text-red-500 mt-2">{statusMessage}</p>
        )}

        {/* Signature Section */}
        <div className="mt-4">
          <label htmlFor="signature" className="block text-sm font-semibold">
            Driver's Signature:
          </label>
          <input
            id="signature"
            type="text"
            className="w-full p-2 border mt-1 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter your name to sign"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
          />
        </div>
      </div>
      <DownloadShare />
    </div>
  );
};

export default DriverLogs;
