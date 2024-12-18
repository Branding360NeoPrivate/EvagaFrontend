import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addService,
  fetchVendorProfile,
  fetchVendorProfilePercentage,
} from "../../context/redux/slices/vendorSlice";

import Cookies from "js-cookie";
import ErrorView from "../../components/Errors/ErrorView";
import ServiceCard from "../../components/Cards/ServiceCard";
import Calendar from "react-calendar/dist/cjs/Calendar.js";
import "react-calendar/dist/Calendar.css";
import CalenderBookingCard from "../../components/Cards/CalenderBookingCard";
import Slider from "../../components/Slider/Slider";
import ProfileCard from "../../components/Cards/ProfileCard";
import SelectBookingCard from "../../components/Cards/SelectBookingCard";
import { fetchBanner } from "../../context/redux/slices/bannerSlice";
import axios from "axios";
import useServices from "../../hooks/useServices";
import vendorApi from "../../services/vendorApi";
import { extractDates } from "../../utils/extractDates";
import { useNavigate } from "react-router-dom";
import { internalRoutes } from "../../utils/internalRoutes";

const VendorDashboard = () => {
  const userId = Cookies.get("userId");
  const nevigate = useNavigate();
  const currentDate = new Date(); 
  const [activeMonth, setActiveMonth] = useState(currentDate.getMonth() + 1);
  const [activeYear, setActiveYear] = useState(currentDate.getFullYear());
  const getAllVendorService = useServices(vendorApi.getvendorAllService);
  useEffect(() => {
    const today = new Date();
    setActiveMonth(today.getMonth() + 1);
    setActiveYear(today.getFullYear());
  }, []);

  const handleActiveStartDateChange = ({ activeStartDate }) => {
    if (activeStartDate) {
      setActiveMonth(activeStartDate.getMonth() + 1); // Month is 0-indexed
      setActiveYear(activeStartDate.getFullYear());
    }
  };

  const [isBookingFormVisible, setBookingFormVisible] = useState(false);
  const { profile, profilePercentage, allService, status, error } = useSelector(
    (state) => state.vendor
  );
  const { banner } = useSelector((state) => state.banner);
  const dispatch = useDispatch();
  const getAllVendorServiceHandle = async () => {
    const response = await getAllVendorService.callApi(userId);
    dispatch(addService(response?.services));
  };
  useEffect(() => {
    getAllVendorServiceHandle();
  }, []);
  useEffect(() => {
    const userId = Cookies.get("userId");
    if (userId) {
      if (!profilePercentage) {
        dispatch(fetchVendorProfilePercentage(userId));
      }
      if (!profile) {
        dispatch(fetchVendorProfile(userId));
      }
    }
  }, [dispatch, profile, profilePercentage]);

  useEffect(() => {
    if (!banner || banner.length === 0) {
      dispatch(fetchBanner());
    }
  }, [dispatch, banner]);

  const [activeState, setActivestate] = useState("Services Provided");

  const [blockedDatesFromBackend, setBlockedDatesFromBackend] = useState([]);

  const [bookings, setBookings] = useState([]);

  const serviceData = [
    {
      title: "Wedding Photography",
      yearOfExp: "5",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an",
      category: "Photography",
      InclusionData: [
        "Posed Photos",
        "200-300 Guests",
        "Bridal Portraits",
        "Reception Highlights",
      ],
      DeliverablesData: [
        "2hr Film",
        "100 Photo Album",
        "5 Instagram reels",
        "500 Edited Photos",
      ],
      AddOnData: ["Drone", "Photobooth"],
      price: "101000",
    },
  ];

  const monthlyBookingCalender = useServices(vendorApi.getMonthlyBooking);

  const getMonthlyBookedDates = async () => {
    const userId = Cookies.get("userId");

    const response = await monthlyBookingCalender.callApi(userId, {
      month: activeMonth,
      year: activeYear,
    });
    console.log("response in get monthly booked dates:", response);
    if (response && response.success && response.bookings) {
      setBookings(response.bookings);
      const allDates = response.bookings.map((booking) =>
        extractDates(booking.startDate, booking.endDate)
      );
      const flattenedDates = allDates.flat();

      setBlockedDatesFromBackend(flattenedDates);
    }
  };

  const blockedDates = blockedDatesFromBackend.map((date) => {
    const [year, month, day] = date.split("-");
    return new Date(year, month - 1, day);
  });

  const isBlocked = (date) => {
    return blockedDates.some(
      (blocked) => date.toDateString() === blocked.toDateString()
    );
  };

  useEffect(() => {
    getMonthlyBookedDates();
  }, [activeMonth, activeYear]);

  if (status === "loading" || status === "failed") {
    return <ErrorView status={status} error={error} />;
  }

  return (
    <div className="flex items-center justify-center flex-col w-full gap-2 mt-10 mb-10">
      <div className="w-11/12 flex items-center justify-center h-fit  gap-4">
        <div className="w-[70%] ">
          <Slider bannerData={banner} />
        </div>
        <div className="w-[30%] bg-textLightGray h-[18rem] rounded-md">
          <ProfileCard
            BusinessName={profile?.vendor?.name}
            profilePerccentage={profilePercentage?.profileCompletion}
            profilePic={profile?.vendor?.profilePicture}
            Category={profile?.vendor?.areaOfInterest?.name}
          />
        </div>
      </div>
      <div className="w-[95%] flex items-center justify-center flex-col gap-4">
        <span className="w-full border-b-2 border-[#75757566] flex items-center justify-start gap-2 pb-1">
          <h6
            className={
              activeState == "Services Provided"
                ? "text-primary cursor-pointer font-medium"
                : "text-textSecondary cursor-pointer font-medium"
            }
            onClick={() => setActivestate("Services Provided")}
          >
            Services Provided
          </h6>
          <h6
            className={
              activeState == "Availibility Calendar"
                ? "text-primary cursor-pointer font-medium"
                : "text-textSecondary cursor-pointer font-medium"
            }
            onClick={() => setActivestate("Availibility Calendar")}
          >
            Availibility Calendar
          </h6>
        </span>
        {activeState === "Services Provided" && (
          <div className="w-full flex items-center justfiy-center flex-col gap-4">
            {allService?.length > 0 ? (
              allService.map((item) => (
                <ServiceCard
                  key={item?._id || item?.title}
                  image={
                    item?.services?.[0]?.values?.CoverImage?.[0] ||
                    item?.services?.[0]?.values?.ProductImage?.[0]
                  }
                  title={item?.services?.[0]?.values?.Title}
                  yearofexp={item?.YearofExperience}
                  category={item?.category}
                  desc={item?.AbouttheService}
                  price={item?.services?.[0]?.values?.Price}
                  InclusionData={item?.services?.[0]?.values?.Inclusions}
                  DeliverablesData={item?.services?.[0]?.values?.Deliverables}
                  AddOnData={item?.services?.[0]?.values?.AddOns}
                />
              ))
            ) : (
              <p className="text-textGray text-lg font-medium py-4">
                No Services Listed
              </p>
            )}

            <button
              className="btn-primary w-fit px-4 font-normal"
              onClick={() => nevigate(internalRoutes.vendorCreateservice)}
            >
              Add Service
            </button>
          </div>
        )}
        {activeState === "Availibility Calendar" && (
          <div className="w-full grid grid-cols-5 items-start justfiy-center flex-col gap-4 ">
            <div className="col-span-3 flex items-center justfiy-center">
              <Calendar
                tileClassName={({ date }) =>
                  isBlocked(date) ? "blocked-date" : null
                }
                onActiveStartDateChange={handleActiveStartDateChange}
              />
            </div>
            {!isBookingFormVisible ? (
              <div className=" col-span-2 flex items-center justify-content flex-col w-full border-2 rounded-md p-2 gap-2">
                {bookings && (
                  <div className=" w-full flex flex-col justify-start items-center ">
                    <span className="w-full flex items-start justify-start">
                      <h5 className="text-primary font-semibold text-xl">
                        Already Booked
                      </h5>
                    </span>

                    {activeState === "Availibility Calendar" && bookings && (
                      <div className="w-full flex items-center justify-start flex-col gap-4 pt-2 max-h-[50vh] overflow-y-scroll">
                        {bookings.map((booking) => (
                          <CalenderBookingCard
                            key={booking._id}
                            booking={booking}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <button
                  className="btn-primary w-fit px-4"
                  onClick={() => setBookingFormVisible(true)}
                >
                  Add Booking
                </button>
              </div>
            ) : (
              <div className="col-span-2 flex items-center justify-content flex-col w-full rounded-md gap-2">
                <SelectBookingCard
                  setBookingFormVisible={setBookingFormVisible}
                  getMonthlyBookedDates={getMonthlyBookedDates}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;
