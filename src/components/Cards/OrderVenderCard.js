import React, { useState } from "react";
import ServiceImage from "../../assets/Temporary Images/image1.png";
import TruncateText from "../TruncateText/TruncateText";
import {
  MdOutlineModeEditOutline,
  MdOutlineReportGmailerrorred,
} from "react-icons/md";
import formatCurrency from "../../utils/formatCurrency";
import ReusableModal from "../Modal/Modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { formatDate } from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";

function OrderVenderCard({
  title,
  image,
  yearofexp,
  orderId,
  date,
  time,
  userName,
  phone,
  email,
  category,
  desc,
  InclusionData,
  DeliverablesData,
  AddOnData,
  price,
  redirectUrl,
  buttons = [],
}) {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleNavigate = () => {
    if (redirectUrl) navigate(redirectUrl);
  };

  return (
    <div className="w-full h-[24rem] grid grid-cols-4 gap-4 border-borderSecondary border-2 rounded-md rounded-l-lg ">
      <img
        src={image ? image : ServiceImage}
        alt="Service Image"
        className="rounded-l-lg object-fit w-full h-[24rem] "
        onClick={redirectUrl ? handleNavigate : undefined}
      />

      <div
        className={`col-span-2 flex items-start justify-start flex-col py-2 px-1 gap-2 ${
          redirectUrl ? "cursor-pointer" : ""
        }`}
        onClick={redirectUrl ? handleNavigate : undefined}
      >
        <div className="grid grid-cols-3 gap-4">
          <h5 className="text-primary font-semibold text-xl col-span-2">
            {title ? title : "Hospitality Staff"}
          </h5>
          <p className="text-primary font-semibold">
            {orderId && orderId}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <span className="text-primary font-semibold flex ">
            Scheduled Date:
            <p className="text-textGray">{date && formatDate(date)}</p>
          </span>
          <span className="text-primary font-semibold flex ">
            Scheduled Time:
            <p className="text-textGray">{time && time}</p>
          </span>
        </div>
        <p className="text-primary">Customer Details</p>
        <div className="grid grid-cols-2 gap-4">
          <span className="text-primary font-semibold flex ">
            Name:
            <p className="text-textGray">{userName && userName}</p>
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <span className="text-primary font-semibold flex">
            Address:
            <p className="text-textGray">
              {" "}
              {yearofexp
                ? yearofexp
                : "302, Ishwara Layout, Indiranagar, Bengaluru, Karnataka-500036"}
            </p>
          </span>
        </div>
        <p className="text-primary">Payment Details</p>
        <div className="grid grid-cols-3 gap-4">
          <p className="text-primary font-semibold">Fully Paid </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <p className="text-textGray font-semibold">Call </p>
          <p className="text-textGray font-semibold">Get Direction </p>
        </div>
      </div>
      <div className="flex items-end justify-between flex-col py-2 px-2">
        <span className="flex items-center justfiy-center gap-2 text-textGray">
          <MdOutlineReportGmailerrorred />
          <p>Report a concern</p>
        </span>
        <span className="flex items-center justify-end flex-wrap gap-3 w-full">
          {buttons.map((button, index) => (
            <span key={index}>{button}</span>
          ))}
        </span>
      </div>
      <ReusableModal
        open={openModal}
        onClose={handleCloseModal}
        title="My Modal Title"
        description="This is the description of my modal."
      >
        <span className="w-full flex items-end justify-end">
          <button type="button" onClick={handleCloseModal}>
            <AiOutlineCloseCircle className="text-2xl" />
          </button>
        </span>
        <form className="flex items-start justify-start flex-col gap-2">
          <h6 className="text-primary font-semibold text-xl">
            Please Specify your Reason
          </h6>
          <div className="radio-group flex items-start justfiy-start flex-col gap-2 text-primary">
            <label className="text-primary flex items-atart justify-start gap-2">
              <input type="radio" name="reason" value="loremIpsum1" />
              <span className="text-xl font-semibold">Lorem Ipsum</span>
            </label>{" "}
            <label className="text-primary flex items-atart justify-start gap-2">
              <input type="radio" name="reason" value="loremIpsum1" />
              <span className="text-xl font-semibold">Lorem Ipsum</span>
            </label>{" "}
            <label className="text-primary flex items-atart justify-start gap-2">
              <input type="radio" name="reason" value="loremIpsum1" />
              <span className="text-xl font-semibold">Lorem Ipsum</span>
            </label>{" "}
            <label className="text-primary flex items-atart justify-start gap-2">
              <input type="radio" name="reason" value="loremIpsum1" />
              <span className="text-xl font-semibold">Lorem Ipsum</span>
            </label>{" "}
          </div>
          <div className="flex items-end justify-end w-full ">
            <button type="submit" className="btn-primary w-fit px-2 py-1">
              Submit
            </button>
          </div>
        </form>
      </ReusableModal>
    </div>
  );
}
export default OrderVenderCard;
