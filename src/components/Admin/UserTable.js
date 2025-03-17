import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaFilter, FaSort } from "react-icons/fa";
import { Pagination, Stack } from "@mui/material";
import useServices from "../../hooks/useServices";
import userApi from "../../services/userApi";
import useDebounce from "../../utils/useDebounce";
import TableComponetWithApi from "../../utils/TableComponetWithApi";

const UserTable = ({
  onMenuSelect,
  selectedVendor,
  setSelectedVendor,
  term,
}) => {
  const style = {
    "& .Mui-selected": {
      backgroundColor: "#6A1B9A !important",
      color: "white",
    },
  };
  const [users, setusers] = useState([]);
  const debounce = useDebounce(term);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUser, setTotalUser] = useState(0);
  const itemsPerPage = 10;
  const getUserData = useServices(userApi.getTotalUser);
  const handleGetAllUser = async () => {
    const queryParams = {
      search: debounce || "",
      page: page || 1,
      // sortOrder: sortvalue || "asc",
    };
    const response = await getUserData.callApi(queryParams);
    setusers(response ? response?.data : []);
    setTotalPages(response ? response?.totalPages : 1);
    setTotalUser(response ? response?.totalUsers : 0);
  };
  useEffect(() => {
    handleGetAllUser();
  }, [page, debounce]);

  useEffect(() => {
    setCount(Math.ceil(users?.length / itemsPerPage));
  }, [users]);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const columns = [
    { label: "No", key: "index", render: (_, i) => i + 1 },
    {
      label: "Name of Client",
      key: "name",
    },
    {
      label: "Email ID",
      key: "email",
    },
    {
      label: "Phone Number",
      key: "phoneNumber",
    },
    { label: "City", key: "forType" },

    {
      label: "Interests",
      key: "packageStatus",
      render: (row) =>
        row.interestId?.interests && row.interestId.interests.length > 0
          ? `${row.interestId.interests[0]}${
              row.interestId.interests.length > 1
                ? ` +${row.interestId.interests.length - 1}`
                : ""
            }`
          : "No Interest",
    },
  ];
  return (
    <div className="w-full px-6 py-4 bg-white shadow-md rounded-lg">
           <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="p-4 bg-white shadow rounded-lg text-center">
                <h4 className="text-sm font-medium text-gray-500">
                  Total No. of User
                </h4>
                <p className="text-3xl font-bold text-gray-800">
                  {totalUser}
                </p>
              </div>
              <div className="p-4 bg-white shadow rounded-lg text-center">
                <h4 className="text-sm font-medium text-gray-500">
                  Active User
                </h4>
                <p className="text-3xl font-bold text-gray-800">
                {totalUser}
                </p>
              </div>
            </div>
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

      <TableComponetWithApi
        columns={columns}
        data={users}
        page={page}
        itemsPerPage={10}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
};

export default UserTable;
