import React from 'react';
import DynamicP from './DynamicP';
import DynamicDiv from '../containers/DynamicDiv';

// interfaces and types
import { StringOrNumber } from '@/types/customer';

interface Props {
  text: StringOrNumber;
  label: StringOrNumber;
  className?: string;
  style?: React.CSSProperties;
}

export default function LabelledP1({ text, label, className = '', style = {} }: Props) {
  return (
    <DynamicDiv className={`d-flex align-items-center gap-2 ${className}`} style={style}>
      <DynamicP text={label} 
                className="mb-0 fw-bold" 
                style={{fontFamily:"'Crimson Pro', serif", fontSize:'12px'}}
      />
      <DynamicP text={text} 
                className="mb-0 fst-italic" 
                style={{fontFamily:"'Merriweather', serif", fontSize:'12px'}}
      />
    </DynamicDiv>
  );
}
