// Make this responsive for both mobile and other devices with bigger screen. Make it default for mobile and then use md for all the above devices.
import React from "react";
import { FcLike } from "react-icons/fc";
import formatCurrency from "../../utils/formatCurrency";
import Wishlist from "../../utils/Wishlist";
import { useDispatch } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import useServices from "../../hooks/useServices";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import userApi from "../../services/userApi";
import { fetchUserWishlist } from "../../context/redux/slices/wishlistSlice";
function ProductDisplayCard({
  image,
  title,
  category,
  vendor,
  inclusions,
  deliverables,
  addOns,
  price,
  rating,
  reviews,
  eventData,
  onClick,
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
  ];
  const userId = Cookies.get("userId");
  const wishlist = useServices(userApi.toggleWishlist);
  const { auth } = useAuth();
  const dispatch = useDispatch();
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
    <div className="min-h-[300px] border rounded-lg shadow-sm flex flex-col md:flex-row gap-4 cursor-pointer">
      <img
        src={process.env.REACT_APP_API_Image_BASE_URL + image}
        alt={title}
        className=" w-[30%] rounded-lg object-cover"
        onClick={onClick}
      />
      <div className="w-full flex flex-col my-4" onClick={onClick}>
        <div className=" w-full flex flex-row items-center mb-1 justify-between">
          <div className="w-[100%] gap-0 ">
            <h2 className="text-[1.8rem] font-medium text-primary">{title}</h2>
            <p className="text-base text-textGray">{category}</p>
          </div>
        </div>
        <div className="w-full flex flex-row border-borderPrimary mb-1 ">
          <div className="w-[80%] text-base font-semibold text-primary mb-2">
            <h3>{vendor}</h3>
          </div>
        </div>
        <div className="flex flex-row gap-2 pr-4 flex-col">
          {keysToRender.map((key, index) => {
            const value = eventData?.values?.[key];
            if (Array.isArray(value) && value.length > 0) {
              return (
                <div className="mb-1 flex flex-row gap-3">
                  <h3 className="text-lg font-medium text-primary pt-1">
                    {key}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {value.map((item, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 text-sm text-textGray px-3 py-1 rounded-md"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      {/* Price */}
      <div className="flex flex-col items-end justify-between w-[20%] pr-4 pt-4">
        <Wishlist
          isInWishlist={isFavourite}
          onWishlistToggle={() => toggleWishlistHandle(userId)}
        />
        <div>
          <div className="text-xl font-medium text-primary pt-2 pr-4 justify-start">
            Starting
          </div>
          <div className="text-2xl font-bold text-primary mb-4">
            {formatCurrency(
              Number(
                eventData?.values?.Price ||
                  eventData?.values?.price ||
                  eventData?.values?.Pricing ||
                  eventData?.values?.["OrderQuantity&Pricing"]?.[0]?.Rates ||
                  eventData?.values?.["Duration&Pricing"]?.[0]?.Amount ||
                  eventData?.values?.["SessionLength"]?.[0]?.Amount ||
                  eventData?.values?.Package?.[0]?.Rates ||
                  eventData?.values?.QtyPricing?.[0]?.Rates
              )
            )}
            /-
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDisplayCard;
