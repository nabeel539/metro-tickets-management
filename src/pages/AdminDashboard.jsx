import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800 text-white">
        <div className="p-4">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        </div>
        <nav className="mt-8">
          <ul>
            <li className="py-2 px-4 hover:bg-gray-700">
              <Link to="/admin-dashboard/view-tickets">View Tickets</Link>
            </li>
            <li className="py-2 px-4 hover:bg-gray-700">
              <Link to="/admin-dashboard/add-ticket">Add New Ticket</Link>
            </li>
            <li className="py-2 px-4 hover:bg-gray-700">
              <Link to="/admin-dashboard/booking-history">
                View Booking History
              </Link>
            </li>
            <li className="py-2 px-4 hover:bg-gray-700">
              <Link to="/admin-dashboard/manage-passengers">
                Manage Passengers
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-8">
        <h1 className="text-3xl font-bold">Welcome, Admin!</h1>
        <p className="mt-4">
          Choose an action from the sidebar to get started.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
