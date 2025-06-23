function Orders(props) {
  return (
    <div className="container my-3">
      <div className="card shadow-sm">
        <div className="card-body">
          {/* Headers */}
          <h5 className="card-title">Order ID: {props.orderId}</h5>
          <div className="row mb-3">
            <div className="col-12 col-md-4">
              <h6>Unit ID: {props.productId}</h6>
              <h6>Customer ID: {props.customerId}</h6>
              <h6>Dish ID: {props.dishId}</h6>
            </div>
            <div className="col-12 col-md-8">
              <p><strong>Dish Name:</strong> {props.dishName}</p>
              <p><strong>Dish Price:</strong> ${props.dishPrice}</p>
              <p><strong>Plates:</strong> {props.plates}</p>
              <p><strong>Order Price:</strong> ${props.orderPrice}</p>
            </div>
          </div>

          {/* Description and Status */}
          <div className="row">
            <div className="col-12 col-md-6">
              <p><strong>Description:</strong> {props.orderDescription}</p>
              <p><strong>Date:</strong> {props.orderDate}</p>
              <p><strong>Time:</strong> {props.orderTime}</p>
            </div>
            <div className="col-12 col-md-6">
              <p>
                <strong>Payment Status:</strong>{" "}
                <span className={props.paymentStatus ? "text-success" : "text-danger"}>
                  {props.paymentStatus ? "Paid" : "Unpaid"}
                </span>
              </p>
              <p>
                <strong>Order Status:</strong>{" "}
                <span className={props.orderStatus ? "text-primary" : "text-warning"}>
                  {props.orderStatus ? "Served" : "Pending"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
