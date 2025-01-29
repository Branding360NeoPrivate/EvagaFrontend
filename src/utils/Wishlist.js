import React from "react";
const Wishlist = ({ onWishlistToggle, isInWishlist }) => {
  return (
    <div
      className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full"
      onClick={onWishlistToggle}
    >
      {isInWishlist ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="red"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="red"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="black"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12.1 21.35l-.1-.1C6.14 16.64 2.75 13.54 2.75 9.5c0-3.04 2.46-5.5 5.5-5.5 1.76 0 3.45.87 4.5 2.33C13.3 4.87 15 4 16.75 4c3.04 0 5.5 2.46 5.5 5.5 0 4.04-3.39 7.14-8.15 11.75l-.1.1z"
          />
        </svg>
      )}
    </div>
  );
};

export default Wishlist;
