import React from 'react';

interface InputProps {
  labelFor: string;
  label: string;
  type: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function LoginInput2({
  labelFor,
  label,
  type,
  value,
  placeholder,
  onChange
}: InputProps) {
  return (
    <div className="mb-3">
      <label htmlFor={labelFor} className="form-label">
        {label}
      </label>

      <input
        type={type}
        id={labelFor}
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}
