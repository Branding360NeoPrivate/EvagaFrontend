import React, { useState } from "react";
import TableComponet from "../../utils/TableComponet";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

function AllVendorService() {
  const [page, setPage] = useState(1);
  const [allService, setAllService] = useState([]);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
    const columns = [
      { label: "No", key: "index", render: (_, i) => i + 1 },
      {
        label: "Name of Service",
        key: "BannerUrl",
     
      },
      { label: "Category", key: "forType" },
      { label: "Sku Code", key: "forType" },
  
      {
        label: "Status",
        key: "status",
        render: (row) => (row?.status === true ? "Active" : "Deactive"),
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
                // handleOpen(),
                // setModalType("deleteBanner"),
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
      />
    </div>
  );
}

export default AllVendorService;
