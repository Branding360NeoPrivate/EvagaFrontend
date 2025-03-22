import React, { useEffect, useState } from "react";
import SearchableInput from "./SearchableInput";
import { CiLocationOn } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
import useFetchCities from "../../hooks/useFetchCities";
import Cookies from "js-cookie";

function HomeSearchableCityDropdown() {
  // const { data: cities, isLoading, error } = useFetchCities([]);
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

  return (
    <div className="w-[200px] h-[45px] flex justify-start bg-gray-100 gap-2 items-center rounded-md text-primary cursor-pointer">
      <CiLocationOn className="text-3xl h-full w-[40px] rounded-md bg-highlightYellow font-bold hover:bg-[#CBAB00]" />
      {/* {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>loading cities</p>
      ) : (
        // <SearchableInput
        //   items={cities}
        //   value={selectedCity}
        //   def={selectedCity}
        //   onSelect={handleCityChange}
        //   placeholder="Select a city"
        // />
        <p>Bengaluru</p>
      )} */}
         <p>Bengaluru</p>
      {/* <MdKeyboardArrowDown className="text-textPrimary" /> */}
    </div>
  );
}

export default HomeSearchableCityDropdown;
