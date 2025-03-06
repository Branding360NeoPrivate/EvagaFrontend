import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { LuArrowDownUp } from "react-icons/lu";
function SortandFilterCard({
  activeFilters,
  onSortChange,
  sortOption,
  setActiveFilters,
  filters,
  setFilters,
  setSortValue,
}) {
  const handleRemoveFilter = (filterName) => {
    const updatedActiveFilters = activeFilters.filter(
      (item) => item !== filterName
    );
    setActiveFilters(updatedActiveFilters);
    if (filters.eventTypes.includes(filterName)) {
      setFilters((prev) => ({
        ...prev,
        eventTypes: prev.eventTypes.filter((type) => type !== filterName),
      }));
    } else if (filters.locationTypes.includes(filterName)) {
      setFilters((prev) => ({
        ...prev,
        locationTypes: prev.locationTypes.filter((type) => type !== filterName),
      }));
    }
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex space-x-2">
        {activeFilters.map((filter, index) => (
          <span
            key={index}
            className="bg-purple-200 text-purple-800 px-2 py-1  text-sm flex items-center justify-center gap-1 cursor-pointer rounded-md"
          >
            {filter}
            <AiOutlineCloseCircle onClick={() => handleRemoveFilter(filter)}/>
          </span>
        ))}
      </div>
      <div className="flex flex-row">
        <label
          className="mr-2 flex flex-row text-primary text-normal md:text-xl items-center gap-2 cursor-pointer"
          onClick={() =>
            setSortValue((val) => (val === "asc" ? "desc" : "asc"))
          }
        >
          Sort By{" "}
          <LuArrowDownUp className="font-semibold text-primary text-xl" />
        </label>
      </div>
    </div>
  );
}

export default SortandFilterCard;
