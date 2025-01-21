import React, { useCallback, useEffect, useState } from "react";
import FilterCard from "../components/Cards/FilterCard";
import SortandFilterCard from "../components/Cards/SortAndFilterCard";
import NavImage from "../assets/ImageNavImgs/image.png";
import ProductDisplayCard from "../components/Cards/ProductDisplayCard";
import useServices from "../hooks/useServices";
import packageApis from "../services/packageApis";
import useDebounce from "../utils/useDebounce";
import { useSelector } from "react-redux";
import CustomPagination from "../utils/CustomPagination";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { internalRoutes } from "../utils/internalRoutes";
function SearchResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchResult, setSearchResult] = useState([]);
  const [pages, setPages] = useState({
    currentPage: 1,
    totalPages: 0,
    totalData: 0,
  });
  const mockData = [
    {
      id: 1,
      image: NavImage,
      title: "Wedding Photography",
      category: "Photography and Videography",
      vendor: "Geeta Pvt Ltd",
      inclusions: ["Posed Photos", "200-300 Guests", "Bridal Portraits"],
      deliverables: ["2hr Film", "100 Photo Album", "5 Instagram reels"],
      addOns: ["Drone", "Photobooth"],
      price: 1500,
      rating: 3.9,
      reviews: 353,
    },
    {
      id: 2,
      image: NavImage,
      title: "Outdoor Photography",
      category: "Photography and Videography",
      vendor: "Dream Lens Pvt Ltd",
      inclusions: ["Candid Shots", "50-100 Guests", "Ceremony Highlights"],
      deliverables: ["1hr Film", "50 Photo Album"],
      addOns: ["Lighting", "Decor Photos"],
      price: 3000,
      rating: 4.5,
      reviews: 250,
    },
    {
      id: 3,
      image: NavImage,
      title: "Event Photography",
      category: "Photography and Videography",
      vendor: "Moments Studio",
      inclusions: ["Candid Shots", "100-200 Guests", "Group Portraits"],
      deliverables: ["1hr Film", "200 Photo Album"],
      addOns: ["Editing", "Special Effects"],
      price: "1,11,000",
      rating: 4.8,
      reviews: 120,
    },
  ];

  const [filters, setFilters] = React.useState({
    eventTypes: [],
    locationTypes: [],
    priceRange: [0, 1000000],
  });
  const [activeFilters, setActiveFilters] = useState([]);
  const handleFilterChange = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    const updatedActiveFilters = [
      ...new Set([
        ...updatedFilters.eventTypes,
        ...updatedFilters.locationTypes,
      ]),
    ];
    setActiveFilters(updatedActiveFilters);
  };

  const handleSliderChange = (newValue) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: newValue,
    }));
  };
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    Cookies.get("selectedCategoryId") || "all"
  );
  const [sortvalue, setSortValue] = useState("asc");
  const { searchTerm } = useSelector((state) => state.userSearch);
  const debounce = useDebounce(searchTerm);
  const getAllPackages = useServices(packageApis.getAllPackage);
  const handlePageChange = (event, value) => {
    setPages({ ...pages, currentPage: value });
  };
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category") || "all";
    const page = parseInt(params.get("page"), 10) || 1;

    setSelectedCategoryId(category);
    setPages((prev) => ({ ...prev, currentPage: page }));
  }, [location.search]);
  const handleGetAllPackages = useCallback(async () => {
    const queryParams = {
      category: selectedCategoryId,
      search: debounce || "",
      page: pages.currentPage || 1,
      sortOrder: sortvalue || "asc",
      eventTypes: filters?.eventTypes || [],
      locationTypes: filters?.locationTypes || [],
      priceRange: filters?.priceRange || [],
    };

    try {
      const response = await getAllPackages.callApi(queryParams);
      setSearchResult(response && response?.data);
      setPages({
        ...pages,
        currentPage: response?.currentPage || 1,
        totalData: response?.total || 0,
        totalPages: response?.totalPages || 1,
      });
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  }, [debounce, pages.currentPage, selectedCategoryId, sortvalue,filters?.eventTypes,filters?.locationTypes,filters?.priceRange]);

  useEffect(() => {
    if (debounce) {
      handleGetAllPackages();
    }
  }, [debounce, handleGetAllPackages, pages.currentPage]);
  useEffect(() => {
    if (!debounce) {
      handleGetAllPackages();
    }
  }, [handleGetAllPackages, pages.currentPage]);
  useEffect(() => {
    const handleCookieChange = () => {
      const currentCategory = Cookies.get("selectedCategoryId") || "all";
      setSelectedCategoryId((prev) =>
        prev !== currentCategory ? currentCategory : prev
      );
    };

    const onCookieChange = (e) => {
      if (e.detail.key === "selectedCategoryId") {
        handleCookieChange();
      }
    };

    window.addEventListener("cookieChange", onCookieChange);

    return () => {
      window.removeEventListener("cookieChange", onCookieChange);
    };
  }, []);
  Cookies.set = ((originalSet) => {
    return (...args) => {
      const result = originalSet.apply(Cookies, args);

      const event = new CustomEvent("cookieChange", {
        detail: { key: args[0], value: args[1] },
      });
      window.dispatchEvent(event);

      return result;
    };
  })(Cookies.set);
  useEffect(() => {
    console.log(filters);
  }, [filters]);
  return (
    <div className="w-full flex items-center flex-col justify-center">
      <div className="flex md:flex-row flex-col w-11/12 relative">
        <div className="w-1/4 px-4 py-2 sticky top-0 sticky top-[10%] self-start">
          <FilterCard
            filters={filters}
            onFilterChange={handleFilterChange}
            onSliderChange={handleSliderChange}
          />
        </div>

        <div className="flex flex-col w-3/4 mt-6">
          <div className="w-full px-4 pt-2">
            <SortandFilterCard
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
              filters={filters}
              setFilters={setFilters}
              setSortValue={setSortValue}
            />
          </div>

          <div className="w-full px-4 pb-2">
            <div className="flex flex-col gap-6">
              {searchResult?.length > 0 ? (
                searchResult.map((item) => (
                  <ProductDisplayCard
                    key={item?.serviceDetails?._id || item?.title}
                    image={
                      item?.serviceDetails?.values?.CoverImage?.[0] ||
                      item?.serviceDetails?.values?.ProductImage?.[0]
                    }
                    title={
                      item?.serviceDetails?.values?.Title ||
                      item?.serviceDetails?.values?.FoodTruckName ||
                      item?.serviceDetails?.values?.VenueName
                    }
                    category={item?.categoryName}
                    eventData={item?.serviceDetails}
                    onClick={() =>
                      navigate(
                        `${internalRoutes.SinglePackage}/${item?._id}/${item?.serviceDetails?._id}`
                      )
                    }
                  />
                ))
              ) : (
                <p className="w-full flex items-center justify-center  py-6 text-textGray">
                  No Search Found With This KeyWord
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {searchResult?.length > 0 && (
        <CustomPagination
          totalPage={pages.totalPages}
          currentPage={pages?.currentPage}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default SearchResultPage;
