import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex items-center justify-center py-24 bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg px-10 py-12 text-center max-w-md w-full">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="h-12 w-12 text-yellow-500" />
        </div>
        <h1 className="text-5xl font-extrabold text-gray-800 mb-2">404</h1>
        <p className="text-lg text-gray-600 mb-6">Oops! Page not found</p>
        <a
          href="/"
          className="inline-block px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
