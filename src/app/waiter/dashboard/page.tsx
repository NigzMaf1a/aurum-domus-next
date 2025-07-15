import React from 'react';

export default function Dashboard() {
  return (
    <div className="container mt-4">
        <h1 className="mb-4 textColorless">Dashboard</h1>
        <div className="row" id="cardCont">

            {/* Card 1 */}
            <div className="col-12 col-sm-6 col-lg-3 mb-4">
                <div className="card shadow-sm bg-warning h-100">
                    <div className="card-body">
                    <h5 className="card-title">Pending</h5>
                    <p className="card-text">Number:</p>
                    <p className="card-text">Amount:</p>
                    <p className="card-text">Link:</p>
                    </div>
                </div>
            </div>

            {/* Card 2 */}
            <div className="col-12 col-sm-6 col-lg-3 mb-4">
                <div className="card shadow-sm bg-success h-100 text-white">
                    <div className="card-body">
                    <h5 className="card-title">Pending</h5>
                    <p className="card-text">Number:</p>
                    <p className="card-text">Amount:</p>
                    <p className="card-text">Link:</p>
                    </div>
                </div>
            </div>

            {/* Card 3 */}
            <div className="col-12 col-sm-6 col-lg-3 mb-4">
                <div className="card shadow-sm bg-danger h-100 text-white">
                    <div className="card-body">
                    <h5 className="card-title">Pending</h5>
                    <p className="card-text">Number:</p>
                    <p className="card-text">Amount:</p>
                    <p className="card-text">Link:</p>
                    </div>
                </div>
            </div>

            {/* Card 4 */}
            <div className="col-12 col-sm-6 col-lg-3 mb-4">
                <div className="card shadow-sm bg-info h-100 text-white">
                    <div className="card-body">
                    <h5 className="card-title">Total</h5>
                    <p className="card-text">Favourites:</p>
                    <p className="card-text">Amount:</p>
                    <p className="card-text">Link:</p>
                    </div>
                </div>
            </div>


        </div>
    </div>
  );
}
