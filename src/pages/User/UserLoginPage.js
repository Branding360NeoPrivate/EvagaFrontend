import { FcGoogle } from "react-icons/fc";
import AuthBox from "../../components/AuthBox";
import AuthForm from "../../components/AuthForm";
import formfields from "../../utils/formFields";
import { internalRoutes } from "../../utils/internalRoutes";
import { Link } from "react-router-dom";
import userLogin from "../../assets/LoginSigupImgs/LoginLeftImg.png";
import userApi from "../../services/userApi";
import useServices from "../../hooks/useServices";
import { useDispatch } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import { loginReducer } from "../../context/redux/slices/authSlice";
import LoginWithGoogleForUser from "../../utils/LoginWithGoogleForUser";
function UserLoginPage() {
  const loginUser = useServices(userApi.login);
  const dispatch = useDispatch();
  const { login } = useAuth();

  const handleFormSubmit = async (data) => {
    const response = await loginUser.callApi(data);
    if (response.token && response.role && response.userId) {
      login(response.token, response.role, response.userId);
      const payload = {
        accessToken: response.token,
        role: response.role,
        userId: response.userId,
      };
      dispatch(loginReducer(payload));
    }
  };
  const handleGoogleLogin = async (token) => {
    console.log("Token received:", token);
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL+"user/auth/google"}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    return response.json();
  };

  return (
    <div className=" w-full h-[100vh] flex justify-center items-center">
      <div className=" flex-1 flex items-center justify-center w-[90%]">
        <img
          src={userLogin}
          alt="user login"
          className="w-[80%] md:w-[80%] md:h-full object-contain p-4"
        />
      </div>
      <div className=" flex-1 flex justify-center items-center">
        <AuthBox>
          <div className=" text-center">
            <h4 className=" text-primary text-3xl">Login In</h4>
            <h4 className=" text-primary text-xl">Welcome to Evaga</h4>
          </div>

          <AuthForm
            stages={formfields.userLogin}
            handleFormSubmit={handleFormSubmit}
            formType="userLogin"
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
            <div className="w-full">
              <LoginWithGoogleForUser userGoogleLogin={handleGoogleLogin} />
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

export default UserLoginPage;
