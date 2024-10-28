import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import ViewTickets from "./pages/ViewTickets";
import AddTicket from "./pages/AddTicket";
import BookingHistory from "./pages/BookingHistory";
import ManagePassengers from "./pages/ManagePassengers";
import AuthPage from "./pages/AuthPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PassengerDashboard from "./pages/PassengerDashboard";
import Profile from "./pages/Profile";
import TicketPricingCatalogue from "./components/PriceCatelogue";
import { useEffect } from "react";
import seedRoutes from "./data/routeSeeder";
import TicketBookingForm from "./pages/BookTickets";

function App() {
  useEffect(() => {
    // seedRoutes();
  });
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth Page for Admin and Passengers */}
          <Route path="/" element={<AuthPage />} />

          {/* Protected Routes for Admin */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard/view-tickets"
            element={
              <ProtectedRoute role="admin">
                <ViewTickets />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard/add-ticket"
            element={
              <ProtectedRoute role="admin">
                <AddTicket />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard/booking-history"
            element={
              <ProtectedRoute role="admin">
                <BookingHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard/manage-passengers"
            element={
              <ProtectedRoute role="admin">
                <ManagePassengers />
              </ProtectedRoute>
            }
          />

          {/* Protected Routes for Passenger */}
          <Route
            path="/passenger-dashboard"
            element={
              <ProtectedRoute role="passenger">
                {/* <TicketPurchaseForm /> */}
                <PassengerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/passenger-dashboard/profile"
            element={
              <ProtectedRoute role="passenger">
                {/* <TicketPurchaseForm /> */}
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/passenger-dashboard/price"
            element={
              <ProtectedRoute role="passenger">
                <TicketPricingCatalogue />
              </ProtectedRoute>
            }
          />
          <Route
            path="/passenger-dashboard/ticket"
            element={
              <ProtectedRoute role="passenger">
                <TicketBookingForm />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/passenger-dashboard/event-browse"
            element={
              <ProtectedRoute role="passenger">
                <EventBrowse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/passenger-dashboard/ticket-management"
            element={
              <ProtectedRoute role="passenger">
                <TicketManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/passenger-dashboard/profile"
            element={
              <ProtectedRoute role="passenger">
                <Profile />
              </ProtectedRoute>
            }
          /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
