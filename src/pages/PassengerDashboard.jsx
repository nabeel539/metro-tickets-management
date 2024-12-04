import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Common/Navbar";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Common/Footer";

const PassengerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
        <h1 className="text-3xl font-extrabold text-teal-600 mb-6">
          Passenger Dashboard
        </h1>

        <div className="w-full max-w-lg space-y-4">
          <Button
            onClick={() => navigate("profile")}
            className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-md"
          >
            View Profile
          </Button>

          <Button
            onClick={() => navigate("bookings")}
            className="w-full py-3 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-md"
          >
            My Bookings
          </Button>

          <Button
            onClick={() => navigate("ticket")}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md"
          >
            Book Ticket
          </Button>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PassengerDashboard;
