import React from "react";

interface DivProps {
  label:string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function RoundedClickableDivOne({
  label,
  onClick,
  className = "",
  style = {},
}: DivProps) {
  return (
    <div
      onClick={onClick}
      className={`d-flex flex-column justify-content-center align-items-center mx-auto h-100 rounded-5 
                  border w-100 bg-white ${className}`
                }
      style={style}
    >
      <p className="m-0">
        {label}
      </p>
    </div>
  );
}
