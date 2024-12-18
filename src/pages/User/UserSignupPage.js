import { Link } from "react-router-dom";
import { internalRoutes } from "../../utils/internalRoutes";
import AuthBox from "../../components/AuthBox";
import AuthForm from "../../components/AuthForm";
import formfields from "../../utils/formFields";
import LoginWithGoogle from "../../components/buttons/LoginWithGoogleButton";

import { FcGoogle } from "react-icons/fc";

function UserSignupPage() {
  const handleFormSubmit = (data) => {
    console.log(data);
  };

  const handleGoogleLogin = () => {
    console.log("Google Signup Called");
  };

  return (
    <div className=" w-full min-h-[100vh] flex justify-center items-center">
      <div className=" flex-1">Left Image</div>
      <div className=" flex-1 flex justify-center items-center">
        <AuthBox>
          <div className=" text-center">
            <h4 className=" text-primary text-3xl">Sign Up</h4>
            <h4 className=" text-primary text-xl">Welcome to Evaga</h4>
          </div>

          <AuthForm
            stages={formfields.userSignUp}
            handleFormSubmit={handleFormSubmit}
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
            <LoginWithGoogle handleGoogleLogin={handleGoogleLogin}>
              Sign Up With Google
            </LoginWithGoogle>
          </div>
        </AuthBox>
      </div>
    </div>
  );
}

export default UserSignupPage;
