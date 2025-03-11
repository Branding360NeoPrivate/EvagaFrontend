import React, { useEffect, useState } from "react";
import PressReleaseCard from "../components/Cards/PressReleaseCard";
import useServices from "../hooks/useServices";
import commonApis from "../services/commonApis";

function PressRelease() {
  const [links, setLinks] = useState([]);
  const getAllPublishedUrlsApi = useServices(commonApis.getAllPublishedUrls);
  const getAllPublishedUrlsHandle = async () => {
    const response = await getAllPublishedUrlsApi.callApi();
    setLinks(response ? response : []);
  };
  useEffect(() => {
    getAllPublishedUrlsHandle();
  }, []);

  return (
    <div className="w-full flex items-center justify-start gap-3 flex-wrap  px-[2%] py-[3%]">
      {links?.map((item) => (
        <PressReleaseCard articleUrl={item?.url} />
      ))}
    </div>
  );
}

export default PressRelease;
