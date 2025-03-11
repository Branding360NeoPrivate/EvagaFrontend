import React from "react";
import ServiceImage from "../../assets/Temporary Images/image.png";
import TruncateText from "../TruncateText/TruncateText";
import { MdOutlineModeEditOutline } from "react-icons/md";
import formatCurrency from "../../utils/formatCurrency";
import { internalRoutes } from "../../utils/internalRoutes";
import { useNavigate } from "react-router-dom";
function ServiceCard({
  title,
  image,
  yearofexp,
  category,
  desc,
  InclusionData,
  DeliverablesData,
  AddOnData,
  price,
  subCategory,
  serviceId,
}) {
  const history = useNavigate();
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4 border-borderSecondary border-2 rounded-md rounded-l-lg">
      <img
        src={image ? image : ServiceImage}
        alt="Service Image"
        className="rounded w-full md:w-auto h-[20rem] object-cover w-full"
      />
      <div className="col-span-2 flex items-start justify-start flex-col py-2 px-1 gap-4">
        <span className="flex items-center justify-center gap-4">
          <h5 className="text-primary font-semibold text-xl ">
            {title ? title : "Wedding Photography"}
          </h5>
          <p className="text-textGray font-noraml">
            {yearofexp ? yearofexp : "5"} years
          </p>
        </span>
        <TruncateText text={desc ? desc : ``} maxLines={2} />
        {InclusionData && (
          <div className="flex items-start justify-center gap-4">
            <p className="text-xl font-semibold text-primary">Inclusions</p>
            <span className="flex items-center justify-start gap-2 flex-wrap">
              {InclusionData?.map((item) => (
                <p className="bg-[#EDEDED] py-1 px-2 text-sm text-textGray font-normal rounded-md">
                  {item}
                </p>
              ))}
            </span>
          </div>
        )}
        {DeliverablesData && (
          <div className="flex items-start justify-center gap-4">
            <p className="text-xl font-semibold text-primary">Deliverables</p>
            <span className="flex items-center justify-start gap-2 flex-wrap">
              {DeliverablesData?.map((item) => (
                <p className="bg-[#EDEDED] py-1 px-2 text-sm text-textGray font-normal rounded-md">
                  {item}
                </p>
              ))}
            </span>
          </div>
        )}
        {AddOnData && (
          <div className="flex items-start justify-center gap-4">
            <p className="text-xl font-semibold text-primary">Add ons</p>
            <span className="flex items-center justify-start gap-2 flex-wrap">
              {AddOnData?.map((item) => (
                <p className="bg-[#EDEDED] py-1 px-2 text-sm text-textGray font-normal rounded-md">
                  {item?.Particulars}
                </p>
              ))}
            </span>
          </div>
        )}
      </div>
      <div className="py-2 px-1 pr-4 flex items-end justify-between flex-col">
        <span className="flex items-center justify-center gap-4">
          <p className="text-textGray">
            {subCategory ? subCategory : "Photography"}
          </p>
          <button
            className="border-2  rounded-full p-1 border-textGray"
            onClick={() =>
              history(`${internalRoutes.vendorEditservice}/${serviceId}`)
            }
          >
            <MdOutlineModeEditOutline className="text-textGray text-lg" />
          </button>
        </span>

        {price && (
          <strong className="text-2xl text-primary">
             {price && formatCurrency(price)}
          </strong>
        )}
      </div>
    </div>
  );
}

export default ServiceCard;
