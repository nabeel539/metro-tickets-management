import { useState, useEffect } from "react";
import { createBooking, fetchRoutes } from "../utils/firebaseUtils"; // Utility functions for interacting with Firestore
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BookingForm = () => {
  const userId = localStorage.getItem("userId");
  const [routes, setRoutes] = useState([]);
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [ticketType, setTicketType] = useState("Economy");
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [price, setPrice] = useState(0); // Price will be dynamically updated
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  // Fetch routes from Firestore
  useEffect(() => {
    const loadRoutes = async () => {
      try {
        const fetchedRoutes = await fetchRoutes();
        setRoutes(fetchedRoutes);
      } catch (error) {
        console.error("Error fetching routes:", error);
        toast.error("Failed to load routes.");
      }
    };
    loadRoutes();
  }, []);

  // Calculate the price based on selected ticket type, number of tickets, etc.
  useEffect(() => {
    const selectedRoute = routes.find(
      (route) =>
        route.startStation === fromStation && route.endStation === toStation
    );
    if (selectedRoute) {
      let basePrice = ticketType === "Economy" ? 10 : 20; // Example base price logic
      setPrice(basePrice * numberOfTickets); // Set price based on number of tickets and type
    }
  }, [fromStation, toStation, ticketType, numberOfTickets, routes]);

  const handleBooking = async () => {
    if (!userId) {
      alert("User is not logged in");
      return;
    }

    if (!fromStation || !toStation || !ticketType || !paymentMethod || !price) {
      toast.error("Please complete all fields!");
      return;
    }

    setLoading(true);

    const bookingData = {
      userId,
      fromStation,
      toStation,
      ticketType,
      numberOfTickets,
      paymentMethod,
      price,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    try {
      await createBooking(bookingData); // Create booking in Firestore
      alert("Ticket booked successfully!");
      navigate("/passenger-dashboard/bookings");

      // Reset the form
      setFromStation("");
      setToStation("");
      setTicketType("Economy");
      setNumberOfTickets(1);
      setPaymentMethod("");
      setPrice(0);
    } catch (error) {
      alert("Failed to book ticket!");
      console.error("Error booking ticket:", error);
    }

    setLoading(false);
  };

  return (
    <div>
      {/* Booking form UI */}
      <h2 className="text-2xl font-semibold mb-4">Book Your Ticket</h2>
      <form className="space-y-4">
        {/* Select inputs for fromStation, toStation, etc. */}
        <select
          value={fromStation}
          onChange={(e) => setFromStation(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">From Station</option>
          {routes.map((route) => (
            <option key={route.id} value={route.startStation}>
              {route.startStation}
            </option>
          ))}
        </select>

        <select
          value={toStation}
          onChange={(e) => setToStation(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">To Station</option>
          {routes
            .filter((route) => route.startStation === fromStation)
            .map((route) => (
              <option key={route.id} value={route.endStation}>
                {route.endStation}
              </option>
            ))}
        </select>

        <select
          value={ticketType}
          onChange={(e) => setTicketType(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="Economy">Economy</option>
          <option value="Business">Business</option>
        </select>

        <input
          type="number"
          value={numberOfTickets}
          onChange={(e) => setNumberOfTickets(e.target.value)}
          min="1"
          className="w-full p-2 border rounded-md"
        />

        <input
          type="text"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          placeholder="Payment Method"
          className="w-full p-2 border rounded-md"
        />

        <div className="font-bold text-lg">Price: ${price}</div>

        <button
          type="button"
          onClick={handleBooking}
          disabled={loading}
          className="w-full p-2 mt-4 bg-blue-600 text-white rounded-md"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
