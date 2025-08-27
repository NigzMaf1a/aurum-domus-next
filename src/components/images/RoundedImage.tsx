import React from "react";

interface RoundedImageProps {
  src: File;
  className?: string;
  style?: React.CSSProperties;
}

const RoundedImage: React.FC<RoundedImageProps> = ({ src, className = "", style = {} }) => {
  return (
    <img
      src={src}
      className={`img-fluid rounded-circle${className}`}
      style={style}
      alt="image"
    />
  );
};

export default RoundedImage;
