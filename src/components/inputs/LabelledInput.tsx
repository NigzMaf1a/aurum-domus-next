import React from "react";

interface InputProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function LabelledInput({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  className = "",
  style = {},
}: InputProps) {
  return (
    <div className={`mb-3 ${className}`} style={style}>
      <label className="form-label fw-bold">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="form-control"
      />
    </div>
  );
}
