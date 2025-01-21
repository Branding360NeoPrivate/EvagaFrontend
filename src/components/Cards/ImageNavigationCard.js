// import React from "react";
// import ReactImageMagnify from "react-image-magnify";

// function ImageNavigationCard ({
//     images,
//     selectedImage,
//     onImageClick,
// })
// {
//     return (
//         <div className="flex w-[450px] h-[400px] rounded-md overflow-hidden p-5 bg-white">
//           {/* Sidebar */}
//           <div className="w-[%] h-full overflow-y-scroll no-scrollbar">
//             <div className="flex flex-col gap-2 p-2">
//               {images.map((image, index) => (
//                 <img
//                   key={index}
//                   src={process.env.REACT_APP_API_Image_BASE_URL+ image}
//                   alt={`Thumbnail ${index + 1}`}
//                   className="w-[80px] h-[60px] object-cover rounded-md cursor-pointer border-2 border-transparent hover:scale-110 hover:border-blue-500 transition-transform duration-200"
//                   onClick={() => onImageClick(image)}
//                 />
//               ))}
//             </div>
//           </div>

//       {/* Main Image with External Zoom */}
//       <div className="flex-1 flex items-center justify-center">
//       <ReactImageMagnify
//   {...{
//     smallImage: {
//       alt: "Selected Image",
//       isFluidWidth: true,
//       src: selectedImage,
//     },
//     largeImage: {
//       src: [process.env.REACT_APP_API_Image_BASE_URL+selectedImage],
//       width: 1600, // High-resolution width
//       height: 1200, // High-resolution height
//     },
//     enlargedImageContainerStyle: {
//       position: "fixed",
//       top: "10%", // Position relative to viewport
//       left: "calc(100% + 10px)", // Places zoom container beside the current component
//       zIndex: 1000,
//       width: "80vw",
//       height: "80vh",
//       background: "rgba(0,0,0,0.8)",
//       pointerEvents: "none", // Prevents interaction interference
//     },
//     enlargedImagePosition: "over", // Ensures precise zoom calculation
//   }}
// />

//       </div>
//         </div>
//       );
//     };

// export default ImageNavigationCard;

import React from "react";
import ModernVideoPlayer from "../../utils/ModernVideoPlayer ";

function ImageNavigationCard({ mediaUrls, selectedUrl, onMediaClick }) {
  const isImage = (url) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
    const extension = url?.split(".")?.pop()?.toLowerCase();
    return imageExtensions.includes(extension);
  };


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

      {/* Main Media */}
      <div className="flex-1 flex items-center justify-center relative">
        {isImage(selectedUrl) ? (
          <div className="group relative w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full">
              <div className="relative w-full h-full overflow-hidden group">
                <img
                  src={process.env.REACT_APP_API_Image_BASE_URL + selectedUrl}
                  alt="Selected Media"
                  className="w-full h-full object-full rounded-md"
              
                />
              </div>
            </div>
          </div>
        ) : (
   
          <ModernVideoPlayer selectedUrl={process.env.REACT_APP_API_Image_BASE_URL + selectedUrl}/>
        )}
      </div>
    </div>
  );
}

export default ImageNavigationCard;
