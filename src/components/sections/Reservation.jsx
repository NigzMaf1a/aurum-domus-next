function Reservation(props){
    return(
        <div>
            <h5>Reservation ID: {props.reservationID}</h5>
            <h6>Unit ID: {props.unitID}</h6>
            <h6>Table ID: {props.tableID}</h6>
            <h6>Customer ID: {props.customerID}</h6>
            <h6>Order ID: {props.orderID}</h6>
            <h6>Dish ID: {props.dishID}</h6>
            <p>Dish Name: {props.dishName}</p>
            <p>Plates: {props.plates}</p>
            <p>Order Price: {props.orderPrice}</p>
            <p>Payment Status: {props.paymentStatus ? "Paid" : "Unpaid"}</p>
            <p>Reservation Date: {props.reservationDate}</p>
            <p>Reservation Time: {props.reservationTime}</p>
        </div>
    );
}
export default Reservation;