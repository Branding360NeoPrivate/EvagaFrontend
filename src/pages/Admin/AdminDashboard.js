// src/components/AdminDashboard/AdminDashboard.jsx

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminSideBar from "../../components/Admin/AdminSideBar";
import VendorTable from "../../components/Admin/VendorTable";
import { useAuth } from "../../context/AuthContext";
import { fetchAdminDetails } from "../../context/redux/slices/adminSlice";
import AdminDocumentsVerification from "../../components/Admin/AdminVendorDocumentsVerification";
import AdminVendorProfileViewer from "../../components/Admin/AdminVendorProfileViewer";
import VendorserviceTable from "../../components/Admin/VendorserviceTable";
import UserTable from "../../components/Admin/UserTable";
import useServices from "../../hooks/useServices";
import userApi from "../../services/userApi";
import {
  addUser,
  totalUserCount,
} from "../../context/redux/slices/adminActionsSlice";
import BannerTable from "../../components/Admin/BannerTable";
import CouponsTable from "../../components/Admin/CouponsTable";
import FeeBreakdownbyCategory from "../../components/Admin/FeeBreakdownbyCategory";
import GstTable from "../../components/Admin/GstTable";
import WaitlistTable from "../../components/Admin/waitlistTable";
import FeedbackForm from "../../components/Forms/FeedbackForm";
import FeedbackTable from "../../components/Admin/FeedbackTable";
import NewOrdertable from "../../components/Admin/NewOrdertable";
import ConfirmOrder from "../../components/Admin/ConfirmOrder";
import OngoingOrder from "../../components/Admin/OngoingOrder";
import CompletedOrder from "../../components/Admin/CompletedOrder";
import CancelledOrder from "../../components/Admin/CancelledOrder";
import CustomerQueryTable from "../../components/Admin/CustomerQueryTable";
import VendorQueryTable from "../../components/Admin/VendorQueryTable";
import AllVendorService from "../../components/Admin/AllVendorService";
import CreateSubAdmin from "../../components/Admin/CreateSubAdmin";
import VendorReport from "../../components/Admin/VendorReport";
import CustomerReport from "../../components/Admin/CustomerReport";
import BookingReports from "../../components/Admin/BookingReports";
import PaymentFinancialReports from "../../components/Admin/PaymentFinancialReports";
import AdminDashBoardchart from "../../components/Admin/AdminDashBoardchart";
import AdminBlog from "../../components/Admin/AdminBlog";
import AdminNewsLetter from "../../components/Admin/AdminNewsLetter";
import AdminErrorLogs from "../../components/Admin/AdminErrorLogs";
import { FaChevronDown, FaChevronUp, FaEye, FaEyeSlash } from "react-icons/fa";
import ReusableModal from "../../components/Modal/Modal";
import { useForm } from "react-hook-form";
const inputStyles =
  "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent";
const buttonStyles =
  "w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2";
const AdminDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("Home");
  const [selectedVendor, setSelectedVendor] = useState(null);
  const getUserData = useServices(userApi.getTotalUser);

  const { auth } = useAuth();
  const dispatch = useDispatch();
  const { details, status, error } = useSelector((state) => state.admin);
  const { totalNumberOfVendors, totalNumberOfUser } = useSelector(
    (state) => state.adminActions
  );

  const handleMenuSelect = (menu) => {
    sessionStorage.setItem("adminMenu", menu);
    setSelectedMenu(menu);
  };
  const handleGetAllUser = async () => {
    const response = await getUserData.callApi();
    dispatch(addUser(response?.data));
    dispatch(totalUserCount(response?.count));
  };
  const [term, setTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // Handle search input change
  const handleSearch = (e) => {
    setTerm(e.target.value);
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (
      !["Vendor", "vendorServiceAccess", "VendorDocumentVerification"].includes(
        selectedMenu
      )
    ) {
      setTerm("");
    }
  }, [selectedMenu]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // Add your password change logic here
  };
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const oldPassword = watch("oldPassword");
  const newPassword = watch("newPassword");

  // Custom validation for password complexity
  const validatePassword = (value) => {
    const hasAlphabet = /[a-zA-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    return (
      (hasAlphabet && hasNumber && hasSymbol) ||
      "Password must contain at least one alphabet, one number, and one symbol."
    );
  };
  useEffect(() => {
    const adminMenu = sessionStorage.getItem("adminMenu");
    if (adminMenu) {
      setSelectedMenu(adminMenu);
    }
  }, []);

  const handleVendorSelect = (vendor) => {
    setSelectedVendor(vendor);
    sessionStorage.setItem("selectedVendor", JSON.stringify(vendor));
  };

  useEffect(() => {
    const selectedVendorInSession = sessionStorage.getItem("selectedVendor");
    if (selectedVendorInSession) {
      setSelectedVendor(JSON.parse(selectedVendorInSession));
    }
  }, []);

  useEffect(() => {
    if (auth.userId) {
      dispatch(fetchAdminDetails(auth.userId));
    }
  }, [dispatch, auth.userId]);

  return (
    <div className="flex h-auto bg-gray-100">
      <AdminSideBar
        selectedMenu={selectedMenu}
        onMenuSelect={handleMenuSelect}
      />
      <div className="flex flex-col flex-grow p-6">
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-white py-2 px-2 z-40">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={term}
              onChange={handleSearch}
              className="border border-gray-300 rounded-lg py-2 px-4 w-72 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* Admin Name and Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <h3 className="text-lg font-medium text-gray-600">
                Hi, {details?.name || "Admin"}
              </h3>
              {/* Dropdown Icon */}
              {isDropdownOpen ? (
                <FaChevronUp className="text-gray-600" />
              ) : (
                <FaChevronDown className="text-gray-600" />
              )}
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                <button
                  onClick={() => {
                    handleOpen();
                    setIsDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Change Password
                </button>
              </div>
            )}
          </div>
        </div>

        {selectedMenu === "Vendor" && (
          <>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="p-4 bg-white shadow rounded-lg text-center">
                <h4 className="text-sm font-medium text-gray-500">
                  Total No. of vendors
                </h4>
                <p className="text-3xl font-bold text-gray-800">
                  {totalNumberOfVendors}
                </p>
              </div>
              <div className="p-4 bg-white shadow rounded-lg text-center">
                <h4 className="text-sm font-medium text-gray-500">
                  Active Vendors
                </h4>
                <p className="text-3xl font-bold text-gray-800">
                  {totalNumberOfVendors}
                </p>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg">
              <VendorTable
                onMenuSelect={handleMenuSelect}
                selectedVendor={selectedVendor}
                setSelectedVendor={handleVendorSelect}
                term={term}
              />
            </div>
          </>
        )}
        {selectedMenu === "VendorDocumentVerification" && (
          <div className="bg-white shadow rounded-lg">
            <AdminVendorProfileViewer
              vendorId={selectedVendor?._id}
              onMenuSelect={handleMenuSelect}
            />
          </div>
        )}

        {selectedMenu === "vendorServiceAccess" && (
          <div className="bg-white shadow rounded-lg">
            <VendorserviceTable
              onMenuSelect={handleMenuSelect}
              selectedVendor={selectedVendor}
              setSelectedVendor={handleVendorSelect}
              vendorId={selectedVendor?._id}
            />
          </div>
        )}
        {selectedMenu === "Client" && (
          <>
            <div className="bg-white shadow rounded-lg">
              <UserTable
                onMenuSelect={handleMenuSelect}
                selectedVendor={selectedVendor}
                setSelectedVendor={handleVendorSelect}
                term={term}
              />
            </div>
          </>
        )}
        {selectedMenu === "Banner" && <BannerTable />}
        {selectedMenu === "Coupons" && <CouponsTable />}
        {selectedMenu === "Fee Breakdown by Category" && (
          <FeeBreakdownbyCategory />
        )}
        {selectedMenu === "Gst by Category" && <GstTable />}
        {selectedMenu === "Feedback" && <FeedbackTable />}
        {selectedMenu === "Waitlist" && <WaitlistTable term={term}/>}
        {selectedMenu === "New Orders" && <NewOrdertable />}
        {selectedMenu === "Confirmed Orders" && <ConfirmOrder />}
        {selectedMenu === "Ongoing Orders" && <OngoingOrder />}
        {selectedMenu === "Completed Orders" && <CompletedOrder />}
        {selectedMenu === "Cancelled Orders" && <CancelledOrder />}
        {selectedMenu === "Customer Query" && <CustomerQueryTable />}
        {selectedMenu === "Vendor Query" && <VendorQueryTable />}
        {selectedMenu === "All Services" && <AllVendorService term={term} />}
        {selectedMenu === "Admin Users" && <CreateSubAdmin />}
        {selectedMenu === "Vendor Reports" && <VendorReport />}
        {selectedMenu === "Customer Reports" && <CustomerReport />}
        {selectedMenu === "Booking Reports" && <BookingReports />}
        {selectedMenu === "Payment Financial Reports" && (
          <PaymentFinancialReports />
        )}
        {selectedMenu === "Home" && <AdminDashBoardchart />}
        {selectedMenu === "Blog" && <AdminBlog />}
        {selectedMenu === "NewsLetter" && <AdminNewsLetter />}
        {selectedMenu === "Error Logs" && <AdminErrorLogs />}
      </div>
      <ReusableModal open={open} onClose={handleClose} width={"50%"}>
      <div className="max-w-ld mx-auto  p-6 bg-white rounded-lg ">
      <h2 className="text-2xl font-semibold text-primary mb-6">Change Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
      
        <div className="mb-4">
          <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
            Old Password
          </label>
          <div className="relative">
            <input
              type={showOldPassword ? "text" : "password"}
              id="oldPassword"
              {...register("oldPassword", {
                required: "Old Password is required.",
              })}
              className={inputStyles}
              placeholder="Enter your old password"
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showOldPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
            </button>
          </div>
          {errors.oldPassword && (
            <p className="text-sm text-red-500 mt-1">{errors.oldPassword.message}</p>
          )}
        </div>

        {/* New Password Field */}
        <div className="mb-6">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              {...register("newPassword", {
                required: "New Password is required.",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long.",
                },
                validate: {
                  passwordComplexity: validatePassword,
                  notSameAsOld: (value) =>
                    value !== oldPassword || "New password must not be the same as the old password.",
                },
              })}
              className={inputStyles}
              placeholder="Enter your new password"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showNewPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-sm text-red-500 mt-1">{errors.newPassword.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className={buttonStyles}>
          Change Password
        </button>
      </form>
    </div>
      </ReusableModal>
    </div>
  );
};

export default AdminDashboard;
