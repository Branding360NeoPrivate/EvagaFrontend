import React, { useRef, useState } from "react";

const ModernVideoPlayer = ({ selectedUrl }) => {
    const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };



  return (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
    {/* Video Element */}
    <video
      ref={videoRef}
      src={ selectedUrl}
      muted={isMuted}
      className="w-full h-full object-contain"
      autoPlay
      loop
    ></video>

    {/* Mute/Unmute Button */}
    <button
      onClick={toggleMute}
      className="absolute bottom-4 right-4 bg-white text-black rounded-full p-2 shadow-lg focus:outline-none"
    >
      {isMuted ? "🔇" : "🔊"}
    </button>
  </div>
  );
};

export default ModernVideoPlayer;
