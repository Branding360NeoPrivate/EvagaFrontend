import React from "react";

const BannerSkeleton = ({ height }) => {
  return (
    <div className="w-full">
      <div
        className={`w-full bg-gray-200 animate-pulse ${
          height ? `h-[${height}]` : "h-[14rem]"
        }`}
      ></div>
    </div>
  );
};

export default BannerSkeleton;