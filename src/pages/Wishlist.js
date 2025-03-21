import React, { useEffect } from "react";
import WishlistCard from "../components/Cards/WishlistCard";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { internalRoutes } from "../utils/internalRoutes";
import { motion } from "framer-motion";
import userApi from "../services/userApi";
import useServices from "../hooks/useServices";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { addWishlist } from "../context/redux/slices/wishlistSlice";
function Wishlist() {
  const userId = Cookies.get("userId");
  const { auth } = useAuth();
  const history = useNavigate();
  const wishlist = useServices(userApi.Wishlist);
  const { allWishlist } = useSelector((state) => state.wishlist);

  const dispatch = useDispatch();
  const handleGetWishList = async (userId) => {
    const response = await wishlist.callApi(userId);
    dispatch(addWishlist(response?.wishlist));
  };
  useEffect(() => {
    if (auth?.isAuthenticated && auth?.role === "user") {
      handleGetWishList(userId);
    }
  }, [auth.isAuthenticated, auth.role, userId]);
  if (!auth?.isAuthenticated || auth?.role !== "user") {
    return (
      <motion.div
        className="flex items-center justify-center flex-col gap-3 w-full h-[50vh]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{
          opacity: { duration: 0.8, ease: "easeInOut" },
          scale: { duration: 0.5, ease: "easeOut" },
        }}
      >
        <p className="text-primary text-xl text-textGray">
          Please Login To See Your Wishlist!
        </p>
        <button
          className="btn-primary w-fit px-4"
          onClick={() => history(internalRoutes.userLogin)}
        >
          Login
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-full flex items-start justify-start flex-col gap-2 py-[2%] px-[4%]"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        opacity: { duration: 0.8, ease: "easeInOut" },
        scale: { duration: 0.5, ease: "easeOut" },
      }}
    >
      <h2 className="text-primary font-semibold text-xl">My Wishlist</h2>
      <div className="flex items-center justify-start flex-wrap gap-8 pl-[2%] min-h-[50vh]">
        {allWishlist?.map((service, index) => {
          const imageUrl =
            (Array.isArray(service.packageDetails?.values?.CoverImage)
              ? service.packageDetails?.values?.CoverImage[0]
              : service.packageDetails?.values?.CoverImage) ||
            (Array.isArray(service.packageDetails?.values?.ProductImage)
              ? service.packageDetails?.values?.ProductImage[0]
              : service.packageDetails?.values?.ProductImage);

          const popularimage = imageUrl?.startsWith("service/")
            ? process.env.REACT_APP_API_Aws_Image_BASE_URL + imageUrl
            : imageUrl;
          return (
            <WishlistCard
              key={service?.service?._id}
              popularimage={popularimage}
              title={
                service?.packageDetails?.values?.Title ||
                service?.packageDetails?.values?.VenueName ||
                service?.packageDetails?.values?.FoodTruckName
              }
              category={service?.categoryName}
              price={
                service?.packageDetails?.values?.price ||
                service?.packageDetails?.values?.Pricing ||
                service?.packageDetails?.values?.Price ||
                service?.packageDetails?.values?.Package?.[0]?.Rates ||
                service?.packageDetails?.values?.["OrderQuantity&Pricing"]?.[0]
                  ?.Rates ||
                service?.packageDetails?.values?.["Duration&Pricing"]?.[0]
                  ?.Amount ||
                service.packageDetails?.values?.["SessionLength"]?.[0]
                  ?.Amount ||
                service.packageDetails?.values?.["SessionLength&Pricing"]?.[0]
                  ?.Amount ||
                service?.packageDetails?.values?.["QtyPricing"]?.[0]?.Rates
              }
              rating={0}
              reviews={0}
              onClick={() =>
                history(
                  `${internalRoutes?.SinglePackage}/${service?._id}/${service?.packageDetails?._id}`
                )
              }
              isFavourite={allWishlist?.some(
                (item) =>
                  item._id === service?._id &&
                  item?.packageDetails?._id === service?.packageDetails?._id
              )}
              serviceId={service?._id}
              packageId={service?.packageDetails?._id}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

export default Wishlist;
