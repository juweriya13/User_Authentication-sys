import {
  FaBell,
  FaSearch,
  FaMoon,
  FaUserCircle,
  FaBars,
} from "react-icons/fa";

export default function Topbar() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="bg-white rounded-2xl shadow-md px-8 py-2 flex items-center justify-between">

    {/* <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-2xl text-gray-700 hover:text-pink-600"
        >
          <FaBars />
        </button> */}
      {/* Left */}

      <div>
        <h2 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h2>

        <p className="text-gray-500 text-sm">
          {today}
        </p>
      </div>

      {/* Search */}

      <div className="relative w-[500px]">

        <FaSearch className="absolute left-4 top-4 text-gray-500" />

        <input
          type="text"
          placeholder="Search..."
          className="w-full py-2 pl-11 pr-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        <button className="text-2xl text-gray-500 hover:text-blue-600 transition">
          <FaMoon />
        </button>

        <button className="relative text-2xl text-gray-500 hover:text-blue-600 transition">

          <FaBell />

          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] flex justify-center items-center">
            3
          </span>

        </button>

        <div className="flex items-justify gap-3">

          <FaUserCircle className="text-4xl text-blue-400" />

          <div>

            <h3 className="font-semibold">
              Javeriya Khan
            </h3>

            <p className="text-gray-500 text-sm">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </header>
    
  );
}