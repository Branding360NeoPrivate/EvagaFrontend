// src/components/AdminDashboard/AdminDashboard.jsx

import React, { useEffect, useState } from "react";
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

  const handleSearch = (e) => {
    setTerm(e.target.value);
  };
  useEffect(() => {
    if (
      !["Vendor", "vendorServiceAccess", "VendorDocumentVerification"].includes(
        selectedMenu
      )
    ) {
      setTerm("");
    }
  }, [selectedMenu]);

  useEffect(() => {
    if (selectedMenu === "Client") handleGetAllUser();
  }, [selectedMenu]);
  const componentToRender = [
    {
      selected: "vender",
      component: "",
    },
  ];

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
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={term}
              onChange={handleSearch}
              className="border border-gray-300 rounded-lg py-2 px-4 w-72 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <h3 className="text-lg font-medium text-gray-600">
            Hi, {details?.name || "Admin"}
          </h3>
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
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="p-4 bg-white shadow rounded-lg text-center">
                <h4 className="text-sm font-medium text-gray-500">
                  Total No. of User
                </h4>
                <p className="text-3xl font-bold text-gray-800">
                  {totalNumberOfUser}
                </p>
              </div>
              <div className="p-4 bg-white shadow rounded-lg text-center">
                <h4 className="text-sm font-medium text-gray-500">
                  Active User
                </h4>
                <p className="text-3xl font-bold text-gray-800">
                  {totalNumberOfUser}
                </p>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg">
              <UserTable
                onMenuSelect={handleMenuSelect}
                selectedVendor={selectedVendor}
                setSelectedVendor={handleVendorSelect}
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
        {selectedMenu === "Waitlist" && <WaitlistTable />}
        {selectedMenu === "New Orders" && <NewOrdertable />}
        {selectedMenu === "Confirmed Orders" && <ConfirmOrder />}
        {selectedMenu === "Ongoing Orders" && <OngoingOrder />}
        {selectedMenu === "Completed Orders" && <CompletedOrder />}
        {selectedMenu === "Cancelled Orders" && <CancelledOrder />}
        {selectedMenu === "Customer Query" && <CustomerQueryTable />}
        {selectedMenu === "Vendor Query" && <VendorQueryTable />}
        {selectedMenu === "All Services" && <AllVendorService />}
        {selectedMenu === "Admin Users" && <CreateSubAdmin />}
        {selectedMenu === "Vendor Reports" && <VendorReport />}
        {selectedMenu === "Customer Reports" && <CustomerReport />}
        {selectedMenu === "Booking Reports" && <BookingReports />}
        {selectedMenu === "Payment Financial Reports" && <PaymentFinancialReports />}
        {selectedMenu === "Home" && <AdminDashBoardchart />}
      </div>
    </div>
  );
};

export default AdminDashboard;
