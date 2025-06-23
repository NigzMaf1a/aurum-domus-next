function Profile(props) {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body p-3">
        <h5 className="card-title">Registration ID: {props.regID}</h5>
        <h6 className="card-subtitle mb-3 text-muted">
          {props.firstName} {props.lastName}
        </h6>
        
        <div className="row">
          <div className="col-12 col-md-6 mb-2">
            <strong>Phone:</strong> {props.phone}
          </div>
          <div className="col-12 col-md-6 mb-2">
            <strong>Email:</strong> {props.email}
          </div>
          <div className="col-12 col-md-6 mb-2">
            <strong>Gender:</strong> {props.gender}
          </div>
          <div className="col-12 col-md-6 mb-2">
            <strong>Registration Type:</strong> {props.regType}
          </div>
          <div className="col-12 col-md-6 mb-2">
            <strong>Account Status:</strong> {props.accStatus}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
