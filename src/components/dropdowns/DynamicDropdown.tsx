import React from "react";

interface DropdownProps {
  values: string[];
  onChange?: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
  defaultValue?: string;
}

const DynamicDropdown: React.FC<DropdownProps> = ({
  values,
  onChange,
  className = "",
  style,
  defaultValue,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) onChange(e.target.value);
  };

  return (
    <select
      className={`form-select ${className}`}
      style={style}
      defaultValue={defaultValue || ""}
      onChange={handleChange}
    >
      <option value="" disabled>
        -- Type --
      </option>
      {values.map((value, index) => (
        <option key={index} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default DynamicDropdown;
