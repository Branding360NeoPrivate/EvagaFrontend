import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanner } from "../context/redux/slices/bannerSlice";
import Slider from "../components/Slider/Slider";

function Home() {
  const { banner } = useSelector((state) => state.banner);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!banner || banner.length === 0) {
      dispatch(fetchBanner());
    }
  }, [dispatch, banner]);
  return (
    <div className=" flex justify-center items-center w-[100vw]">
      <Slider bannerData={banner} />
    </div>
  );
}

export default Home;
