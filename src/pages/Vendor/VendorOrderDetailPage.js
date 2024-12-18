import React from "react";
import { IoReceiptOutline } from "react-icons/io5";
function VendorOrderDetailPage() {
  return (
    <div className="w-full flex items-center  justify-center flex-col gap-3 mt-4 mb-4">
      <div className="w-11/12 flex items-center justify-center flex-col gap-2 border-b-2 pb-4">
        <div className="flex items-center justify-between w-full text-primary">
          <span className="flex items-center  font-semibold gap-2">
            Order ID:<p className="text-textGray font-medium"> 445311</p>
          </span>
          <h5 className="font-semibold text-2xl">Hospitality Staff</h5>
        </div>
        <div className="flex items-center justify-between w-full text-primary">
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center  font-semibold gap-2">
              Scheduled Date
              <p className="text-textGray font-medium"> 22/10/2024</p>
            </span>{" "}
            <span className="flex items-center  font-semibold gap-2">
              Scheduled Date
              <p className="text-textGray font-medium"> 10:30 AM</p>
            </span>
          </div>
          <span className="flex items-center  font-semibold gap-2">
            Address
            <p className="text-textGray font-medium">
              302, Ishwara Layout, Indiranagar, Bengaluru, Karnataka-500036
            </p>
          </span>
        </div>
      </div>
      <div className="w-11/12 grid grid-cols-2 items-center justify-center flex-col gap-4 ">
        <div className="w-11/12 flex flex-col gap-2 text-primary">
          <h5 className="font-semibold text-xl text-primary border-b-2 pb-1">
            Customer Details
          </h5>
          <span className="flex items-center   font-semibold gap-2">
            Name :<p className="text-textGray font-medium"> Shobhit Agarwal</p>
          </span>{" "}
          <span className="flex items-center  font-semibold gap-2">
            Ph.Number :
            <p className="text-textGray font-medium"> +91 98880 99811</p>
          </span>{" "}
          <span className="flex items-center  font-semibold gap-2">
            Email Id :{" "}
            <p className="text-textGray font-medium">
              {" "}
              shobhit.agarwal@gmail.com
            </p>
          </span>
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
              <p className="text-textGray font-medium"> 05/10/2024</p>
            </span>{" "}
            <span className="flex items-center  font-semibold gap-2">
              Time of Booking :
              <p className="text-textGray font-medium"> 07:45: 13 PM</p>
            </span>{" "}
            <span className="flex items-center  font-semibold gap-2">
              Payment Status :{" "}
              <p className="text-textGray font-medium"> Partially Paid</p>
            </span>{" "}
            <span className="flex items-center  font-semibold gap-2">
              Payment Mode : <p className="text-textGray font-medium"> UPI</p>
            </span>{" "}
            <span className="flex items-center  font-semibold gap-2">
              Amount Due: :{" "}
              <p className="text-textGray font-medium"> ₹50,000</p>
            </span>{" "}
            <span className="flex items-center  font-semibold gap-2">
              Trans ID :{" "}
              <p className="text-textGray font-medium"> 1132332355</p>
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
            <p className="text-textGray font-medium"> ₹1,10,000.00</p>
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
            <p className="text-textGray font-medium"> ₹4,358.00</p>
          </span>
        </div>
        <span className="flex items-center justify-between w-full border-t-2 pt-1">
          <h5 className="font-medium text-xl text-primary ">Total Amount</h5>
          <p>₹1,14,358.00</p>
        </span>
      </div>
      <div className="w-11/12 flex flex-col gap-2 text-primary border-b-2 pb-1">
        <span className="flex items-center justify-between w-full border-b-2 pb-1">
          <h5 className="font-semibold text-xl text-primary ">
            Details of the Package
          </h5>
        </span>
        <div className="grid grid-cols-1 gap-2 w-full text-textSecondary">
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
        </div>
      </div>
      <div className="w-11/12 flex flex-row gap-2 text-textGray ">
      <p className="border-b-2 ">Call</p>
      <p className="border-b-2 ">Get Directions</p>
      </div>
      <div className="w-11/12 grid grid-cols-2 items-center justify-center flex-col gap-4 ">
      <p>Report a concern</p>
      <span className="flex items-center gap-4">
        <button className="btn-transparent-border ">Cancel Booking</button>
        <button className="btn-primary ">Collect Cash</button>
      </span>
      </div>
    </div>
  );
}

export default VendorOrderDetailPage;
