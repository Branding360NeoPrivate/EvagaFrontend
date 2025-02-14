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
function SinglePackage() {
  const userId = Cookies.get("userId");
  const { serviceId, packageId } = useParams();
  const [images, setImages] = useState([]);
  const { allWishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const getAllPackages = useServices(packageApis.getOnePackage);
  const addToCartApi = useServices(userApi.addPackageToUserCart);
  const dispatch = useDispatch();
  const [singlePageData, setSinglePageData] = useState();
  const [packageIncartStatus, setPackageIncartStatus] = useState(false);
  const [vendorProfile, setVendorProfile] = useState({ name: "", bio: "" });
  const [packageCategory, setpackageCategory] = useState({
    category: "",
    subcategory: "",
  });
  const handlegetOnePackage = async () => {
    const response = await getAllPackages.callApi(serviceId, packageId);
    setSinglePageData(response && response?.data);
    setpackageCategory({
      ...packageCategory,
      category: response.category.name,
    });
    setVendorProfile({
      ...vendorProfile,
      name: response.getVendorDetails.name,
      bio: response.getVendorDetails.bio,
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
      dispatch(fetchUserCart(userId)).then((response) => {
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
  const addTocartHandle = async (defaultPrice, selectedsession, addOns) => {
    try {
      console.log(defaultPrice, selectedsession);

      const formData = new FormData();
      formData.append("serviceId", serviceId);
      formData.append("packageId", packageId);
      formData.append("defaultPrice", defaultPrice);
      formData.append("selectedSessions", JSON.stringify(selectedsession));
      formData.append("addons", addOns);

      const response = await addToCartApi.callApi(userId, formData);

      if (!response) {
        console.error("Failed to add to cart: No response from the API.");
        return;
      }

      // Fetch updated cart
      const cartResponse = await dispatch(fetchUserCart(userId));
      if (!cartResponse || cartResponse.length === 0) {
        console.log("Server response is empty. No cart items fetched.");
      }
      toast.success("Item Added To Cart");
    } catch (error) {
      console.error("An error occurred while adding to cart:", error);
    }
  };

  const isPackageInCart = (cart, serviceId, packageId) => {
    return setPackageIncartStatus(
      cart?.items?.some(
        (item) => item?.serviceId === serviceId && item?.packageId === packageId
      )
    );
  };

  useEffect(() => {
    isPackageInCart(cart, serviceId, packageId);
  }, [serviceId, packageId, cart]);

  return (
    <motion.div
      className="w-full flex md:flex-row flex-col  pb-4 items-start justify-between px-6 py-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        opacity: { duration: 0.8, ease: "easeInOut" },
        scale: { duration: 0.5, ease: "easeOut" },
      }}
    >
      <div
        className=" flex justify-center items-start flex-col"
        style={{ flex: "0.35" }}
      >
        <ImageNavigationCard
          mediaUrls={images}
          selectedUrl={selectedImage}
          onMediaClick={handleImageClick}
        />
        <span className="pl-[22%]">
          <h3 className="text-xl font-medium text-primary">
            About the Service
          </h3>
          <p className="text-textGray text-sm">
            {singlePageData?.AbouttheService}
          </p>
        </span>
      </div>

      <div
        className="flex flex-col items-center justify-center p-4"
        style={{ flex: "0.32" }}
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
        className="flex justify-center items-center"
        style={{ flex: "0.28" }}
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
        />
      </div>
    </motion.div>
  );
}

export default SinglePackage;
