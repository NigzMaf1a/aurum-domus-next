function Feedback(props){
    return(
        <div className="card mb-3 p-3 shadow-sm">
            <h5>Feedback ID: {props.feedbackID}</h5>
            <h6>Customer ID: {props.customerID}</h6>
            <h6>Email: {props.email}</h6>
            <p>Comments: {props.comments}</p>
            <p>Response: {props.response}</p>
            <p>Rating: {props.rating}</p>
            <p>Feedback Date: {props.feedbackDate}</p>
        </div>
    );
}
export default Feedback;