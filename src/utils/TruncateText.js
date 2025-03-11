import React from "react";
import PropTypes from "prop-types";

const TruncateText = ({ children, maxLines = 2, className = "" }) => {
  return (
    <div
      className={`truncate-text ${className}`}
      style={{
        display: "-webkit-box",
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
};

TruncateText.propTypes = {
  children: PropTypes.node.isRequired,
  maxLines: PropTypes.number,
  className: PropTypes.string,
};

export default TruncateText;
