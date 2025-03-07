import React, { useState } from "react";
import formatCurrency from "../../utils/formatCurrency";
import useServices from "../../hooks/useServices";
import userApi from "../../services/userApi";
import { useDispatch } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import Wishlist from "../../utils/Wishlist";
import { toast } from "react-toastify";
import { fetchUserWishlist } from "../../context/redux/slices/wishlistSlice";
import Cookies from "js-cookie";
function WishlistCard({
  popularimage,
  title,
  category,
  price,
  rating,
  reviews,
  onClick,
  isFavourite,
  serviceId,
  packageId,
}) {
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
    <div className="w-[295px] min-h-[356px]  flex items-center justify-center flex-col gap-2">
      <div className="w-full border rounded-lg bg-white overflow-hidden">
        <div className="w-full h-[247px]" onClick={onClick}>
          <img
            src={popularimage}
            alt={title}
            className="w-full h-full rounded-t-md "
          />
        </div>
        <div className="p-2">
          <div className="flex justify-between items-center" onClick={onClick}>
            <div className="w-[82%] flex flex-col justify-start">
              <span className="text-[18px] font-semibold text-primary">
                {title}
              </span>
              <span className="text-sm text-gray-600 mt-1">{category}</span>
            </div>
            <div className="w-[18%] flex flex-col items-center text-yellow-500">
              <div className="flex items-center justify-center gap-1 ">
                <span>⭐</span>
                <span className="text-[14px]">{rating}</span>
              </div>

              <span className="text-gray-500 text-[14px] ml-1">
                ({reviews})
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <p className="text-xl font-bold text-primary flex items-center justify-center">
              {price ? formatCurrency(price) : "comming soon"}{" "}
              <span className=" text-sm font-medium text-gray-600 flex items-center justfiy-center gap-2">
                <p>/- </p>Starting
              </span>
            </p>
            <Wishlist
              isInWishlist={isFavourite}
              onWishlistToggle={() => toggleWishlistHandle(userId)}
            />
          </div>
        </div>
      </div>
      <button className="btn-primary w-full px-4">Move To Cart</button>
    </div>
  );
}

export default WishlistCard;
