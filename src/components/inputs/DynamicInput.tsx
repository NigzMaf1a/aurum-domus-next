import React from "react";

interface InputProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function DynamicInput({
  value,
  onChange,
  placeholder = "",
  type = "text",
  className = "",
  style = {},
}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`p-2 rounded ${className}`}
      style={style}
    />
  );
}
