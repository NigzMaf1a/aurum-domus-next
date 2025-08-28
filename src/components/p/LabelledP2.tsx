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

export default function LabelledP2({ text, label, className = '', style = {} }: Props) {
  return (
    <DynamicDiv className={`d-flex align-items-center gap-2 ${className}`} style={style}>
      <DynamicP text={label} 
                className="mb-0 fw-bold" 
                style={{fontFamily:"'Crimson Pro', serif", fontSize:'14px', color:'#808080'}}
      />
      <DynamicP text={text} 
                className="mb-0" 
                style={{fontFamily:"'Merriweather', serif", fontSize:'14px'}}
      />
    </DynamicDiv>
  );
}
