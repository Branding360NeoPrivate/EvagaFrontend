import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { internalRoutes } from "../../utils/internalRoutes";
import logo from "../../assets/Temporary Images/Evaga Logo.png";

import { MdExitToApp } from "react-icons/md";
import { LiaLanguageSolid } from "react-icons/lia";
import { MdKeyboardArrowDown } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

import HomeSearchableCityDropdown from "../Inputs/HomeSearchableCityDropdown";
import HomeSearchBar from "../Inputs/HomeSearchBar";

const DynamicNav = () => {
  const { auth, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Define menus dynamically based on role
  const menuItems = [
    {
      label: "Services",
      path: internalRoutes.vendorDashboard,
      roles: ["vendor"],
    },
    {
      label: "Orders",
      path: internalRoutes.vendorOrders,
      roles: ["vendor"],
    },
    {
      label: "Support",
      path: internalRoutes.vendorSupport,
      roles: ["vendor"],
    },
    {
      label: "Community",
      path: internalRoutes.vendorCommunity,
      roles: ["vendor"],
    },
  ];

  const guestMenu = [
    { component: <HomeSearchableCityDropdown />, roles: [] },
    { component: <HomeSearchBar />, roles: [] },
  ];

  // Filter menu items based on role
  const filteredMenuItems = auth.isAuthenticated
    ? menuItems.filter((item) => item.roles.includes(auth.role))
    : guestMenu;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-purpleSecondary text-white shadow-lg w-full flex justify-between items-center flex-wrap px-4 md:px-10">
      <div className="flex items-center justify-between w-full md:w-auto py-3">
        {/* Brand */}
        <Link to="/" className="hover:text-gray-300">
          <img src={logo} alt="logo" className="w-[50px]" />
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button className="lg:hidden" onClick={toggleMobileMenu}>
          <GiHamburgerMenu className="text-3xl text-white" />
        </button>
      </div>

      {/* Desktop Menu Items */}
      <ul className="hidden lg:flex flex-row justify-start items-center gap-5 w-full md:w-auto">
        {filteredMenuItems.map((item, index) => (
          <div key={index}>
            {item.component ? (
              item.component
            ) : (
              <li>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `text-lg font-medium ${
                      isActive ? "text-white" : "text-[#FAFAFA4D]"
                    } hover:text-gray-300`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            )}
          </div>
        ))}
      </ul>

      <div className="hidden lg:flex items-center justify-center gap-5">
        <button className="flex items-center">
          <LiaLanguageSolid className="text-3xl text-white" />
          <MdKeyboardArrowDown />
        </button>
        {/* User Controls */}
        {auth.isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <Link to={`/${auth.role}/profile`}>
              <span className="text-lg font-medium capitalize">
                {auth.role}
              </span>
            </Link>
            <button
              onClick={logout}
              className="text-2xl text-white hover:text-red-500 font-bold"
            >
              <MdExitToApp />
            </button>
          </div>
        ) : (
          <button className="bg-highlightYellow max-w-[200px] w-[200px] px-6 py-3 text-primary font-semibold text-lg rounded-md">
            Sign In
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobileMenu}
        >
          <div
            className="fixed right-0 top-0 h-full w-3/4 bg-purpleSecondary text-white shadow-lg z-50 p-5 space-y-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="mb-5" onClick={closeMobileMenu}>
              <IoClose className="text-3xl text-white" />
            </button>
            <ul className="flex flex-col gap-5">
              {filteredMenuItems.map((item, index) => (
                <div key={index}>
                  {item.component ? (
                    item.component
                  ) : (
                    <li>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `text-lg font-medium ${
                            isActive ? "text-white" : "text-[#FAFAFA4D]"
                          } hover:text-gray-300`
                        }
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  )}
                </div>
              ))}
            </ul>
            <div className=" flex lg:hidden flex-col items-start justify-center gap-5">
              <button className="flex items-center">
                <LiaLanguageSolid className="text-3xl text-white" />
                <MdKeyboardArrowDown />
              </button>
              {/* User Controls */}
              {auth.isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link to={`/${auth.role}/profile`}>
                    <span className="text-lg font-medium capitalize">
                      {auth.role}
                    </span>
                  </Link>
                  <button
                    onClick={logout}
                    className="text-2xl text-white hover:text-red-500 font-bold"
                  >
                    <MdExitToApp />
                  </button>
                </div>
              ) : (
                <button className="bg-highlightYellow max-w-[200px] w-[200px] px-6 py-3 text-primary font-semibold text-lg rounded-md">
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default DynamicNav;
