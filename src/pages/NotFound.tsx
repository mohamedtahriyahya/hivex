
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-web3-dark-blue">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold gradient-text">404</h1>
        <p className="text-xl text-gray-400 mb-4">Page not found</p>
        <a href="/" className="px-6 py-2 bg-web3-purple hover:bg-web3-dark-purple text-white rounded-lg inline-block">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
