import React from 'react';

// interfaces and types
import { StringOrNumber } from '@/types/customer';

interface Props {
  text: StringOrNumber;
  className?: string;
  style?: React.CSSProperties;
}

export default function DynamicP({ text, className = '', style = {} }: Props) {
  return (
    <p className={` ${className}`} style={style}>
      {text}
    </p>
  );
}
