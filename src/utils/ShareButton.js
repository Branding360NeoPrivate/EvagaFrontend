import React, { useState, useRef, useEffect } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";
import share from "../assets/Temporary Images/share-square 1.png";
export const ShareButton = ({ url, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const toggleShareOptions = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button onClick={toggleShareOptions} className=" text-white py-2 px-4 ">
        <img src={share} alt="share" className="object-contain h-[2rem]" />
        <p className="text-sm text-textGray font-medium">Share</p>
      </button>

      {isOpen && (
        <div className="absolute top-12 left-0 bg-white border rounded shadow-lg p-2 flex gap-2">
          <FacebookShareButton url={url} quote={title}>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>

          <TwitterShareButton url={url} title={title}>
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>

          <WhatsappShareButton url={url} title={title}>
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>

          <LinkedinShareButton url={url} title={title}>
            <LinkedinIcon size={32} round={true} />
          </LinkedinShareButton>
        </div>
      )}
    </div>
  );
};
