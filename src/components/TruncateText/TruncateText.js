import React, { useState } from "react";

const TruncateText = ({ text, maxLines = 3 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <p
    style={{
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      WebkitLineClamp: maxLines,
      textOverflow: "ellipsis",
      whiteSpace: "normal",
      width: "100%",
    }}
    className="text-sm text-textGray font-normal"
  >
    {text}
  </p>

  );
};

export default TruncateText;
