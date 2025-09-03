"use client";
import React, { ReactNode } from "react";

interface DynamicDivProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function Skeleton({
  children,
  onClick,
  className = "",
  style = {},
}: DynamicDivProps) {
  return (
    <div
      onClick={onClick}
      className={`container w-100 py-4 min-vh-100 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
