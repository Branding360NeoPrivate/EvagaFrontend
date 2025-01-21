import React, { useState } from "react";
import formatCurrency from "../../utils/formatCurrency";

function ProductCard({ 
    popularimage, 
    title, 
    category, 
    price, 
    rating, 
    reviews ,
    onClick
}) {
  const [isFavourite, setIsFavourite] = useState(false);
  return (
    <div className="min-w-[295px] min-h-[356px] border rounded-lg bg-white overflow-hidden">
      <div className="w-full h-[247px]" onClick={onClick}>
        <img
          src={popularimage}
          alt={title}
          className="w-full h-full rounded-t-md "
        />
      </div>
      <div className="p-2">
        <div className="flex justify-between items-center" onClick={onClick}>
            <div className="w-[82%] flex flex-col justify-start">
          <span className="text-[18px] font-semibold text-primary">{title}</span>
          <span className="text-sm text-gray-600 mt-1">{category}</span>
          </div>
          <div className="w-[18%] flex flex-col items-center text-yellow-500">
            <div className="flex items-center justify-center gap-1 ">
            <span>⭐</span>
            <span className="text-[14px]">{rating}</span>
            </div>
      
            <span className="text-gray-500 text-[14px] ml-1">({reviews})</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-xl font-bold text-primary flex items-center justify-center">
            {price?formatCurrency(price):"comming soon" } <span className=" text-sm font-medium text-gray-600 flex items-center justfiy-center gap-2"><p>/- </p>Starting</span>
          </p>
          <button
            onClick={() => setIsFavourite((prev) => !prev)}
            className={`text-2xl ${
              isFavourite ? "text-[#F44336]" : "text-transparent stroke-red-[#F44336]"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isFavourite ? "red" : "none"}
              stroke="red"
              className="w-6 h-6"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}


export default ProductCard;
