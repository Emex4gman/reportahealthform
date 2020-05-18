import React from "react";
import "./userDashboard.css";
import Form from "../form/form";

class UserDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasFacililtyRegistered: true,
    };
  }
  render() {
    return (
      <div className="user-dashboard">
        <div className="user-profile-container">
          <div className="user-image">
            <span>CI</span>
          </div>
          <div className="user-details">
            <span>emex4gman@gmail.com</span>
          </div>
        </div>
        {this.state.hasFacililtyRegistered ? (
          <Form />
        ) : (
          <div className="user-table">
            <h4>No Registered facility</h4>
            <button
              onClick={() => this.setState({ hasFacililtyRegistered: true })}
              type="button"
              className="btn btn-primary"
            >
              Register a facility
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default UserDashboard;
