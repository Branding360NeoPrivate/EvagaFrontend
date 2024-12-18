import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";
import { internalRoutes } from "../utils/internalRoutes";
import { FcGoogle } from "react-icons/fc";

function AuthBox({ children }) {
  return (
    <div
      className=" min-w-[320px] min-h-[500px] h-auto bg-gray-50 py-5 px-6 
    border-2 border-gray-200 rounded-md space-y-6  text-gray-600 "
    >
      {/* <div className=" text-center">
        <h4 className=" text-primary text-3xl">Login In</h4>
        <h4 className=" text-primary text-xl">Welcome to Evaga</h4>
      </div>

      <AuthForm fields={fields} handleFormSubmit={handleFormSubmit} />
      {signUpLink && (
        <div className=" flex gap-2 font-semibold">
          <h5>Don't have an account?</h5>
          <Link to={internalRoutes.userSignup}>
            <button className=" btn-transparent ">Sign Up</button>
          </Link>
        </div>
      )}
      {signUpLink ? (
        <div className=" flex flex-col justify-center items-center gap-5">
          <div className=" relative w-full h-[1px] bg-gray-400 rounded-md">
            <span
              className=" absolute bg-gray-100 px-2 top-[-10px] 
            left-1/2 transform -translate-x-1/2"
            >
              Or
            </span>
          </div>
          <button className=" btn-primary flex justify-center items-center gap-2">
            <FcGoogle /> Login With Google
          </button>
        </div>
      ) : (
        <div></div>
      )} */}
      {children}
    </div>
  );
}

export default AuthBox;
