function Tables(props){
    return(
        <div className="card mb-3 p-3 shadow-sm">
            <h5>Unit ID: {props.unitId}</h5>
            <h6>Table NO: {props.tableId}</h6>
            <p>Table Name: {props.tableName}</p>
            <p>Table Capacity: {props.tableCapacity}</p>
            <div>Table Status: {props.tableStatus ? "Occupied" : "Vacant"}</div>
        </div>
    );
}
export default Tables;