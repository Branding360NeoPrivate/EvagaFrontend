import React, { useEffect, useState } from "react";
import ModernVideoPlayer from "../../utils/ModernVideoPlayer ";
import { motion, AnimatePresence } from "framer-motion";
import videoThumbnil from "../../assets/Temporary Images/Original.jpg";
function ImageNavigationCard({ mediaUrls, selectedUrl, onMediaClick }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(
    mediaUrls.indexOf(selectedUrl)
  );

  useEffect(() => {
    setCurrentIndex(mediaUrls.indexOf(selectedUrl));
  }, [selectedUrl]);

  const isImage = (url) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
    // Extract the file extension before the query parameters
    const extension = url?.split("?")[0]?.split(".").pop()?.toLowerCase();
    return imageExtensions.includes(extension);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaUrls.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + mediaUrls.length) % mediaUrls.length
    );
  };

  const handleKeyDown = (e) => {
    if (!isModalOpen) return;
    if (e.key === "ArrowRight") nextImage(e);
    if (e.key === "ArrowLeft") prevImage(e);
    if (e.key === "Escape") setIsModalOpen(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  return (
    <div className="flex w-full h-[400px] rounded-md overflow-hidden p-5 bg-white">
      <div className="w-[20%] h-full overflow-y-scroll no-scrollbar">
        <div className="flex flex-col gap-2 p-2">
          {mediaUrls.map((url, index) => (
            <div key={index} className="cursor-pointer">
              {isImage(url) ? (
                <img
                  src={process.env.REACT_APP_API_Aws_Image_BASE_URL + url}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-[80px] h-[60px] object-cover rounded-md border-2 border-transparent hover:scale-110 hover:border-blue-500 transition-transform duration-200"
                  onClick={() => [onMediaClick(url), setIsModalOpen(true)]}
                />
              ) : (
                <div
                  className="relative w-[80px] h-[60px] object-cover rounded-md border-2 border-transparent hover:scale-110 hover:border-blue-500 transition-transform duration-200"
                  onClick={() => [onMediaClick(url), setIsModalOpen(true)]}
                >
                  <img
                    src={videoThumbnil}
                    alt="Video Placeholder"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
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
              src={process.env.REACT_APP_API_Aws_Image_BASE_URL + selectedUrl}
              alt="Selected Media"
              className="w-fit h-full object-contain rounded-md cursor-pointer aspect-[4/5]"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        ) : (
          <ModernVideoPlayer
            selectedUrl={
              process.env.REACT_APP_API_Aws_Image_BASE_URL + selectedUrl
            }
            
          />
        )}
      </div>

      {/* Modal for Zoomed Image */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {isImage(mediaUrls[currentIndex]) ? (
                <img
                  src={
                    process.env.REACT_APP_API_Aws_Image_BASE_URL +
                    mediaUrls[currentIndex]
                  }
                  alt="Zoomed Media"
                  className="max-w-[90vw] max-h-[90vh] rounded-md"
                  onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
                />
              ) : (
                <ModernVideoPlayer
                  selectedUrl={
                    process.env.REACT_APP_API_Aws_Image_BASE_URL +
                    mediaUrls[currentIndex]
                  }
                />
              )}

              {/* Navigation Arrows */}
              <button
                className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white text-black px-3 py-1 rounded-full text-lg font-bold"
                onClick={prevImage}
              >
                ◀
              </button>
              <button
                className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white text-black px-3 py-1 rounded-full text-lg font-bold"
                onClick={nextImage}
              >
                ▶
              </button>

              {/* Close Button */}
              <button
                className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded-full text-lg font-bold"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ImageNavigationCard;
