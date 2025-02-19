import React, { useState } from "react";
import TableComponet from "../../utils/TableComponet";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit, CiViewBoard } from "react-icons/ci";
import { formatDate } from "../../utils/formatDate";
import useServices from "../../hooks/useServices";
import orderApis from "../../services/orderApis";
import formatCurrency from "../../utils/formatCurrency";

function OngoingOrder() {
     const [page, setPage] = useState(1);
          const [allOrder,setAllOrder]=useState([])
          const getAllNewOrderApi=useServices(orderApis.getAllOngoingOrder)
          const handlePageChange = (event, value) => {
            setPage(value);
          };
          const columns = [
            { label: "No", key: "index", render: (_, i) => i + 1 },
            {
              label: "Order ID",
              key: "razorPayOrderId",
            },
            {
              label: "User Name",
              key: "userId?.name",
              render: (row) => row?.userId?.name,
            },
            {
              label: "Order Date",
              key: "createdAt",
              render: (row) => formatDate(row?.createdAt),
            },
            {
              label: "Amount",
              key: "totalAmount",
              render: (row) => formatCurrency(row?.totalAmount),
            },
            {
              label: "Status",
              key: "status",
              render: (row) => (row?.status),
            },
        
            {
              label: "Action",
              key: "interests",
              render: (row) => (
                <div className="flex items-center justify-center gap-2">
                  <CiViewBoard
                    className="text-3xl font-semibold cursor-pointer text-textGray"
                    // onClick={() => [
                    //   handleOpen(),
                    //   setModalType("viewGst"),
                    //   //   getOneCouponsHandle(row?._id),
                    // ]}
                  />
                  <CiEdit
                    className="text-3xl font-semibold cursor-pointer text-textGray"
                    // onClick={() => [
                    //   handleOpen(),
                    //   setModalType("editGst"),
                    //   //   getOneCouponsHandle(row?._id),
                    // ]}
                  />
                  <MdOutlineDelete
                    className="text-3xl font-semibold cursor-pointer text-textGray"
                    // onClick={() => [
                    //   handleOpen(),
                    //   setModalType("deleteGst"),
                    //   //   setCouponId(row?._id),
                    // ]}
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
      data={allOrder}
      page={page}
      itemsPerPage={10}
      onPageChange={handlePageChange}
    />
  </div>
  )
}

export default OngoingOrder