import React, { ReactNode } from "react";

interface DynamicDivProps {
  children: ReactNode;         
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function FleshHor({
  children,
  onClick,
  className = "",
  style = {},
}: DynamicDivProps) {
  return (
    <div
      onClick={onClick}
      className={`d-flex flex-row w-auto h-auto ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
