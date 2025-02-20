import React from "react";
import Slider from "@mui/material/Slider";
import filter from "../../assets/Temporary Images/filter-list 1.png";
function FilterCard({ filters, onFilterChange, onSliderChange }) {
  const handleCheckboxChange = (type, value) => {
    const updatedFilters = {
      ...filters,
      [type]: filters[type].includes(value)
        ? filters[type].filter((v) => v !== value)
        : [...filters[type], value],
    };
    onFilterChange(updatedFilters);
  };

  const minPrice = 0;
  const maxPrice = 1000000;
  return (
    <div className="flex flex-col gap-2 ">
      <span className="flex items-center justify-start gap-2 border-b-2 pb-1 mb-1">
        <img src={filter} alt="filter" className="object-contain h-[1.5rem]" />
        <h2 className="text-base font-medium mt-2 text-primary">Filter</h2>
      </span>
      <div>
        <h2 className="font-medium text-normal mb-2 text-primary">Event Type</h2>
        <div className="text-textGray flex flex-col gap-2">
          {[
            "Wedding",
            "Corporate",
            "Festivals",
            "Private Parties",
            "Memorials",
          ].map((type) => (
            <label
              key={type}
              className="block text-sm flex items-center justify-start filtercheckbox leading-6"
            >
              <input
                type="checkbox"
                checked={filters.eventTypes.includes(type)}
                onChange={() => handleCheckboxChange("eventTypes", type)}
                className="mr-2 gap-4 "
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-medium text-normal mb-2 text-primary">Location Type</h2>
        <div className="text-textGray">
          {["Indoor", "Outdoor", "Both"].map((type) => (
            <label key={type} className="block text-sm filtercheckbox leading-6">
              <input
                type="checkbox"
                checked={filters.locationTypes.includes(type)}
                onChange={() => handleCheckboxChange("locationTypes", type)}
                className="mr-2 gap-4"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div className="w-[90%] pr-4">
        <h2 className="font-medium text-normal text-primary mb-4">Price</h2>


        <Slider
          value={filters.priceRange}
          onChange={(e, newValue) => onSliderChange(newValue)}
          min={minPrice}
          max={maxPrice}
          step={100}
          sx={{

            "& .MuiSlider-track": {
              bgcolor: "#dfdfdf",
              outline: "none",
              border: "none",
            },
          
            "& .MuiSlider-thumb": {
              bgcolor: "#ffffff", 
              border: "3px solid #6A1B9A",
              "&:hover, &:focus, &.Mui-active": {
                boxShadow: "none", 
              },
            },
            "&:hover .MuiSlider-track, &:focus .MuiSlider-track": {
              outline: "none",
              boxShadow: "none",
            },
            "& .MuiSlider-rail": {
              bgcolor: "#757575", 
            },
            "& .Mui-focusVisible": {
              outline: "none",
            },
          }}
        />
        <div className="flex justify-between mt-4  text-primary font-bold">
          <span className="text-sm">₹{filters.priceRange[0].toLocaleString()}</span>
          <span className="text-sm">₹{filters.priceRange[1].toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

export default FilterCard;
