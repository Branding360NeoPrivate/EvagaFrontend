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

const AdminDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("Home");
  const [selectedVendor, setSelectedVendor] = useState(null); // For modal data

  const { auth } = useAuth();
  const dispatch = useDispatch();
  const { details, status, error } = useSelector((state) => state.admin);
   const { totalNumberOfVendors, } = useSelector((state) => state.adminActions);

  const handleMenuSelect = (menu) => {
    sessionStorage.setItem("adminMenu", menu);
    setSelectedMenu(menu);
  };

  
  useEffect(() => {
    const adminMenu = sessionStorage.getItem("adminMenu");
    if (adminMenu) {
      setSelectedMenu(adminMenu);
    }
  }, []);

  const handleVendorSelect = (vendor) => {
    setSelectedVendor(vendor);
    // save the vendor in session storage
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
      {/* Sidebar */}
      <AdminSideBar
        selectedMenu={selectedMenu}
        onMenuSelect={handleMenuSelect}
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
        {selectedMenu === "Vendor" && (
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="p-4 bg-white shadow rounded-lg text-center">
              <h4 className="text-sm font-medium text-gray-500">
                Total No. of vendors
              </h4>
              <p className="text-3xl font-bold text-gray-800">{totalNumberOfVendors}</p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg text-center">
              <h4 className="text-sm font-medium text-gray-500">
                Active Vendors
              </h4>
              <p className="text-3xl font-bold text-gray-800">{totalNumberOfVendors}</p>
            </div>
          </div>
        )}
        {/* Main Table */}
        {selectedMenu === "Vendor" && (
          <div className="bg-white shadow rounded-lg">
            <VendorTable
              onMenuSelect={handleMenuSelect}
              selectedVendor={selectedVendor}
              setSelectedVendor={handleVendorSelect}
            />
          </div>
        )}
        {selectedMenu === "VendorDocumentVerification" && (
          <div className="bg-white shadow rounded-lg">
            <AdminVendorProfileViewer vendorId={selectedVendor?._id} />
          </div>
        )}
        {
         selectedMenu==="vendorServiceAccess"&&(
          <div className="bg-white shadow rounded-lg">
         
            <VendorserviceTable
            onMenuSelect={handleMenuSelect}
            selectedVendor={selectedVendor}
            setSelectedVendor={handleVendorSelect}
            vendorId={selectedVendor?._id}/>
          </div>
         )
        }
      </div>
    </div>
  );
};

export default AdminDashboard;
