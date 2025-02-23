import React, { useEffect, useState } from "react";
import TableComponet from "../../utils/TableComponet";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit, CiViewBoard } from "react-icons/ci";
import { formatDate } from "../../utils/formatDate";
import useServices from "../../hooks/useServices";
import orderApis from "../../services/orderApis";
import formatCurrency from "../../utils/formatCurrency";
import ReusableModal from "../Modal/Modal";
const PriceBreakdown = ({
  totalPrice, // Base price for the user
  gstAmount, // GST amount paid by the user
  gstPercentage, // GST percentage for calculations
  platformFee, // Platform fee for the user
  platformGstAmount, // GST on the platform fee
  gatewayFeeRate, // Gateway fee rate for calculations
}) => {
  const vendorPrice = totalPrice * (1 - Number(gstPercentage) / 100);
  console.log(vendorPrice, totalPrice);

  const vendorGST = vendorPrice * (Number(gstPercentage) / 100);

  const adminGST = gstAmount - vendorGST;

  const gatewayFeesVendor =
    (totalPrice + platformFee + gstAmount) * gatewayFeeRate;
  const adminShare = platformFee + platformGstAmount + adminGST;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Price Breakdown</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">
              Category
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">User</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Vendor
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Evaga
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">
              Total Base Price
            </td>
            <td className="border border-gray-300 px-4 py-2">
              ₹{totalPrice?.toFixed(2)}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              ₹{vendorPrice?.toFixed(2)}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              ₹{(totalPrice - vendorPrice)?.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Total GST</td>
            <td className="border border-gray-300 px-4 py-2">
              ₹{gstAmount?.toFixed(2)}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              ₹{vendorGST?.toFixed(2)}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              ₹{adminGST?.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Platform Fees</td>
            <td className="border border-gray-300 px-4 py-2">
              ₹{platformFee?.toFixed(2)}
            </td>
            <td className="border border-gray-300 px-4 py-2">N/A</td>
            <td className="border border-gray-300 px-4 py-2">
              ₹{platformFee?.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">
              Platform Fees GST
            </td>
            <td className="border border-gray-300 px-4 py-2">
              ₹{platformGstAmount?.toFixed(2)}
            </td>
            <td className="border border-gray-300 px-4 py-2">N/A</td>
            <td className="border border-gray-300 px-4 py-2">
              ₹{platformGstAmount?.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Gateway Fees</td>
            <td className="border border-gray-300 px-4 py-2">N/A</td>
            <td className="border border-gray-300 px-4 py-2">
              ₹{gatewayFeesVendor?.toFixed(2)}
            </td>
            <td className="border border-gray-300 px-4 py-2">N/A</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border border-gray-300 px-4 py-2 font-bold">
              Final Amount
            </td>
            <td className="border border-gray-300 px-4 py-2 font-bold">
              ₹
              {(
                totalPrice +
                gstAmount +
                platformFee +
                platformGstAmount
              )?.toFixed(2)}
            </td>
            <td className="border border-gray-300 px-4 py-2 font-bold">
              ₹{(vendorPrice + gatewayFeesVendor+vendorGST)?.toFixed(2)}
            </td>
            <td className="border border-gray-300 px-4 py-2 font-bold">
              ₹{adminShare?.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const gatewayFeeRate = 0.02;
function NewOrdertable() {
  const [page, setPage] = useState(1);
  const [allOrder, setAllOrder] = useState([]);
  const [oneOrder, setOneOrder] = useState([]);
  const getAllNewOrderApi = useServices(orderApis.getAllNewOrder);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("viewOrder");
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const [orderIdAndItemId, setOrderIdAndItemId] = useState({
    orderId: "",
    id: "",
  });
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const getAllNewOrderHandle = async () => {
    try {
      const response = await getAllNewOrderApi.callApi();
      setAllOrder(response ? response.orders : []);
      console.log(response);
    } catch (error) {
      setAllOrder([]);
    }
  };
  function setOneOrderhandle(orderId) {
    // Filter the order matching the given user ID
    const matchingOrder = allOrder.find((order) => order._id === orderId);

    if (matchingOrder) {
      console.log("Matching Order:", matchingOrder);
      setOneOrder(matchingOrder);
      // return matchingOrder;
    } else {
      console.log("No order found for the given user ID.");
      return null;
    }
  }
  useEffect(() => {
    getAllNewOrderHandle();
  }, []);
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
      render: (row) =>
        formatCurrency(
          row?.totalAmount +
            row?.totalGst +
            row?.items?.[0]?.platformFee +
            row?.items?.[0]?.platformGstAmount
        ),
    },
    {
      label: "Status",
      key: "status",
      render: (row) => row?.status,
    },

    {
      label: "Action",
      key: "interests",
      render: (row) => (
        <div className="flex items-center justify-center gap-2">
          <CiViewBoard
            className="text-3xl font-semibold cursor-pointer text-textGray"
            onClick={() => [
              handleOpenModal(),
              setModalType("viewOrder"),
              setOneOrderhandle(row?._id),
            ]}
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
  console.log(oneOrder);

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
      <ReusableModal
        open={openModal}
        onClose={handleCloseModal}
        title={modalType === "viewOrder" ? "View Order" : ""}
      >
        {modalType === "viewOrder" && (
          <PriceBreakdown
            totalPrice={oneOrder.totalAmount}
            gstAmount={oneOrder?.totalGst}
            gstPercentage={oneOrder?.items?.[0]?.gstPercentage}
            platformFee={oneOrder?.items?.[0]?.platformFee}
            platformGstAmount={oneOrder?.items?.[0]?.platformGstAmount}
            gatewayFeeRate={gatewayFeeRate}
          />
        )}
      </ReusableModal>
    </div>
  );
}

// totalPrice, // Base price for the user
// gstAmount, // GST amount paid by the user
// gstPercentage, // GST percentage for calculations
// platformFee, // Platform fee for the user
// platformGstAmount, // GST on the platform fee
// gatewayFeeRate, // Gateway fee rate for calculations
export default NewOrdertable;
