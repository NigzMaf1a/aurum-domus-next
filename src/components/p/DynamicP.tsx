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
    <p className={`mb-sm-3 ${className}`} style={style}>
      {text}
    </p>
  );
}
