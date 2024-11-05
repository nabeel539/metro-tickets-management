// import { useNavigate } from "react-router-dom";

// const PassengerDashboard = () => {
//   const navigate = useNavigate();
//   return (
//     <div>
//       <button
//         onClick={() => navigate("/passenger-dashboard/profile")}
//         className="bg-teal-300"
//       >
//         Profile
//       </button>
//       <button
//         onClick={() => navigate("/passenger-dashboard/price")}
//         className="bg-slate-800"
//       >
//         Cateloge
//       </button>
//       <div>
//         <button
//           onClick={() => navigate("/passenger-dashboard/ticket")}
//           className="bg-sky-700 mt-4"
//         >
//           Book Ticket
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PassengerDashboard;
import { useNavigate } from "react-router-dom";

const PassengerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center p-6 space-y-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-teal-600 mb-6">
        Passenger Dashboard
      </h1>

      <div className="w-full max-w-md space-y-4">
        <button
          onClick={() => navigate("/passenger-dashboard/profile")}
          className="w-full py-3 bg-teal-400 text-white rounded-lg shadow-md hover:bg-teal-500 transition duration-200"
        >
          View Profile
        </button>

        <button
          onClick={() => navigate("/passenger-dashboard/price")}
          className="w-full py-3 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-900 transition duration-200"
        >
          Ticket Catalogue
        </button>

        <button
          onClick={() => navigate("/passenger-dashboard/ticket")}
          className="w-full py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
          Book Ticket
        </button>
      </div>
    </div>
  );
};

export default PassengerDashboard;
