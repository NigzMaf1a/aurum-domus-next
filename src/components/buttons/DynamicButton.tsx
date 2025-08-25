import React from "react";

interface ButtonProps {
  label: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const DynamicButton: React.FC<ButtonProps> = ({
  label,
  className = "",
  style = {},
  onClick,
}) => {
  return (
    <button
      type="button"
      className={`btn ${className}`}
      style={style}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default DynamicButton
