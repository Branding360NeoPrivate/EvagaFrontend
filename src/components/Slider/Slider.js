import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Banner from "../Banner/Banner";
import BannerSkeleton from "../Banner/BannerSkeleton";

function Slider({ bannerData, height, isLoading }) {
  const responsive = {
    0: {
      items: 1,
    },
    1024: {
      items: 1,
      itemsFit: "contain",
    },
  };


  return (
    <AliceCarousel
      mouseTracking
      responsive={responsive}
      disableButtonsControls
      autoPlay
      infinite
      autoPlayInterval={4000}
      paddingRight={0}
      paddingLeft={0}
    >
      {isLoading==="loading"
        ? Array.from({ length: 3 }).map((_, index) => (
            <BannerSkeleton key={index} height={'16rem'} />
          ))
        : bannerData?.map((item) => (
            <Banner
              key={item?.BannerId}
              image={item?.BannerUrl}
              category={item?.categoryId}
              height={height}
            />
          ))}
    </AliceCarousel>
  );
}

export default Slider;
