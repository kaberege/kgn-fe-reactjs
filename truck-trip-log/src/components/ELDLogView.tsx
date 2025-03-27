import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DriverForm from './DriverForm';
import DriverLogs from './DriverLogs';
import { useDriverStore } from '../state-store/useDriverStore';

const ELDLogView = () => {
  const { cycleId } = useParams<{ cycleId: string }>();
  const { isFormSubmitted, setCycleIdHrs } = useDriverStore();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Sync cycleId from URL to Zustand state
  useEffect(() => {
    if (cycleId) {
      setCycleIdHrs(cycleId);
    }
  }, [cycleId]);

  function handleSuccessMessage(): void {
    setSuccessMessage("Data submitted successfully!");

    // Hide the success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  }

  return (
    <div className="container relative mx-auto dark:bg-gray-900 dark:text-white">
      {!isFormSubmitted ? (
        <DriverForm handleSuccessMessage={handleSuccessMessage} />
      ) : (
        <DriverLogs />
      )}

      {/* Success Toast Message */}
      {successMessage && (
        <div className="absolute top-4 right-4 p-1 bg-green-500 text-white rounded-md shadow-md">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default ELDLogView;
