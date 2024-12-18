import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectComponent = ({url, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (url) {
      navigate(url);
    }
  }, [url, navigate]); 
  return<>{children}</>;
};

export default RedirectComponent;
