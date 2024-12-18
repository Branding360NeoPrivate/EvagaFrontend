// src/components/ErrorHandler.jsx
import React from "react";
import ReactDOM from "react-dom";
import { useError } from "../../context/ErrorContext";
import ErrorModal from "./ErrorModal";
import { useNavigate } from "react-router-dom";

const ErrorHandler = () => {
  const { error, clearError } = useError();
  const navigate = useNavigate();

  const handleRedirectHome = () => {
    clearError();
    navigate("/");
  };

  return (
    <>
      {error &&
        ReactDOM.createPortal(
          <ErrorModal
            errorMessage={error}
            onClose={clearError}
            onRedirectHome={handleRedirectHome}
          />,
          document.getElementById("error-modal")
        )}
    </>
  );
};

export default ErrorHandler;
