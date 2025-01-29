import { FcGoogle } from "react-icons/fc";
import AuthBox from "../../components/AuthBox";
import AuthForm from "../../components/AuthForm";
import formfields from "../../utils/formFields";
import { internalRoutes } from "../../utils/internalRoutes";
import { Link, useNavigate } from "react-router-dom";
import useServices from "../../hooks/useServices";
import vendorApi from "../../services/vendorApi";
import { useAuth } from "../../context/AuthContext";
import { useDispatch } from "react-redux";
import { loginReducer } from "../../context/redux/slices/authSlice";
import LoginLeftImg from "../../assets/LoginSigupImgs/LoginLeftImg.png";

function VendorLoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login } = useAuth();
  const {
    loading: vendorLoginLoading,
    error: vendorLoginError,
    success: vendorLoginSuccess,
    callApi: vendorLoginApi,
  } = useServices(vendorApi.login);

  const handleFormSubmit = async (data) => {
    try {
      const response = await vendorLoginApi(data);
      console.log("vendor login response:", response);
      if (response.token && response.role && response.userId) {
        login(response.token, response.role, response.userId);
        const payload = {
          accessToken: response.token,
          role: response.role,
          userId: response.userId,
        };
        dispatch(loginReducer(payload));

        // navigate(internalRoutes.vendorDashboard);
      }
    } catch (error) {
      console.log("Login Failed:", error.response?.data || error.message);
    }
  };
  return (
    <div className=" w-full h-auto md:h-[100vh] flex flex-col md:flex-row justify-center items-center gap-4">
      <div className=" w-full md:w-[50%] h-full flex justify-center items-center bg-highlight">
        <img
          className="w-full md:w-auto md:h-full object-contain "
          src={LoginLeftImg}
          alt="Login"
        />
      </div>
      <div className=" w-[90%]  md:w-[50%] flex-1 flex justify-center items-center">
        <AuthBox>
          <div className=" text-center">
            <h4 className=" text-primary text-3xl">Login </h4>
            <h4 className=" text-primary text-xl">Welcome to Vendor Hub</h4>
          </div>
          {vendorLoginError && (
            <p className="text-red-500">{vendorLoginError}</p>
          )}
          {vendorLoginSuccess && (
            <p className="text-green-500">{vendorLoginSuccess}</p>
          )}
          {vendorLoginLoading && (
            <p className="text-gray-500">Registering...</p>
          )}

          <AuthForm
            stages={formfields.vendorLogin}
            handleFormSubmit={handleFormSubmit}
            formType="vendorLogin"
             role="vendor"
          />

          <div className=" flex gap-2 font-semibold">
            <h5>Don't have an account?</h5>
            <Link to={internalRoutes.vendorSignup}>
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
            <div className=" flex gap-2 font-semibold">
              <h5>Forgot Password?</h5>
              <Link to={internalRoutes.vendorForgotPassword}>
                <button className=" btn-transparent ">Reset Password!</button>
              </Link>
            </div>
            {/* <LoginWithGoogle>Login With Google</LoginWithGoogle> */}
            {/* <button className=" btn-primary flex justify-center items-center gap-2">
              <FcGoogle /> Login With Google
            </button> */}
          </div>
        </AuthBox>
      </div>
    </div>
  );
}

export default VendorLoginPage;
