import ForgotPasswordLeftImg from "../../assets/LoginSigupImgs/ForgotPasswordLeftImg.png";
import React from "react";
import useServices from "../../hooks/useServices";
import formfields from "../../utils/formFields";
import vendorApi from "../../services/vendorApi";
import AuthForm from "../../components/AuthForm";
import notificationService from "../../utils/notificationService";
import AuthBox from "../../components/AuthBox";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { internalRoutes } from "../../utils/internalRoutes";

function VendorForgotPasswordPage() {
  const { login } = useAuth(); // Access login function from AuthContext
  //   const {
  //     loading: forgotPasswordLoading,
  //     error: forgotPasswordError,
  //     success: forgotPasswordSuccess,
  //     callApi: forgotPasswordApi,
  //   } = useServices(vendorApi.forgotPassword);

  const handleFormSubmit = async (data) => {
    //   try {
    //     const response = await forgotPasswordApi(data); // Calls the API
    //     console.log("Forgot Password successful:", response);
    //     notificationService.success(forgotPasswordSuccess);
    //     // Save token and role in cookies using login function
    //     if (response.token && response.role && response.userId) {
    //       login(response.token, response.role, response.userId);
    //     }
    //   } catch (err) {
    //     console.error(
    //       "Forgot Password failed:",
    //       err.response?.data || err.message
    //     );
    //     notificationService.error(forgotPasswordError);
    //   }
    console.log("data in forgotPasswordPage:", data);
  };

  const verifyOtp = (otp) => {
    // Placeholder for actual OTP verification logic with a promise to simulate the OTP verification
    console.log("OTP verification called:", otp);
    // Simulating OTP verification with a promise
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (otp === "1234") {
          resolve(true); // OTP verification successful
        } else {
          reject("Invalid OTP"); // OTP verification failed
        }
      }, 1000);
    });
    return;
  };

  return (
    <div className="w-full h-auto md:h-[93vh] flex flex-col md:flex-row justify-center gap-4 items-center">
      <div className=" w-full md:w-[50%] h-full flex justify-center items-center bg-highlight">
        <img
          className="w-full md:w-auto md:h-full object-contain "
          src={ForgotPasswordLeftImg}
          alt="Forgot Password"
        />
      </div>
      <div className="w-[90%] md:w-[50%] flex justify-center items-center">
        <AuthBox>
          <div className="text-center">
            <h4 className="text-primary text-3xl">Reset Password</h4>
            <h4 className="text-primary text-xl">Enter your details</h4>
          </div>
          {/* {forgotPasswordError && (
            <p className="text-red-500">{forgotPasswordError}</p>
          )}
          {forgotPasswordSuccess && (
            <p className="text-green-500">{forgotPasswordSuccess}</p>
          )}
          {forgotPasswordLoading && (
            <p className="text-gray-500">Processing...</p>
          )} */}

          <AuthForm
            stages={formfields.vendorForgotPassword}
            handleFormSubmit={handleFormSubmit}
            verifyOtp={verifyOtp}
          />

          <div className="flex gap-2 font-semibold">
            <h5>Remembered your password?</h5>
            <Link to={internalRoutes.vendorLogin}>
              <button className="btn-transparent">Sign In</button>
            </Link>
          </div>
        </AuthBox>
      </div>
    </div>
  );
}

export default VendorForgotPasswordPage;