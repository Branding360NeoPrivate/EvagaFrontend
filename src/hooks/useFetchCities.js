import axios from "axios";
import { useEffect, useState } from "react";

function useFetchCities(initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_FETCH_CITIES_API_KEY;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://api.countrystatecity.in/v1/countries/IN/cities", {
        headers: {
          "X-CSCAPI-KEY": apiKey,
        },
        withCredentials: false,
        redirect: "follow",
      })
      .then((response) => {

        setData(response.data);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return { data, isLoading, error };
}

export default useFetchCities;
