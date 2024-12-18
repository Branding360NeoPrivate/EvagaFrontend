import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Banner from "../Banner/Banner";

function Slider({ bannerData }) {
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
      {bannerData?.banners?.map((item) => (
        <Banner key={item?.BannerId} image={item?.BannerUrl} />
      ))}
    </AliceCarousel>
  );
}

export default Slider;
