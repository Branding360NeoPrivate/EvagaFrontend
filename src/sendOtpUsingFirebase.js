import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "./firebase.js";

export const sendOtp = async (phoneNumber) => {
  console.log(phoneNumber, "phoneNumber from sendotp function");

  if (!auth) {
    console.error("Firebase auth is not initialized");
    throw new Error("Firebase auth is not initialized");
  }
  if (!window.recaptchaVerifier) {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response) => {
          console.log("Recaptcha verified!");
        },
      });
      console.log("RecaptchaVerifier created successfully");
    } catch (error) {
      console.error("Error creating RecaptchaVerifier:", error);
      throw error;
    }
  }

  try {
    // Render the reCAPTCHA widget
    await window.recaptchaVerifier.render();
    console.log("reCAPTCHA rendered successfully");
  } catch (error) {
    console.error("Error rendering reCAPTCHA:", error);
    throw error;
  }

  try {
    // Send OTP
    const appVerifier = window.recaptchaVerifier;
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    window.confirmationResult = confirmationResult;
    console.log("OTP sent successfully!");
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }

};

export const verifyOtp = async (otp) => {
  try {
    const result = await window.confirmationResult.confirm(otp);
    console.log("User signed in successfully!", result.user);
    return result.user; // Return the signed-in user for further processing
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error; // Re-throw the error for handling in the calling code
  }
};
