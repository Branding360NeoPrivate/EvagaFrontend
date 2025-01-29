import formfields from "../../utils/formFields";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
// import adminApi from "../../services/adminApi";
import { loginReducer } from "../../context/redux/slices/authSlice";
import { internalRoutes } from "../../utils/internalRoutes";
import AdminLoginLeftImg from "../../assets/LoginSigupImgs/AdminLoginLeftImg.png";
import AuthBox from "../../components/AuthBox";
import AuthForm from "../../components/AuthForm";
import { useDispatch } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import useServices from "../../hooks/useServices";
import adminApi from "../../services/adminApi";

function AdminLoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login } = useAuth();
  const {
    loading: adminLoginLoading,
    error: adminLoginError,
    success: adminLoginSuccess,
    callApi: adminLoginApi,
  } = useServices(adminApi.login);

  const handleFormSubmit = async (data) => {
    try {
      const response = await adminLoginApi(data);
      //   console.log("admin login response:", response);
      if (response.token && response.role && response.userId) {
        login(response.token, response.role, response.userId);
        const payload = {
          accessToken: response.token,
          role: response.role,
          userId: response.userId,
        };
        dispatch(loginReducer(payload));

        navigate(internalRoutes.adminDashboard);
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
          src={AdminLoginLeftImg}
          alt="Login"
        />
      </div>
      <div className=" w-[90%]  md:w-[50%] flex-1 flex justify-center items-center">
        <AuthBox>
          <div className=" text-center">
            <h4 className=" text-primary text-3xl">Login </h4>
            <h4 className=" text-primary text-xl">
              Welcome to the Admin Panel
            </h4>
          </div>
          {adminLoginError && <p className="text-red-500">{adminLoginError}</p>}
          {adminLoginSuccess && (
            <p className="text-green-500">{adminLoginSuccess}</p>
          )}
          {adminLoginLoading && <p className="text-gray-500">Registering...</p>}

          <AuthForm
            stages={formfields.adminLogin}
            handleFormSubmit={handleFormSubmit}
          />
        </AuthBox>
      </div>
    </div>
  );
}

export default AdminLoginPage;
