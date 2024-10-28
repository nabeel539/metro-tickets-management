import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./../utils/firebase"; // Import Firebase configuration

// Routes data
const routesData = [
  {
    routeId: "routeA-B",
    start: "Station A",
    end: "Station B",
    basePrice: 10.0,
    classes: {
      economy: 1.0,
      business: 1.5,
      firstClass: 2.0,
    },
    tripTypeModifier: {
      single: 1.0,
      roundTrip: 1.8,
    },
  },
  {
    routeId: "routeB-C",
    start: "Station B",
    end: "Station C",
    basePrice: 15.0,
    classes: {
      economy: 1.0,
      business: 1.5,
      firstClass: 2.0,
    },
    tripTypeModifier: {
      single: 1.0,
      roundTrip: 1.75,
    },
  },
  {
    routeId: "routeA-C",
    start: "Station A",
    end: "Station C",
    basePrice: 20.0,
    classes: {
      economy: 1.0,
      business: 1.6,
      firstClass: 2.1,
    },
    tripTypeModifier: {
      single: 1.0,
      roundTrip: 1.85,
    },
  },
];

// Function to seed the routes into Firestore
const seedRoutes = async () => {
  try {
    const routesCollection = collection(db, "routes");

    for (let route of routesData) {
      // Check if route with the same routeId already exists
      const routeQuery = query(
        routesCollection,
        where("routeId", "==", route.routeId)
      );
      const routeSnapshot = await getDocs(routeQuery);

      if (routeSnapshot.empty) {
        // If no existing route is found, add the new route
        await addDoc(routesCollection, route);
        console.log(`Route added: ${route.routeName}`);
      } else {
        console.log(`Route already exists: ${route.routeName}`);
      }
    }

    console.log("Route seeding completed!");
  } catch (error) {
    console.error("Error adding routes:", error);
  }
};

export default seedRoutes;
