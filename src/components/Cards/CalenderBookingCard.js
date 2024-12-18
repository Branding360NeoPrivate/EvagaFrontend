import React, { useState, useEffect } from "react";
import { MdAccessTime } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { useForm } from "react-hook-form";
import ReusableModal from "../Modal/Modal";

function CalenderBookingCard({ booking }) {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (isEditModalOpen) {
      reset({
        startDate: new Date(booking.startDate).toISOString().split("T")[0],
        endDate: new Date(booking.endDate).toISOString().split("T")[0],
        startTime: booking.startTime,
        endTime: booking.endTime,
      });
    }
  }, [isEditModalOpen, booking, reset]);

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
  };

  const onSubmit = (data) => {
    console.log("Updated Booking Details:", data);
    // Handle the updated booking details here
    handleCloseModal();
  };

  return (
    <div className="bg-textLightGray py-2 px-2 w-full flex flex-col justify-center items-center gap-2 rounded-md ">
      {booking?.startDate && booking?.endDate ? (
        <>
          <div className="flex items-center justify-center self-end gap-1">
            <button onClick={handleEditClick} className="ml-2">
              <FiEdit2 />
            </button>
          </div>
          <div className="grid grid-cols-7 w-full">
            <div className="col-span-3 px-4 py-2 bg-white flex flex-col items-start justify-center text-primary font-medium rounded-md">
              <span className="flex justify-center items-center">
                From: {new Date(booking.startDate).getDate()}{" "}
                {new Date(booking.startDate).toLocaleString("default", {
                  month: "short",
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
                To: {new Date(booking.endDate).getDate()}{" "}
                {new Date(booking.endDate).toLocaleString("default", {
                  month: "short",
                })}
              </span>

              <span className="flex items-center justify-center gap-1 text-base text-primary font-medium">
                <MdAccessTime />
                <p className="text-sm">{booking.endTime}</p>
              </span>
            </div>
          </div>

          {/* Edit Modal */}
          <ReusableModal
            open={isEditModalOpen}
            onClose={handleCloseModal}
            title="Edit Booking"
          >
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
