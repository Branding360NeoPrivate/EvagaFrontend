import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegCircleCheck } from "react-icons/fa6";

// Centralized Notification Service
const notificationService = {
  success: (message) =>
    toast.success(message, {
      position: "top-right",
      //   className: "bg-white text-black rounded-lg shadow-lg border p-3",
      icon: <FaRegCircleCheck className=" text-xl" />,
    }),
  error: (message) =>
    toast.error(message, {
      position: "top-right",
      //   className: "bg-red-500 text-white rounded-lg shadow-lg border p-3",
      icon: "❌",
    }),
  warning: (message) =>
    toast.warning(message, {
      position: "top-right",
      //   className: "bg-yellow-400 text-black rounded-lg shadow-lg border p-3",
      icon: "⚠️",
    }),
};

export default notificationService;
