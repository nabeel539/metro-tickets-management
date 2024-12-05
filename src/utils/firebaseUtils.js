import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase";

// get routes
export const fetchRoutes = async () => {
  try {
    const routesCollection = collection(db, "routes");
    const routesSnapshot = await getDocs(routesCollection);
    const routes = routesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("myroutes", routes);

    return routes;
  } catch (error) {
    console.error("Error fetching routes:", error);
    throw error;
  }
};

// Add a booking to the Firestore
export const createBooking = async (bookingData) => {
  try {
    const bookingsCollection = collection(db, "bookings");
    const bookingRef = await addDoc(bookingsCollection, bookingData);
    console.log(bookingRef.id);
    return bookingRef.id;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

export const fetchUserBookings = async (userId) => {
  try {
    const bookingsCollection = collection(db, "bookings");
    const bookingsQuery = query(
      bookingsCollection,
      where("userId", "==", userId)
    );
    const bookingsSnapshot = await getDocs(bookingsQuery);
    const bookings = bookingsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return bookings;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    const bookingRef = doc(db, "bookings", bookingId);
    await updateDoc(bookingRef, {
      status: "canceled",
    });
  } catch (error) {
    console.error("Error canceling booking:", error);
    throw new Error("Failed to cancel booking.");
  }
};

export const updateAvailableTickets = async (routeId, ticketsBooked) => {
  // console.log("Updating available tickets");
  // console.log("Route ID:", routeId);
  // console.log("Tickets Booked:", ticketsBooked);

  try {
    const routeRef = doc(db, "routes", routeId);
    const routeSnapshot = await getDoc(routeRef);

    if (!routeSnapshot.exists()) {
      throw new Error("Route does not exist.");
    }

    const routeData = routeSnapshot.data();
    console.log("Route Data:", routeData);

    const currentAvailableTickets = routeData.availableTickets || 0;

    if (ticketsBooked > currentAvailableTickets) {
      throw new Error("Not enough tickets available.");
    }

    const updatedAvailableTickets = currentAvailableTickets - ticketsBooked;
    await updateDoc(routeRef, {
      availableTickets: updatedAvailableTickets,
    });

    console.log("Available tickets updated successfully.");
  } catch (error) {
    console.error("Failed to update available tickets:", error);
    throw error;
  }
};
