import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (

    <div className="min-h-screen bg-pink-100 p-10">

      <h1 className="text-4xl font-bold">
        Welcome 🎉
      </h1>

      <br />

      <button
        className="bg-pink-600 text-white px-5 py-3 rounded-xl"
        onClick={logout}
      >
        Logout
      </button>

    </div>

  );

}