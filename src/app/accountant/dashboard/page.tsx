"use client";
import React from 'react';
import { useState, useEffect } from 'react';

function Dashboard() {
  const [data, setData] = useState({
    pending: { number: 0, amount: 0 },
    approved: { number: 0, amount: 0 },
    rejected: { number: 0, amount: 0 },
    total: { number: 0, amount: 0 },
  });

  useEffect(() => {
    // Fetch data from API or perform calculations
    const fetchData = async () => {
      // Simulated API response
      const response = {
        pending: { number: 5, amount: 100 },
        approved: { number: 10, amount: 200 },
        rejected: { number: 2, amount: 50 },
        total: { number: 17, amount: 350 },
      };
      setData(response);
    };

    fetchData();
  }, [data]);

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
          <div className="card shadow-sm h-100 bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">Approved</h5>
              <p className="card-text">Number:</p>
              <p className="card-text">Amount:</p>
              <p className="card-text">Link:</p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-12 col-sm-6 col-lg-3 mb-4">
          <div className="card shadow-sm h-100 bg-danger text-white">
            <div className="card-body">
              <h5 className="card-title">Rejected</h5>
              <p className="card-text">Number:</p>
              <p className="card-text">Amount:</p>
              <p className="card-text">Link:</p>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="col-12 col-sm-6 col-lg-3 mb-4">
          <div className="card shadow-sm h-100 bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">Total</h5>
              <p className="card-text">Number:</p>
              <p className="card-text">Amount:</p>
              <p className="card-text">Link:</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
