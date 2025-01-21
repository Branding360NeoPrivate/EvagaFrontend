import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SearchableInput from "./Inputs/SearchableInput";
import OTPInput from "./Inputs/OTPInput";

import useServices from "../hooks/useServices";
import useFetchCities from "../hooks/useFetchCities";
import categoryApi from "../services/categoryServices";
import { sendOtp, verifyOtp } from "../sendOtpUsingFirebase";
import vendorApi from "../services/vendorApi";
import Cookies from "js-cookie";
const AuthForm = ({ stages, formType, handleFormSubmit }) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpSentResponse, setOtpSentResponse] = useState(null);
  console.log(stages, "stages");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm();
  const [formData, setFormData] = useState({});
  const [categories, setCategories] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const { data: citiesList } = useFetchCities(null);
  const { loading, error, callApi } = useServices(categoryApi.getCategories);
  const forgotPassword = useServices(vendorApi.forgortVendorpasswords);
  const verifyVendorOtp = useServices(vendorApi.verifyVendorOtp);

  const password = watch("password");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const responseData = await callApi();
        setCategories(responseData);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCategories();
  }, []);

  // const onNext = (data) => {
  //   setFormData((prev) => ({ ...prev, ...data }));
  //   if (currentStage < stages?.length - 1) {
  //     setCurrentStage(currentStage + 1);
  //     console.log(data,'data');

  //     handleSendOtp();
  //   } else {
  //     handleFormSubmit({ ...formData, ...data });
  //   }
  // };
  const onNext = (data) => {
    const updatedFormData = { ...formData, ...data };
    setFormData(updatedFormData);

    if (currentStage < stages?.length - 1) {
      if (formType !== "signIn") {
        if (!isOtpVerified) {
          handleSendOtp(updatedFormData);
        }
      }

      setCurrentStage(currentStage + 1);
    } else {
      handleFormSubmit(updatedFormData);
    }
  };

  const handlePreviousStage = () => {
    // setCurrentStage((prev) => (prev > 0 ? prev - 1 : prev));
    if (currentStage > 0) {
      setCurrentStage((prev) => prev - 1);
    }
  };

  const handleSendOtp = async (updatedFormData) => {
    try {
      const formData1 = new FormData();
      formData1.append("identifier", updatedFormData.identifier);

      const response = await forgotPassword.callApi(formData1);
      console.log(response, "response");
      setOtpSentResponse("OTP sent successfully On Registered Email!");

      // Remove the OTP sent response message after 3 seconds
      setTimeout(() => {
        setOtpSentResponse(null);
      }, 3000);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleVerifyOtp = async (otp) => {
    try {
      console.log(otp, "otp");
      const formData1 = new FormData();
      formData1.append("identifier", formData.identifier);
      formData1.append("otp", otp);
      const response = await verifyVendorOtp.callApi(formData1);
      console.log(response, "response");

      if (response) {
        setIsOtpVerified(true);
        setVerificationStatus(true);
        Cookies.set("tempId", response.userId, { path: "/" });
        console.log("OTP verified successfully!");
      } else {
        console.log("OTP verification failed.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };
  const handlechangePasswords = async () => {};

  const currentFields = stages[currentStage]?.fields;

  const renderInput = (field) => {
    if (field.type === "searchable") {
      const items = field.name === "location" ? citiesList : categories;

      return (
        <SearchableInput
          items={items}
          value={watch(field.name)}
          onSelect={(item) => {
            setValue(
              field.name,
              field.name === "location" ? item?.name : item?._id
            );
          }}
        />
      );
    }

    if (field.type === "otp") {
      return (
        <div>
          {/* <button
            type="button"
            onClick={handleSendOtp}
            className="bg-primary text-white py-1 px-2 rounded-md"
          >
            Send OTP
          </button> */}
          <OTPInput
            length={4}
            onChange={(otp) => setValue(field.name, otp)}
            verifyOtp={handleVerifyOtp}
            verificationStatus={verificationStatus}
          />
        </div>
      );
    }

    return (
      <input
        type={field?.type}
        defaultValue={field?.def || ""}
        min={field?.min}
        {...register(field?.name, field?.validation)}
        className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none"
      />
    );
  };

  // console.log("isOtpVerified", isOtpVerified);
  console.log(formData, "formData");

  return (
    <>
      {/* Recaptcha container */}

      <form onSubmit={handleSubmit(onNext)} className="space-y-6 text-gray-500">
        <div id="recaptcha-container"></div>

        <div
          className={` ${
            currentFields?.length > 3
              ? "grid grid-cols-1 md:grid-cols-2 gap-2"
              : "space-y-6"
          } `}
        >
          {currentFields?.map((field) => (
            <div
              key={field.name}
              className="flex flex-col justify-start items-start"
            >
              <label htmlFor={field.name} className="block font-medium text-sm">
                {field.placeholder ||
                  field.name.charAt(0).toUpperCase() + field.name.slice(1)}
              </label>
              {renderInput(field)}

              {errors[field.name] && (
                <p className="text-red-500 text-sm">
                  {errors[field.name]?.message}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-start items-start gap-2">
          {currentStage > 0 && (
            <button
              type="button"
              onClick={handlePreviousStage}
              className="text-primary"
              disabled={
                formType !== "signIn" && currentStage === stages?.length - 1
              }
            >
              Back
            </button>
          )}
          {otpSentResponse && (
            <p className="text-green-500">{otpSentResponse}</p>
          )}
          <button
            type="submit"
            className={`w-full py-2 ${
              currentFields.some((field) => field.type === "otp") &&
              !isOtpVerified
                ? " bg-gray-100 text-gray-400 border-2"
                : " bg-primary text-white  hover:bg-accent"
            }  font-bold rounded-md`}
            disabled={
              currentFields.some((field) => field.type === "otp") &&
              !isOtpVerified
            }
          >
            {currentStage < stages?.length - 1 ? "Next" : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
};

export default AuthForm;
