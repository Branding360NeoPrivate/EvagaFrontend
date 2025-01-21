import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanner } from "../context/redux/slices/bannerSlice";
import Slider from "../components/Slider/Slider";
import CategoryImage from "../assets/CategoryImages/Vector.png";
import CategoryDisplayCard from "../components/Cards/CategoryDisplayCard";
import ProductCard from "../components/Cards/ProductCard";
import PopularImage from "../assets/PopularImages/image.png";
import RecentlyViewedCard from "../components/Cards/RecentlyViewedCard";
import RecentImage from "../assets/RecentlyViewed/RecentImg.png";
import NavImage from "../assets/ImageNavImgs/image.png";
import ImageNavigationCard from "../components/Cards/ImageNavigationCard";
import ServiceDetailCard from "../components/Cards/ServiceDetailCard";
import AddorBuyCard from "../components/Cards/AddorBuyCard";
import FilterCard from "../components/Cards/FilterCard";
import SortandFilterCard from "../components/Cards/SortAndFilterCard";
import ProductDisplayCard from "../components/Cards/ProductDisplayCard";
import { fetchCategories } from "../context/redux/slices/categorySlice";
import packageApis from "../services/packageApis";
import useServices from "../hooks/useServices";
import { addPackage } from "../context/redux/slices/packageSlice";
import HorizontalScroll from "../utils/HorizontalScroll";
import { useNavigate } from "react-router-dom";
import { internalRoutes } from "../utils/internalRoutes";
import { Link } from "react-alice-carousel";

function Home() {
  const { banner } = useSelector((state) => state.banner);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { allPackages } = useSelector((state) => state.package);
  const getAllPackages = useServices(packageApis.getAllPackage);
  const history = useNavigate();
  const handleGetAllPackages = async () => {
    const response = await getAllPackages.callApi();
    dispatch(addPackage(response?.data));
  };

  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);
  useEffect(() => {
    if (!allPackages || allPackages.length === 0) {
      handleGetAllPackages();
    }
  }, [dispatch, allPackages]);

  useEffect(() => {
    if (!banner || banner.length === 0) {
      dispatch(fetchBanner());
    }
  }, [dispatch, banner]);

  const images = [
    NavImage,
    NavImage,
    NavImage,
    NavImage,
    NavImage,
    NavImage,
    NavImage,
    NavImage,
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

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

  // Mock data
  // State for products

  // Handle Sorting

  // Update filters when checkboxes are clicked

  return (
    <div className=" flex flex-col justify-center items-center gap-4 w-full">
      <div className="flex justify-center items-center contain-content w-[100%]">
        <Slider bannerData={banner} />
      </div>
      <div className="w-[95%]  mx-12 gap-4">
        <h2 className="sub_heading">Browse by Category</h2>
        <div className="flex flex-row gap-5 overflow-x-scroll no-scrollbar box-border">
          <HorizontalScroll speed={1} className="flex flex-row gap-4">
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
            {allPackages.map((service, index) => (
              <ProductCard
                key={service?._id}
                popularimage={
                  process.env.REACT_APP_API_Image_BASE_URL +
                  `${
                    service.serviceDetails?.values?.CoverImage ||
                    service.serviceDetails?.values?.ProductImage?.[0]
                  }`
                }
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
                  service.serviceDetails?.values?.["OrderQuantity&Pricing"]?.[0]
                    ?.Rates ||
                  service.serviceDetails?.values?.["Duration&Pricing"]?.[0]
                    ?.Amount ||
                  service.serviceDetails?.values?.["SessionLength"]?.[0]?.Amount||
                  service.serviceDetails?.values?.["QtyPricing"]?.[0]?.Rates
                }
                rating={0}
                reviews={0}
                onClick={() =>
                  history(
                    `${internalRoutes.SinglePackage}/${service?._id}/${service?.serviceDetails?._id}`
                  )
                }
              />
            ))}
          </HorizontalScroll>
        </div>
      </div>
      {/* <div className="w-11/12 overflow-x-scroll no-scrollbar box-border mx-12">
        <div className="flex flex-row gap-5 p-5">
          {recentData.map((card, index) => (
            <RecentlyViewedCard
              key={index}
              recentimage={card.pic}
              title={card.title}
              category={card.category}
              price={card.price}
              rating={card.rating}
              reviews={card.reviews}
            />
          ))}
        </div>
      </div> */}
    </div>
  );
}

export default Home;
