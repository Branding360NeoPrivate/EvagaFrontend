import React, { useEffect, useRef, useState } from "react";
import {
  FaHome,
  FaUsers,
  FaClipboardList,
  FaUserShield,
  FaHeadset,
  FaRegMoneyBillAlt,
  FaBorderAll,
  FaRegNewspaper,
} from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { RiCoupon3Line } from "react-icons/ri";
import MainLogo from "../../assets/Temporary Images/Evaga Logo.png";
import { TbBrandBlogger, TbReport } from "react-icons/tb";
import { useAuth } from "../../context/AuthContext";
import { BiMessageAltError } from "react-icons/bi";
import {
  FaChevronDown,
  FaChevronUp,
  FaFirstOrder,
  FaFirstOrderAlt,
  FaRegImage,
  FaWpforms,
} from "react-icons/fa6";
import { GrCompliance } from "react-icons/gr";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdAttachMoney,
  MdBorderClear,
  MdEventNote,
  MdOutlineFeed,
} from "react-icons/md";
import { LuMailQuestion } from "react-icons/lu";
import { IoArrowBackSharp } from "react-icons/io5";
import { IoMdArrowForward } from "react-icons/io";
const AdminSideBar = ({ selectedMenu, onMenuSelect }) => {
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = [
    { id: "Home", label: "Home", icon: <FaHome /> },
    {
      id: "User Management",
      label: "User Management",
      icon: <FaUsers />,
      children: [
        { id: "Vendor", label: "Vendor", icon: <FaUsers /> },
        { id: "Client", label: "Client", icon: <FaClipboardList /> },
        { id: "All Services", label: "All Services", icon: <MdEventNote /> },
        { id: "Waitlist", label: "Waitlist", icon: <MdOutlineFeed /> },
      ],
    },
    {
      id: "Website Management",
      label: "Website Management",
      icon: <FaRegMoneyBillAlt />,
      children: [
        { id: "Banner", label: "Banner", icon: <FaRegImage /> },
        { id: "Coupons", label: "Coupons", icon: <RiCoupon3Line /> },
        {
          id: "Fee Breakdown by Category",
          label: "Fee Breakdown by Category",
          icon: <FaRegMoneyBillAlt />,
        },
        {
          id: "Gst by Category",
          label: "GST by Category",
          icon: <MdAttachMoney />,
        },
      ],
    },
    {
      id: "Orders",
      label: "Orders",
      icon: <FaRegMoneyBillAlt />,
      children: [
        { id: "New Orders", label: "New Orders", icon: <FaBorderAll /> },
        {
          id: "Confirmed Orders",
          label: "Confirmed Orders",
          icon: <FaFirstOrder />,
        },
        {
          id: "Ongoing Orders",
          label: "Ongoing Orders",
          icon: <FaFirstOrderAlt />,
        },
        {
          id: "Completed Orders",
          label: "Completed Orders",
          icon: <GrCompliance />,
        },
        {
          id: "Cancelled Orders",
          label: "Cancelled Orders",
          icon: <MdBorderClear />,
        },
      ],
    },
    {
      id: "Reports",
      label: "Reports Center",
      icon: <TbReport />,
      children: [
        {
          id: "Vendor Reports",
          label: "Vendor Reports",
          icon: <FaBorderAll />,
        },
        {
          id: "Customer Reports",
          label: "Customer Reports",
          icon: <FaFirstOrder />,
        },
        {
          id: "Booking Reports",
          label: "Booking Reports",
          icon: <FaWpforms />,
        },
        {
          id: "Payment Financial Reports",
          label: "Payment Financial Reports",
          icon: <FaWpforms />,
        },
      ],
    },

    {
      id: "WriteSpace",
      label: "Write Space",
      icon: <TfiWrite />,
      children: [
        {
          id: "Blog",
          label: "Blog",
          icon: <TbBrandBlogger />,
        },
        {
          id: "NewsLetter",
          label: "News Letter",
          icon: <FaRegNewspaper />,
        },
      ],
    },
    {
      id: "SupportCenter",
      label: "Support Center",
      icon: <FaHeadset />,
      children: [
        {
          id: "Customer Query",
          label: "Customer Query",
          icon: <FaBorderAll />,
        },
        {
          id: "Vendor Query",
          label: "Vendor Query",
          icon: <FaFirstOrder />,
        },
        { id: "Feedback", label: "Feedback Form", icon: <FaWpforms /> },
      ],
    },
    { id: "Admin Users", label: "Roles", icon: <FaUserShield /> },
    { id: "Error Logs", label: "Error Logs", icon: <BiMessageAltError  /> },
  ];

  return (
    <div
      className={`bg-primary text-white sticky top-0 ${
        isCollapsed ? "w-20" : "min-w-64"
      } h-full min-h-[100vh] flex flex-col transition-width duration-300`}
    >
      <div className="py-6 text-center pl-2 text-xl font-bold border-b border-purple-500">
        <img className="w-[40px] mx-auto" src={MainLogo} alt="Evaga" />
      </div>
      <button
        className="flex items-center justify-center p-4 hover:bg-purple-600 focus:outline-none"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <IoMdArrowForward /> : <IoArrowBackSharp />}
      </button>

      {/* Menu Items */}
      <nav className="flex flex-col flex-grow" ref={dropdownRef}>
        {menuItems.map((item) =>
          item.children ? (
            <div className="w-full" key={item.id}>
              <button
                className={`w-full flex items-center justify-between px-6 py-4 text-left font-medium hover:bg-purple-600 focus:outline-none ${
                  selectedMenu === item.id || openDropdown === item.id
                    ? "bg-purple-600"
                    : ""
                }`}
                onClick={() => handleDropdownToggle(item.id)}
              >
                <div className="flex items-center">
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {!isCollapsed && item.label}
                </div>
                {!isCollapsed && (
                  <span className="ml-auto">
                    {openDropdown === item.id ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </span>
                )}
              </button>
              <AnimatePresence>
                {openDropdown === item.id && (
                  <motion.div
                    className="flex flex-col "
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.children.map((child) => (
                      <button
                        key={child.id}
                        className={`ml-2 my-1 flex items-center px-6 py-4 text-left font-medium hover:bg-purple-600 focus:outline-none ${
                          selectedMenu === child.id ? "bg-purple-600" : ""
                        }`}
                        onClick={() => onMenuSelect(child.id)}
                      >
                        <span className="mr-3 text-lg">{child.icon}</span>
                        {!isCollapsed && child.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
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
          )
        )}
      </nav>

      {/* Logout */}
      <div className="border-t border-purple-500">
        <button
          className="w-full flex items-center px-6 py-4 text-left text-white hover:bg-purple-600 focus:outline-none"
          onClick={logout}
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
