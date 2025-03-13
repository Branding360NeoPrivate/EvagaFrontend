import React, { useState } from "react";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import { IoBagOutline } from "react-icons/io5";
import parse from "html-react-parser";
import formatCurrency from "../../utils/formatCurrency";
import share from "../../assets/Temporary Images/share-square 1.png";
import Year from "../../assets/Temporary Images/briefcase-blank 1.png";
import event from "../../assets/Temporary Images/party-horn 1.png";
import inclusion from "../../assets/Temporary Images/web-test 1.png";
import deliverable from "../../assets/Temporary Images/Vector (1).png";
import terms from "../../assets/Temporary Images/terms-info (1) 1.png";
import Wishlist from "../../utils/Wishlist";
import Cookies from "js-cookie";
import useServices from "../../hooks/useServices";
import userApi from "../../services/userApi";
import { useDispatch } from "react-redux";
import { fetchUserWishlist } from "../../context/redux/slices/wishlistSlice";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { ShareButton } from "../../utils/ShareButton";
import { internalRoutes } from "../../utils/internalRoutes";
import ReusableModal from "../Modal/Modal";
import Reviews from "./Review";
function ServiceDetailCard({
  title,
  category,
  rating,
  reviews,
  experience,
  companyName,
  price,
  tAndC = [],
  DataToRender,
  isFavourite,
  serviceId,
  packageId,
}) {
  const keysToRender = [
    "Event Type",
    "EventType",
    "TypesofFlavours",
    "Inclusions",
    "Deliverables",
    "MealType",
    "MealTime",
    "Cuisines",
    "MenuBreakUp",
    "Description",
    "DurationofStall",
    "Languages",
    "LocationType",
    "LocationTypePreferred",
    "AudienceInteraction",
    "StageRequired",
    "MultipleSets",
  ];
  const iconMapping = {
    "Event Type": event,
    EventType: event,
    TypesofFlavours: "",
    Inclusions: inclusion,
    Languages: inclusion,
    Deliverables: deliverable,
    MealType: "",
    MealTime: "",
    Cuisines: "",
    MenuBreakUp: "",
    Description: terms,
    DurationofStall: "",
  };
  const userId = Cookies.get("userId");
  const wishlist = useServices(userApi.toggleWishlist);
  const { auth } = useAuth();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const toggleWishlistHandle = async () => {
    if (auth?.isAuthenticated && auth?.role === "user") {
      const formdata = new FormData();
      formdata.append("serviceId", serviceId);
      formdata.append("packageId", packageId);

      try {
        const response = await wishlist.callApi(userId, formdata);
        dispatch(fetchUserWishlist(userId));
        toast.success(response?.message);
      } catch (error) {
        toast.error("Failed to toggle wishlist. Please try again.");
        console.error(error);
      }
    } else {
      toast.info("You need to log in first to add items to the wishlist.");
    }
  };

  return (
    <div className="  bg-white p-4 w-full max-w-3xl">
      {/* Header */}
      <div className=" w-full flex flex-row items-center mb-4">
        <div className="w-[80%] ">
          <h2 className="text-xl font-semibold text-primary">{title}</h2>
          <p className="text-normal  text-textGray">{category}</p>
        </div>
        <div className="w-[20%] text-right cursor-pointer"  onClick={() => handleOpen()}>
          <div
            className="flex flex-col items-end justify-end gap-1 "
           
          >
            <div className="flex flex-row">
              <span className="text-yellow-500 text-lg">★</span>
              <span className="text-gray-700 font-medium">{rating} </span>
              <span className="text-gray-500 text-md">({reviews})</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">Reviews</p>
        </div>
      </div>

      {/* Company Name */}
      <div className="w-full flex flex-row  items-center justify-between">
        <div className=" text-lg font-semibold text-primary mb-4">
          <h3 className="text-normal font-semibold ">{companyName}</h3>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <img src={Year} alt="share" className="object-contain h-[1.5rem]" />
          <p className="text-sm text-textGray font-medium">
            {experience} Years
          </p>
        </div>{" "}
        <div className="w-[10%] items-end">
          <ShareButton
            url={`${window.location.origin}${internalRoutes.SinglePackage}/${serviceId}/${packageId}`}
          />
        </div>
        <div className="w-[10%] items-end">
          <Wishlist
            isInWishlist={isFavourite}
            onWishlistToggle={() => toggleWishlistHandle(userId)}
          />
        </div>
      </div>
      <hr style={{ margin: "0.2rem 0" }} />

      {/* Price */}
      <div className="flex flex-row items-center">
        <p className="text-lg font-medium text-primary pt-2 pr-2">Price</p>
        <p className="text-xl font-bold text-primary ">
          {formatCurrency(price)}
        </p>
      </div>

      {keysToRender?.map((key, index) => {
        const value = DataToRender?.[key];

        if (Array.isArray(value) && value.length > 0) {
          return (
            <div
              className=" mt-4 flex gap-4 items-start justify-start"
              key={index}
            >
              <span className="bg-textLightGray p-2 rounded-[50%]">
                <img
                  src={iconMapping[key]}
                  alt="event"
                  className="object-contain h-[1.5rem]"
                />
              </span>
              <div className="mb-4 w-full">
                <h3 className="text-normal font-meduim text-primary">{key}</h3>
                <hr style={{ margin: "0.3rem 0" }} />
                <div className="flex gap-2 mt-1 flex-wrap">
                  {value?.map((item, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-200 text-textGray text-sm px-3 py-1 rounded-md"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        } else if (typeof value === "string") {
          // If value is a string, render directly
          return (
            <div className="flex gap-4 items-start justify-start" key={index}>
              <div className="mb-4 w-full flex items-center">
                <h3 className="text-normal font-meduim text-primary">{key}</h3>

                <span className=" text-textGray text-normal px-3 py-1 rounded-md">
                  {value}
                </span>
              </div>
            </div>
          );
        }

        return null; // Return nothing if the value is neither an array nor a string
      })}

      <div className="flex gap-4 items-start justify-start">
        <span className="bg-textLightGray p-2 rounded-[50%]">
          <img src={terms} alt="event" className="object-contain h-[1.5rem]" />
        </span>
        <div className="w-full text-textGray">
          <h3 className="text-normal font-meduim text-primary">
            Terms & Conditions
          </h3>
          <hr style={{ margin: "0.3rem 0" }} />

          <div className="terms-conditions">
            {tAndC == "" ? "" : parse(tAndC)}
          </div>
        </div>
      </div>
      <ReusableModal open={open} onClose={handleClose} width={"50%"}>
        <Reviews serviceId={serviceId} packageId={packageId}/>
      </ReusableModal>
    </div>
  );
}
export default ServiceDetailCard;
