import axios from "axios";
import React, { memo, useEffect, useState } from "react";

const PressReleaseCard = memo(({ articleUrl }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await axios.get(`https://api.linkpreview.net/`, {
          params: {
            key: process.env.REACT_APP_Link_previwer,
            q: articleUrl,
          },
          withCredentials: false,
        });

        const data = response.data;
        console.log(data);

        setTitle(data.title || "No Title Available");
        setImage(data.image || "https://via.placeholder.com/150");
      } catch (error) {
        console.error("Error fetching article metadata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [articleUrl]);

  if (loading)
    return (
      <div className="w-80 h-96 max-w-sm rounded-2xl overflow-hidden shadow-lg bg-gray-200 animate-pulse flex-shrink-0">
        <div className="relative h-48 bg-gray-300"></div>
        <div className="p-6">
          <div className="h-8 bg-gray-300 rounded-md mb-4 w-3/4"></div>
          <div className="h-10 bg-gray-300 rounded-lg w-24"></div>
        </div>
      </div>
    );
  
  

  return (
    <div className="w-80 rounded-2xl overflow-hidden shadow-lg bg-white transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex-shrink-0">
      <div className="relative h-48">
        <img className="w-full h-full object-cover" src={image} alt={title} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      <div className="p-6">
        <h2 className="text-normal font-bold mb-3 text-textGray">{title}</h2>
        <a
          href={articleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 bg-[#6A1B9A] text-white text-sm font-semibold rounded-lg hover:bg-[#4A148C] transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Read More
        </a>
      </div>
    </div>
  );
});

export default PressReleaseCard;
