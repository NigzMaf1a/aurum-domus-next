"use client";
import React, { ReactNode } from "react";

interface DynamicDivProps {
  children: ReactNode;         
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function FleshVert({
  children,
  onClick,
  className = "",
  style = {},
}: DynamicDivProps) {
  return (
    <div
      onClick={onClick}
      className={`d-flex flex-column col-lg-12 col-12 rounded gap-2 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
