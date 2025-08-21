import React from 'react';
import { StringOrNumber } from '@/types/customer';

// Props interface
interface Head1Props {
  text: StringOrNumber;           
  onClick?: () => void;    
  className?: string;               
  style?: React.CSSProperties;       
}

export default function DynamicHead({
  text,
  onClick,
  className = "",
  style = {},
}: Head1Props) {
  return (
    <h2
      onClick={onClick}
      className={` ${className}`}
      style={style}
    >
      {text}
    </h2>
  );
}
