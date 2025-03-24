import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DriverForm from './DriverForm';
import DriverLogs from './DriverLogs';
import { useDriverStore } from '../state-store/useDriverStore';

const ELDLogView = () => {
  const { cycleId } = useParams<{ cycleId: string }>();
  const { isFormSubmitted, setCycleIdHrs } = useDriverStore();

  // Sync cycleId from URL to Zustand state (optional based on use)
  useEffect(() => {
    if (cycleId) {
      setCycleIdHrs(cycleId);
    }
  }, [cycleId]);

  return (
    <div className="container mx-auto p-6 dark:bg-gray-900 dark:text-white">
      {!isFormSubmitted ? (
        <DriverForm />
      ) : (
        <DriverLogs />
      )}
    </div>
  );
};

export default ELDLogView;
