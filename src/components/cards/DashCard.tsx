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
                <DynamicHead className="card-title" 
                             text={head}
                             style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600 }}
                />
                <DynamicP className="card-text" 
                          text={p1}
                          style={{ fontFamily: "'Poppins', sans-serif", fontSize: '16px', fontWeight: 500 }}
                />
                <DynamicP className="card-text" 
                          text={p2}
                          style={{ fontFamily: "'Great Vibes', cursive", fontSize: '18px', color: '#d4af37' }}
                />
                <DynamicP className="card-text" 
                          text={p3}
                          style={{ fontFamily: "'Nunito', sans-serif", fontSize: '16px', fontWeight: 400 }}
                />
            </DynamicDiv>
        </DynamicDiv>
    </DynamicDiv>
  );
}

