import { Link } from "react-router-dom";
import { internalRoutes } from "../../utils/internalRoutes";
import AuthBox from "../../components/AuthBox";
import AuthForm from "../../components/AuthForm";
import formfields from "../../utils/formFields";
import userSignUp from "../../assets/LoginSigupImgs/userSingup.png";
import useServices from "../../hooks/useServices";
import userApi from "../../services/userApi";
import { useDispatch } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import { loginReducer } from "../../context/redux/slices/authSlice";
import LoginWithGoogleForUser from "../../utils/LoginWithGoogleForUser";

function UserSignupPage() {
  const registerUser = useServices(userApi.register);
  const userGoogleLogin = useServices(userApi.googleLogin);
  const dispatch = useDispatch();
  const { login } = useAuth();
  const handleFormSubmit = async (data) => {
    console.log(data, "handleFormSubmit");
    const response = await registerUser.callApi(data);

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

  const handleGoogleLogin = async (response) => {
    console.log("Google Signup Called");
    const token = response.credential;

    const result = await userGoogleLogin.callApi(token);
    console.log(result,'result');
  };

  // const handleGoogleLogin = async (token) => {
  //   console.log("Token received:", token);
  //   const response = await fetch("/user/auth/google", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ token }),
  //   });
  //   return response.json();
  // };
  

  return (
    <div className=" w-full md:min-h-[100vh] flex flex-col-reverse pt-10 md:pt-0 md:flex-row justify-center items-center">
      <div className=" flex-1 flex items-center justify-center w-[90%]">
        <img
          src={userSignUp}
          alt="user login"
          className="w-[80%] md:w-[80%] md:h-full object-contain p-4"
        />
      </div>
      <div className=" flex-1 flex justify-center items-center">
        <AuthBox>
          <div className=" text-center">
            <h4 className=" text-primary text-3xl">Sign Up</h4>
            <h4 className=" text-primary text-xl">Welcome to Evaga</h4>
          </div>

          <AuthForm
            formType="userSignIn"
            stages={formfields.userSignUp}
            handleFormSubmit={handleFormSubmit}
            role="user"
          />

          <div className=" flex gap-2 font-semibold">
            <h5>Already have an account?</h5>
            <Link to={internalRoutes.userLogin}>
              <button className=" btn-transparent ">Sign In</button>
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

          </div>
        </AuthBox>
      </div>
    </div>
  );
}

export default UserSignupPage;
