import React, { ReactNode } from "react";

interface DynamicDivProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function DynamicDiv({
  children,
  onClick,
  className = "",
  style = {},
}: DynamicDivProps) {
  return (
    <div
      onClick={onClick}
      className={`p-4 border rounded ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
