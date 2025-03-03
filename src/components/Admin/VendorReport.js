import React, { useEffect, useState } from "react";
import TableComponetWithApi from "../../utils/TableComponetWithApi";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import useServices from "../../hooks/useServices";
import adminActionsApi from "../../services/adminActionsApi";
import { FaArrowCircleDown } from "react-icons/fa";

function VendorReport() {
  const [allVendor, setAllVendor] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const getAllVendorWithNumberOfServiceApi = useServices(
    adminActionsApi.getAllVendorWithNumberOfService
  );
  const getAllVendorWithNumberOfServiceHandle = async () => {
    const response = await getAllVendorWithNumberOfServiceApi.callApi();
    setAllVendor(response ? response?.vendors : []);
    console.log(response);
  };
  useEffect(() => {
    getAllVendorWithNumberOfServiceHandle();
  }, []);
  const columns = [
    { label: "No", key: "index", render: (_, i) => i + 1 },
    {
      label: "Vendor Name",
      key: "name",
    },
    {
      label: "UserName",
      key: "userName",
    },
    {
      label: "Numbers of Service",
      key: "numberOfServices",
    },
    {
      label: "Total Booking",
      key: "totalBookings",
    },
    {
      label: "Profile Status",
      key: "forType",
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
      <TableComponetWithApi
        columns={columns}
        data={allVendor}
        page={page}
        itemsPerPage={10}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
}

export default VendorReport;
