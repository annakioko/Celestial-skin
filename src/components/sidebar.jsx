import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaBoxes,
  FaUsers,
  FaUserPlus,
  FaEnvelope,
  FaMoon,
  FaSun,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const sidebarStyle = {
    backgroundColor: isDarkMode ? "#333" : "#A6603A",
    minHeight: "100vh",
    padding: "0px",
    color: isDarkMode ? "#FFF" : "#000",
  };

  return (
    <div style={sidebarStyle}>
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-3xl font-bold">Welcome back Admin</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul>
          <li className="mb-4">
            <a
              href="#"
              className="flex items-center p-2 hover:bg-gray-700 rounded"
            >
              <FaTachometerAlt className="mr-2" />
              Dashboard
            </a>
          </li>
          <li className="mb-4">
            <a
              href="#"
              className="flex items-center p-2 hover:bg-gray-700 rounded"
            >
              <FaBoxes className="mr-2" />
              Inventory
            </a>
          </li>
          <li className="mb-4">
            <a
              href="#"
              className="flex items-center p-2 hover:bg-gray-700 rounded"
            >
              <FaUsers className="mr-2" />
              Customers
            </a>
          </li>
          <li className="mb-4">
            <a
              href="#"
              className="flex items-center p-2 hover:bg-gray-700 rounded"
            >
              <FaUserPlus className="mr-2" />
              New Hire
            </a>
          </li>
          <li className="mb-4">
            <a
              href="#"
              className="flex items-center p-2 hover:bg-gray-700 rounded"
            >
              <FaEnvelope className="mr-2" />
              Messages
            </a>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={toggleTheme}
          className="flex items-center p-2 hover:bg-gray-700 rounded w-full"
        >
          {isDarkMode ? (
            <FaSun className="mr-2" />
          ) : (
            <FaMoon className="mr-2" />
          )}
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <button className="flex items-center p-2 hover:bg-gray-700 rounded w-full mt-2">
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
