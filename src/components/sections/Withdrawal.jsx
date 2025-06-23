function Withdrawal(props){
    return(
        <div className="card mb-3 p-3 shadow-sm">
            <h5>Withdrawal ID: {props.withdrawalID}</h5>
            <h6>Manager ID: {props.managerID}</h6>
            <h6>Finance ID: {props.financeID}</h6>
            <p>First Name: {props.firstName}</p>
            <p>Last Name: {props.lastName}</p>
            <p>Phone: {props.phone}</p>
            <p>Withdrawal Amount: {props.withdrawalAmount}</p>
            <p>Withdrawal Date: {props.withdrawalDate}</p>
            <p>Withdrawal Time: {props.withdrawalTime}</p>
        </div>
    );
}
export default Withdrawal;