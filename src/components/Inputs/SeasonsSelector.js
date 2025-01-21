import React, { useState } from "react";

// Month options
const MONTHS = [
  { value: "jan", label: "Jan" },
  { value: "feb", label: "Feb" },
  { value: "mar", label: "Mar" },
  { value: "apr", label: "Apr" },
  { value: "may", label: "May" },
  { value: "jun", label: "Jun" },
  { value: "jul", label: "July" },
  { value: "aug", label: "Aug" },
  { value: "sep", label: "Sept" },
  { value: "oct", label: "Oct" },
  { value: "nov", label: "Nov" },
  { value: "dec", label: "Dec" },
];

const SeasonsSelector = ({ seasons, onSeasonsChange }) => {
  const handleAddMonth = (season, month) => {
    onSeasonsChange({
      ...seasons,
      [season]: [...seasons[season], month],
    });
  };

  const handleRemoveMonth = (season, month) => {
    onSeasonsChange({
      ...seasons,
      [season]: seasons[season].filter((m) => m !== month),
    });
  };

  const getAvailableMonths = () => {
    const selectedMonths = [
      ...seasons.lowSeason,
      ...seasons.shoulderSeason,
      ...seasons.highSeason,
    ];
    return MONTHS.filter((month) => !selectedMonths.includes(month.value));
  };

  return (
    <div className="w-full grid grid-cols-3 gap-4">
      <label className="text-primary text-xl font-semibold">Seasons:</label>
      <div className="col-span-2 flex items-center justify-between gap-2">
        {["lowSeason", "shoulderSeason", "highSeason"].map((season) => (
          <div key={season}>
            <h4 className="font-semibold text-primary capitalize">
              {season.replace(/([A-Z])/g, " $1")}
            </h4>
            <select
              onChange={(e) => {
                const month = e.target.value;
                if (month) handleAddMonth(season, month);
              }}
              value=""
            >
              <option value="">Select Month</option>
              {getAvailableMonths().map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
            <div className="mt-2">
              {seasons[season].map((month) => (
                <div
                  key={month}
                  className="inline-flex items-center bg-gray-200 px-2 py-1 m-1 rounded"
                >
                  <span>{MONTHS.find((m) => m.value === month).label}</span>
                  <button
                    className="ml-2 text-red-500"
                    onClick={() => handleRemoveMonth(season, month)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonsSelector;
