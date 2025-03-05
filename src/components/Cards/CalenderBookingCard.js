import React, { useState, useEffect } from "react";
import { MdAccessTime } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { useForm } from "react-hook-form";
import ReusableModal from "../Modal/Modal";
import useServices from "../../hooks/useServices";
import vendorApi from "../../services/vendorApi";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { formatDate } from "../../utils/formatDate";

function CalenderBookingCard({ booking, getMonthlyBookedDates }) {
  const [modalType, setModalType] = useState("edit");
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const editVendorCalenderBooking = useServices(
    vendorApi.editVendorCalenderBooking
  );

  // console.log("booking in calender booking card:", booking);

  useEffect(() => {
    if (isEditModalOpen) {
      reset({
        startDate: new Date(booking.startDate).toISOString().split("T")[0],
        endDate: new Date(booking.endDate || booking.startDate)
          .toISOString()
          .split("T")[0],
        startTime: booking.startTime,
        endTime: booking.endTime || booking.startTime,
      });
    }
  }, [isEditModalOpen, booking, reset]);

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
  };

  const onSubmit = async (data) => {
    console.log("Updated Booking Details:", data);
    try {
      const response = await editVendorCalenderBooking.callApi(
        booking?._id,
        data
      );

      console.log("response in update booking:", response);

      toast.success(response?.message);
      getMonthlyBookedDates(); // Refresh the monthly booked dates in the dashboard
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
    handleCloseModal();
  };

  return (
    <div className="bg-textLightGray py-2 px-2 w-full flex flex-col justify-center items-center gap-2 rounded-md ">
      {booking?.startDate && (booking?.endDate || booking?.startDate) ? (
        <>
          <div className="flex items-center justify-center text-sm self-end gap-1">
            <button
              onClick={() => [handleEditClick(), setModalType("view")]}
              className="ml-2"
            >
              View
            </button>{" "}
            <button
              onClick={() => [handleEditClick(), setModalType("edit")]}
              className="ml-2"
            >
              <FiEdit2 />
            </button>
          </div>
          <div className="grid grid-cols-7 w-full ">
            <div className="col-span-3 px-4 py-2 bg-white flex flex-col items-start justify-center text-primary font-medium rounded-md">
              <span className="flex justify-center items-center">
                From:{new Date(booking.startDate).getUTCDate()}{" "}
                {new Date(booking.startDate).toLocaleString("default", {
                  month: "short",
                  timeZone: "UTC",
                })}
              </span>

              <span className="flex items-center justify-center gap-1 text-base text-primary font-medium">
                <MdAccessTime />
                <p className="text-sm">{booking.startTime}</p>
              </span>
            </div>
            <span className="col-span-1 flex justify-center items-center">
              -
            </span>
            <div className="col-span-3 px-4 py-2 bg-white flex flex-col items-start justify-center text-primary font-medium rounded-md">
              <span className="flex justify-center items-center">
                To:{" "}
                {new Date(booking.endDate || booking?.startDate).getUTCDate()}{" "}
                {new Date(booking.endDate || booking?.startDate).toLocaleString(
                  "default",
                  {
                    month: "short",
                    timeZone: "UTC",
                  }
                )}
              </span>

              <span className="flex items-center justify-center gap-1 text-base text-primary font-medium">
                <MdAccessTime />
                <p className="text-sm">
                  {booking.endTime || booking?.startTime}
                </p>
              </span>
            </div>
          </div>

          {/* Edit Modal */}
          <ReusableModal
            open={isEditModalOpen}
            onClose={handleCloseModal}
            title={modalType === "edit" ? "Edit Booking" : "View Booking"}
          >
            {modalType === "edit" && (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className=" flex flex-col gap-4"
              >
                <div className=" grid grid-cols-2">
                  <label>Start Date: </label>
                  <input
                    className=" outline rounded-md px-2"
                    type="date"
                    {...register("startDate")}
                  />
                </div>
                <div className=" grid grid-cols-2">
                  <label>Start Time: </label>
                  <input
                    className=" outline rounded-md px-2"
                    type="time"
                    {...register("startTime")}
                  />
                </div>
                <div className=" grid grid-cols-2">
                  <label>End Date: </label>
                  <input
                    className=" outline rounded-md px-2"
                    type="date"
                    {...register("endDate")}
                  />
                </div>
                <div className=" grid grid-cols-2">
                  <label>End Time: </label>
                  <input
                    className=" outline rounded-md px-2"
                    type="time"
                    {...register("endTime")}
                  />
                </div>
                <br />
                <button type="submit" className="btn-primary">
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="border-2 border-primary py-1 text-primary hover:bg-primary hover:text-white 
                font-semibold rounded-md"
                >
                  Cancel
                </button>
              </form>
            )}
            {modalType === "view" && (
              <div className="modal-content bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto">
                <h2 className="modal-title text-xl font-bold mb-4 text-primary">
                  Booking Details
                </h2>
                <div className="booking-info space-y-3">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-gray-900">
                      Booked By:
                    </span>{" "}
                    <span className="text-gray-800">
                      {!booking.bookedByVendor ? "User" : "Vendor"}
                    </span>
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-gray-900">
                      Start Date:
                    </span>{" "}
                    <span className="text-gray-800">
                      {formatDate(booking.startDate) || "N/A"}
                    </span>
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-gray-900">
                      Start Time:
                    </span>{" "}
                    <span className="text-gray-800">
                      {booking.startTime || "N/A"}
                    </span>
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-gray-900">
                      User Address:
                    </span>{" "}
                    <span className="text-gray-800">
                      {booking.address ? (
                        <>
                          {booking.address.name}, {booking.address.address},{" "}
                          {booking.address.addressLine1},{" "}
                          {booking.address.addressLine2},{" "}
                          {booking.address.state}, {booking.address.pinCode}
                        </>
                      ) : (
                        "N/A"
                      )}
                    </span>
                  </p>
                </div>
                <button
                  className="mt-6 w-full bg-primary hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-all"
                  onClick={handleCloseModal} // Ensure you handle closing the modal
                >
                  Close
                </button>
              </div>
            )}
          </ReusableModal>
        </>
      ) : (
        "No Booking Found"
      )}
    </div>
  );
}

export default CalenderBookingCard;

//Prevvious Design:

// return (
//   <div className="bg-textLightGray grid grid-cols-3 gap-1 py-2 px-2 w-full">
//     {booking?.startDate && booking?.endDate ? (
//       <>
//         <span className="px-4 py-2 bg-white flex items-center justify-center text-primary font-medium w-[80%] rounded-md">
//           {new Date(booking.startDate).getDate()} <br />{" "}
//           {new Date(booking.startDate).toLocaleString("default", {
//             month: "short",
//           })}
//         </span>
//         <div className="col-span-2 flex items-center justify-center gap-1">
//           <span className="flex items-center justify-center gap-1 text-base text-primary font-medium">
//             <MdAccessTime />
//             <p className="text-sm">{booking.startTime}</p>
//           </span>
//           -
//           <span className="flex items-center justify-center gap-1 text-base text-primary font-medium">
//             <MdAccessTime />
//             <p className="text-sm">{booking.endTime}</p>
//           </span>
//           <button onClick={handleEditClick} className="ml-2">
//             <FiEdit2 />
//           </button>
//         </div>

//         {/* Edit Modal */}
//         <ReusableModal
//           open={isEditModalOpen}
//           onClose={handleCloseModal}
//           title="Edit Booking"
//         >
//           {/* Add form or content to edit booking details here */}
//           <p>Edit booking details for ID: {booking._id}</p>
//           <button onClick={handleCloseModal}>Close</button>
//         </ReusableModal>
//       </>
//     ) : (
//       "No Booking Found"
//     )}
//   </div>
// );
