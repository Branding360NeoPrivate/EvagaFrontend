import React from "react";

const CategorySkeleton = () => {
  return (
    <div className="min-w-[130px] min-h-[120px] flex flex-col items-center gap-2">
      {/* Image Placeholder */}
      <div className="w-[70%] h-[80px] bg-gray-200 animate-pulse rounded-lg"></div>
      {/* Text Placeholder */}
      <div className="w-[80%] h-4 bg-gray-200 animate-pulse rounded"></div>
    </div>
  );
};

export default CategorySkeleton;