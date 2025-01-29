import { Link } from "react-router-dom";
import { internalRoutes } from "../../utils/internalRoutes";
import vendorApi from "../../services/vendorApi";
import AuthBox from "../../components/AuthBox";
import AuthForm from "../../components/AuthForm";
import formfields from "../../utils/formFields";
import SignUpLeftImg from "../../assets/LoginSigupImgs/SignUpLeftImg.png";
import useServices from "../../hooks/useServices";
import { useAuth } from "../../context/AuthContext";
import Cookies from "js-cookie";
import notificationService from "../../utils/notificationService";

function VendorSignUpPage() {
  const { login } = useAuth();
  const {
    loading: registerLoading,
    error: registerError,
    success: registerSuccess,
    callApi: registerApi,
  } = useServices(vendorApi.register);

  const handleFormSubmit = async (data) => {
    try {
      const response = await registerApi(data); 
      console.log("Registration successful:", response);
      notificationService.success(registerSuccess);

      if (response.token && response.role && response.userId) {
        login(response.token, response.role, response.userId);
      }
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      notificationService.error(registerError);
    }
  };

  return (
    <div className="w-full h-auto md:h-[100vh] flex flex-col md:flex-row justify-center gap-4 items-center">
      <div className=" w-full md:w-[50%] h-full flex justify-center items-center bg-highlight">
        <img
          className="w-full md:w-auto md:h-full object-contain "
          src={SignUpLeftImg}
          alt="Sign-Up"
        />
      </div>
      <div className="w-[90%] md:w-[50%] flex justify-center items-center">
        <AuthBox>
          <div className="text-center">
            <h4 className="text-primary text-3xl">Let's get you Business!</h4>
            <h4 className="text-primary text-xl">Welcome to VendorHub</h4>
          </div>
          {registerError && <p className="text-red-500">{registerError}</p>}
          {registerSuccess && (
            <p className="text-green-500">{registerSuccess}</p>
          )}
          {registerLoading && <p className="text-gray-500">Registering...</p>}

          <AuthForm
            formType="VendorSignIn"
            stages={formfields.vendorSignUp}
            handleFormSubmit={handleFormSubmit}
          />

          <div className="flex gap-2 font-semibold">
            <h5>Already have an account?</h5>
            <Link to={internalRoutes.vendorLogin}>
              <button className="btn-transparent">Sign In</button>
            </Link>
          </div>
        </AuthBox>
      </div>
    </div>
  );
}

export default VendorSignUpPage;
