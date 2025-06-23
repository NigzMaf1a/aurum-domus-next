function Stock(props){
    return(
        <div className="card mb-3 p-3 shadow-sm">
            <h5>Stock ID: {props.stockId}</h5>
            <h6>Unit ID: {props.unitId}</h6>
            <h6>Name: {props.itemName}</h6>
            <p>Description: {props.description}</p>
            <p>Quantity: {props.quantity}</p>
            <p>Cost: {props.cost}</p>
            <p>Price: {props.price}</p>
        </div>
    );
}
export default Stock;