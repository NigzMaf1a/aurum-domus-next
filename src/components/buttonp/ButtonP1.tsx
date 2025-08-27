import React from 'react';

// interfaces and types
import { StringOrNumber } from '@/types/customer';

interface Props {
  text: StringOrNumber;
  callback: () => void;
  className?: string; 
  style?: React.CSSProperties;
}

export default function ButtonP1({ text, callback, className = '', style = {} }: Props) {
  return (
    <p
      className={`mb-4 fs-2 text-end text-primary fw-bold ${className}`}
      style={{ cursor: 'pointer', ...style }}
      onClick={callback}
    >
      {text}
    </p>
  );
}
