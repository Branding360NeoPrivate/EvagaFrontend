// src/contexts/ErrorContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { onError, offError } from "../utils/ErrorEmitter";

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const clearError = () => setError(null);

  useEffect(() => {
    const handleError = (message) => {
      setError(message);
    };

    onError(handleError);
    return () => offError(handleError); // Clean up the listener
  }, []);

  return (
    <ErrorContext.Provider value={{ error, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => React.useContext(ErrorContext);
