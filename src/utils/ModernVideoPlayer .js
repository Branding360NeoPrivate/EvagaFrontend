import React, { useRef, useState } from "react";

const ModernVideoPlayer = ({ selectedUrl }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.5); 
  const [showVolumeControls, setShowVolumeControls] = useState(false); 

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    setIsMuted(video.muted);
    if (!video.muted) {
      video.volume = volume;
    }
  };

  const increaseVolume = () => {
    const video = videoRef.current;
    const newVolume = Math.min(volume + 0.1, 1); 
    setVolume(newVolume);
    video.volume = newVolume;
    if (isMuted) {
      video.muted = false;
      setIsMuted(false);
    }
  };

  const decreaseVolume = () => {
    const video = videoRef.current;
    const newVolume = Math.max(volume - 0.1, 0); 
    setVolume(newVolume);
    video.volume = newVolume;
    if (isMuted) {
      video.muted = false;
      setIsMuted(false);
    }
  };

  const toggleVolumeControls = () => {
    setShowVolumeControls((prev) => !prev);
  };

  return (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        src={selectedUrl}
        muted={isMuted}
        className="w-full h-full object-contain"
        autoPlay
        loop
      ></video>

      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        <button
          onClick={toggleVolumeControls}
          className="bg-white text-black rounded-full p-2 shadow-lg focus:outline-none"
        >
          {isMuted ? "🔇" : "🔊"}
        </button>

        {showVolumeControls && (
          <div className="absolute bottom-12 right-0 bg-white rounded-lg p-3 shadow-lg flex flex-col gap-2">
            <button
              onClick={increaseVolume}
              className="text-black hover:bg-gray-100 rounded-full p-1 focus:outline-none"
            >
              🔊+
            </button>
            <button
              onClick={ decreaseVolume}
              className="text-black hover:bg-gray-100 rounded-full p-1 focus:outline-none"
            >
              🔉-
            </button>
            <button
              onClick={toggleMute}
              className="text-black hover:bg-gray-100 rounded-full p-1 focus:outline-none"
            >
              {isMuted ? "Unmute" : "Mute"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernVideoPlayer;