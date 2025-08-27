import React from 'react';
import CustDashProps from '@/interfaces/custDash';

//components
import DynamicDiv from '../containers/DynamicDiv';
import DynamicP from '../p/DynamicP';
import DynamicHead from '../h/DynamicHead';

export default function DashCard({head, p1, p2, p3} : CustDashProps) {
  return (
    <DynamicDiv className="col-12 col-sm-6 col-lg-3 mb-4">
        <DynamicDiv className="card shadow-sm h-100 text-white"
            style={{backgroundColor:'#306754'}}
        >
            <DynamicDiv className="card-body">
                <DynamicHead className="card-title" text={head}/>
                <DynamicP className="card-text" text={p1}/>
                <DynamicP className="card-text" text={p2}/>
                <DynamicP className="card-text" text={p3}/>
            </DynamicDiv>
        </DynamicDiv>
    </DynamicDiv>
  );
}

