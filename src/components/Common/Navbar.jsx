import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/passenger-dashboard"
          className="text-xl font-bold text-teal-600"
        >
          Metro Tickets
        </Link>
        <div className="space-x-4">
          <Link
            to="/passenger-dashboard"
            className="text-gray-600 hover:text-teal-500"
          >
            Dashboard
          </Link>
          <Link to="/" className="text-gray-600 hover:text-teal-500">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};
