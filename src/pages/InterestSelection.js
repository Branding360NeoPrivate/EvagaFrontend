// File: src/pages/InterestSelection.js

import React, { useEffect, useState } from "react";
import logo from "../assets/Temporary Images/Evaga Logo-color.png";
import useServices from "../hooks/useServices";
import userApi from "../services/userApi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { internalRoutes } from "../utils/internalRoutes";
import { motion } from "framer-motion";
const InterestSelection = () => {
  const saveUserInterest = useServices(userApi.userInterest);
  const UserInterestStatus = useServices(userApi.userIntereststatus);
  const navigate = useNavigate();
  const { auth } = useAuth();
  const interestsList = [
    "Weddings",
    "Birthday Parties",
    "Memorials",
    "Festivals",
    "Conferences and Seminars",
    "Sports Events",
    "Anniversaries",
    "Product launches",
    "Corporate",
    "Trade shows and Expos",
    "MICE",
    "Personal events",
  ];

  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = (interest) => {
    setSelectedInterests((prevSelected) =>
      prevSelected.includes(interest)
        ? prevSelected.filter((item) => item !== interest)
        : [...prevSelected, interest]
    );
  };
  const [hasFetched, setHasFetched] = useState(false);
  const getuserInterestStatusHandle = async () => {
    try {
      if (hasFetched) return; 

      const response = await UserInterestStatus.callApi();
      console.log("API Response:", response);

      // if (response?.user?.userInterestFilled) {
      //   navigate("/");
      // }

      setHasFetched(true); 
    } catch (error) {
      console.error("Error fetching user interest status:", error);
    }
  };
  useEffect(() => {
    getuserInterestStatusHandle();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("interests", selectedInterests);
    const response = await saveUserInterest.callApi(formData);
    return response ? navigate("/") : "";
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
          Please Login To Set Your Interest!
        </p>
        <button
          className="btn-primary w-fit px-4"
          onClick={() => navigate(internalRoutes.home)}
        >
          Login
        </button>
      </motion.div>
    );
  }
  return (
    <div className="w-full px-2 py-4 flex items-start jystify-start flex-col">
      <Link to="/" className="hover:text-gray-300">
        <img src={logo} alt="logo" className="h-[8rem] object-fit" />
      </Link>
      <div className="w-full  flex flex-col items-center justify-center">
        <div className="sm:w-[95%] md:w-[80%] lg:w-[70%] bg-textLightGray shadow-md rounded-md p-6">
          <h1 className="text-2xl font-bold text-center mb-6 text-primary">
            Choose your Interest
          </h1>
          <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
            {interestsList.map((interest) => (
              <button
                key={interest}
                className={`py-2 px-4 rounded-md border border-primary text-base font-medium ${
                  selectedInterests.includes(interest)
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-primary border-primary"
                }`}
                onClick={() => toggleInterest(interest)}
              >
                {interest}
              </button>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={handleSubmit}
              className="bg-primary text-white font-semibold py-2 px-6 rounded-md hover:bg-primary"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterestSelection;
