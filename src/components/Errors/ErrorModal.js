// src/components/ErrorModal.jsx
import React from "react";

const ErrorModal = ({ errorMessage, onClose, onRedirectHome }) => {
  return (
    <div style={modalStyles.overlay} className="z-1000">
      <div style={modalStyles.modal}>
        <h2>Error</h2>
        <p>{`${
          typeof errorMessage === "string"
            ? errorMessage
            : "An unexpected error occurred."
        }`}</p>
        <div>
          <button onClick={onClose} style={modalStyles.button}>
            Close
          </button>
          <button onClick={onRedirectHome} style={modalStyles.button}>
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999999,
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    textAlign: "center",
  },
  button: {
    margin: "10px",
    padding: "10px 20px",
    cursor: "pointer",
  },
};

export default ErrorModal;
