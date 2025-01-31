import { useState } from "react";

const useServices = (apiFunction) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [success, setSuccess] = useState(null);

  const callApi = async (params = null, formData = null) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      let response;
      if (formData !== null) {
        // If formData is provided, pass both params and formData
        response = await apiFunction(params, formData);
      } else {
        // If only params is provided, pass it as is
        response = await apiFunction(params);
      }
      // console.log("Response in useServices:", response);
      console.log("log from use service");

      setData(response.data);

      if ([200, 201].includes(response.status)) {
        setSuccess(response.data?.message || "Operation successful!");
      }

      return response.data;
    } catch (err) {
      console.error("API call failed:", err.response?.data || err.message, err);
      setError(err.response?.data?.error || "An unexpected error occurred.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, data, callApi };
};

export default useServices;
