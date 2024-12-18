// src/components/AdminDashboard/AdminDashboard.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminSideBar from "../../components/Admin/AdminSideBar";
import VendorTable from "../../components/Admin/VendorTable";
import { useAuth } from "../../context/AuthContext";
import { fetchAdminDetails } from "../../context/redux/slices/adminSlice";
import AdminDocumentsVerification from "../../components/Admin/AdminVendorDocumentsVerification";

const AdminDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("Home");
  const { auth } = useAuth();
  const dispatch = useDispatch();
  const { details, status, error } = useSelector((state) => state.admin);

  useEffect(() => {
    if (auth.userId) {
      dispatch(fetchAdminDetails(auth.userId));
    }
  }, [dispatch, auth.userId]);
  console.log("details in admin dashboard:", details);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSideBar
        selectedMenu={selectedMenu}
        onMenuSelect={setSelectedMenu}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-grow p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-lg py-2 px-4 w-72 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <h3 className="text-lg font-medium text-gray-600">
            Hi, {details?.name || "Admin"}
          </h3>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="p-4 bg-white shadow rounded-lg text-center">
            <h4 className="text-sm font-medium text-gray-500">
              Total No. of vendors
            </h4>
            <p className="text-3xl font-bold text-gray-800">7,001</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg text-center">
            <h4 className="text-sm font-medium text-gray-500">
              Active Vendors
            </h4>
            <p className="text-3xl font-bold text-gray-800">6,900</p>
          </div>
        </div>

        {/* Main Table */}
        {selectedMenu === "Vendor" && (
          <div className="bg-white shadow rounded-lg">
            <VendorTable onMenuSelect={setSelectedMenu} />
          </div>
        )}
        {selectedMenu === "VendorDocumentVerification" && (
          <div className="bg-white shadow rounded-lg">
            <AdminDocumentsVerification onMenuSelect={setSelectedMenu} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
