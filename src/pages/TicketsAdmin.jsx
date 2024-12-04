// import { useEffect, useState } from "react";
// import { collection, getDocs, query, deleteDoc, doc } from "firebase/firestore";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent } from "@/components/ui/sheet";
// import { db } from "@/utils/firebase";

// const TicketManagementPage = () => {
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedTicket, setSelectedTicket] = useState(null); // Track selected ticket
//   const [isSheetOpen, setIsSheetOpen] = useState(false); // Track sheet visibility

//   // Fetch tickets from Firebase
//   useEffect(() => {
//     const fetchTickets = async () => {
//       try {
//         const ticketsRef = collection(db, "bookings");
//         const q = query(ticketsRef);

//         const querySnapshot = await getDocs(q);
//         const ticketsData = querySnapshot.docs.map((doc) => ({
//           ...doc.data(),
//           id: doc.id, // Store document ID
//         }));

//         setTickets(ticketsData);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching tickets:", error);
//         setLoading(false);
//       }
//     };

//     fetchTickets();
//   }, []);

//   // Handle viewing ticket details
//   const handleViewTicket = (ticketId) => {
//     const ticket = tickets.find((t) => t.id === ticketId);
//     setSelectedTicket(ticket); // Set selected ticket data
//     setIsSheetOpen(true); // Open the sheet
//   };

//   // Handle deleting a ticket
//   const handleDeleteTicket = async (ticketId) => {
//     try {
//       await deleteDoc(doc(db, "bookings", ticketId)); // Delete ticket from Firestore
//       setTickets(tickets.filter((ticket) => ticket.id !== ticketId)); // Remove ticket from local state
//       setIsSheetOpen(false); // Close the sheet after deletion
//       alert("Ticket deleted successfully.");
//     } catch (error) {
//       console.error("Error deleting ticket:", error);
//       alert("Error deleting ticket.");
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-xl font-semibold mb-4">Available Tickets</h2>
//       {loading ? (
//         <p>Loading tickets...</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200">
//             <thead>
//               <tr>
//                 <th className="p-2 border-b">Ticket Type</th>
//                 <th className="p-2 border-b">From Station</th>
//                 <th className="p-2 border-b">To Station</th>
//                 <th className="p-2 border-b">Price</th>
//                 <th className="p-2 border-b">Number of Tickets</th>
//                 <th className="p-2 border-b">Payment Method</th>
//                 <th className="p-2 border-b">Status</th>
//                 <th className="p-2 border-b">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tickets.map((ticket) => (
//                 <tr key={ticket.id}>
//                   <td className="p-2 border-b">{ticket.ticketType}</td>
//                   <td className="p-2 border-b">{ticket.fromStation}</td>
//                   <td className="p-2 border-b">{ticket.toStation}</td>
//                   <td className="p-2 border-b">${ticket.price}</td>
//                   <td className="p-2 border-b">{ticket.numberOfTickets}</td>
//                   <td className="p-2 border-b">{ticket.paymentMethod}</td>
//                   <td className="p-2 border-b">{ticket.status}</td>
//                   <td className="p-2 border-b">
//                     <Button
//                       onClick={() => handleViewTicket(ticket.id)}
//                       className="bg-blue-500 text-white"
//                     >
//                       View Details
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Shadcn UI Sheet for Ticket Details */}
//       {selectedTicket && (
//         <Sheet open={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
//           <SheetContent>
//             <div className="p-4">
//               <h3 className="text-xl font-semibold mb-4">Ticket Details</h3>
//               <div className="mb-4">
//                 <strong>Ticket Type:</strong> {selectedTicket.ticketType}
//               </div>
//               <div className="mb-4">
//                 <strong>From Station:</strong> {selectedTicket.fromStation}
//               </div>
//               <div className="mb-4">
//                 <strong>To Station:</strong> {selectedTicket.toStation}
//               </div>
//               <div className="mb-4">
//                 <strong>Price:</strong> ${selectedTicket.price}
//               </div>
//               <div className="mb-4">
//                 <strong>Number of Tickets:</strong>{" "}
//                 {selectedTicket.numberOfTickets}
//               </div>
//               <div className="mb-4">
//                 <strong>Payment Method:</strong> {selectedTicket.paymentMethod}
//               </div>

//               {/* Passenger details (if available) */}
//               <div className="mb-4">
//                 <strong>Passenger Details:</strong>
//                 <div className="ml-4">
//                   <p>
//                     <strong>Name:</strong> {selectedTicket.passengerName}
//                   </p>
//                   <p>
//                     <strong>Email:</strong> {selectedTicket.passengerEmail}
//                   </p>
//                   {/* Add more fields if necessary */}
//                 </div>
//               </div>

//               <Button
//                 onClick={() => handleDeleteTicket(selectedTicket.id)}
//                 className="bg-red-500 text-white text-[12px] mr-5"
//               >
//                 Delete
//               </Button>

//               <Button
//                 className="mt-4 bg-gray-500 text-white"
//                 onClick={() => setIsSheetOpen(false)}
//               >
//                 Close
//               </Button>
//             </div>
//           </SheetContent>
//         </Sheet>
//       )}
//     </div>
//   );
// };

// export default TicketManagementPage;
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "@/utils/firebase";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const TicketManagementPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null); // Track selected ticket
  const [isSheetOpen, setIsSheetOpen] = useState(false); // Track sheet visibility

  // Fetch tickets from Firebase
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const ticketsRef = collection(db, "bookings");
        const q = query(ticketsRef);

        const querySnapshot = await getDocs(q);
        const ticketsData = [];

        for (const docSnapshot of querySnapshot.docs) {
          const ticketData = { ...docSnapshot.data(), id: docSnapshot.id };

          // Fetch the corresponding user data using userId
          const userDocRef = doc(db, "users", ticketData.userId);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            ticketData.passengerName = userData.name;
            ticketData.passengerEmail = userData.email;
          }

          ticketsData.push(ticketData);
        }

        setTickets(ticketsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // Handle viewing ticket details
  const handleViewTicket = (ticketId) => {
    const ticket = tickets.find((t) => t.id === ticketId);
    setSelectedTicket(ticket); // Set selected ticket data
    setIsSheetOpen(true); // Open the sheet
  };

  // Handle deleting a ticket
  const handleDeleteTicket = async (ticketId) => {
    try {
      await deleteDoc(doc(db, "bookings", ticketId)); // Delete ticket from Firestore
      setTickets(tickets.filter((ticket) => ticket.id !== ticketId)); // Remove ticket from local state
      setIsSheetOpen(false); // Close the sheet after deletion
      alert("Ticket deleted successfully.");
    } catch (error) {
      console.error("Error deleting ticket:", error);
      alert("Error deleting ticket.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Available Tickets</h2>
      {loading ? (
        <p>Loading tickets...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="p-2 border-b">Ticket Type</th>
                <th className="p-2 border-b">From Station</th>
                <th className="p-2 border-b">To Station</th>
                <th className="p-2 border-b">Price</th>
                <th className="p-2 border-b">Number of Tickets</th>
                <th className="p-2 border-b">Price</th>
                <th className="p-2 border-b">Payment Method</th>
                <th className="p-2 border-b">Status</th>
                <th className="p-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td className="p-2 border-b">{ticket.ticketType}</td>
                  <td className="p-2 border-b">{ticket.fromStation}</td>
                  <td className="p-2 border-b">{ticket.toStation}</td>
                  <td className="p-2 border-b">${ticket.price}</td>
                  <td className="p-2 border-b">{ticket.numberOfTickets}</td>
                  <td className="p-2 border-b">{ticket.price}</td>
                  <td className="p-2 border-b">{ticket.paymentMethod}</td>
                  <td className="p-2 border-b">{ticket.status}</td>
                  <td className="p-2 border-b">
                    <Button
                      onClick={() => handleViewTicket(ticket.id)}
                      className="bg-blue-500 text-white"
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Shadcn UI Sheet for Ticket Details */}
      {selectedTicket && (
        <Sheet open={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
          <SheetContent>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-4">Ticket Details</h3>
              <div className="mb-4">
                <strong>Ticket Type:</strong> {selectedTicket.ticketType}
              </div>
              <div className="mb-4">
                <strong>From Station:</strong> {selectedTicket.fromStation}
              </div>
              <div className="mb-4">
                <strong>To Station:</strong> {selectedTicket.toStation}
              </div>
              <div className="mb-4">
                <strong>Price:</strong> ${selectedTicket.price}
              </div>
              <div className="mb-4">
                <strong>Number of Tickets:</strong>{" "}
                {selectedTicket.numberOfTickets}
              </div>
              <div className="mb-4">
                <strong>Payment Method:</strong> {selectedTicket.paymentMethod}
              </div>

              {/* Passenger details (if available) */}
              <div className="mb-4">
                <strong>Passenger Details:</strong>
                <div className="ml-4">
                  <p>
                    <strong>Name:</strong> {selectedTicket.passengerName}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedTicket.passengerEmail}
                  </p>
                </div>
              </div>

              <Button
                onClick={() => handleDeleteTicket(selectedTicket.id)}
                className="bg-red-500 text-white text-[12px] mr-5"
              >
                Delete
              </Button>

              <Button
                className="mt-4 bg-gray-500 text-white"
                onClick={() => setIsSheetOpen(false)}
              >
                Close
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default TicketManagementPage;
