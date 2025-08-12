import React from 'react';
import { TextProp } from '@/interfaces/utils';

export default function LoadP({text}:TextProp) {
  return (
    <div className="card p-4 shadow-sm">
      <p className="text-center text-muted">{text}</p>
    </div>
  );
}
