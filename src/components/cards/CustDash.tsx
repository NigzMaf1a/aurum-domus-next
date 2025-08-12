import React from 'react';
import CustDashProps from '@/interfaces/custDash';

export default function CustDash({head, p1, p2, p3} : CustDashProps) {
  return (
    <div className="col-12 col-sm-6 col-lg-3 mb-4">
        <div className="card shadow-sm bg-success h-100 text-white">
            <div className="card-body">
                <h5 className="card-title">{head}</h5>
                <p className="card-text">{p1}</p>
                <p className="card-text">{p2}</p>
                <p className="card-text">{p3}</p>
            </div>
        </div>
    </div>
  );
}

