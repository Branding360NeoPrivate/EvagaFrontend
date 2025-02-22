import React from "react";
import BannerImg from "../../assets/Temporary Images/Banner.png";
import { useNavigate } from "react-router-dom";
function Banner({ image, height, category }) {
  const navigate = useNavigate();
  const handleSearch = () => {
    const query = new URLSearchParams({
      q: "",
      category: category,
    }).toString();

    navigate(`/search?${query}`);
  };


  return (
    <div className="w-full">
      <img
        src={
          image ? process.env.REACT_APP_API_Image_BASE_URL + image : BannerImg
        }
        alt="Banner"
        className={
          height ? `object-fill w-full h-[18rem]` :
          "object-fill w-full "
        }
        onClick={category ? () => handleSearch() : undefined}
      />
    </div>
  );
}

export default Banner;
