import React, { useState } from "react";
import {
  FaHome,
  FaUsers,
  FaClipboardList,
  FaUserShield,
  FaHeadset,
  FaBars,
  FaAngleRight,
  FaAngleLeft,
} from "react-icons/fa";

import MainLogo from "../../assets/Temporary Images/Evaga Logo.png";

const AdminSideBar = ({ selectedMenu, onMenuSelect }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const menuItems = [
    { id: "Home", label: "Home", icon: <FaHome /> },
    { id: "Vendor", label: "Vendor", icon: <FaUsers /> },
    { id: "Client", label: "Client", icon: <FaClipboardList /> },
    { id: "AdminUsers", label: "Admin Users", icon: <FaUserShield /> },
    { id: "SupportCenter", label: "Support Center", icon: <FaHeadset /> },
  ];

  return (
    <div
      className={`bg-primary text-white ${
        isCollapsed ? "w-20" : "w-64"
      } h-full flex flex-col transition-width duration-300`}
    >
      {/* Toggle Button */}
      <button
        className="flex items-center justify-center p-4 hover:bg-purple-600 focus:outline-none"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <FaAngleRight /> : <FaAngleLeft />}
      </button>
      {/* Logo */}
      <div className="py-6 text-center pl-2 text-xl font-bold border-b border-purple-500">
        <img className="w-[40px] mx-auto" src={MainLogo} alt="Evaga" />
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col flex-grow">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`flex items-center px-6 py-4 text-left font-medium hover:bg-purple-600 focus:outline-none ${
              selectedMenu === item.id ? "bg-purple-600" : ""
            }`}
            onClick={() => onMenuSelect(item.id)}
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            {!isCollapsed && item.label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-purple-500">
        <button
          className="w-full flex items-center px-6 py-4 text-left text-white hover:bg-purple-600 focus:outline-none"
          onClick={() => alert("Logging out...")}
        >
          <span className="mr-3 text-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h10a1 1 0 011 1v2a1 1 0 11-2 0V5H5v10h8v-1a1 1 0 112 0v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm10.707 5.707a1 1 0 10-1.414-1.414L10 10.586 8.707 9.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l2-2z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          {!isCollapsed && "Log out"}
        </button>
      </div>
    </div>
  );
};

export default AdminSideBar;
