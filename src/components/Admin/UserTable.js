import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaFilter, FaSort } from "react-icons/fa";
import AdminVendorTableModal from "./AdminVendorTableModal";
import { fetchAllVendorsWithProfileStatusAndService } from "../../context/redux/slices/adminActionsSlice";
import { Pagination, Stack } from "@mui/material";

const UserTable = ({ onMenuSelect, selectedVendor, setSelectedVendor }) => {
  const style = {
    "& .Mui-selected": {
      backgroundColor: "#6A1B9A !important",
      color: "white",
    },
  };
  const dispatch = useDispatch();
  const { users, totalNumberOfUser, status, error } = useSelector(
    (state) => state.adminActions
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    setCount(Math.ceil(users?.length / itemsPerPage));
  }, [users]);
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
              <th className="font-normal px-4 py-2">Name of Client</th>
              <th className="font-normal px-4 py-2">Email ID</th>
              <th className="font-normal px-4 py-2">Phone Number</th>
              <th className="font-normal px-4 py-2">City</th>
              <th className="font-normal px-4 py-2">Interests</th>
            </tr>
          </thead>
          <tbody>
            {users
              ?.slice((page - 1) * 10, (page - 1) * 10 + 10)
              .map((user, index) => (
                <tr key={index} className="text-center">
                  <td className="  px-4 py-2">{index + 1}</td>
                  <td className="  px-4 py-2">{user.name}</td>
                  <td className="  px-4 py-2">{user.email}</td>
                  <td className="  px-4 py-2">{user.phoneNumber}</td>
                  <td className="  px-4 py-2">N/A</td>
                  <td className="px-4 py-2">
                    {user.interestId?.interests &&
                    user.interestId.interests.length > 0
                      ? `${user.interestId.interests[0]}${
                          user.interestId.interests.length > 1
                            ? ` +${user.interestId.interests.length - 1}`
                            : ""
                        }`
                      : "No Interest"}
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
    </div>
  );
};

export default UserTable;
