import React, { useState } from "react";

const OTPInput = ({
  length = 4,
  onChange,
  verifyOtp,
  verificationStatus,
  otpSentResponse,
}) => {
  const [otp, setOtp] = useState(Array(length).fill(""));

  // Handle input change
  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return; // Allow only numeric input
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take only the last digit
    setOtp(newOtp);
    const fullOtp = newOtp.join("");
    onChange(fullOtp); // Send the full OTP to parent

    // Move focus to the next box
    if (value && index < length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  // Handle backspace key
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      // Move focus to the previous box if empty
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("Text").slice(0, length);
    const newOtp = [...otp];
    pastedData.split("").forEach((char, i) => {
      if (i < length) newOtp[i] = char;
    });
    setOtp(newOtp);
    onChange(newOtp.join(""));
  };

  // Handle OTP verification
  // const handleVerify = (e) => {
  //   e.preventDefault();
  //   const fullOtp = otp.join("");

  //   verifyOtp(fullOtp)
  //     .then((response) => {
  //       console.log("OTP verification successful:", response);

  //       setVerificationStatus(true);
  //     })
  //     .catch((error) => {
  //       console.error("OTP verification failed:", error);
  //       setVerificationStatus(false);
  //     });
  // };
  const handleVerify = (e) => {
    e.preventDefault();
    const fullOtp = otp.join("");

    verifyOtp(fullOtp);
  };


  return (
    <div className=" w-full flex flex-col justify-start items-start gap-5">
      {otpSentResponse && (
        <p className="text-base text-green-500">{otpSentResponse}</p>
      )}
      <div className=" w-full flex justify-between gap-2">
        {otp.map((value, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            value={value}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            maxLength={1}
            style={{
              width: "50px",
              height: "50px",
              textAlign: "center",
              fontSize: "20px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        ))}
      </div>

      <button
        onClick={handleVerify}
        disabled={verificationStatus || otp.join("").length !== length}
        className={`btn-primary ${
          verificationStatus || otp.join("").length !== length
            ? " bg-gray-200 text-gray-600 hover:bg-gray-200  "
            : ""
        }`}
      >
        Verify
      </button>

      {verificationStatus !== null && (
        <div
          className={`text-center ${
            verificationStatus ? "text-green-500" : "text-red-500"
          }`}
        >
          {verificationStatus ? "OTP Verified" : "Invalid OTP"}
        </div>
      )}
    </div>
  );
};

export default OTPInput;
