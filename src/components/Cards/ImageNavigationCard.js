import React, { useState } from "react";
import ModernVideoPlayer from "../../utils/ModernVideoPlayer ";

function ImageNavigationCard({ mediaUrls, selectedUrl, onMediaClick }) {
  const isImage = (url) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
    const extension = url?.split(".")?.pop()?.toLowerCase();
    return imageExtensions.includes(extension);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);



  return (
    <div className="flex w-full h-[400px] rounded-md overflow-hidden p-5 bg-white">
      <div className="w-[20%] h-full overflow-y-scroll no-scrollbar">
        <div className="flex flex-col gap-2 p-2">
          {mediaUrls.map((url, index) => (
            <div key={index} className="cursor-pointer">
              {isImage(url) ? (
                <img
                  src={process.env.REACT_APP_API_Image_BASE_URL + url}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-[80px] h-[60px] object-cover rounded-md border-2 border-transparent hover:scale-110 hover:border-blue-500 transition-transform duration-200"
                  onClick={() => onMediaClick(url)}
                />
              ) : (
                <video
                  src={process.env.REACT_APP_API_VIDEO_BASE_URL + url}
                  className="w-[80px] h-[60px] object-cover rounded-md border-2 border-transparent hover:scale-110 hover:border-blue-500 transition-transform duration-200"
                  onClick={() => onMediaClick(url)}
                  muted
                  
                />
              )}
            </div>
          ))}
        </div>
      </div>




        {/* Main Media View */}
        <div className="flex-1 flex items-center justify-center relative">
        {isImage(selectedUrl) ? (
          <div className="group relative w-full aspect-[4/5] h-full flex items-center justify-center">
            <img
              src={process.env.REACT_APP_API_Image_BASE_URL + selectedUrl}
              alt="Selected Media"
              className="w-full h-full object-cover rounded-md cursor-pointer aspect-[4/5]"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        ) : (
          <ModernVideoPlayer selectedUrl={process.env.REACT_APP_API_VIDEO_BASE_URL + selectedUrl} />
        )}
      </div>

      {/* Modal for Zoomed Image */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative">
            <img
              src={process.env.REACT_APP_API_Image_BASE_URL + selectedUrl}
              alt="Zoomed Image"
              className="max-w-[90vw] max-h-[90vh] rounded-md"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
            />
            <button
              className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded-full text-lg font-bold"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageNavigationCard;
