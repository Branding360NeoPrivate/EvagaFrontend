import React, { useEffect, useState } from "react";
import AddorBuyCard from "../components/Cards/AddorBuyCard";
import ServiceDetailCard from "../components/Cards/ServiceDetailCard";
import ImageNavigationCard from "../components/Cards/ImageNavigationCard";
import { useParams } from "react-router-dom";
import useServices from "../hooks/useServices";
import packageApis from "../services/packageApis";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
function SinglePackage() {
  const { serviceId, packageId } = useParams();
  const [images, setImages] = useState([]);
  const { allWishlist } = useSelector((state) => state.wishlist);
  const getAllPackages = useServices(packageApis.getOnePackage);
  const [singlePageData, setSinglePageData] = useState();
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

    // Collect CoverImage
    if (response?.data?.services?.[0]?.values?.CoverImage) {
      const coverImage = response.data.services[0].values.CoverImage;
      if (Array.isArray(coverImage)) {
        allMedia.push(...coverImage);
      } else {
        allMedia.push(coverImage);
      }
    }

    // Collect Portfolio.photos
    if (response?.data?.services?.[0]?.values?.Portfolio?.photos) {
      const photos = response.data.services[0].values.Portfolio.photos;
      if (Array.isArray(photos)) {
        allMedia.push(...photos);
      } else {
        allMedia.push(photos);
      }
    }

    // Collect Portfolio.videos
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
    handlegetOnePackage();
  }, [serviceId, packageId]);

  const weddingPhotographyData = [
    {
      title: "Wedding Photography",
      category: "Photography",
      rating: 3.9,
      reviews: 353,
      experience: 5,
      companyName: "Geeta Pvt Ltd.",
      price: "₹ 1,01,000.00",
      eventData: ["Weddings", "Engagement"],
      inclusionData: [
        "Posed Photos",
        "Bridal Portraits",
        "Reception Highlights",
      ],
      deliverableData: [
        "500 Edited Photos",
        "2hr Wedding Film",
        "100 Photo Album Book",
        "5 Instagram reels",
      ],
      terms: [
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        "It has survived not only five centuries.",
      ],
    },
  ];
  const AddorBuyDetails = [
    {
      price: "₹1,01,000.00",
      pincode: "123456",
      addonsPrice: "10,000.00",
      addonsDetails: [
        { title: "Drone", description: "Sky drone for aerial shots" },
        { title: "Lighting Setup", description: "Professional lighting setup" },
      ],
    },
  ];
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

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
        style={{ flex: "0.4" }}
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
          title={singlePageData?.services?.[0]?.values?.Title}
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
        />
      </div>
    </motion.div>
  );
}

export default SinglePackage;
