import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { internalRoutes } from "../utils/internalRoutes";
import CouponCard from "../components/Cards/CouponCard";
import AddressSelector from "../components/Cards/AddressSelector";
import CheckOutCard from "../components/Cards/CheckOutCard";
function CheckOut() {
  const { auth } = useAuth();
  const history = useNavigate();
  if (!auth?.isAuthenticated || auth?.role !== "user") {
    return (
      <motion.div
        className="flex items-center justify-center flex-col gap-3 w-full h-[50vh]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{
          opacity: { duration: 0.8, ease: "easeInOut" },
          scale: { duration: 0.5, ease: "easeOut" },
        }}
      >
        <p className="text-primary text-xl text-textGray">
          Please Login To See Your Cart!
        </p>
        <button
          className="btn-primary w-fit px-4"
          onClick={() => history(internalRoutes.userLogin)}
        >
          Login
        </button>
      </motion.div>
    );
  }
  return (
    <div className="w-full px-[2.5%] py-[2%] flex flex-col md:flex-row gap-4 justify-between">
      <div className="flex-1 md:flex-[0.72] flex flex-col gap-4 w-full">
        <AddressSelector/>
        <div className="flex flex-col gap-2">
            <CheckOutCard/>
        </div>
      </div>
      <div className="flex-1 md:flex-[0.23] w-full">
       <CouponCard/>
      </div>
    </div>
  );
}

export default CheckOut;
