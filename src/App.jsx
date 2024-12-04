import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthPage from "./pages/AuthPage";
import PassengerDashboard from "./pages/PassengerDashboard";
import ProfilePage from "./pages/Profile";
import BookingHistory from "./pages/BookingHistory";
import AdminDsPage from "./pages/AdminDsPage";
import BookingForm from "./pages/BookTickets";
import TicketsAdmin from "./pages/TicketsAdmin";
import ManagePassengers from "./pages/ManagePassengers";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* Auth Route */}
        <Route path="/" element={<AuthPage />} />

        {/* Passenger Routes */}

        <Route path="/passenger-dashboard" element={<PassengerDashboard />} />
        <Route path="/passenger-dashboard/profile" element={<ProfilePage />} />
        <Route
          path="/passenger-dashboard/bookings"
          element={<BookingHistory />}
        />
        <Route path="/passenger-dashboard/ticket" element={<BookingForm />} />

        {/* Admin Routes */}

        <Route path="/admin-dashboard" element={<AdminDsPage />} />
        <Route path="/admin-dashboard/tickets" element={<TicketsAdmin />} />
        <Route
          path="/admin-dashboard/passenger"
          element={<ManagePassengers />}
        />
        <Route path="/admin-dashboard" element={<AdminDsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
