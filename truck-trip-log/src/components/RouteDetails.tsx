
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdRemove } from 'react-icons/md';
import { RouteDetailsProps } from '../types-store/types';

const RouteDetails = ({ error, loading, fetchRoute, routeDistance, routeDuration, currentCycleUsed }: RouteDetailsProps) => {

  const [isExpanded, setIsExpanded] = useState(true); // State to handle route information toggle visibility

  //Function for Distance Handling
  const formatDistance = (distance: number | null) => {
    if (distance === null) return "No results found!";
    return distance < 1000 ? `${distance.toFixed(2)} meter${distance > 1 ? "s" : ""}` : `${(distance / 1000).toFixed(2)} km`;
  };

  // Function for Duration Handling
  const formatDuration = (duration: number | null) => {
    if (duration === null) return "No results found!";

    // Handling duration in seconds, minutes, hours, and days
    const days = Math.floor(duration / 86400); // Number of days (86400 seconds in a day)
    const hours = Math.floor((duration % 86400) / 3600); // Remaining hours
    const minutes = Math.floor((duration % 3600) / 60); // Remaining minutes
    const seconds = Math.round(duration % 60); // Remaining seconds

    // Formatting the duration output based on the days, hours, minutes, and seconds
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ${seconds} second${seconds > 1 ? 's' : ''}`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''}`;
    }
  };

  // Function for expanding or collapsing route information section
  const toggleExpanded = () => {
    setIsExpanded(prevState => !prevState);
  };

  return ( 
    <>
      {/* Display route information */}
      <div className={`absolute top-8 right-1 sm:right-2 z-[1000] p-1 sm:p-2 bg-slate-100 dark:bg-gray-800 rounded-lg shadow-lg transition-all ${isExpanded ? "h-auto" : "h-7 sm:h-9 overflow-hidden"}`}>
        <h3 className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-white mb-1 flex justify-between items-center">
          Route Information
          <button
            onClick={toggleExpanded}
            className="text-xs text-gray-600 cursor-pointer dark:text-white hover:text-gray-800 dark:hover:text-gray-200 transition-all transform hover:scale-110"
            title={isExpanded ? "Collapse section" : "Expand section"}
          >
            {isExpanded ? (
              <MdRemove className="text-xl transition-all duration-200" />
            ) : (
              <MdAdd className="text-xl transition-all duration-200" />
            )}
          </button>
        </h3>

        {/* Show loading spinner or error message */}
        <div className={`text-xs sm:text-xs font-medium text-gray-700 dark:text-gray-300 transition-all ${isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          {loading ? (
            <span className="text-yellow-500 flex items-center">
              <div className="animate-spin rounded-full border-t-2 border-yellow-500 h-4 w-4 mr-2"></div>
              Loading...
            </span>
          ) : error ? (
            <span className="text-red-500">{error}</span>
          ) : (
            <>
              <div className="text-[11px]"><strong>Distance: </strong>{formatDistance(routeDistance)}</div>
              <div className="text-[11px]"><strong>Duration: </strong>{formatDuration(routeDuration)}</div>
            </>
          )}
        </div>

        {/* Buttons for retry or viewing logs */}
        <div className={`transition-all flex flex-col justify-center ${isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          {error && (
            <button onClick={fetchRoute} className="mt-2 text-xs text-blue-700 hover:text-blue-400 underline transition-colors duration-300 cursor-pointer">
              Retry
            </button>
          )}

          {!loading && !error && (
            <Link 
            to={`/truck/eld-log/${currentCycleUsed}`}
            className=' flex justify-center' >
              <button className="mt-2 w-17 text-[11px] cursor-pointer font-semibold bg-green-500 hover:bg-green-400 transition-colors p-1 rounded">
                View Logs
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default RouteDetails;
