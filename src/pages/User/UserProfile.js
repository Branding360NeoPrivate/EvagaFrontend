import React, { useEffect } from "react";
import EditButton from "../../assets/Temporary Images/pen-square 1.png";
import DeleteButton from "../../assets/Temporary Images/rectangle-xmark 1.png";
import { MdOutlineModeEditOutline } from "react-icons/md";
import useServices from "../../hooks/useServices";
import userApi from "../../services/userApi";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../context/redux/slices/userSlice";
import { internalRoutes } from "../../utils/internalRoutes";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
function UserProfile() {
  const saveUserInterest = useServices(userApi.getUserProfile);
  const { auth } = useAuth();
  const history = useNavigate();
  const userId = Cookies.get("userId");
  const { profile } = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();
  const getUserProfileHandle = async (userId) => {
    dispatch(fetchUserProfile(userId));
  };
  useEffect(() => {
    if (userId) getUserProfileHandle(userId);
  }, []);
  console.log(profile);

  const data = {
    addresses: [
      {
        title: "Shobhit Agarwal",
        description:
          "is simply dummy text of the printing and typesetting industry.",
        pincode: "456456",
      },
      {
        title: "Shobhit Agarwal",
        description:
          "is simply dummy text of the printing and typesetting industry.",
        pincode: "456456",
      },
    ],
  };
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
          Please Login To See Your Profile!
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
    <div className="flex items-center justify-center flex-col w-full h-screen">
      <div className="w-[650px] h-[650px] border border-gray-300 rounded-lg px-16 py-12 bg-white">
        {/* Personal Info */}
        <div className="space-y-6">
          {[
            { label: "Name", value: profile?.name },
            { label: "Email Id", value: profile?.email },
            { label: "Phone Number", value: profile?.phoneNumber },
          ].map((item, index) => (
            <div
              key={index}
              className="flex justify-between h-[50px] border-b border-[#f0f0f0]"
            >
              <label className="text-purple-700 font-semibold mt-[12px]">
                {item.label}
              </label>
              <div className="relative mt-1 w-[350px]">
                <input
                  type="text"
                  value={item.value}
                  readOnly
                  className="w-full px-4 py-2 pr-10 border text-textGray border-gray-300 rounded-lg bg-textGray/10"
                  disabled
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 ">
                  <img src={EditButton} alt="Edit" className="h-8 w-8" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Addresses */}
        <div className="mt-6">
          <span className="flex items-center justify-between py-1">
            <h3 className="text-purple-700 font-semibold ">Addresses</h3>
            <button className="btn-primary w-fit px-2 ">Add New Address</button>
          </span>
          <div className="space-y-4">
            {data.addresses.map((address, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b border-gray-200 pb-4"
              >
                <div>
                  <h4 className="font-semibold text-purple-700">
                    {address.title}
                  </h4>
                  <p className="text-gray-600 w-[322px]">
                    {address.description}
                  </p>
                  <p className="text-gray-600 font-semibold">
                    Pin code {address.pincode}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-lg">
                    <img src={EditButton} alt="Edit" className="h-8 w-8" />
                  </button>
                  <button className="p-2 rounded-lg">
                    <img src={DeleteButton} alt="Delete" className="h-8 w-8" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
