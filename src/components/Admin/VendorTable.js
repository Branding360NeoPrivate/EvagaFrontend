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
import { MdOutlineDelete } from "react-icons/md";
import ReusableModal from "../Modal/Modal";
import vendorApi from "../../services/vendorApi";
import { toast } from "react-toastify";
import DeleteForm from "./DeleteForm";
import DateRangePicker from "../../utils/DateRangePicker";

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
    const [vendorDetails, setVendorDetails] = useState(null);
    const [vendorId, setVendorId] = useState(null);
    const [profileStatus, setprofileStatus] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const getProfileApi = useServices(vendorApi.getProfile);
    const deleteAccountApi = useServices(vendorApi.deleteAccount);
    const updateVendorProfileStatusApi = useServices(
      vendorApi.updateVendorProfileStatus
    );
    const getProfileApiHandle = async (vendorId) => {
      const response = await getProfileApi.callApi(vendorId);
      setVendorDetails(response ? response?.vendor : null);
      setprofileStatus(response ? response?.vendor?.profileStatus : true);
    };
    const updateVendorProfileStatusHandle = async () => {
      const formdata = new FormData();
      formdata.append("venderID", vendorDetails?._id);
      formdata.append("profileStatus", profileStatus);
      const response = await updateVendorProfileStatusApi.callApi(formdata);
      if (response) {
        toast.success(response?.message);
      }
      handleClose();
    };
    const deleteAccountApiHandle = async (venderID) => {
      const response = await deleteAccountApi.callApi(venderID);
      if (response) {
        handleClose();
        handleSearchAndPageChangeHandle();
        toast.success(response?.message);
      }

      console.log(response);
    };
    const [modalType, setModalType] = useState("edit");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("All Vendors");
    const downloadVendorListing = useServices(
      adminActionsApi.downloadVendorListing
    );
    const downloadVendorsAsCSV = useServices(
      adminActionsApi.downloadVendorsAsCSV
    );
    const downloadVendorsAsCSVhandle = async (fromDate, toDate) => {
      const queryParams = {
        fromDate: fromDate || "",
        toDate: toDate || "",
      };
      try {
        const response = await downloadVendorsAsCSV.callApi(queryParams);
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
            <button
              onClick={() => [handleOpen(), setModalType("download")]}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-highlightYellowPrimary hover:text-primary"
            >
              Download
            </button>
          </div>
        </div>
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
                  <td className="  px-4 py-2">{vendor?.numberOfServices}</td>
                  <td className="  px-4 py-2">{vendor?.verifiedPackages}</td>
                  <td className="flex items-center gap-2  px-4 py-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleViewDetails(vendor)}
                    >
                      View
                    </button>
                    <button
                      onClick={() => [
                        handleOpen(),
                        setModalType("edit"),
                        getProfileApiHandle(vendor?._id),
                      ]}
                    >
                      <CiEdit />
                    </button>
                    <button
                      onClick={() => [
                        handleOpen(),
                        setModalType("delete"),
                        setVendorId(vendor?._id),
                      ]}
                    >
                      <MdOutlineDelete />
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
        <ReusableModal
          open={open}
          onClose={handleClose}
          title={
            modalType === "edit"
              ? "Edit Vendor Status"
              : modalType === "delete"
              ? "Delete Vendor"
              : modalType === "download"
              ? "Download Report"
              : ""
          }
          width={"50%"}
        >
          {modalType === "edit" && (
            <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-primary">
                Vendor Information
              </h2>

              {/* Vendor Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Vendor Name */}
                <div>
                  <label
                    htmlFor="vendor-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Vendor Name
                  </label>
                  <input
                    type="text"
                    id="vendor-name"
                    name="vendorName"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter vendor name"
                    value={vendorDetails?.name}
                    disabled
                  />
                </div>

                {/* Vendor Phone */}
                <div>
                  <label
                    htmlFor="vendor-phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="vendor-phone"
                    name="vendorPhone"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter phone number"
                    value={vendorDetails?.phoneNumber}
                    disabled
                  />
                </div>

                {/* Vendor Email */}
                <div>
                  <label
                    htmlFor="vendor-email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="vendor-email"
                    name="vendorEmail"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter email"
                    value={vendorDetails?.email}
                    disabled
                  />
                </div>

                {/* Vendor Alternative Number */}
                <div>
                  <label
                    htmlFor="alternative-number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Alternative Number
                  </label>
                  <input
                    type="text"
                    id="alternative-number"
                    name="alternativeNumber"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter alternative number"
                    value={vendorDetails?.alternatePhoneNumber}
                    disabled
                  />
                </div>
              </div>

              {/* Profile Status Dropdown */}
              <div className="mt-4">
                <label
                  htmlFor="profile-status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profile Status
                </label>
                <select
                  id="profile-status"
                  name="profileStatus"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={profileStatus}
                  onChange={(e) => setprofileStatus(e.target.value)}
                >
                  <option value={true}>Active</option>
                  <option value={false}>Deactive</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={(e) => [
                    e.preventDefault(),
                    updateVendorProfileStatusHandle(),
                  ]}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
          {modalType === "delete" && (
            <DeleteForm
              onDelete={() => deleteAccountApiHandle(vendorId)}
              deleteText="Vendor"
            />
          )}
          {modalType === "download" && (
            <div className="w-full flex items-center justify-center">
              <DateRangePicker onSearch={downloadVendorsAsCSVhandle} />
            </div>
          )}
        </ReusableModal>
      </div>
    );
  }
);

export default VendorTable;
