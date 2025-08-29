// Modal Component for error handling
const ErrorModal = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) => (
  <div className="fixed inset-0 flex items-center justify-center bg-slate-950/65 dark:bg-slate-50/65">
    <div className="p-2 sm:p-6 rounded-lg shadow-lg max-w-sm w-full max-sm:w-[90%] bg-white">
      <h2 className="text-xl text-red-600 font-semibold">Error</h2>
      <p className="text-sm text-red-500 mb-4">{message}</p>
      <div className="flex justify-end space-x-2">
        <button
          className="text-xs font-semibold text-white p-1 sm:px-4 sm:py-2 rounded-md 
                    bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600
                     hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800'} 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
          onClick={onRetry}
        >
          Retry
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-200 text-xs font-semibold text-gray-800 p-1 sm:px-4 sm:py-2 rounded-md transition-colors cursor-pointer"
          onClick={() => window.location.reload()} // You can reload the page or close modal
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

export default ErrorModal;
