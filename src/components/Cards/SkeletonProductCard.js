import React from 'react';

const SkeletonProductCard = () => {
  return (
    <div className="w-[250px] h-auto border rounded-lg bg-white overflow-hidden flex-shrink-0">
      {/* Image Placeholder */}
      <div className="w-full h-[180px] bg-gray-200 animate-pulse rounded-t-md"></div>

      {/* Content Placeholder */}
      <div className="p-2">
        <div className="flex justify-between items-center">
          {/* Title and Category Placeholder */}
          <div className="w-[82%] flex flex-col justify-start">
            <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 animate-pulse rounded w-1/2"></div>
          </div>

          {/* Rating Placeholder */}
          <div className="w-[18%] flex flex-col items-center">
            <div className="h-4 bg-gray-200 animate-pulse rounded w-full mb-1"></div>
            <div className="h-3 bg-gray-200 animate-pulse rounded w-3/4"></div>
          </div>
        </div>

        {/* Price and Wishlist Placeholder */}
        <div className="flex items-center justify-between mt-4">
          <div className="h-5 bg-gray-200 animate-pulse rounded w-1/2"></div>
          <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProductCard;