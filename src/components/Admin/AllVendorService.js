import React, { useEffect, useState } from "react";
import TableComponet from "../../utils/TableComponet";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import useServices from "../../hooks/useServices";
import adminApi from "../../services/adminApi";
import useDebounce from "../../utils/useDebounce";
import adminActionsApi from "../../services/adminActionsApi";
import ReusableModal from "../Modal/Modal";

function AllVendorService() {
  const [page, setPage] = useState(1);
  const [allService, setAllService] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const GetAllVendorsPackageApi = useServices(
    adminActionsApi.GetAllVendorsPackage
  );
  const [modalType, setModalType] = useState("delete");
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [sortvalue, setSortValue] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const debounce = useDebounce(searchTerm);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const GetAllVendorsPackageApiHandle = async () => {
    const queryParams = {
      search: debounce || "",
      page: page || 1,
      sortOrder: sortvalue || "asc",
    };
    const response = await GetAllVendorsPackageApi.callApi(queryParams);

    setAllService(response ? response?.data : []);
    setTotalPages(response ? response?.totalPages : null);
  };

  useEffect(() => {
    GetAllVendorsPackageApiHandle();
  }, [page]);
  const columns = [
    { label: "No", key: "index", render: (_, i) => i + 1 },
    {
      label: "Vendor UserName",
      key: "userName",
    },
    {
      label: "Name of Service",
      key: "Title",
      render: (row) =>
        row?.services?.values?.Title ||
        row?.services?.values?.FoodTruckName ||
        row?.services?.values?.VenueName,
    },
    {
      label: "Category",
      key: "categoryName",
      render: (row) => row?.categoryName,
    },
    { label: "Sku Code", key: "forType", render: (row) => row?.services.sku },

    {
      label: "Status",
      key: "status",
      render: (row) => (row?.services.status === true ? "Active" : "Deactive"),
    },
    {
      label: "Action",
      key: "interests",
      render: (row) => (
        <div className="flex items-center justify-center gap-2">
          <CiEdit
            className="text-3xl font-semibold cursor-pointer text-textGray"
            onClick={() => [
              // handleOpen(),
              // setModalType("editBanner"),
              // getOneBannerHandle(row?._id),
            ]}
          />
          <MdOutlineDelete
            className="text-3xl font-semibold cursor-pointer text-textGray"
            onClick={() => [
              handleOpen(),
              setModalType("delete"),
              // setBannerId(row?._id),
            ]}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      {" "}
      <TableComponet
        columns={columns}
        data={allService}
        page={page}
        itemsPerPage={10}
        onPageChange={handlePageChange}
        totalCount={totalPages}
      />
      <ReusableModal
        open={open}
        onClose={handleClose}
        title={modalType === "delete" ? "Delete Service" : ""}
      >
        {modalType === "delete" && (
          <div className="flex items-center justify-center gap-3">
            <button className="btn-primary w-fit px-2">Archive</button>
            <button className="btn-primary w-fit px-2">Permanent Delete</button>
          </div>
        )}
      </ReusableModal>
    </div>
  );
}

export default AllVendorService;
