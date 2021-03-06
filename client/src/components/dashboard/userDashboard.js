import React from "react";
import "./userDashboard.css";
import Form from "../form/form";
import { AppContext } from "../../store/store";
import { getFacilityHandler } from "../../services/api.service";
import FacilityTile from "../mics/facilityTile";
import FacilityPreview from "../mics/facilityPreview";
class UserDashboard extends React.Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      hasFacililtyRegistered: null,
      isOpen: false,
      facData: {},
    };
  }
  componentDidMount() {
    this.initUserDashboardHandler();
  }

  async initUserDashboardHandler() {
    const {
      token,
      setFacilityDataHandler,
      // facilityData,
      setIsLoading,
    } = this.context;

    setIsLoading(true);
    let apiresponce = await getFacilityHandler(token);
    if (apiresponce.succed) {
      setFacilityDataHandler(apiresponce.responce.data.foundFacilities);
      if (apiresponce.responce.data.foundFacilities.length > 0) {
        this.setState({ hasFacililtyRegistered: true });
      } else {
        this.setState({ hasFacililtyRegistered: false });
      }
    } else {
      setFacilityDataHandler([]);
      this.setState({ hasFacililtyRegistered: "fail" });
    }
    setIsLoading(false);
  }
  selectFacDataHandler(fac) {
    this.setState({ facData: fac });
  }
  // togglePreviewHandler() {
  //   this.setState({ isOpen: !this.state.isOpen });
  // }
  render() {
    const { userData, facilityData } = this.context;
    let component;
    switch (this.state.hasFacililtyRegistered) {
      case true:
        component = (
          <div className="facility-items">
            <h3>Resgistered Facility</h3>
            <br />
            {facilityData.map((fac) => (
              <div key={fac._id}>
                <FacilityTile
                  facData={fac}
                  key={fac._id}
                  onClick={() => {
                    this.selectFacDataHandler(fac);
                    // this.togglePreviewHandler();
                  }}
                />

                <FacilityPreview facData={fac} />
              </div>
            ))}
          </div>
        );
        break;
      case "fail":
        component = (
          <div className="loading-data-container">
            <div className="loader-image-fail"></div>
            <br />
            <span>Error Loading Data</span>
            <br />
            <a href="/">
              <button
                onClick={() => this.forceUpdate()}
                type="button"
                className="btn btn-danger retry"
              >
                Retry
              </button>
            </a>
          </div>
        );
        break;
      default:
        component = (
          <div className="loading-data-container">
            <div className="loading-data"></div>
          </div>
        );
        break;
    }

    return (
      <div className="user-dashboard">
        <div className="user-profile-container">
          <div className="user-image">
            <span>{userData.email.substring(0, 2).toUpperCase()}</span>
          </div>
          <div className="user-details">
            <span>{userData.email}</span>
          </div>
        </div>
        {this.state.hasFacililtyRegistered === false ? (
          <Form />
        ) : (
          <div className="user-table">
            {component}

            {/* <div
              className={`preview-container ${this.state.isOpen ? "open" : ""}`}
            >
              {this.state.isOpen ? (
                <FacilityPreview facData={this.state.facData} />
              ) : (
                <div className="no-preview-item"></div>
              )}
            </div> */}
          </div>
        )}
      </div>
    );
  }
}

export default UserDashboard;
