import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
function CategoryDisplayCard({ image, text, onClick, catId }) {
  const history = useNavigate();
  const handleSearch = (categoryId, categoryName) => {
    const query = new URLSearchParams({
      q: "",
      category: categoryId,
    }).toString();
    Cookies.set("selectedCategoryId", categoryId, { expires: 1 });
    Cookies.set("selectedCategory", categoryName, { expires: 1 });
    history(`/search?${query}`);
  };
  return (
    <div
      className="min-w-[140px] min-h-[120px]  flex flex-col items-center gap-2 cursor-pointer"
      onClick={() => handleSearch(catId, text)}
    >
      <div className="w-full  rounded-lg object-contain flex items-center justify-center">
        <img
          src={image && process.env.REACT_APP_API_Image_BASE_URL + image}
          alt="Category"
          className="w-[80%] object-fit "
        />
      </div>
      <p className="text-normal font-medium text-primary text-center break-words">
        {text ? text : "Default Text"}
      </p>
    </div>
  );
}

export default CategoryDisplayCard;
