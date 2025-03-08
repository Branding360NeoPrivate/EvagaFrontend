import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import TableComponetWithApi from "../../utils/TableComponetWithApi";

function AdminNewsLetter() {
  const [page, setPage] = useState(1);
  const [allNewLetter, setAllNewLetter] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const columns = [
    { label: "No", key: "index", render: (_, i) => i + 1 },
    {
      label: "Title",
      key: "title",
    },
    {
      label: "Short Desc",
      key: "Desc",
    },

    {
      label: "Action",
      key: "interests",
      render: (row) => (
        <div className="flex items-center justify-center gap-2">
          <button className="text-blue-600 hover:underline">View</button>
          <CiEdit className="text-3xl font-semibold cursor-pointer text-textGray" />
          <MdOutlineDelete className="text-3xl font-semibold cursor-pointer text-textGray" />
        </div>
      ),
    },
  ];
  return (
    <div>
    <button
        // onClick={() => [handleOpen(), setModalType("addCoupon")]}
        className="float-right btn-primary w-fit px-2 mb-2"
      >
        Add News Letter
      </button>
      <TableComponetWithApi
        columns={columns}
        data={allNewLetter}
        page={page}
        itemsPerPage={10}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
}

export default AdminNewsLetter;
