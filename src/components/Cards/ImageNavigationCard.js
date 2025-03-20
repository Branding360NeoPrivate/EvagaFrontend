import React, { useEffect, useRef, useState } from "react";
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
  const modalRef = useRef(null); 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, setIsModalOpen]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  return (
    <div
      className="flex flex-col-reverse justify-center items-center xl:flex-row lg:flex-wrap-reverse xl:flex-nowrap gap-2 w-full lg:min-w-[300px] h-auto
   rounded-md overflow-hidden bg-white"
    >
      <div className="w-fit h-auto">
        <div className=" w-[350px] md:w-[400px] xl:w-auto xl:min-w-[80px] xl:h-[400px] flex xl:flex-col justify-start items-start overflow-x-scroll xl:overflow-x-hidden xl:overflow-y-scroll no-scrollbar gap-5 p-2 custom-scrollbar">
          {mediaUrls.map((url, index) => (
            <div key={index} className=" w-[80px] cursor-pointer">
              {isImage(url) ? (
                <img
                  src={process.env.REACT_APP_API_Aws_Image_BASE_URL + url}
                  style={{ maxWidth: "unset" }}
                  alt={`Thumbnail ${index + 1}`}
                   decoding="async"
                  className="w-[80px] h-[60px] object-cover object-center rounded-md border-2 border-transparent hover:scale-110 hover:border-blue-500 transition-transform duration-200"
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
      <div className=" flex-shrink md:w-fit h-[400px] md:min-w-[350px] flex-1 flex items-center justify-center relative">
        {isImage(selectedUrl) ? (
          <div className="group relative w-full aspect-[4/5] h-full flex items-center justify-center">
            <img
              src={process.env.REACT_APP_API_Aws_Image_BASE_URL + selectedUrl}
              alt="Selected Media"
               decoding="async"
              className="w-[300px] md:w-[350px] lg:w-[450px] h-auto object-cover rounded-lg cursor-pointer aspect-[4/5]"
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
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 h-[100%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative h-[90%]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              ref={modalRef}
              // onClick={() => setIsModalOpen(false)}
            >
              {isImage(mediaUrls[currentIndex]) ? (
                <img
                  src={
                    process.env.REACT_APP_API_Aws_Image_BASE_URL +
                    mediaUrls[currentIndex]
                  }
                  alt="Zoomed Media"
                  className="max-w-[90vw] max-h-[90vh] rounded-md"
                  onClick={(e) => e.stopPropagation()} 
                />
              ) : (
                <ModernVideoPlayer
                  selectedUrl={
                    process.env.REACT_APP_API_Aws_Image_BASE_URL +
                    mediaUrls[currentIndex]
                  }
                />
              )}
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
