import { useNavigate } from "react-router-dom";

const PassengerDashboard = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => navigate("/passenger-dashboard/profile")}
        className="bg-teal-300"
      >
        Profile
      </button>
      <button
        onClick={() => navigate("/passenger-dashboard/price")}
        className="bg-slate-800"
      >
        Cateloge
      </button>
      <div>
        <button
          onClick={() => navigate("/passenger-dashboard/ticket")}
          className="bg-sky-700 mt-4"
        >
          Book Ticket
        </button>
      </div>
    </div>
  );
};

export default PassengerDashboard;
