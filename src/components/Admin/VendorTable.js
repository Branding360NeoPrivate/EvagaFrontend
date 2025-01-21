import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaFilter, FaSort } from "react-icons/fa";
import AdminVendorTableModal from "./AdminVendorTableModal";
import { fetchAllVendorsWithProfileStatusAndService } from "../../context/redux/slices/adminActionsSlice";
import { Pagination, Stack } from "@mui/material";

const VendorTable = ({ onMenuSelect, selectedVendor, setSelectedVendor }) => {
  const style={

      '& .Mui-selected': {
        backgroundColor: '#6A1B9A !important',
        color: 'white',
      },

    

  }
  const dispatch = useDispatch();
  const { vendors, totalNumberOfVendors, status, error } = useSelector(
    (state) => state.adminActions
  );
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility

  // Fetch vendor data from Redux store
  useEffect(() => {
    dispatch(fetchAllVendorsWithProfileStatusAndService());
  }, [dispatch]);

  // Open modal with vendor details
  const handleViewDetails = (vendor) => {
    setSelectedVendor(vendor);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVendor(null);
  };
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const itemsPerPage = 10;

  // Update the total pages count whenever the product array changes
  useEffect(() => {
    setCount(Math.ceil(vendors?.length / itemsPerPage)); // Use Math.ceil for better accuracy
  }, [vendors]);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (status === "loading") {
    return <div className="text-center py-10">Loading vendor data...</div>;
  }

  if (status === "failed") {
    return <div className="text-center py-10">Error: {error}</div>;
  }
  return (
    <div className="w-full px-6 py-4 bg-white shadow-md rounded-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Vendors</h2>
        <div className="flex gap-4 items-center">
          <button
            className="flex items-center gap-2 bg-primary
           text-white px-4 py-2 rounded-lg hover:bg-highlightYellowPrimary hover:text-primary"
          >
            <FaFilter />
            Filter
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-highlightYellowPrimary hover:text-primary">
            <FaSort />
            Sort By
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full ">
          <thead className="  ">
            <tr className="bg-primary text-white">
              <th className=" font-normal  px-4 py-2 rounded-s-md">No</th>
              <th className="font-normal px-4 py-2">Name of Vendor</th>
              <th className="font-normal px-4 py-2">Category</th>
              <th className="font-normal px-4 py-2">Profile Status</th>
              <th className="font-normal px-4 py-2">Contact Number</th>
              <th className="font-normal px-4 py-2">No. of Services</th>
              <th className="font-normal px-4 py-2 rounded-e-md">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors
              ?.slice((page - 1) * 10, (page - 1) * 10 + 10)
              .map((vendor, index) => (
                <tr key={index} className="text-center">
                  <td className="  px-4 py-2">{index + 1}</td>
                  <td className="  px-4 py-2">{vendor.name}</td>
                  <td className="  px-4 py-2">
                    {vendor?.businessDetails?.categoriesOfServices[0]
                      ?.category[0]?.name
                      ? `${
                          vendor.businessDetails.categoriesOfServices[0]
                            .category[0].name
                        } + ${
                          vendor.businessDetails.categoriesOfServices.length - 1
                        }`
                      : "Not Available"}
                  </td>
                  <td
                    className={`  px-4 py-2 font-medium ${
                      vendor.profileCompletion === 100
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {vendor.profileCompletion === 100
                      ? "Complete"
                      : "Incomplete"}
                  </td>
                  <td className="  px-4 py-2">{vendor.phoneNumber}</td>
                  <td className="  px-4 py-2">{vendor.numberOfServices}</td>
                  <td className="  px-4 py-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleViewDetails(vendor)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex items-center justify-center w-full py-3">
          <Stack spacing={2}>
            <Pagination
              count={count}
              page={page}
              onChange={handlePageChange}
              sx={style}
            />
          </Stack>
        </div>
      </div>

      {/* CustomModal for Viewing Vendor Details */}
      <AdminVendorTableModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title=""
      >
        {selectedVendor && (
          <div className=" flex justify-center items-center gap-5">
            <button
              className=" btn-primary"
              onClick={(e) => {
                e.preventDefault();
                onMenuSelect("vendorServiceAccess");
              }}
            >
              Vendor Services
            </button>
            <button
              className=" btn-primary"
              onClick={(e) => {
                e.preventDefault();
                onMenuSelect("VendorDocumentVerification");
              }}
            >
              Document Verification
            </button>
          </div>
        )}
      </AdminVendorTableModal>
    </div>
  );
};

export default VendorTable;
