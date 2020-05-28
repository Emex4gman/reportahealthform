import React, { Component } from "react";
import "./form.css";
import { AppContext } from "../../store/store";
import { lgas, states } from "../../data/states_lgas";
import services, {
  coreRadiologicalServices,
  coreHospitalServices,
} from "../../data/services";
import {
  daysOfOperations,
  licenseStatus,
  operationalStatus,
  registrationStatus,
  premises,
} from "../../data/options";
import Checkbox from "../checkbox/checkbox";
import { registerFacilityHandler } from "../../services/api.service";
import CustomModel, { modelControl } from "../modeldialog/modeltwo";
import RadioButtonInput from "../radioButtonInput/radioButtoninput";
import HumanResourcesForm from "../humanResourcesForm/humanResourcesForm";

class Form extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      CouncilRegistrationNumber: "",
      succed: "",
      licenseStatus: "Unknown",
      registrationStatus: "Unknown",
      premises: "",
      phone_number: "",
      operational_hours: "24h",
      operationalStatus: "",
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
      specilizations: [],
      daysOfOperations: [],
      modelMessage: "",
      specilizationsList: [],
      humanResources: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLoaction = this.handleLoaction.bind(this);
  }
  handleChange(e, key) {
    let servicesList = [...this.state[`${key}`]];
    const item = e.target.name;
    const isChecked = e.target.checked;
    if (isChecked) {
      servicesList.push(item);
    } else {
      servicesList.pop(item);
    }
    this.setState((prevState) => ({
      checkedItems: prevState.checkedItems.set(item, isChecked),
      [key]: servicesList,
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.services.length !== this.state.services.length) {
      this.handleSpecilizationsChange(prevState);
    }
    if (prevState.fac_type !== this.state.fac_type) {
      this.setState({
        services: [],
        specilizations: [],
        specilizationsList: [],
        checkedItems: new Map(),
      });
    }
  }

  handleRadioChange(e, key) {
    this.setState({ [key]: e.target.value });
  }

  handleLoaction = async () => {
    await navigator.geolocation.getCurrentPosition(
      (position) =>
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      (err) =>
        this.setState({
          latitude: 0,
          longitude: 0,
        })
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
    let validated = false;
    if (
      this.state.reg_fac_name === "" ||
      this.state.street_name === "" ||
      this.state.lganame === "" ||
      this.state.statename === ""
    ) {
      window.scrollTo(0, 0);
      modelControl("open");

      this.setState({
        modelMessage: "Some fileds are empty",
        succed: false,
      });
    } else {
      validated = true;
    }
    return validated;
  }
  submit = async () => {
    if (this.validateForm()) {
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
    }
  };

  async handleSpecilizationsChange(prevState) {
    // get the state of the  previous list and update the
    //list depening on the content in the services state
    let serviceList = [...this.state.services];
    let newList = [];
    //add medical Services
    if (serviceList.includes("Medical")) {
      coreHospitalServices.filter((item) => {
        if (item.name === "Medical") {
          newList.push(...item.options);
        }
        return true;
      });
    }
    //add Dental Services
    if (serviceList.includes("Dental")) {
      coreHospitalServices.filter((item) => {
        if (item.name === "Dental") {
          newList.push(...item.options);
        }
        return true;
      });
    }

    //add Pediatrics Services
    if (serviceList.includes("Pediatrics")) {
      coreHospitalServices.filter((item) => {
        if (item.name === "Pediatrics") {
          newList.push(...item.options);
        }
        return true;
      });
    }
    //add Surgical Services
    if (serviceList.includes("Surgical")) {
      coreHospitalServices.filter((item) => {
        if (item.name === "Surgical") {
          newList.push(...item.options);
        }
        return true;
      });
    }
    //add Obstetrics and Gynecology Services
    if (serviceList.includes("Obstetrics and Gynecology")) {
      coreHospitalServices.filter((item) => {
        if (item.name === "Obstetrics and Gynecology") {
          newList.push(...item.options);
        }
        return true;
      });
    }
    //add Specical Services
    if (serviceList.includes("Specical Services")) {
      coreHospitalServices.filter((item) => {
        if (item.name === "Specical Services") {
          newList.push(...item.options);
        }
        return true;
      });
    }

    this.setState({
      specilizationsList: newList,
    });
  }
  render() {
    let switchService;
    switch (this.state.fac_type) {
      case "1":
        switchService = services;
        break;
      case "4":
        switchService = coreRadiologicalServices;
        break;
      default:
        switchService = [];
        break;
    }
    // console.log(this.state.humanResources);
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
            <label htmlFor="name">
              Name of facility <span className="required">*</span>
            </label>
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
            <label htmlFor="fac_type">
              Type of facility <span className="required">*</span>
            </label>
            <select
              required="required"
              className="form-control"
              name="fac_type"
              id="fac_type"
              onChange={(e) => this.handleSelectChange(e, "fac_type")}
            >
              <option value="1">Hospital</option>
              <option value="2">Pharmacy</option>
              <option value="3">Laboratory</option>
              <option value="4">Imaging/Radiological Center</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="phone_number">Facility phone number</label>
            <input
              maxLength={"14"}
              size={"10"}
              autoComplete="off"
              className="form-control"
              type="text"
              name="phone_number"
              id="phone_number"
              onChange={(e) => this.handleInputChange(e, "phone_number")}
            />
          </div>

          <div className="form-group">
            <label>
              Country <span className="required">*</span>
            </label>
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
            <label htmlFor="statename">
              {" "}
              State <span className="required">*</span>
            </label>
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
            <label htmlFor="lganame">
              LGA <span className="required">*</span>
            </label>

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
            <label htmlFor="facility_website">
              Council of Nigeria Registration Number
              <span className="required">*</span>
            </label>
            <input
              className="form-control"
              type="text"
              name="CouncilRegistrationNumber"
              id="CouncilRegistrationNumber"
              onChange={(e) =>
                this.handleInputChange(e, "CouncilRegistrationNumber")
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">
              Facility Address <span className="required">*</span>
            </label>
            <input
              className="form-control"
              type="text"
              name="street_name"
              id="address"
              onChange={(e) => this.handleInputChange(e, "street_name")}
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

          <div className="form-group ">
            <label htmlFor="ownership">
              Ownership <span className="required">*</span>
            </label>
            <select
              required="required"
              name="ownership"
              id="ownership"
              className="form-control"
              onChange={(e) => this.handleSelectChange(e, "ownership")}
            >
              <option value="1">Public</option>
              <option value="2">Private</option>
            </select>
          </div>

          <div className="form-group ">
            <label htmlFor="level">
              Facility Level <span className="required">*</span>
            </label>{" "}
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
            <label htmlFor="operational_hours">
              Operational Hours <span className="required">*</span>
            </label>{" "}
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
          <div className="form-group ">
            <div className="radio-container">
              <label>
                Operational Status <span className="required">*</span>
              </label>
              <div className="radio-items">
                {operationalStatus.map((item) => (
                  <label key={item.name}>
                    <RadioButtonInput
                      value={item.name}
                      name="operationalStatus"
                      onChange={(e) =>
                        this.handleRadioChange(e, "operationalStatus")
                      }
                    />
                    {item.name}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="form-group ">
            <div className="radio-container">
              <label>
                license Status <span className="required">*</span>
              </label>
              <div className="radio-items">
                {licenseStatus.map((item) => (
                  <label key={item.name}>
                    <RadioButtonInput
                      value={item.name}
                      name="licenseStatus"
                      onChange={(e) =>
                        this.handleRadioChange(e, "licenseStatus")
                      }
                    />
                    {item.name}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="form-group ">
            <div className="radio-container">
              <label>
                Registration Status <span className="required">*</span>
              </label>
              <div className="radio-items">
                {registrationStatus.map((item) => (
                  <label key={item.name}>
                    <RadioButtonInput
                      value={item.name}
                      name="registrationStatus"
                      onChange={(e) =>
                        this.handleRadioChange(e, "registrationStatus")
                      }
                    />
                    {item.name}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="form-group ">
            <div className="radio-container">
              <label>
                Premises Status <span className="required">*</span>
              </label>
              <div className="radio-items">
                {premises.map((item) => (
                  <label key={item.name}>
                    <RadioButtonInput
                      value={item.name}
                      name="premises"
                      onChange={(e) => this.handleRadioChange(e, "premises")}
                    />
                    {item.name}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="checkbox-container">
              <span>
                Days of operations <span className="required">*</span>
              </span>
              <div className="checkbox-items">
                {daysOfOperations.map((item) => (
                  <label key={item.key}>
                    <Checkbox
                      name={item.name}
                      checked={this.state.checkedItems.get(item.name)}
                      onChange={(e) => this.handleChange(e, "daysOfOperations")}
                    />
                    {item.name}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="checkbox-container">
              <span>
                Type of Services <span className="required">*</span>
              </span>
              <div className="checkbox-items">
                {switchService.map((item) => (
                  <label key={item.key}>
                    <Checkbox
                      name={item.name}
                      checked={this.state.checkedItems.get(item.name)}
                      onChange={(e) => this.handleChange(e, "services")}
                    />
                    {item.name}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="checkbox-container">
              <span>Specilizations </span>
              <div className="checkbox-items">
                {this.state.specilizationsList.map((item) => (
                  <label key={item.key}>
                    <Checkbox
                      name={item.name}
                      checked={this.state.checkedItems.get(item.name)}
                      onChange={(e) => this.handleChange(e, "specilizations")}
                    />{" "}
                    {item.name}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <HumanResourcesForm
            fac_type={this.state.fac_type}
            getVal={(data) => {
              console.log(data);
              this.setState({
                humanResources: data,
              });
            }}
          />
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
            <div className="submit-button-container">
              <button
                onClick={this.submit}
                type="submit"
                className="form-control btn btn-success"
              >
                Register Facility
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
