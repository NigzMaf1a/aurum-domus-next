import React from 'react';

interface BioProps {
  bioID: number | string;
  unitID: number | string;
  unitPhone: string;
  unitLocation: string;
  instagram: string;
  facebook: string;
  twitter: string;
  aboutUs: string;
}

const Bio: React.FC<BioProps> = (props) => {
  return (
    <div className="card mb-3 p-3 shadow-sm">
      <div className="row">
        <div className="col-12 col-md-6 mb-3 mb-md-0">
          <h5>Bio ID: {props.bioID}</h5>
          <h6>Unit ID: {props.unitID}</h6>
          <p><strong>Unit Phone:</strong> {props.unitPhone}</p>
          <p><strong>Unit Location:</strong> {props.unitLocation}</p>
        </div>

        <div className="col-12 col-md-6">
          <p><strong>Instagram:</strong> {props.instagram}</p>
          <p><strong>Facebook:</strong> {props.facebook}</p>
          <p><strong>Twitter:</strong> {props.twitter}</p>
        </div>
      </div>

      <hr />

      <div>
        <p><strong>About Us:</strong> {props.aboutUs}</p>
      </div>
    </div>
  );
};

export default Bio;
