import React, { useEffect, useState } from "react";
import SearchableInput from "./SearchableInput";
import { CiLocationOn } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
import useFetchCities from "../../hooks/useFetchCities";
import Cookies from "js-cookie";

function HomeSearchableCityDropdown() {
  const { data: cities, isLoading, error } = useFetchCities([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const storedCity = Cookies.get("selectedCity");
    if (storedCity) {
      setSelectedCity(storedCity);
    }
  }, []);

  const handleCityChange = (city) => {
    setSelectedCity(city.name);
    Cookies.set("selectedCity", city.name);
  };

  //   console.log("selectedCity:", Cookies.get("selectedCity"));
  return (
    <div className="w-[200px] h-[45px] flex justify-start bg-gray-100 items-center rounded-md text-primary">
      <CiLocationOn className="text-3xl h-full w-[40px] rounded-md bg-highlightYellow font-bold" />
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading cities</p>
      ) : (
        <SearchableInput
          items={cities}
          value={selectedCity}
          def={selectedCity}
          onSelect={handleCityChange}
          placeholder="Select a city"
        />
      )}
      <MdKeyboardArrowDown className="text-textPrimary" />
    </div>
  );
}

export default HomeSearchableCityDropdown;
