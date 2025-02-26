import React, { useState, useEffect } from "react";

const PaymentOptions = ({ cart, setNumberOfPart }) => {
  const currentDate = new Date();
  const [selectedOption, setSelectedOption] = useState("Full Payment");

  // Function to calculate payment options based on the earliest service date
  const getPaymentOptions = (earliestDate) => {
    const earliestDateObj = new Date(earliestDate);
    const timeDiff = earliestDateObj - currentDate; // Time difference in milliseconds
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days

    if (daysDiff > 30) {
      return ["Full Payment", "Partial Payment (3 Parts)"];
    } else if (daysDiff > 14) {
      return ["Full Payment", "Partial Payment (2 Parts)"];
    } else {
      return ["Full Payment"];
    }
  };

  // Calculate the total price of the cart
  const cartTotal = cart?.items?.reduce(
    (total, item) => total + item.totalPrice,
    0
  );

  // Find the earliest service date in the cart
  const earliestDate = cart?.items?.reduce((earliest, item) => {
    return !earliest || new Date(item.date) < new Date(earliest)
      ? item.date
      : earliest;
  }, null);

  // Get payment options based on the earliest service date
  const paymentOptions = getPaymentOptions(earliestDate);

  // Set the default payment option when the component mounts
  useEffect(() => {
    if (selectedOption === "Full Payment") {
      setNumberOfPart(1); // Set default only for the initial load
    }
  }, [setNumberOfPart]);
  

  // Handle radio button change
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    if (option === "Full Payment") {
      setNumberOfPart(1); // Full Payment maps to 1
    } else if (option === "Partial Payment (3 Parts)") {
      setNumberOfPart(3); // Partial Payment (3 Parts) maps to 3
    } else if (option === "Partial Payment (2 Parts)") {
      setNumberOfPart(2); // Partial Payment (2 Parts) maps to 2
    }
  };

  return (
    <div className="flex items-start justify-start flex-col">
      {paymentOptions.length > 0 &&
        paymentOptions.map((option, index) => (
          <label
            key={index}
            style={{  margin: "5px 0" }}
            className="text-sm flex items-center justify-center text-textGray"
          >
            <input
              type="radio"
              name="payment-option"
              value={option}
              checked={selectedOption === option}
              onChange={() => handleOptionChange(option)}
            />
            {option}
          </label>
        ))}
    </div>
  );
};

export default PaymentOptions;
