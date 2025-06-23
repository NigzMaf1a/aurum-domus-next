function Dishes(props){
    return(
        <div className="card mb-3 p-3 shadow-sm">
            <h5>Dish ID: {props.dishID}</h5>
            <h6>Unit ID: {props.unitID}</h6>
            <h6>Name: {props.name}</h6>
            <p>Description: {props.description}</p>
            <p>Price: {props.price}</p>
            <p>Available: {props.available}</p>
        </div>
    );
}
export default Dishes;