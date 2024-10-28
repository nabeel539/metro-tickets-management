import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-blue-500 text-white p-4">
    <div className="container mx-auto flex justify-between">
      <h1 className="text-xl font-bold">Metro Ticket System</h1>
      <ul className="flex space-x-4">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/purchase-ticket">Purchase Ticket</Link>
        </li>
        <li>
          <Link to="/purchased-tickets">View Tickets</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
