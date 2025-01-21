import React from "react";
import BannerImg from "../../assets/Temporary Images/Banner.png";
function Banner({ image ,height}) {
  return (
    <div className="w-full">
      <img
        src={
          image ? process.env.REACT_APP_API_Image_BASE_URL + image : BannerImg
        }
        alt="Banner"
        className={height?`object-fill w-full h-[${height}]`:"object-fill w-full "} 
      />
    </div>
  );
}

export default Banner;
