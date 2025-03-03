import React, { useEffect, useState } from "react";
import TableComponetWithApi from "../../utils/TableComponetWithApi";
import useServices from "../../hooks/useServices";
import adminActionsApi from "../../services/adminActionsApi";
import { FaArrowCircleDown } from "react-icons/fa";
import { render } from "@testing-library/react";
import formatCurrency from "../../utils/formatCurrency";

function CustomerReport() {
  const [allVendor, setAllVendor] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const getAllUsersWithOrderDetailsApi = useServices(
    adminActionsApi.getAllUsersWithOrderDetails
  );
  const getAllUsersWithOrderDetailsApihandle = async () => {
    const response = await getAllUsersWithOrderDetailsApi.callApi();
    setAllVendor(response ? response?.users : []);
    setTotalPages(response?.totalPages ?? 1);
  };
  useEffect(() => {
    getAllUsersWithOrderDetailsApihandle();
  }, []);
  const columns = [
    { label: "No", key: "index", render: (_, i) => i + 1 },
    {
      label: "User Name",
      key: "name",
    },
    {
      label: "Email & Phone Number",
      key: "Email & Phone Number",
      render: (row) => (
        <div>
          {row?.email}
          <br />
          {row?.phoneNumber}
        </div>
      ),
    },
    {
      label: "Total Booking",
      key: "totalOrders",
    },
    {
      label: "Total Amount Spent",
      key: "forType",
      render: (row) => formatCurrency(row?.totalAmount),
    },

    {
      label: "Action",
      key: "interests",
      render: (row) => (
        <div className="flex items-center justify-center gap-2">
          <FaArrowCircleDown
            className="text-3xl font-semibold cursor-pointer text-textGray"
            onClick={() => [
              // handleOpen(),
              // setModalType("editBanner"),
              // getOneBannerHandle(row?._id),
            ]}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      {" "}
      <div>
        {" "}
        <TableComponetWithApi
          columns={columns}
          data={allVendor}
          page={page}
          itemsPerPage={10}
          onPageChange={handlePageChange}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}

export default CustomerReport;
