import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  label: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onHover?: () => void; // Added custom hover handler
  onLeave?: () => void; // Optional leave handler
}

const DynamicButton: React.FC<ButtonProps> = ({
  type = "button",
  label,
  className = "",
  style = {},
  onClick,
  onHover,
  onLeave,
}) => {
  return (
    <button
      type={type}
      className={`btn d-flex flex-row align-items-center justify-content-center w-auto mx-2 px-2 py-2${className}`}
      style={style}
      onClick={onClick}
      onMouseEnter={onHover} 
      onMouseLeave={onLeave}
    >
      {label}
    </button>
  );
};

export default DynamicButton;
