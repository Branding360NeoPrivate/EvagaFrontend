import React, { useState } from "react";
import TableComponet from "../../utils/TableComponet";
import { FaEdit } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import ReusableModal from "../Modal/Modal";

function BannerTable() {
  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("addBanner");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const users = [
    {
      name: "John Doe",
      email: "john@example.com",
      phoneNumber: "123-456-7890",
      interestId: { interests: ["Music", "Sports"] },
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      phoneNumber: "987-654-3210",
      interestId: { interests: [] },
    },
  ];

  const columns = [
    { label: "No", key: "index", render: (_, i) => i + 1 },
    { label: "Banner", key: "name" },
    { label: "Banner For", key: "email" },
    { label: "category", key: "city", render: () => "N/A" },
    { label: "Status", key: "phoneNumber" },
    {
      label: "Action",
      key: "interests",
      render: () => (
        <div className="flex items-center justify-center gap-2">
          <CiEdit
            className="text-3xl font-semibold cursor-pointer text-textGray"
            onClick={()=>[handleOpen(),setModalType("editBanner")]}
          />
          <MdOutlineDelete
            className="text-3xl font-semibold cursor-pointer text-textGray"
            onClick={()=>[handleOpen(),setModalType("deleteBanner")]}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <TableComponet
        columns={columns}
        data={users}
        page={page}
        itemsPerPage={5}
        onPageChange={handlePageChange}
      />
      <ReusableModal
        open={open}
        onClose={handleClose}
        title={
          modalType === "addBanner"
            ? "Add Banner"
            : modalType === "editBanner"
            ? "Edit Banner"
            : modalType === "deleteBanner"
            ? "Delete Banner"
            : "Default Title"
        }
        description={"fgg"}
      />
    </div>
  );
}

export default BannerTable;
