import React, { useEffect, useState } from "react";
import { IoReceiptOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import useServices from "../../hooks/useServices";
import orderApis from "../../services/orderApis";
import { formatDate } from "../../utils/formatDate";
import formatCurrency from "../../utils/formatCurrency";
function VendorOrderDetailPage() {
  const { orderId, itemId } = useParams();
  const [orderDetail, setOrderDetail] = useState(null);
  const GetOneOrderDetailsApi = useServices(orderApis.GetOneOrderDetails);
  const GetOneOrderDetailsApiHandle = async () => {
    const formdata = new FormData();
    formdata.append("orderId", orderId);
    formdata.append("itemId", itemId);
    const response = await GetOneOrderDetailsApi.callApi(formdata);
    setOrderDetail(response ? response : null);
  };
  useEffect(() => {
    if (orderId && itemId) {
      GetOneOrderDetailsApiHandle();
    }
  }, [orderId, itemId]);
  return (
    <div className="w-full flex items-center  justify-center flex-col gap-3 mt-4 mb-4">
      <div className="w-11/12 flex items-center justify-center flex-col gap-2 border-b-2 pb-4">
        <div className="flex items-center justify-between w-full text-primary">
          <span className="flex items-center  font-semibold gap-2">
            Order ID:
            <p className="text-textGray font-medium"> {orderDetail?.OrderId}</p>
          </span>
          <span className="flex items-center  font-semibold gap-2">
            <h5 className="font-semibold text-2xl">
              {orderDetail?.extractedDetails?.Title}
            </h5>
            ,<p>Sku Code: {orderDetail?.extractedDetails?.SKU}</p>
          </span>
        </div>
        <div className="flex items-center justify-between w-full text-primary">
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center  font-semibold gap-2">
              Scheduled Date
              <p className="text-textGray font-medium">
                {formatDate(orderDetail?.itemDetails?.date)}{" "}
              </p>
            </span>{" "}
            <span className="flex items-center  font-semibold gap-2">
              Scheduled Date
              <p className="text-textGray font-medium">
                {" "}
                {orderDetail?.itemDetails?.time}{" "}
              </p>
            </span>
          </div>
          <span className="flex items-center  font-semibold gap-2">
            Address
            <p className="text-textGray font-medium">
              {orderDetail?.address?.address},
              {orderDetail?.address?.addressLine1},
              {orderDetail?.address?.addressLine2},{orderDetail?.address?.state}
              ,{orderDetail?.address?.pinCode}
            </p>
          </span>
        </div>
      </div>
      <div className="w-11/12 grid grid-cols-2 items-start justify-center flex-col gap-4 ">
        <div className="w-11/12 flex flex-col gap-2 text-primary">
          <h5 className="font-semibold text-xl text-primary border-b-2 pb-1">
            Customer Details
          </h5>
          <span className="flex items-center   font-semibold gap-2">
            Name :
            <p className="text-textGray font-medium">
              {" "}
              {orderDetail?.address?.name}
            </p>
          </span>{" "}
        </div>
        <div className="w-full flex flex-col gap-2 text-primary">
          <span className="flex items-center justify-between w-full border-b-2 pb-1">
            <h5 className="font-semibold text-xl text-primary ">
              Payment Details
            </h5>
            <IoReceiptOutline className="text-2xl text-textGray" />
          </span>
          <div className="grid grid-cols-2 gap-4 w-full">
            <span className="flex items-center   font-semibold gap-2">
              Date of Booking :
              <p className="text-textGray font-medium">
                {formatDate(orderDetail?.createdAt)}
              </p>
            </span>{" "}
            <span className="flex items-center  font-semibold gap-2">
              Time of Booking :
              <p className="text-textGray font-medium">   {new Date(orderDetail?.updatedAt).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                  timeZone: "UTC",
                })}</p>
            </span>{" "}
            <span className="flex items-center  font-semibold gap-2">
              Payment Status :{" "}
              <p className="text-textGray font-medium">
                {" "}
                {orderDetail?.partialPayments?.length > 0
                  ? "Partially Paid"
                  : "Full Paid"}
              </p>
            </span>{" "}
            <span className="flex items-center  font-semibold gap-2">
              Payment Mode :{" "}
              <p className="text-textGray font-medium">
                {" "}
                {orderDetail?.paymentDetails?.method}
              </p>
            </span>{" "}
            <span className="flex items-center  font-semibold gap-2">
              Amount Due: :{" "}
              <p className="text-textGray font-medium">
                {" "}
                {formatCurrency(
                  orderDetail?.itemDetails?.totalPrice +
                    orderDetail?.itemDetails?.gstAmount +
                    orderDetail?.platformGstPerItem +
                    orderDetail?.platformFeePerItem
                )}
              </p>
            </span>{" "}
            <span className="flex items-center  font-semibold gap-2">
              Trans ID :{" "}
              <p className="text-textGray font-medium">
                {" "}
                {orderDetail?.razorPayOrderId}
              </p>
            </span>
          </div>
        </div>
      </div>
      <div className="w-11/12 flex flex-col gap-2 text-primary">
        <span className="flex items-center justify-between w-full border-b-2 pb-1">
          <h5 className="font-semibold text-xl text-primary ">Price Details</h5>
        </span>
        <div className="grid grid-cols-1 gap-2 w-full text-textSecondary">
          <span className="flex items-center justify-between  font-semibold gap-2">
            Total MRP
            <p className="text-textGray font-medium">
              {" "}
              {formatCurrency(orderDetail?.itemDetails?.totalPrice)}
            </p>
          </span>{" "}
          <span className="flex items-center justify-between  font-semibold gap-2">
            Discount on MRP
            <p className="text-textGray font-medium"> -0.00</p>
          </span>{" "}
          <span className="flex items-center justify-between  font-semibold gap-2">
            Coupon Discount
            <p className="text-textGray font-medium"> -0.00</p>
          </span>{" "}
          <span className="flex items-center justify-between  font-semibold gap-2">
            Conveyance Fee
            <p className="text-textGray font-medium">
              {" "}
              {formatCurrency(
                orderDetail?.platformGstPerItem +
                  orderDetail?.platformFeePerItem
              )}
            </p>
          </span>{" "}
          <span className="flex items-center justify-between  font-semibold gap-2">
            CGST({orderDetail?.itemDetails?.gstPercentage / 2}%)
            <p className="text-textGray font-medium">
              {" "}
              {formatCurrency(orderDetail?.itemDetails?.gstAmount / 2)}
            </p>
          </span>{" "}
          <span className="flex items-center justify-between  font-semibold gap-2">
            SGST({orderDetail?.itemDetails?.gstPercentage / 2}%)
            <p className="text-textGray font-medium">
              {" "}
              {formatCurrency(orderDetail?.itemDetails?.gstAmount / 2)}
            </p>
          </span>{" "}
          <span className="flex items-center justify-between  font-semibold gap-2">
            Conveyance Fee
            <p className="text-textGray font-medium">
              {" "}
              {formatCurrency(
                orderDetail?.platformGstPerItem +
                  orderDetail?.platformFeePerItem
              )}
            </p>
          </span>
        </div>
        <span className="flex items-center justify-between w-full border-t-2 pt-1">
          <h5 className="font-medium text-xl text-primary ">Total Amount</h5>
          <p>
            {formatCurrency(
              orderDetail?.itemDetails?.totalPrice +
                orderDetail?.itemDetails?.gstAmount +
                orderDetail?.platformGstPerItem +
                orderDetail?.platformFeePerItem
            )}
          </p>
        </span>
      </div>
      <div className="w-11/12 flex flex-col gap-2 text-primary border-b-2 pb-1">
        <span className="flex items-center justify-between w-full border-b-2 pb-1">
          <h5 className="font-semibold text-xl text-primary ">
            Details of the Package
          </h5>
        </span>
        {/* <div className="grid grid-cols-1 gap-2 w-full text-textSecondary">
          <span className="flex items-center justify-start  font-semibold gap-2">
            Event
            <p className="bg-[#EDEDED] py-1 px-2 text-sm text-textGray font-normal rounded-md">
              {" "}
              -0.00
            </p>
          </span>{" "}
          <span className="flex items-center justify-start  font-semibold gap-2">
            Inclusions
            <p className="bg-[#EDEDED] py-1 px-2 text-sm text-textGray font-normal rounded-md">
              {" "}
              -0.00
            </p>
          </span>{" "}
          <span className="flex items-center justify-start  font-semibold gap-2">
            Deliverables
            <p className="bg-[#EDEDED] py-1 px-2 text-sm text-textGray font-normal rounded-md">
              {" "}
              -0.00
            </p>
          </span>{" "}
        </div> */}
      </div>
      <div className="w-11/12 flex flex-row gap-2 text-textGray ">
        <p className="border-b-2 ">Call</p>
        <p className="border-b-2 ">Get Directions</p>
      </div>
      {/* <div className="w-11/12 grid grid-cols-2 items-center justify-center flex-col gap-4 ">
      <p>Report a concern</p>
      <span className="flex items-center gap-4">
        <button className="btn-transparent-border ">Cancel Booking</button>
        <button className="btn-primary ">Collect Cash</button>
      </span>
      </div> */}
    </div>
  );
}

export default VendorOrderDetailPage;
