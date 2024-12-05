import { useState } from "react";
import { db } from "@/utils/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Navbar } from "./AdminDsPage";
import { Footer } from "@/components/Common/Footer";

const AddTicketForm = () => {
  const [ticketData, setTicketData] = useState({
    routeName: "",
    startStation: "",
    endStation: "",
    duration: "",
    distance: "",
    ticketTypes: [],
    metroName: "",
    availableTickets: 0,
    basePrice: 0,
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const routesRef = collection(db, "routes");
      await addDoc(routesRef, {
        ...ticketData,
        createdAt: Timestamp.now(),
      });
      alert("Route added successfully!");
      setTicketData({
        routeName: "",
        startStation: "",
        endStation: "",
        duration: "",
        distance: "",
        ticketTypes: [],
        metroName: "",
        availableTickets: 0,
        basePrice: 0,
      });
    } catch (error) {
      console.error("Error adding ticket:", error);
      alert("Error adding ticket.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-lg">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Add New Ticket
        </h3>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium">Route Name</label>
            <input
              type="text"
              name="routeName"
              value={ticketData.routeName}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Start Station</label>
            <input
              type="text"
              name="startStation"
              value={ticketData.startStation}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">End Station</label>
            <input
              type="text"
              name="endStation"
              value={ticketData.endStation}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Duration</label>
            <input
              type="text"
              name="duration"
              value={ticketData.duration}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Distance</label>
            <input
              type="number"
              name="distance"
              value={ticketData.distance}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">
              Ticket Types (comma separated)
            </label>
            <input
              placeholder="Economy, Business"
              type="text"
              name="ticketTypes"
              value={ticketData.ticketTypes.join(", ")}
              onChange={(e) =>
                setTicketData({
                  ...ticketData,
                  ticketTypes: e.target.value.split(","),
                })
              }
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Metro Name</label>
            <input
              type="text"
              name="metroName"
              value={ticketData.metroName}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">
              Available Tickets
            </label>
            <input
              type="number"
              name="availableTickets"
              value={ticketData.availableTickets}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Base Price</label>
            <input
              type="number"
              name="basePrice"
              value={ticketData.basePrice}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="col-span-2 text-center">
            <Button
              type="submit"
              className="bg-blue-500 text-white p-2 w-full rounded"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Ticket"}
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddTicketForm;
