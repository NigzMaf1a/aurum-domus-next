import React from 'react';

interface InputProps{
    labelFor:string;
    label:string;
    type:string;
    value:string;
    placeholder:string;
    onChange: (par: string) => void;
}

export default function LoginInput({labelFor, label, type, value, placeholder, onChange}:InputProps) {
  return (
    <div className="mb-3">
        <label htmlFor={labelFor}>
            {label}
        </label>
        <input type={type}
               id={labelFor}
               className="form-control"
               placeholder={placeholder}
               value={value}
               onChange={(e) => onChange(e.target.value)}
               required
        />
    </div>
  )
}