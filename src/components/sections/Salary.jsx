function Salary(props){
    return(
        <div className="card mb-3 p-3 shadow-sm">
            <h5>Salary ID: {props.salaryID}</h5>
            <h6>Finance ID: {props.financeID}</h6>
            <h6>Registration ID: {props.regID}</h6>
            <p>Salary Amount: {props.salaryAmount}</p>
            <p>Salary Paid: {props.salaryPaid}</p>
            <p>Salary Received: {props.salaryReceived}</p>
            <p>Salary Date: {props.salaryDate}</p>
            <p>Salary Time: {props.salaryTime}</p>
        </div>
    );
}
export default Salary;