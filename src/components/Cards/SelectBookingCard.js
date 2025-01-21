import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useServices from "../../hooks/useServices";
import vendorApi from "../../services/vendorApi";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
function SelectBookingCard({ setBookingFormVisible, getMonthlyBookedDates, }) {
  const blockCalender = useServices(vendorApi.addVendorBooking);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [bookingType, setBookingType] = useState("fullyBooked");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const handleBookingTypeChange = (type) => {
    setBookingType(type);

    if (type === "fullyBooked") {
      setValue("startTime", "00:00");
      setValue("endTime", "23:59");
    } else {
      setValue("startTime", "");
      setValue("endTime", "");
    }
  };

  const onSubmit = async (data) => {
    console.log("Form Submitted:", data);

    try {
      const finalData = {
        ...data,
        userID: null,
        bookedByVendor: true,
      };
      const userId = Cookies.get("userId");
      const response = await blockCalender.callApi(userId, finalData);


      toast.success(response?.message);
      setBookingFormVisible(false)
      getMonthlyBookedDates(); 
    } catch (error) {
      console.log(error);

      if (error.message) {
        toast.error(error.message);
      } else if (error.data && error.data.message) {
        toast.error(error.data.message);
      } else {
        toast.error("An error occurred while booking.");
      }
    }
  };

  return (
    <div className="flex items-center justify-content flex-col w-full border-2 rounded-md p-2 gap-4">
      <span className="w-full flex items-start justify-start">
        <h5 className="text-primary font-semibold text-xl">
          Select Availibility
        </h5>
      </span>
      <form
        className="flex w-full flex-col gap-3"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <div className="flex items-center justfiy-center gap-4  w-full">
          <label className="text-primary flex items-center justify-center gap-2 font-semibold">
            <input
              type="radio"
              name="availability"
              value="fullyBooked"
              checked={bookingType === "fullyBooked"}
              onChange={() => handleBookingTypeChange("fullyBooked")}
            />
            Fully Booked
          </label>
          <label className="text-primary flex items-center justify-center gap-2 font-semibold">
            <input
              type="radio"
              name="availability"
              value="partlyBooked"
              checked={bookingType === "partlyBooked"}
              onChange={() => handleBookingTypeChange("partlyBooked")}
            />
            Partly Booked
          </label>
        </div>
        <div className="date-time-picker bg-textLightGray w-full px-2 py-1 rounded flex flex-col gap-1 ">
          <div className="grid grid-cols-4 items-center justify-start  gap-4">
            <label>From</label>
            <span className="col-span-3 flex items-center justify-start  gap-2 px-2 py-1 bg-white">
              <input
                type="date"
                {...register("startDate", {
                  required: "From date is required",
                  onChange: (e) => setSelectedStartDate(e.target.value), // Update state on change
                })}
                className={`border ${errors.fromDate ? "border-red-500" : ""} `}
              />
              <input
                type="time"
                defaultValue="00:00"
                {...register("startTime", {
                  required: "Start time is required",
                  onChange: (e) => setSelectedStartTime(e.target.value), // Update state on change
                })}
                className={`border ${
                  errors.startTime ? "border-red-500" : ""
                } `}
              />
            </span>
          </div>
          <div className="grid grid-cols-4 items-center justify-start  gap-4">
            <label>To</label>
            <span className="col-span-3 flex items-center justify-start  gap-2 px-2 py-1 bg-white">
              <input
                type="date"
                {...register("endDate", { required: "To date is required" })}
                className={`border ${errors.toDate ? "border-red-500" : ""} `}
                min={selectedStartDate} // Prevent selecting an end date earlier than the start date
              />
              <input
                type="time"
                defaultValue="23:59"
                {...register("endTime", { required: "End time is required" })}
                className={`border ${errors.endTime ? "border-red-500" : ""} `}
                min={selectedStartTime} // Prevent selecting an end time earlier than the start time
              />
            </span>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4 w-full">
          <button
            className="btn-transparent-border"
            onClick={() => setBookingFormVisible(false)}
          >
            Cancel
          </button>
          <button className="btn-primary">Add</button>
        </div>
      </form>
    </div>
  );
}

export default SelectBookingCard;
