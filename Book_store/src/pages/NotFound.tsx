import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  const homeClick = () => {
    navigate("/home");
  };
  return (
    <div className="flex items-center justify-center bg-gray-100 px-4 h-[110vh]">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-red-600 mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </p>
        <p className="text-gray-600 mb-6">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        <button
          onClick={homeClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 w-sm"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
