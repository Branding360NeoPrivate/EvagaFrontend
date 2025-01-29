import React from "react";
import { loginReducer } from "../context/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useAuth } from "../context/AuthContext";

const LoginWithGoogleForUser = ({ userGoogleLogin }) => {
  // const handleGoogleLogin = async (googleUser) => {
  //   console.log("Google Signup Called");
  //   try {
  //     const token = googleUser.getAuthResponse().id_token;
  //     const response = await userGoogleLogin(token);
  //     console.log("Google login response:", response);
  //   } catch (error) {
  //     console.error("Google Login Error:", error.message);
  //   }
  // };

  // React.useEffect(() => {
  //   window.google.accounts.id.initialize({
  //     client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  //     callback: handleGoogleLogin,
  //   });

  //   window.google.accounts.id.renderButton(
  //     document.getElementById("googleSignInButton"),
  //     { theme: "outline", size: "large" }
  //   );
  // }, []);

  const dispatch = useDispatch();
  const { login } = useAuth();

  React.useEffect(() => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    if (!clientId) {
      console.error("Google Client ID is missing!");
      return;
    }


    window?.google?.accounts?.id?.initialize({
      client_id: clientId,
      callback: (response) => {
        console.log("Google callback triggered:", response);
        if (response && response.credential) {
          console.log("Google ID Token:", response.credential);
          handleGoogleLogin(response.credential);
        } else {
          console.error("No credential received in the Google response.");
        }
      },
    });

    window?.google?.accounts?.id?.renderButton(
      document.getElementById("googleSignInButton"),
      { theme: "outline", size: "large" }
    );

    window.google.accounts.id.prompt((notification) => {
      console.log("Google Prompt Notification:", notification);
    });
  }, []);

  const handleGoogleLogin = async (token) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL+"user/auth/google"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        }
      );
      const data = await response.json();
      if (data.token && data.role && data.userId) {
        login(data.token, data.role, data.userId);
        const payload = {
          accessToken: data.token,
          role: data.role,
          userId: data.userId,
        };
        dispatch(loginReducer(payload));
      }
    } catch (error) {
      console.error("Error in fetch request:", error.message);
    }
  };

  if (typeof userGoogleLogin !== "function") {
    console.error("Error: userGoogleLogin must be a function.");
    return null;
  }

  return <div id="googleSignInButton" className="py-2"></div>;
};

export default LoginWithGoogleForUser;
