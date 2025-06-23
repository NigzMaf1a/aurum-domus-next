import React from 'react';

const DashboardPage: React.FC = () => {
    return (
        <div className="container mt-4">
            <h1 className="mb-4 textColorless">Dashboard</h1>
            <div className="row" id="cardCont">

                {/* Card 1 */}
                <div className="col-12 col-sm-6 col-lg-3 mb-4">
                    <div className="card shadow-sm bg-warning h-100">
                        <div className="card-body">
                            <h5 className="card-title">Pending</h5>
                            <p className="card-text">10 unapproved users.</p>
                            <p className="card-text">Alice is awaiting approval.</p>
                            <p className="card-text">Bob is awaiting approval.</p>
                            <p className="card-text">Charlie is awaiting approval.</p>
                            <p className="card-text">David is awaiting approval.</p>
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="col-12 col-sm-6 col-lg-3 mb-4">
                    <div className="card shadow-sm h-100 bg-success text-white">
                        <div className="card-body">
                            <h5 className="card-title">Done</h5>
                            <p className="card-text">3 customers have been approved successfully</p>
                            <p className="card-text">Kevin approved successfully.</p>
                            <p className="card-text">Jacky approved successfully.</p>
                            <p className="card-text">George approved successfully.</p>
                            <p className="card-text">All systems operational.</p>
                        </div>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="col-12 col-sm-6 col-lg-3 mb-4">
                    <div className="card shadow-sm h-100 bg-danger text-white">
                        <div className="card-body">
                            <h5 className="card-title">Issues</h5>
                            <p className="card-text">4 issues require immediate attention.</p>
                            <p className="card-text">Eunice is inactive.</p>
                            <p className="card-text">Felix is inactive.</p>
                            <p className="card-text">Gloria is inactive.</p>
                            <p className="card-text">Jared is inactive.</p>
                        </div>
                    </div>
                </div>

                {/* Card 4 */}
                <div className="col-12 col-sm-6 col-lg-3 mb-4">
                    <div className="card shadow-sm h-100 bg-info text-white">
                        <div className="card-body">
                            <h5 className="card-title">Info</h5>
                            <p className="card-text">10 users approved successfully.</p>
                            <p className="card-text">Latest activity feed.</p>
                            <p className="card-text">Password change successful</p>
                            <p className="card-text">Client interaction log.</p>
                            <p className="card-text">Pending approvals list.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardPage;
