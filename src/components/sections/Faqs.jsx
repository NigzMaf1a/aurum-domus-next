function Faqs(props){
    return(
        <div className="card mb-3 p-3 shadow-sm">
            <h5>FAQ ID: {props.faqID}</h5>
            <p>Question: {props.question}</p>
            <p>Answer: {props.answer}</p>
        </div>
    );
}
export default Faqs;