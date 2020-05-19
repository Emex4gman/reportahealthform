import React, { Component } from "react";
import "./form.css";
import { AppContext } from "../../store/store";
import { lgas, states } from "../../data/states_lgas";
import services from "../../data/services";
import Checkbox from "../checkbox/checkbox";
import { registerFacilityHandler } from "../../services/api.service";
import CustomModel, { modelControl } from "../modeldialog/modeltwo";

class Form extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      succed: "",
      phone_number: "",
      operational_hours: "24h",
      lgaOptions: [],
      fac_email: "",
      stateOptions: [],
      checkedItems: new Map(),
      country: "nigeria",
      reg_fac_name: "",
      street_name: "",
      lganame: "",
      statename: "",
      latitude: "",
      longitude: "",
      fac_type: "1",
      ownership: "private",
      facility_level: "primary",
      services: [],
      modelMessage: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLoaction = this.handleLoaction.bind(this);
  }
  handleChange(e) {
    let servicesList = [...this.state.services];
    const item = e.target.name;
    const isChecked = e.target.checked;
    if (isChecked) {
      servicesList.push(item);
    } else {
      servicesList.pop(item);
    }
    this.setState((prevState) => ({
      checkedItems: prevState.checkedItems.set(item, isChecked),
      services: servicesList,
    }));
  }

  componentDidMount() {
    this.handleLoaction();
    // const {  token } = this.context;
    let stateOptions = [
      <option key="00" value="00">
        select state
      </option>,
    ];
    states.forEach((item) => {
      stateOptions.push(
        <option key={item.id} value={item.id}>
          {item.state}
        </option>
      );
    });
    this.setState({ stateOptions: stateOptions });
  }

  handleLoaction = async () => {
    await navigator.geolocation.getCurrentPosition(
      (position) =>
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      (err) => console.log(err)
    );
  };

  handleInputChange = (e, key) => {
    this.setState({
      [key]: e.target.value.trim(),
    });
  };

  handleSelectChange = (e, key) => {
    this.setState({ [key]: e.target.value });
  };
  handleStateSelect = (e, key) => {
    let lgaOptions = [
      <option key="00" value="00">
        select lag
      </option>,
    ];

    lgas.forEach((item) => {
      if (item.state_id === e.target.value)
        lgaOptions.push(
          <option key={item.lga_id} value={item.lga_id}>
            {item.lga}
          </option>
        );

      this.setState({ lgaOptions: lgaOptions, [key]: e.target.value });
    });
  };
  validateForm() {
    var elmnt = document.getElementById("reg-form");
    if (
      this.state.reg_fac_name === "" ||
      this.state.street_name === "" ||
      this.state.lganame === "" ||
      this.state.statename === ""
    ) {
      elmnt.scrollIntoView(true);
      return;
    }
  }
  submit = async () => {
    this.validateForm();
    const { token, setIsLoading } = this.context;
    setIsLoading(true);
    modelControl("open");
    this.setState({
      modelMessage: "",
      succed: "",
    });
    let data = await registerFacilityHandler(this.state, token);

    if (data.succed === true) {
      this.setState({
        modelMessage: "Facility was registered successfully ",
        succed: data.succed,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      this.setState({
        modelMessage: data.responce.message,
        succed: data.succed,
      });
    }

    setIsLoading(false);
  };

  render() {
    let switchService;
    switch (this.state.fac_type) {
      case "1":
        switchService = services;
        break;
      default:
        switchService = [];
        break;
    }
    return (
      <div className="form-container " id="reg-form">
        <CustomModel
          message={this.state.modelMessage}
          succed={this.state.succed}
        />
        <form
          className="form "
          autoComplete="off"
          id="reg-form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h2>Register a facility</h2>

          <div className="form-group">
            <label htmlFor="name">Name of facility</label>
            <input
              autoComplete="off"
              className="form-control"
              type="text"
              name="reg_fac_name"
              id="reg_fac_name"
              onChange={(e) => this.handleInputChange(e, "reg_fac_name")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone_number">Facility phone number</label>
            <input
              autoComplete="off"
              className="form-control"
              type="number"
              name="phone_number"
              id="phone_number"
              onChange={(e) => this.handleInputChange(e, "phone_number")}
            />
          </div>

          <div className="form-group">
            <label>Country</label>
            <select
              className="form-control"
              value={this.state.country}
              name="country"
              id="country"
              onChange={(e) => this.handleInputChange(e, "country")}
            >
              <option value="nigeria">Nigeria</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="statename"> State</label>
            <select
              className="form-control"
              value={this.state.state}
              name="statename"
              id="statename"
              onChange={(e) => this.handleStateSelect(e, "statename")}
            >
              {this.state.stateOptions}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="lganame">LGA</label>

            <select
              className="form-control"
              value={this.state.lga}
              name="lganame"
              id="lganame"
              onChange={(e) => this.handleInputChange(e, "lganame")}
            >
              {this.state.lgaOptions}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="email">Facility email address</label>
            <input
              className="form-control"
              type="email"
              name="email"
              id="email"
              onChange={(e) => this.handleInputChange(e, "fac_email")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Facility Address</label>
            <input
              className="form-control"
              type="text"
              name="street_name"
              id="address"
              onChange={(e) => this.handleInputChange(e, "street_name")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="postal_address">Postal Address</label>
            <input
              className="form-control"
              type="text"
              name="postal_address"
              id="postal_address"
              onChange={(e) => this.handleInputChange(e, "postal_address")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="facility_website">Facility Website</label>
            <input
              className="form-control"
              type="text"
              name="facility_website"
              id="facility_website"
              onChange={(e) => this.handleInputChange(e, "facility_website")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fac_type">Facility Type</label>
            <select
              required="required"
              className="form-control"
              name="fac_type"
              id="fac_type"
              onChange={(e) => this.handleSelectChange(e, "fac_type")}
            >
              <option value="1">Hospitals</option>
              <option value="2">Pharmacy</option>
              <option value="3">Laboratory</option>
              <option value="4">Imaging/Radiological Center</option>
            </select>
          </div>
          <div className="form-group">
            <div className="checkbox-container">
              <span>Type of Services</span>
              <div className="checkbox-items">
                {switchService.map((item) => (
                  <label key={item.key}>
                    {item.name}{" "}
                    <Checkbox
                      name={item.name}
                      checked={this.state.checkedItems.get(item.name)}
                      onChange={this.handleChange}
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="form-group ">
            <label htmlFor="ownership">Ownership</label>
            <select
              required="required"
              name="ownership"
              id="ownership"
              className="form-control"
              onChange={(e) => this.handleSelectChange(e, "ownership")}
            >
              <option value="2">Private</option>
              <option value="1">Public</option>
            </select>
          </div>

          <div className="form-group ">
            <label htmlFor="level">Facility Level</label>{" "}
            <select
              required="required"
              name="facility_level"
              id="level"
              className="form-control"
              onChange={(e) => this.handleSelectChange(e, "facility_level")}
            >
              <option value="1">Primary</option>
              <option value="2">Secondary</option>
              <option value="3">Tertiary</option>
            </select>
          </div>
          <div className="form-group ">
            <label htmlFor="operational_hours">Operational Hours</label>{" "}
            <select
              required="required"
              name="operational_hours"
              id="operational_hours"
              className="form-control"
              onChange={(e) => this.handleSelectChange(e, "operational_hours")}
            >
              <option value="24hr">24 hours</option>
              <option value="6am-6pm">6am - 6pm</option>
              <option value="only-weekends">Only weekends</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="profile">
              Provide an Image of the facility show a sign post with the
              facility name in it.
            </label>
            <input
              className="form-control"
              type="file"
              name="profile"
              id="profile"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cac">
              Provide a copy of the CAC registration of the Facility.
            </label>
            <input className="form-control" type="file" name="cac" id="cac" />
          </div>

          <div className="form-group">
            <button
              onClick={this.submit}
              type="submit"
              className="form-control btn btn-success"
              // data-toggle="modal"
              // data-target="#exampleModal"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
