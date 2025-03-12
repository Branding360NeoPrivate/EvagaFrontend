import React, { useState } from "react";

const DateRangePicker = ({ onSearch }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const minFromDate = "2024-12-01"; // From date minimum
  const maxToDate = new Date().toISOString().split("T")[0];
  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const handleSubmit = () => {
    if (new Date(fromDate) > new Date(toDate)) {
      alert("The 'From' date cannot be later than the 'To' date.");
      return;
    }
    onSearch(fromDate,toDate);
  };

  return (
    <div className="flex flex-row items-end gap-4 p-4">
      <div>
        <label className="mr-2 font-semibold text-primary" htmlFor="from-date">
          From:
        </label>
        <input
          type="date"
          id="from-date"
          value={fromDate}
          onChange={handleFromDateChange}
          className="border rounded p-2"
          min={minFromDate}
          max={maxToDate}
        />
      </div>
      <div>
        <label className="mr-2 font-semibold text-primary" htmlFor="to-date">
          To:
        </label>
        <input
          type="date"
          id="to-date"
          value={toDate}
          onChange={handleToDateChange}
          className="border rounded p-2"
          min={fromDate || minFromDate}
          max={maxToDate}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
};

export default DateRangePicker;
