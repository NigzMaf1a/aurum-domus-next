function SupplyOrder(props){
    return(
        <div className="card mb-3 p-3 shadow-sm">
            <h5>Supply Order ID: {props.supplyOrderID}</h5>
            <h6>Supply ID: {props.supplyID}</h6>
            <p>Supply Name: {props.supplyName}</p>
            <p>Quantity Ordered: {props.quantityOrdered}</p>
            <p>Supply Order Price: {props.supplyOrderPrice}</p>
            <p>Supply Payment: {props.supplyPayment ? "Paid" : "Unpaid"}</p>
            <p>Supply Order Date: {props.supplyOrderDate}</p>
            <p>Supply Order Time: {props.supplyOrderTime}</p>
        </div>
    );
}
export default SupplyOrder;