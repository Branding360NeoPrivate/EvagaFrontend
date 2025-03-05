import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBanner,
  fetchUserBanner,
} from "../context/redux/slices/bannerSlice";
import Slider from "../components/Slider/Slider";
import CategoryDisplayCard from "../components/Cards/CategoryDisplayCard";
import ProductCard from "../components/Cards/ProductCard";
import NavImage from "../assets/ImageNavImgs/image.png";
import { fetchCategories } from "../context/redux/slices/categorySlice";
import packageApis from "../services/packageApis";
import useServices from "../hooks/useServices";
import { addPackage } from "../context/redux/slices/packageSlice";
import HorizontalScroll from "../utils/HorizontalScroll";
import { useNavigate } from "react-router-dom";
import { internalRoutes } from "../utils/internalRoutes";
import { Link } from "react-alice-carousel";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { addWishlist } from "../context/redux/slices/wishlistSlice";
import { useAuth } from "../context/AuthContext";
import userApi from "../services/userApi";
import RecentlyViewedCard from "../components/Cards/RecentlyViewedCard";
function Home() {
  const { banner, userBanner } = useSelector((state) => state.banner);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { allPackages } = useSelector((state) => state.package);
  const getAllPackages = useServices(packageApis.getAllPackage);
  const GetRecentViewpackageApi = useServices(userApi.GetRecentViewpackage);
  const { allWishlist } = useSelector((state) => state.wishlist);
  const history = useNavigate();
  const userId = Cookies.get("userId");
  const { auth } = useAuth();
  const [recentView, setRecentView] = useState([]);
  const wishlist = useServices(userApi.Wishlist);

  const handleGetAllPackages = async () => {
    const response = await getAllPackages.callApi();
    dispatch(addPackage(response?.data));
  };

  const handleGetWishList = async (userId) => {
    const response = await wishlist.callApi(userId);
    dispatch(addWishlist(response?.wishlist));
  };
  const GetRecentViewpackageApiHandle = async () => {
    const response = await GetRecentViewpackageApi.callApi(userId);
    setRecentView(response ? response?.recentlyViewed : []);
    console.log(response);
  };
  useEffect(() => {
    if (userId) {
      GetRecentViewpackageApiHandle();
    }
  }, [userId]);
  useEffect(() => {
    if (auth?.isAuthenticated && auth?.role === "user") {
      handleGetWishList(userId);
    }
  }, [auth.isAuthenticated, auth.role, userId]);
  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!fetchedRef.current && (!allPackages || allPackages.length === 0)) {
      handleGetAllPackages();
      fetchedRef.current = true;
    }
  }, [allPackages]);

  useEffect(() => {
    if (!userBanner || userBanner.length === 0) {
      console.log("banner");

      dispatch(fetchUserBanner());
    }
  }, [dispatch, userBanner]);

  return (
    <motion.div
      className=" flex flex-col justify-center items-center gap-4 w-full"
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        opacity: { duration: 0.8, ease: "easeInOut" },
        scale: { duration: 0.5, ease: "easeOut" },
      }}
    >
      <div className="flex justify-center items-center contain-content w-[100%]">
        <Slider bannerData={userBanner} height={"16em"} />
      </div>
      <div className="w-[95%]  mx-12 gap-4">
        <h2 className="sub_heading">Browse by Category</h2>
        <div className="flex flex-row gap-5 overflow-x-scroll no-scrollbar box-border">
          <HorizontalScroll speed={1} className="flex flex-row gap-1">
            {categories?.map((item, index) => (
              <CategoryDisplayCard
                key={index}
                image={item.icon}
                text={item.name}
                catId={item?._id}
              />
            ))}
          </HorizontalScroll>
        </div>
      </div>
      <div className="w-[95%]  mx-12 gap-4">
        <span className="w-full flex items-center justify-between">
          <h2 className="sub_heading">Popular</h2>
          <Link
            href="/search?q="
            className="text-primary text-xl font-medium cursor-pointer border-b-2 border-primary"
          >
            View All
          </Link>
        </span>
        <div className="flex flex-row gap-5 overflow-x-scroll no-scrollbar box-border">
          <HorizontalScroll speed={1} className="flex flex-row gap-8">
            {allPackages.map((service, index) => {
              const imageUrl =
                (Array.isArray(service.serviceDetails?.values?.CoverImage)
                  ? service.serviceDetails?.values?.CoverImage[0]
                  : service.serviceDetails?.values?.CoverImage) ||
                (Array.isArray(service.serviceDetails?.values?.ProductImage)
                  ? service.serviceDetails?.values?.ProductImage[0]
                  : service.serviceDetails?.values?.ProductImage);

              const popularimage = imageUrl?.startsWith("service/")
                ? process.env.REACT_APP_API_Aws_Image_BASE_URL + imageUrl
                : imageUrl;

              return (
                <ProductCard
                  key={service?.serviceDetails?._id}
                  popularimage={popularimage}
                  title={
                    service.serviceDetails?.values?.Title ||
                    service.serviceDetails?.values?.VenueName ||
                    service.serviceDetails?.values?.FoodTruckName
                  }
                  category={service?.categoryName}
                  price={
                    service.serviceDetails?.values?.price ||
                    service.serviceDetails?.values?.Pricing ||
                    service.serviceDetails?.values?.Price ||
                    service.serviceDetails?.values?.Package?.[0]?.Rates ||
                    service.serviceDetails?.values?.[
                      "OrderQuantity&Pricing"
                    ]?.[0]?.Rates ||
                    service.serviceDetails?.values?.["Duration&Pricing"]?.[0]
                      ?.Amount ||
                    service.serviceDetails?.values?.["SessionLength"]?.[0]
                      ?.Amount ||
                    service.serviceDetails?.values?.[
                      "SessionLength&Pricing"
                    ]?.[0]?.Amount ||
                    service.serviceDetails?.values?.["QtyPricing"]?.[0]?.Rates
                  }
                  rating={0}
                  reviews={0}
                  serviceId={service?._id}
                  packageId={service?.serviceDetails?._id}
                  onClick={() =>
                    history(
                      `${internalRoutes.SinglePackage}/${service?._id}/${service?.serviceDetails?._id}`
                    )
                  }
                  isFavourite={allWishlist?.some(
                    (item) =>
                      item._id === service?._id &&
                      item.packageDetails?._id === service?.serviceDetails?._id
                  )}
                />
              );
            })}
          </HorizontalScroll>
        </div>
      </div>
     {recentView?.length>0 && <div className="w-[95%]  mx-12 gap-4">
        <span className="w-full flex items-center justify-between">
          <h2 className="sub_heading">Recently Viewed</h2>
        </span>
        <div className="flex flex-row gap-5 overflow-x-scroll no-scrollbar box-border">
          <HorizontalScroll speed={1} className="flex flex-row gap-8">
            {recentView?.map((service, index) => {
              const imageUrl =
                (Array.isArray(service?.CoverImage)
                  ? service?.CoverImage[0]
                  : service?.CoverImage) ||
                (Array.isArray(service?.ProductImage)
                  ? service?.ProductImage[0]
                  : service?.ProductImage);

              const popularimage = imageUrl?.startsWith("service/")
                ? process.env.REACT_APP_API_Aws_Image_BASE_URL + imageUrl
                : imageUrl;

              return (
                <RecentlyViewedCard
                  key={service?.serviceDetails?._id}
                  popularimage={popularimage}
                  title={
                    service?.Title ||
                    service?.VenueName ||
                    service?.FoodTruckName
                  }
                  category={service?.CategoryName}
                  price={
                    service?.price ||
                    service?.Pricing ||
                    service?.Price ||
                    service?.Package?.[0]?.Rates ||
                    service?.["OrderQuantity&Pricing"]?.[0]?.Rates ||
                    service?.["Duration&Pricing"]?.[0]?.Amount ||
                    service?.["SessionLength"]?.[0]?.Amount ||
                    service?.["SessionLength&Pricing"]?.[0]?.Amount ||
                    service?.["QtyPricing"]?.[0]?.Rates
                  }
                  rating={0}
                  reviews={0}
                  serviceId={service?.serviceId}
                  packageId={service?.packageId}
                  onClick={() =>
                    history(
                      `${internalRoutes.SinglePackage}/${service?.serviceId}/${service?.packageId}`
                    )
                  }
                  isFavourite={allWishlist?.some(
                    (item) =>
                      item._id === service?.serviceId &&
                      item.packageDetails?._id === service?.packageId
                  )}
                />
              );
            })}
          </HorizontalScroll>
        </div>
      </div>}
    </motion.div>
  );
}

export default Home;
