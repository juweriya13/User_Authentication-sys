import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/Dashboard/DashboardLayout";

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <DashboardLayout>

      <div className="space-y-6">

        <h1 className="text-4xl font-bold text-gray-800">
          Welcome To The Dashboard!
        </h1>

        <p className="text-gray-500">
          This is your dashboard page.
        </p>

        <button
          onClick={logout}
          className="bg-blue-300 hover:bg-blue-500 text-black px-6 py-3 rounded-2xl transition"
        >
          Logout
        </button>

      </div>

    </DashboardLayout>
  );
}