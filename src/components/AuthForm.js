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
import userApi from "../services/userApi";
import { useAuth } from "../context/AuthContext";
const AuthForm = ({ stages, formType, handleFormSubmit, role }) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpSentResponse, setOtpSentResponse] = useState(null);

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
  const sendVendorOtp = useServices(vendorApi.forgortVendorpasswords);
  const sendUserOtp = useServices(userApi.sendUserOtp);
  const verifyVendorOtp = useServices(vendorApi.verifyVendorOtp);
  const verifyUserOtp = useServices(userApi.verifyUserOtp);
  const currentFields = stages[currentStage]?.fields;
  const password = watch("password");
  const { login } = useAuth();
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
  //   const updatedFormData = { ...formData, ...data };
  //   setFormData(updatedFormData);

  //   if (currentStage < stages?.length - 1) {
  //     if (formType !== "VendorSignIn" && formType !== "userSignIn") {
  //       console.log("inside the function");

  //       if (!isOtpVerified) {
  //         handleSendOtp(updatedFormData);
  //       }
  //     }

  //     setCurrentStage(currentStage + 1);
  //   } else {
  //     handleFormSubmit(updatedFormData);
  //   }
  // };

  // const onNext = async (data) => {
  //   const updatedFormData = { ...formData, ...data };
  //   console.log(updatedFormData, "updatedFormData");
  //   setFormData(updatedFormData);

  //   console.log("Stages:", stages);
  //   console.log("Current Stage:", currentStage);
  //   if (
  //     stages[currentStage]?.fields.some(
  //       (field) => field.name === "confirmPassword"
  //     )
  //   ) {
  //     try {
  //       console.log("User registered successfully");
  //       await handleFormSubmit(updatedFormData);
  //       setCurrentStage(currentStage + 1);
  //       await handleSendOtp(updatedFormData);
  //     } catch (error) {
  //       console.error("Error registering user:", error);
  //     }
  //   } else if (currentStage < stages?.length - 1) {
  //     setCurrentStage(currentStage + 1);
  //   } else {
  //     handleFormSubmit(updatedFormData);
  //   }
  // };
  const onNext = async (data) => {
    const updatedFormData = { ...formData, ...data };
    setFormData(updatedFormData);

    const currentStageData = stages[currentStage];

    if (!currentStageData || !currentStageData.fields) {
      console.error("Invalid stage data or no fields defined");
      return;
    }

    const currentFields = currentStageData.fields || [];
    console.log("Current Fields:", currentFields);

    // Flags for common fields
    const hasIdentifier = currentFields.some(
      (field) => field.name === "identifier"
    );
    const hasPassword = currentFields.some(
      (field) => field.name === "password"
    );
    const hasConfirmPassword = currentFields.some(
      (field) => field.name === "confirmPassword"
    );
    const hasOtp = currentFields.some((field) => field.name === "otp");
console.log(hasIdentifier,hasPassword,hasConfirmPassword);

    try {
      // Special case: Forgot password flow or flows requiring OTP
      if (
        formType === "vendorForgotPassword" ||
        formType === "userForgotPassword"
      ) {
        if (hasIdentifier) {
          console.log("Forgot password flow - Sending OTP");
          await handleSendOtp(updatedFormData);

          const nextStageData = stages[currentStage + 1];
          if (
            nextStageData &&
            nextStageData.fields.some((field) => field.name === "otp")
          ) {
            setCurrentStage(currentStage + 1); // Advance to OTP stage
          } else {
            console.error("OTP stage missing in forgot password flow");
          }
        } else if (hasOtp) {
          console.log("Forgot password flow - Verifying OTP");
          await handleFormSubmit(updatedFormData);
          setCurrentStage(currentStage + 1); // Advance to password reset stage
        } else if (hasPassword && hasConfirmPassword) {
          console.log("Forgot password flow - Resetting password");
          await handleFormSubmit(updatedFormData);
        } else {
          console.error("Unknown stage in forgot password flow");
        }
      }
      // Generic flow handling (e.g., vendorLogin)
      else {
        if (hasIdentifier && hasPassword) {
          console.log("Login flow - Handling identifier and password");
          await handleFormSubmit(updatedFormData); // Submit form directly
        } else if (hasIdentifier && !hasOtp) {
          console.log(
            "Identifier field found, but OTP not required for this flow"
          );
          setCurrentStage(currentStage + 1); // Advance without sending OTP
        } else if (hasOtp) {
          console.log("Handling OTP step");
          await handleFormSubmit(updatedFormData);
          setCurrentStage(currentStage + 1);
        } else if (hasPassword && hasConfirmPassword) {
          console.log("Resetting password");
          await handleFormSubmit(updatedFormData);
        } else if (currentStage < stages.length - 1) {
          console.log("Intermediate step, advancing stage");
          setCurrentStage(currentStage + 1);
        } else {
          console.log("Final submission flow initiated");
          await handleFormSubmit(updatedFormData);
        }
      }
    } catch (error) {
      console.error(
        hasOtp
          ? "Error handling OTP step:"
          : hasIdentifier
          ? "Error sending OTP:"
          : "Error handling form submission:",
        error
      );
    }
  };

  const handlePreviousStage = () => {
    if (currentStage > 0) {
      setCurrentStage((prev) => prev - 1);
    }
  };

  // const handleSendOtp = async (updatedFormData) => {
  //   try {
  //     const formData1 = new FormData();
  //     formData1.append("identifier", updatedFormData.identifier);

  //     const response = await forgotPassword.callApi(formData1);
  //     console.log(response, "response");
  //     setOtpSentResponse("OTP sent successfully On Registered Email!");
  //     setTimeout(() => {
  //       setOtpSentResponse(null);
  //     }, 3000);
  //   } catch (error) {
  //     console.error("Error sending OTP:", error);
  //   }
  // };

  const handleSendOtp = async (updatedFormData) => {
    console.log(updatedFormData, "form value");

    try {
      const config = {
        user: {
          identifierKey: "identifier",
          value: (formData) => formData.email || formData.identifier,
          apiCall: sendUserOtp,
          successMessage: "OTP sent successfully to your registered email!",
        },
        vendor: {
          identifierKey: "identifier",
          value: (formData) => formData.email || formData.identifier,
          apiCall: sendVendorOtp,
          successMessage: "OTP sent successfully to the vendor's email!",
        },
      };

      const currentConfig = config[role];
      console.log(currentConfig);
      if (!currentConfig) {
        throw new Error(`Invalid context: ${role}`);
      }
      console.log(currentConfig, "currentConfig");
      const resolvedValue = currentConfig.value(updatedFormData); // Resolve value
      if (!resolvedValue) {
        throw new Error("Email or Identifier is required.");
      }

      const formData = new FormData();
      formData.append(currentConfig.identifierKey, resolvedValue); // Append email/identifier
      formData.append("role", role); // Append role
      const response = await currentConfig.apiCall.callApi(formData);
      console.log(response, "response otp send after");

      setOtpSentResponse(response.message);
      setTimeout(() => setOtpSentResponse(null), 10000);
    } catch (error) {
      console.error(`Error sending OTP for ${role}:`, error);
    }
  };

  // const handleVerifyOtp = async (otp) => {
  //   try {
  //     console.log(formData);

  //     const formData1 = new FormData();
  //     formData1.append("identifier", formData.identifier);
  //     formData1.append("otp", otp);
  //     const response = await verifyVendorOtp.callApi(formData1);
  //     console.log(response, "response");

  //     if (response) {
  //       setIsOtpVerified(true);
  //       setVerificationStatus(true);
  //       Cookies.set("tempId", response.userId, { path: "/" });
  //       console.log("OTP verified successfully!");
  //     } else {
  //       console.log("OTP verification failed.");
  //     }
  //   } catch (error) {
  //     console.error("Error verifying OTP:", error);
  //   }
  // };

  const handleVerifyOtp = async (otp) => {
    try {
      const resolvedIdentifier = formData.email || formData.identifier; // Dynamically resolve email or identifier
      if (!resolvedIdentifier) {
        throw new Error("Email or Identifier is required.");
      }

      const formData1 = new FormData();
      formData1.append("identifier", resolvedIdentifier);
      formData1.append("otp", otp);
      formData1.append("role", role);

      const apiConfig = {
        vendor: verifyVendorOtp,
        user: verifyUserOtp,
      };

      const apiCall = apiConfig[role];
      if (!apiCall) {
        throw new Error(`Invalid role specified: ${role}`);
      }

      const response = await apiCall.callApi(formData1);
      console.log(response, "response");

      if (response) {
        setIsOtpVerified(true);
        setVerificationStatus(true);
        Cookies.set("tempId", response.userId, { path: "/" });

        if (response.token && response.role && response.userId) {
          // Normal OTP verification flow
          if (role === "vendor" || role === "user") {
            console.log(
              "Forgot password OTP verified. Redirecting to reset password..."
            );
            setCurrentStage(currentStage + 1); // Redirect to password reset stage
          } else {
            login(response.token, response.role, response.userId);
          }
        }
      } else {
        console.log("OTP verification failed.");
      }
    } catch (error) {
      console.error(`Error verifying OTP for ${role}:`, error);
    }
  };

  const handlechangePasswords = async () => {};

  useEffect(() => {
    console.log(currentStage, "from useeffect", stages[currentStage]);
  }, [currentStage]);
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
        <div className="w-full">
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
            message={otpSentResponse}
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

  return (
    <>
      {/* Recaptcha container */}

      <form onSubmit={handleSubmit(onNext)} className="space-y-6 text-gray-500">
        <div id="recaptcha-container"></div>
        {otpSentResponse && <p className="text-green-500">{otpSentResponse}</p>}
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
                formType !== "VendorSignIn" &&
                formType !== "userSignIn" &&
                currentStage === stages?.length - 1
              }
            >
              Back
            </button>
          )}

          <button
            type="submit"
            className={`w-full py-2 ${
              currentFields.some((field) => field.type === "otp") &&
              !isOtpVerified
                ? "bg-gray-100 text-gray-400 border-2"
                : "bg-primary text-white hover:bg-accent"
            } font-bold rounded-md`}
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
