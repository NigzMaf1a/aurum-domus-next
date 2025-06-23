function Rollcall(props){
    return (
        <div>
            <h5>Rollcall ID: {props.rollcallID}</h5>
            <h6>Registration ID: {props.regID}</h6>
            <h6>Unit ID: {props.unitID}</h6>
            <p>First Name: {props.firstName}</p>
            <p>Last Name: {props.lastName}</p>
            <p>Phone: {props.phone}</p>
            <p>Email: {props.email}</p>
            <p>Rollcall Date: {props.rollcallDate}</p>
            <p>Rollcall Time: {props.rollcallTime}</p>
        </div>
    );
}
export default Rollcall;