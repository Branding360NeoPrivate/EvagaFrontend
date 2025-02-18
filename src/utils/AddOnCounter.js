import React, { useState, memo } from "react";

const AddOnCounter = memo(
  ({
    type,
    itemName,
    rateInfo,
    uom,
    minQuantity = 1,
    onAdd,
    onRemove,
    extraData,
  }) => {
    const [quantity, setQuantity] = useState(0);
    const [showCounter, setShowCounter] = useState(false);

    const handleAdd = () => {
      setShowCounter(true);
      setQuantity(minQuantity);
      onAdd();
    };

    const handleIncrease = () => {
      console.log('it should increase the quantity')
      setQuantity((prev) => prev + 1);
      onAdd();
    };

    const handleDecrease = () => {
      if (quantity > minQuantity) {
        setQuantity((prev) => prev - 1);
        onRemove();
      } else {
        setShowCounter(false);
        setQuantity(0);
        onRemove();
      }
    };


    return (
      <div className="w-full flex items-start justify-between flex-col  bg-white">
        <div className="w-full flex items-start justify-between py-3">
          <div className="flex flex-col w-full">
            <span className="flex items-center justify-between w-full pr-4">
              {itemName && (
                <h3 className="text-base font-medium text-gray-800 text-primary break-words">
                  {itemName}
                </h3>
              )}
              
              <p
                className={
                  type === "Package"
                    ? "text-xl font-medium text-primary"
                    : "text-[14px] font-semibold text-gray-500"
                }
              >
                {type === "Package"
                  ? `${uom} / Rs ${rateInfo} `
                  : `${rateInfo}/${uom}  `}
              </p>
            </span>
          </div>
          {!showCounter ? (
            <button
              className="bg-textYellow text-primary font-medium py-2 px-4 rounded hover:bg-yellow-500 transition duration-200"
              onClick={handleAdd}
            >
              Add
            </button>
          ) : (
            <div className="flex items-center">
              {type === "package" ? (
                <span className="text-lg font-medium">
                  {extraData.packageDetails}
                </span> // Custom element
              ) : (
                <>
                  <button
                    className="bg-textYellow text-primary font-bold py-1 px-3 rounded hover:bg-gray-300 transition duration-200"
                    onClick={handleDecrease}
                  >
                    -
                  </button>
                  <span className="mx-4 text-lg font-medium">{quantity}</span>
                  <button
                    className="bg-textYellow text-primary font-bold py-1 px-3 rounded hover:bg-gray-300 transition duration-200"
                    onClick={handleIncrease}
                  >
                    +
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default AddOnCounter;
