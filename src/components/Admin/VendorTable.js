import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaFilter, FaSort } from "react-icons/fa";
import AdminVendorTableModal from "./AdminVendorTableModal";
import { fetchAllVendorsWithProfileStatusAndService } from "../../context/redux/slices/adminActionsSlice";
import { Pagination, Stack } from "@mui/material";
import useDebounce from "../../utils/useDebounce";
import useServices from "../../hooks/useServices";
import adminActionsApi from "../../services/adminActionsApi";
import { CiEdit } from "react-icons/ci";

const VendorTable = memo(
  ({ onMenuSelect, selectedVendor, setSelectedVendor, term }) => {
    const style = {
      "& .Mui-selected": {
        backgroundColor: "#6A1B9A !important",
        color: "white",
      },
    };
    const dispatch = useDispatch();
    const debounce = useDebounce(term);
    const {
      vendors,
      totalNumberOfVendors,
      totalNumberOfPageVendor,
      status,
      error,
    } = useSelector((state) => state.adminActions);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("All Vendors");
    const downloadVendorListing = useServices(
      adminActionsApi.downloadVendorListing
    );
    const downloadVendorsAsCSV = useServices(
      adminActionsApi.downloadVendorsAsCSV
    );
    const downloadVendorsAsCSVhandle = async () => {
      try {
        const response = await downloadVendorsAsCSV.callApi(); // Adjust to your actual API call method
        if (response && response) {
          const blob = new Blob([response], { type: "text/csv" });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "vendors.csv"; // File name
          a.click();
          window.URL.revokeObjectURL(url);
        } else {
          console.error("No data received for CSV download");
        }
      } catch (error) {
        console.error("Error downloading CSV:", error);
      }
    };
    
    const handleFilterClick = () => {
      setShowFilter((prev) => !prev);
    };

    const handleFilterSelect = (filter) => {
      setSelectedFilter(filter);
      setShowFilter(false);
    };
    const handleViewDetails = (vendor) => {
      setSelectedVendor(vendor);
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
      setSelectedVendor(null);
    };
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);

    useEffect(() => {
      setCount(Math.ceil(totalNumberOfPageVendor));
    }, [vendors]);
    const handlePageChange = (event, value) => {
      setPage(value);
    };
    const handleSearchAndPageChangeHandle = () => {
      dispatch(
        fetchAllVendorsWithProfileStatusAndService({
          queryPage: page,
          searchTerm: debounce,
          filter: selectedFilter,
        })
      );
    };
    useEffect(() => {
      handleSearchAndPageChangeHandle();
    }, [dispatch, page, debounce, selectedFilter]);

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
            {/* Filter Button */}
            <div className="relative">
              <button
                onClick={handleFilterClick}
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-highlightYellowPrimary hover:text-primary"
              >
                <FaFilter />
                {selectedFilter}
              </button>

              {/* Dropdown */}
              {showFilter && (
                <div className="absolute top-full mt-2 left-0 w-48 bg-white shadow-lg rounded-lg border">
                  <ul className="divide-y divide-gray-200">
                    <li
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleFilterSelect("All Vendors")}
                    >
                      All Vendors
                    </li>
                    <li
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleFilterSelect("Verified Vendors")}
                    >
                      Verified Vendors
                    </li>
                    <li
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleFilterSelect("Registered Vendors")}
                    >
                      Registered Vendors
                    </li>
                  </ul>
                </div>
              )}
            </div>
            {/* Sort Button */}
            <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-highlightYellowPrimary hover:text-primary">
              <FaSort />
              Sort By
            </button>{" "}
            <button onClick={downloadVendorsAsCSVhandle} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-highlightYellowPrimary hover:text-primary">
              Download
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
                <th className="font-normal px-4 py-2">UserName</th>
                <th className="font-normal px-4 py-2">Category</th>
                <th className="font-normal px-4 py-2">Registration Status</th>
                <th className="font-normal px-4 py-2">Contact Number</th>
                <th className="font-normal px-4 py-2">No. of Listing</th>
                <th className="font-normal px-4 py-2">Verified Listing</th>
                <th className="font-normal px-4 py-2 rounded-e-md">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors?.map((vendor, index) => (
                <tr key={index} className="text-center">
                  <td className="  px-4 py-2">{index + 1}</td>
                  <td className="  px-4 py-2">{vendor.name}</td>
                  <td className="  px-4 py-2">{vendor.userName}</td>
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
                    {!vendor.verificationStatus ? (
                      <p>Pending</p>
                    ) : (
                      <p className="text-primary">Completed</p>
                    )}
                  </td>
                  <td className="  px-4 py-2">{vendor.phoneNumber}</td>
                  <td className="  px-4 py-2">{vendor.numberOfServices}</td>
                  <td className="  px-4 py-2">{vendor.verifiedPackages}</td>
                  <td className="flex items-center gap-2  px-4 py-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleViewDetails(vendor)}
                    >
                      View
                    </button>
                    <button><CiEdit /></button>
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
  }
);

export default VendorTable;
