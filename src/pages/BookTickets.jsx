/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// import { useState } from "react";
// import { db } from "../utils/firebase.js"; // Adjust the path to your Firebase config
// import { collection, addDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// const TicketBookingForm = ({ route, passenger }) => {
//   const { start, end, basePrice, classes, tripTypeModifier } = route;
//   const [numPassengers, setNumPassengers] = useState(1);
//   const [selectedClass, setSelectedClass] = useState("economy");
//   const [selectedTripType, setSelectedTripType] = useState("single");
//   const [paymentMethod, setPaymentMethod] = useState("cash");
//   const navigate = useNavigate();

//   // Calculate price based on number of passengers, travel class, and trip type
//   const calculateTotalPrice = () => {
//     const classMultiplier = classes[selectedClass];
//     const tripTypeMultiplier = tripTypeModifier[selectedTripType];
//     return basePrice * numPassengers * classMultiplier * tripTypeMultiplier;
//   };

//   const handleBooking = async () => {
//     const totalPrice = calculateTotalPrice();

//     const ticketData = {
//       passengerId: passenger.id, // Replace with the actual passenger ID
//       routeId: route.id, // Replace with the actual route ID
//       startStation: start,
//       endStation: end,
//       basePrice,
//       travelClass: selectedClass,
//       tripType: selectedTripType,
//       numPassengers,
//       totalPrice,
//       paymentMethod,
//       status: "Booked",
//       createdAt: new Date(),
//     };

//     try {
//       await addDoc(collection(db, "tickets"), ticketData);
//       alert("Ticket booked successfully!");
//       navigate("/passenger-dashboard"); // Redirect to dashboard or another relevant page
//     } catch (error) {
//       console.error("Error booking ticket:", error);
//       alert("Failed to book the ticket. Please try again.");
//     }
//   };

//   return (
//     <div className="p-6 border rounded-md shadow-md max-w-md mx-auto">
//       <h3 className="text-lg font-semibold mb-4">
//         {start} ➔ {end}
//       </h3>
//       <p>Base Price: ${basePrice.toFixed(2)}</p>

//       <div className="my-3">
//         <label>Number of Passengers:</label>
//         <input
//           type="number"
//           min="1"
//           value={numPassengers}
//           onChange={(e) => setNumPassengers(Number(e.target.value))}
//           className="ml-2 border rounded px-2 py-1"
//         />
//       </div>

//       <div className="my-3">
//         <label>Travel Class:</label>
//         <select
//           value={selectedClass}
//           onChange={(e) => setSelectedClass(e.target.value)}
//           className="ml-2 border rounded px-2 py-1"
//         >
//           {Object.keys(classes).map((className) => (
//             <option key={className} value={className}>
//               {className.charAt(0).toUpperCase() + className.slice(1)}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="my-3">
//         <label>Trip Type:</label>
//         <select
//           value={selectedTripType}
//           onChange={(e) => setSelectedTripType(e.target.value)}
//           className="ml-2 border rounded px-2 py-1"
//         >
//           {Object.keys(tripTypeModifier).map((tripType) => (
//             <option key={tripType} value={tripType}>
//               {tripType.charAt(0).toUpperCase() + tripType.slice(1)} Trip
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="my-3">
//         <label>Payment Method:</label>
//         <div className="flex items-center mt-2">
//           <input
//             type="radio"
//             id="cash"
//             value="cash"
//             checked={paymentMethod === "cash"}
//             onChange={() => setPaymentMethod("cash")}
//             className="mr-2"
//           />
//           <label htmlFor="cash">Cash</label>
//           <input
//             type="radio"
//             id="online"
//             value="online"
//             checked={paymentMethod === "online"}
//             onChange={() => setPaymentMethod("online")}
//             className="ml-4 mr-2"
//           />
//           <label htmlFor="online">Online</label>
//         </div>
//       </div>

//       <div className="mt-4 text-center">
//         <p className="text-xl font-semibold">
//           Total Price: ${calculateTotalPrice().toFixed(2)}
//         </p>
//       </div>

//       <button
//         onClick={handleBooking}
//         className="bg-blue-500 hover:bg-blue-600 text-white font-semibold mt-4 px-4 py-2 rounded w-full"
//       >
//         Book Ticket
//       </button>
//     </div>
//   );
// };

// export default TicketBookingForm;
import { useState } from "react";
import { db } from "../utils/firebase.js"; // Adjust the path to your Firebase config
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const TicketBookingForm = ({ route, passenger }) => {
  // Default values in case route is undefined or incomplete
  const {
    start = "Unknown Start",
    end = "Unknown End",
    basePrice = 0,
    classes = { economy: 1, business: 1.5 }, // Example values if classes are missing
    tripTypeModifier = { single: 1, round: 1.8 }, // Example values for trip types
  } = route || {}; // Ensure route has default values if undefined

  const [numPassengers, setNumPassengers] = useState(1);
  const [selectedClass, setSelectedClass] = useState("economy");
  const [selectedTripType, setSelectedTripType] = useState("single");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const navigate = useNavigate();

  // Calculate price based on number of passengers, travel class, and trip type
  const calculateTotalPrice = () => {
    const classMultiplier = classes[selectedClass] || 1;
    const tripTypeMultiplier = tripTypeModifier[selectedTripType] || 1;
    return basePrice * numPassengers * classMultiplier * tripTypeMultiplier;
  };

  const handleBooking = async () => {
    const totalPrice = calculateTotalPrice();

    const ticketData = {
      passengerId: passenger?.id || "Unknown Passenger",
      routeId: route?.id || "Unknown Route",
      startStation: start,
      endStation: end,
      basePrice,
      travelClass: selectedClass,
      tripType: selectedTripType,
      numPassengers,
      totalPrice,
      paymentMethod,
      status: "Booked",
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, "tickets"), ticketData);
      alert("Ticket booked successfully!");
      navigate("/passenger-dashboard");
    } catch (error) {
      console.error("Error booking ticket:", error);
      alert("Failed to book the ticket. Please try again.");
    }
  };

  return (
    <div className="p-6 border rounded-md shadow-md max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4">
        {start} ➔ {end}
      </h3>
      <p>Base Price: ${basePrice.toFixed(2)}</p>

      <div className="my-3">
        <label>Number of Passengers:</label>
        <input
          type="number"
          min="1"
          value={numPassengers}
          onChange={(e) => setNumPassengers(Number(e.target.value))}
          className="ml-2 border rounded px-2 py-1"
        />
      </div>

      <div className="my-3">
        <label>Travel Class:</label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="ml-2 border rounded px-2 py-1"
        >
          {Object.keys(classes).map((className) => (
            <option key={className} value={className}>
              {className.charAt(0).toUpperCase() + className.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="my-3">
        <label>Trip Type:</label>
        <select
          value={selectedTripType}
          onChange={(e) => setSelectedTripType(e.target.value)}
          className="ml-2 border rounded px-2 py-1"
        >
          {Object.keys(tripTypeModifier).map((tripType) => (
            <option key={tripType} value={tripType}>
              {tripType.charAt(0).toUpperCase() + tripType.slice(1)} Trip
            </option>
          ))}
        </select>
      </div>

      <div className="my-3">
        <label>Payment Method:</label>
        <div className="flex items-center mt-2">
          <input
            type="radio"
            id="cash"
            value="cash"
            checked={paymentMethod === "cash"}
            onChange={() => setPaymentMethod("cash")}
            className="mr-2"
          />
          <label htmlFor="cash">Cash</label>
          <input
            type="radio"
            id="online"
            value="online"
            checked={paymentMethod === "online"}
            onChange={() => setPaymentMethod("online")}
            className="ml-4 mr-2"
          />
          <label htmlFor="online">Online</label>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xl font-semibold">
          Total Price: ${calculateTotalPrice().toFixed(2)}
        </p>
      </div>

      <button
        onClick={handleBooking}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold mt-4 px-4 py-2 rounded w-full"
      >
        Book Ticket
      </button>
    </div>
  );
};

export default TicketBookingForm;
