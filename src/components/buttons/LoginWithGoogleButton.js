import { FcGoogle } from "react-icons/fc";

function LoginWithGoogle({ handleGoogleLogin, children }) {
  return (
    <button
      onClick={handleGoogleLogin}
      className=" btn-primary flex justify-center items-center gap-2"
    >
      <FcGoogle /> {children}
    </button>
  );
}

export default LoginWithGoogle;
