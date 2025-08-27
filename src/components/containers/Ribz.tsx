import React, { ReactNode } from "react";

interface DynamicDivProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function Ribz({
  children,
  onClick,
  className = "",
  style = {},
}: DynamicDivProps) {
  return (
    <div
      onClick={onClick}
      className={`d-flex flex-row col-lg-12 col-sm-6 rounded ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
