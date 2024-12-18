import { FcGoogle } from "react-icons/fc";
import AuthBox from "../../components/AuthBox";
import AuthForm from "../../components/AuthForm";
import formfields from "../../utils/formFields";
import { internalRoutes } from "../../utils/internalRoutes";
import { Link } from "react-router-dom";
import LoginWithGoogle from "../../components/buttons/LoginWithGoogleButton";

function UserLoginPage() {
  const handleFormSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className=" w-full h-[100vh] flex justify-center items-center">
      <div className=" flex-1">Left Image</div>
      <div className=" flex-1 flex justify-center items-center">
        <AuthBox>
          <div className=" text-center">
            <h4 className=" text-primary text-3xl">Login In</h4>
            <h4 className=" text-primary text-xl">Welcome to Evaga</h4>
          </div>

          <AuthForm
            stages={formfields.userLogin}
            handleFormSubmit={handleFormSubmit}
          />

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
            <LoginWithGoogle>Login With Google</LoginWithGoogle>
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
