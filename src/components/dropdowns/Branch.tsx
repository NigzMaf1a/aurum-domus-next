import React from 'react';

//Branch props Interface
interface BranchProps{
    labelFor:string;
    label:string;
    value:string;
    optionLabel:string;
    branches:string[];
    onChange:(par:string) =>void;
}

export default function Branch({labelFor, label, value, optionLabel, branches, onChange}:BranchProps) {
  return (
    <div className="mb-4">
        <label htmlFor={labelFor}>
            {label}
        </label>
        <select id={labelFor}
                className='form-select'
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required
        >
            <option value="" disabled>
                {optionLabel}
            </option>
            {branches.map((branch, index) => (
                <option key={index} value={branch}>
                    {branch}
                </option>
            ))}
        </select>
    </div>
  )
}