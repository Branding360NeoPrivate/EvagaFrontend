import React from "react";
import PressReleaseCard from "../components/Cards/PressReleaseCard";

function PressRelease() {
  const links = [
    "https://www.zeebiz.com/india/news-from-byju-s-avp-to-revolutionising-events-evaga-entertainment-redefines-the-industry-341631",
  ];
  return (
    <div className="w-full   px-[2%] py-[3%]">
      {links?.map((item) => (
        <PressReleaseCard articleUrl={item} />
      ))}
    </div>
  );
}

export default PressRelease;
