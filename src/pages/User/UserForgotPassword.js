import { FcGoogle } from "react-icons/fc";
import AuthBox from "../../components/AuthBox";
import AuthForm from "../../components/AuthForm";
import formfields from "../../utils/formFields";
import { internalRoutes } from "../../utils/internalRoutes";
import { Link, useNavigate } from "react-router-dom";
import userLogin from "../../assets/LoginSigupImgs/userforgotpassword.png";
import userApi from "../../services/userApi";
import useServices from "../../hooks/useServices";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
function UserForgotPassword() {
    const hsitory = useNavigate();
  const userNewPassword = useServices(userApi.resetpassword);
  const [countdown, setCountdown] = useState(5);
  const [isPasswordResetSuccess, setIsPasswordResetSuccess] = useState(false);
  useEffect(() => {
    if (isPasswordResetSuccess) {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else if (countdown === 0 && isPasswordResetSuccess) {
        hsitory(internalRoutes.userLogin);
      }
    }
  }, [countdown, isPasswordResetSuccess]);
  const handleFormSubmit = async (data) => {
    console.log("hitting forgot password");
    const userId = Cookies.get("tempId");
    const formData1 = new FormData();
    formData1.append("newPassword", data.password);
    const response = await userNewPassword.callApi(userId, formData1);
    if (response) {
      console.log(response);
      setIsPasswordResetSuccess(true);
      if (response) {
        console.log(response);
        setIsPasswordResetSuccess(true);
      }
    }
    console.log(response);
  };
  return (
    <div className=" w-full md:h-[100vh] flex flex-col-reverse pt-10 md:pt-0 md:flex-row justify-center items-center">
      <div className=" flex-1 flex items-center justify-center w-[90%]">
        <img
          src={userLogin}
          alt="user login"
          className="w-[80%] md:w-[80%] md:h-full object-contain p-4"
        />
      </div>
      <div className=" flex-1 flex justify-center items-center">
        <AuthBox>
        <div className="text-center">
            <h4 className="text-primary text-3xl">Reset Password</h4>
            <h4 className="text-primary text-xl">Enter your details</h4>
          </div>
          {isPasswordResetSuccess && (
            <div className="text-center">
              <h4 className="text-base text-green-500">
                Password Reset Successful!
              </h4>
              <p className=" text-base text-green-500">
                Redirecting to login page in {countdown} seconds...
              </p>
            </div>
          )}

          <AuthForm
            stages={formfields.userForgotPassword}
            handleFormSubmit={handleFormSubmit}
            formType="userForgotPassword"
            role="user"
          />
          <div className=" flex gap-2 font-semibold">
            <h5>Forgot Password?</h5>
            <Link to={internalRoutes.userForgotPassword}>
              <button className=" btn-transparent ">Reset Password!</button>
            </Link>
          </div>
          <div className=" flex gap-2 font-semibold">
            <h5>Don't have an account?</h5>
            <Link to={internalRoutes.userSignup}>
              <button className=" btn-transparent ">Sign Up</button>
            </Link>
          </div>

          <div className=" flex flex-col justify-center items-center gap-5">
            <div className=" relative w-full h-[1px] bg-gray-400 rounded-md">
              <span
                className=" absolute bg-gray-100 px-2 top-[-10px] 
                left-1/2 transform -translate-x-1/2"
              >
                Or
              </span>
            </div>
            
            {/* <button className=" btn-primary flex justify-center items-center gap-2">
                  <FcGoogle /> Login With Google
                </button> */}
          </div>
        </AuthBox>
      </div>
    </div>
  );
}

export default UserForgotPassword;
