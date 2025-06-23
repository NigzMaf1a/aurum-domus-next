function Payment(props) {
  return (
    <div className="card mb-3 p-3 shadow-sm">
      <div className="row">
        {/* IDs Section */}
        <div className="col-12 col-md-6 mb-3 mb-md-0">
          <h5>Payment ID: {props.paymentID}</h5>
          <h6>Finance ID: {props.financeID}</h6>
          <h6>Customer ID: {props.customerID}</h6>
          <h6>Order ID: {props.orderID}</h6>
        </div>

        {/* Payment Details Section */}
        <div className="col-12 col-md-6">
          <p><strong>Name 1:</strong> {props.name1}</p>
          <p><strong>Name 2:</strong> {props.name2}</p>
          <p><strong>Payment Type:</strong> {props.paymentType}</p>
          <p><strong>Payment Amount:</strong> ${props.paymentAmount}</p>
          <p><strong>Payment Date:</strong> {props.paymentDate}</p>
          <p><strong>Payment Time:</strong> {props.paymentTime}</p>
        </div>
      </div>
    </div>
  );
}

export default Payment;
