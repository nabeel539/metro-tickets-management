/* eslint-disable react/prop-types */
import { fetchUserBookings, cancelBooking } from "@/utils/firebaseUtils"; // Import the cancelBooking function
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const loadBookings = async () => {
      if (userId) {
        try {
          const fetchedBookings = await fetchUserBookings(userId);
          setBookings(fetchedBookings);
        } catch (error) {
          console.error("Error fetching bookings:", error);
          toast.error("Failed to load bookings.");
        }
      }
    };

    loadBookings();
  }, [userId]);

  const handleCancelBooking = async (bookingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!confirmed) {
      return; // If the user cancels, do nothing
    }

    try {
      await cancelBooking(bookingId); // Update booking status to canceled in Firestore
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: "canceled" } // Update status locally
            : booking
        )
      );
      toast.success("Booking canceled successfully.");
    } catch (error) {
      console.error("Error canceling booking:", error);
      toast.error("Failed to cancel booking.");
    }
  };

  if (!bookings.length) {
    return <p>No bookings found.</p>;
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Your Previous Bookings</h3>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="p-4 border rounded-lg shadow-md flex flex-col space-y-2"
          >
            <p>
              <strong>From:</strong> {booking.fromStation}
            </p>
            <p>
              <strong>To:</strong> {booking.toStation}
            </p>
            <p>
              <strong>Ticket Type:</strong> {booking.ticketType}
            </p>
            <p>
              <strong>Number of Tickets:</strong> {booking.numberOfTickets}
            </p>
            <p>
              <strong>Price:</strong> ${booking.price}
            </p>
            <p>
              <strong>Status:</strong> {booking.status}
            </p>
            <p>
              <strong>Booking Date:</strong>{" "}
              {new Date(booking.createdAt).toLocaleDateString()}
            </p>
            {/* Render the Cancel button only if the booking is not already canceled */}
            {booking.status !== "canceled" && (
              <button
                onClick={() => handleCancelBooking(booking.id)}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Cancel Booking
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingHistory;
