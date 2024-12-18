import React from "react";
import BannerImg from "../../assets/Temporary Images/Banner.png";
function Banner({ image }) {
  return (
    <div className="w-full">
      <img
        src={
          image ? process.env.REACT_APP_API_Image_BASE_URL + image : BannerImg
        }
        alt="Banner"
        className="object-contain w-full "
      />
    </div>
  );
}

export default Banner;
