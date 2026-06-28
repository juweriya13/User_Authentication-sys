import {
  FaHome,
  FaUserCircle,
  FaUsers,
  FaCog,
  FaAddressBook,
  FaLock,
  FaEdit,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const menu = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard",
    },
    {
      name: "Profile",
      icon: <FaUserCircle />,
      path: "/profile",
    },
    {
      name: "Edit Profile",
      icon: <FaEdit />,
      path: "/edit-profile",
    },
    {
      name: "Change Password",
      icon: <FaLock />,
      path: "/change-password",
    },
    {
      name: "Users",
      icon: <FaUsers />,
      path: "/users",
    },
    {
      name: "Contact",
      icon: <FaAddressBook />,
      path: "/contact",
    },
    {
      name: "Settings",
      icon: <FaCog />,
      path: "/settings",
    },
  ];

  return (
     
      <aside className="w-72 min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Logo */}

      {/* <div className="text-center py-4 border-b border-slate-700">

        <div className="text-xl">🔐</div>

        <h1 className="text-xl font-bold mt-2">
          Auth Portal
        </h1>

        <p className="text-slate-400 text-sm">
          Authentication System
        </p>

      </div> */}

      {/* User */}

      <div className="py-4 flex flex-col items-center border-b border-slate-700">

        <img
          src="https://ui-avatars.com/api/?name=User"
          className="w-20 h-20 rounded-full"
          alt="profile"
        />

        <h2 className="mt-1 font-semibold">
          Welcome
        </h2>

        <span className="text-green-400 text-sm">
          ● Online
        </span>

      </div>

      {/* Navigation */}

      <nav className="flex-1 mt-2 flex flex-col gap-1">

        {menu.map((item) => (

          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-1 px-6 py-4 transition-all duration-300
              ${
                isActive
                  ? "bg-blue-300"
                  : "hover:bg-slate-800"
              }`
            }
          >
            <span className="text-lg">
              {item.icon}
            </span>

            {item.name}

          </NavLink>

        ))}

      </nav>

      {/* Logout */}

      <div className="p-5">

        <button
          onClick={logout}
          className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg flex justify-center items-center gap-2 transition"
        >
          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </aside>
  );
}