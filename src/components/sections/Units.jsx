function Units(props){
    return (
        <div>
            <h5>Unit ID: {props.unitId}</h5>
            <h6>Unit Name: {props.unitName}</h6>
            <p>Unit Email: {props.unitEmail}</p>
            <p>Unit Phone: {props.unitPhone}</p>
            <p>Unit Location: {props.unitLocation}</p>
            <p>Unit Balance: {props.unitBalance}</p>
            <p>Employees: {props.employees}</p>
        </div>
    );
}
export default Units;