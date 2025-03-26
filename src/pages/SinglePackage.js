import React, { useEffect, useState } from "react";
import AddorBuyCard from "../components/Cards/AddorBuyCard";
import ServiceDetailCard from "../components/Cards/ServiceDetailCard";
import ImageNavigationCard from "../components/Cards/ImageNavigationCard";
import { useParams } from "react-router-dom";
import useServices from "../hooks/useServices";
import packageApis from "../services/packageApis";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import userApi from "../services/userApi";
import Cookies from "js-cookie";
import { fetchUserCart } from "../context/redux/slices/cartSlice";
import { toast } from "react-toastify";
import BackButton from "../utils/globalBackButton";
function SinglePackage() {
  const userId = Cookies.get("userId");
  const { serviceId, packageId } = useParams();
  const [images, setImages] = useState([]);
  const { allWishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const getAllPackages = useServices(packageApis.getOnePackage);
  const addToCartApi = useServices(userApi.addPackageToUserCart);
  const AddRecentViewApi = useServices(userApi.AddRecentView);
  const dispatch = useDispatch();
  const [singlePageData, setSinglePageData] = useState();
  const [packageIncartStatus, setPackageIncartStatus] = useState(false);
  const [packageIncartData, setPackageIncartData] = useState(null);
  const [vendorProfile, setVendorProfile] = useState({
    name: "",
    bio: "",
    vendorId: "",
  });
  const [packageCategory, setpackageCategory] = useState({
    category: "",
    subcategory: "",
  });
  const AddRecentViewApiHandle = async () => {
    const formdata = new FormData();
    formdata.append("userId", userId);
    formdata.append("packageId", packageId);
    formdata.append("serviceId", serviceId);
    const response = await AddRecentViewApi.callApi(formdata);
    console.log(response);
  };
  useEffect(() => {
    if (!!userId && !!serviceId && !!packageId) {
      AddRecentViewApiHandle();
    }
  }, [userId, packageId, serviceId]);

  const handlegetOnePackage = async () => {
    const response = await getAllPackages.callApi(serviceId, packageId);
    setSinglePageData(response && response?.data);
    setpackageCategory({
      ...packageCategory,
      category: response.category.name,
    });
    setVendorProfile({
      ...vendorProfile,
      name: response.getVendorDetails.userName,
      bio: response.getVendorDetails.bio,
      vendorId: response.data.vendorId,
    });
    const allMedia = [];
    if (response?.data?.services?.[0]?.values?.CoverImage) {
      const coverImage = response.data.services[0].values.CoverImage;
      if (Array.isArray(coverImage)) {
        allMedia.push(...coverImage);
      } else {
        allMedia.push(coverImage);
      }
    }
    if (response?.data?.services?.[0]?.values?.ProductImage) {
      const ProductImage = response.data.services[0].values.ProductImage;
      if (Array.isArray(ProductImage)) {
        allMedia.push(...ProductImage);
      } else {
        allMedia.push(ProductImage);
      }
    }

    if (response?.data?.services?.[0]?.values?.Portfolio?.photos) {
      const photos = response.data.services[0].values.Portfolio.photos;
      if (Array.isArray(photos)) {
        allMedia.push(...photos);
      } else {
        allMedia.push(photos);
      }
    }

    if (response?.data?.services?.[0]?.values?.Portfolio?.videos) {
      const videos = response.data.services[0].values.Portfolio.videos;
      if (Array.isArray(videos)) {
        allMedia.push(...videos);
      } else {
        allMedia.push(videos);
      }
    }

    setImages(allMedia);
  };
  useEffect(() => {
    if (userId && (!cart || cart.length === 0)) {
      dispatch(fetchUserCart({ userId })).then((response) => {
        if (!response || response.length === 0) {
          console.log("Server response is empty. No cart items fetched.");
        }
      });
    }
  }, [userId, cart, dispatch]);
  useEffect(() => {
    handlegetOnePackage();
  }, [serviceId, packageId]);

  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  const addTocartHandle = async (
    defaultPrice,
    selectedsession,
    date,
    time,
    pincode,securityAmount,setupPrice
  ) => {
    try {
      const formData = new FormData();
      formData.append("serviceId", serviceId);
      formData.append("packageId", packageId);
      formData.append("date", date);
      formData.append("time", time);
      formData.append("pincode", pincode);
      formData.append("vendorId", vendorProfile?.vendorId);
      formData.append("defaultPrice", Number(defaultPrice));
      formData.append("setupCost", Number(setupPrice));
      formData.append("security", Number(securityAmount));
      formData.append("selectedSessions", JSON.stringify(selectedsession));

      const response = await addToCartApi.callApi(userId, formData);

      dispatch(fetchUserCart({ userId })).then((response) => {
        if (!response || response.length === 0) {
          console.log("Server response is empty. No cart items fetched.");
        }
      });
    } catch (error) {
      console.error("An error occurred while adding to cart:", error);
    }
  };

  const isPackageInCart = (cart, serviceId, packageId) => {
    const exists = cart?.items?.some(
      (item) => item?.serviceId === serviceId && item?.packageId === packageId
    );
    setPackageIncartStatus(exists);
    const selectedItem = cart?.items?.find(
      (item) => item?.serviceId === serviceId && item?.packageId === packageId
    );
    setPackageIncartData(selectedItem || null);
    return exists;
  };

  useEffect(() => {
    isPackageInCart(cart, serviceId, packageId);
  }, [serviceId, packageId, cart]);

  return (
    <motion.div
      className="w-full min-h-[70vh] flex flex-col md:flex-row md:flex-wrap md:w-[90%] lg:w-full gap-2  pb-4 items-start justify-center md:justify-between px-5 lg:px-6 py-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        opacity: { duration: 0.8, ease: "easeInOut" },
        scale: { duration: 0.5, ease: "easeOut" },
      }}
    >
      <div
        className=" flex justify-center md:justify-start items-start flex-col w-full flex-1 2xl:w-[40%] min-w-[300px]"
        // style={{ flex: "0.35" }}
      >
        <BackButton />
        <ImageNavigationCard
          mediaUrls={images}
          selectedUrl={selectedImage}
          onMediaClick={handleImageClick}
        />
        <span className="pl-[5%] md:pl-[22%] pt-2">
          <h3 className="text-normal font-medium text-primary">
            About the Service
          </h3>
          <p className="text-textGray text-sm">
            {singlePageData?.AbouttheService}
          </p>
        </span>
      </div>

      <div
        className="flex flex-col items-center justify-center md:justify-center md:min-w-[330px] w-full flex-1 lg:p-4 mb-10 lg:mb-0"
        // style={{ flex: "0.32" }}
      >
        <ServiceDetailCard
          title={
            singlePageData?.services?.[0]?.values?.Title ||
            singlePageData?.services?.[0]?.values?.VenueName ||
            singlePageData?.services?.[0]?.values?.FoodTruckName
          }
          category={packageCategory.category}
          rating={0}
          reviews={0}
          DataToRender={singlePageData?.services?.[0]?.values}
          experience={singlePageData?.YearofExperience}
          companyName={vendorProfile.name}
          price={
            singlePageData?.services?.[0]?.values?.Price ||
            singlePageData?.services?.[0]?.values?.price ||
            singlePageData?.services?.[0]?.values?.Pricing ||
            singlePageData?.services?.[0]?.values?.Package?.[0]?.Rates ||
            singlePageData?.services?.[0]?.values?.[
              "OrderQuantity&Pricing"
            ]?.[0]?.Rates ||
            singlePageData?.services?.[0]?.values?.["Duration&Pricing"]?.[0]
              ?.Amount ||
            singlePageData?.services?.[0]?.values?.["SessionLength"]?.[0]
              ?.Amount ||
            singlePageData?.services?.[0]?.values?.[
              "SessionLength&Pricing"
            ]?.[0]?.Amount ||
            singlePageData?.services?.[0]?.values?.["QtyPricing"]?.[0]?.Rates
          }
          eventData={singlePageData?.services?.[0]?.values?.EventType}
          tAndC={
            singlePageData?.services?.[0]?.values?.["Terms&Conditions"]
              ? singlePageData?.services?.[0]?.values?.["Terms&Conditions"]
              : ""
          }
          isFavourite={allWishlist?.some(
            (item) =>
              item._id === singlePageData?._id &&
              item.packageDetails?._id === singlePageData?.services?.[0]?._id
          )}
          serviceId={singlePageData?._id}
          packageId={singlePageData?.services?.[0]?._id}
        />
      </div>

      <div
        className="flex justify-center md:justify-center items-center w-full flex-1"
        // style={{ flex: "0.28" }}
      >
        <AddorBuyCard
          key={"index"}
          price={""}
          pincode={""}
          addonsPrice={""}
          addonsDetails={""}
          bio={vendorProfile.bio}
          renderPrice={singlePageData?.services?.[0]?.values}
          addTocart={addTocartHandle}
          packageIncart={packageIncartStatus}
          packageIncartData={packageIncartData}
          serviceId={serviceId}
          packageId={packageId}
        />
      </div>
    </motion.div>
  );
}

export default SinglePackage;
