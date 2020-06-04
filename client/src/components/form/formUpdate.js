import React, { Component } from "react";
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
import { updateFacilityHandler } from "../../services/api.service";
import RadioButtonInput from "../radioButtonInput/radioButtoninput";
import HumanResourcesForm from "../humanResourcesForm/humanResourcesForm";

class FormUpdate extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    const { facData } = this.props;

    this.state = {
      facility_website: facData.facility_website || "",
      CouncilRegistrationNumber: facData.CouncilRegistrationNumber,
      licenseStatus: facData.licenseStatus,
      registrationStatus: facData.registrationStatus,
      premises: facData.premises,
      phone_number: facData.phone_number,
      operational_hours: facData.operational_hours,
      operationalStatus: facData.operationalStatus,
      fac_email: facData.fac_email,
      country: "nigeria",
      reg_fac_name: facData.reg_fac_name,
      street_name: facData.street_name,
      statename: facData.statename,
      lganame: facData.lganame,
      latitude: "",
      longitude: "",
      fac_type: facData.fac_type,
      ownership: facData.ownership,
      facility_level: facData.facility_level,
      services: facData.services,
      specilizations: facData.specilizations,
      daysOfOperations: facData.daysOfOperations,
      humanResources: facData.humanResources || {},
      specilizationsList: [],
      lgaOptions: [],
      stateOptions: [],
      checkedItems: new Map(),
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
    this.loadStateOptions();
    this.loadLgaOptions(this.state.statename);
    this.loadcheckedItems();
    this.handleSpecilizationsChange();
  }

  loadcheckedItems() {
    const { daysOfOperations, services, specilizations } = this.props.facData;
    let checkedItemsArr = [].concat(daysOfOperations, services, specilizations);
    checkedItemsArr.forEach((item) => {
      this.setState((prevState) => ({
        checkedItems: prevState.checkedItems.set(item, true),
      }));
    });
  }
  loadStateOptions() {
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
    this.loadLgaOptions(e.target.value);
    this.setState({ [key]: e.target.value });
  };

  loadLgaOptions = (stateValue) => {
    let lgaOptions = [
      <option key="00" value="00">
        select lag
      </option>,
    ];
    lgas.forEach((item) => {
      if (item.state_id === stateValue)
        lgaOptions.push(
          <option key={item.lga_id} value={item.lga_id}>
            {item.lga}
          </option>
        );
    });
    this.setState({ lgaOptions: lgaOptions });
  };

  validateForm(closeForm, setModelMessage, setSucced) {
    let validated = false;
    if (
      this.state.reg_fac_name === "" ||
      this.state.street_name === "" ||
      this.state.lganame === "" ||
      this.state.statename === ""
    ) {
      closeForm();
      setModelMessage("Some fields are empty");
      setSucced(false);
      window.scrollTo(0, 0);
    } else {
      validated = true;
    }
    return validated;
  }
  submit = async () => {
    const { facData, closeForm, setModelMessage, setSucced } = this.props;
    if (this.validateForm(closeForm, setModelMessage, setSucced)) {
      const { token, setIsLoading } = this.context;
      setIsLoading(true);
      setModelMessage("");
      setSucced("");
      closeForm();
      let data = await updateFacilityHandler(this.state, token, facData._id);
      if (data.succed === true) {
        setModelMessage(data.responce.message);

        setSucced(data.succed);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setModelMessage(data.responce.message);
        setSucced(data.succed);
      }

      setIsLoading(false);
    }
  };

  handleSpecilizationsChange(prevState) {
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
    if (serviceList.includes("Other Services")) {
      coreHospitalServices.filter((item) => {
        if (item.name === "Other Services") {
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
    return (
      <div className="form-container update" id="reg-form">
        <form
          className="form "
          autoComplete="off"
          id="reg-form"
          encType="multipart/form-data"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h2>Update a facility</h2>

          <div
            className="form-group"
            data-toggle="tooltip"
            data-placement="right"
            title="Name of the facility"
          >
            <label className="label" htmlFor="name">
              Name of facility <span className="required">*</span>
            </label>
            <input
              defaultValue={this.state.reg_fac_name}
              autoComplete="off"
              className="form-control"
              type="text"
              name="reg_fac_name"
              id="reg_fac_name"
              onChange={(e) => this.handleInputChange(e, "reg_fac_name")}
            />
          </div>
          {/* <div className="form-group">
            <label className="label" htmlFor="fac_type">
              Type of facility <span className="required">*</span>
            </label>
            <select
              value={this.state.fac_type}
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
          </div> */}
          <div className="form-group">
            <label className="label" htmlFor="phone_number">
              Facility phone number
            </label>
            <input
              defaultValue={this.state.phone_number}
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
            <label className="label">
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
            <label className="label" htmlFor="statename">
              State <span className="required">*</span>
            </label>
            <select
              className="form-control"
              value={this.state.statename}
              name="statename"
              id="statename"
              onChange={(e) => this.handleStateSelect(e, "statename")}
            >
              {this.state.stateOptions}
            </select>
          </div>
          <div className="form-group">
            <label className="label" htmlFor="lganame">
              LGA <span className="required">*</span>
            </label>

            <select
              className="form-control"
              value={this.state.lganame}
              name="lganame"
              id="lganame"
              onChange={(e) => this.handleInputChange(e, "lganame")}
            >
              {this.state.lgaOptions}
            </select>
          </div>
          <div className="form-group">
            <label className="label" htmlFor="email">
              Facility email address
            </label>
            <input
              className="form-control"
              type="email"
              name="email"
              defaultValue={this.state.fac_email}
              id="email"
              onChange={(e) => this.handleInputChange(e, "fac_email")}
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="facility_website">
              Council of Nigeria Registration Number
              <span className="required">*</span>
            </label>
            <input
              className="form-control"
              type="text"
              defaultValue={this.state.CouncilRegistrationNumber}
              name="CouncilRegistrationNumber"
              id="CouncilRegistrationNumber"
              onChange={(e) =>
                this.handleInputChange(e, "CouncilRegistrationNumber")
              }
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="address">
              Facility Address <span className="required">*</span>
            </label>
            <input
              className="form-control"
              type="text"
              name="street_name"
              defaultValue={this.state.street_name}
              id="address"
              onChange={(e) => this.handleInputChange(e, "street_name")}
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="facility_website">
              Facility Website
            </label>
            <input
              className="form-control"
              type="text"
              name="facility_website"
              defaultValue={this.state.facility_website}
              id="facility_website"
              onChange={(e) => this.handleInputChange(e, "facility_website")}
            />
          </div>

          <div className="form-group ">
            <label className="label" htmlFor="ownership">
              Ownership <span className="required">*</span>
            </label>
            <select
              value={this.state.ownership}
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
            <label className="label" htmlFor="level">
              Facility Level <span className="required">*</span>
            </label>{" "}
            <select
              value={this.state.facility_level}
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
            <label className="label" htmlFor="operational_hours">
              Operational Hours <span className="required">*</span>
            </label>{" "}
            <select
              required="required"
              value={this.state.operational_hours}
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
              <label className="label">
                Operational Status <span className="required">*</span>
              </label>
              <div className="radio-items">
                {operationalStatus.map((item) => (
                  <label key={item.name}>
                    <RadioButtonInput
                      value={item.name}
                      name="operationalStatus"
                      ischecked={
                        item.name === this.state.operationalStatus
                          ? true
                          : false
                      }
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
              <label className="label">
                license Status <span className="required">*</span>
              </label>
              <div className="radio-items">
                {licenseStatus.map((item) => (
                  <label key={item.name}>
                    <RadioButtonInput
                      value={item.name}
                      ischecked={
                        item.name === this.state.licenseStatus ? true : false
                      }
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
              <label className="label">
                Registration Status <span className="required">*</span>
              </label>
              <div className="radio-items">
                {registrationStatus.map((item) => (
                  <label key={item.name}>
                    <RadioButtonInput
                      value={item.name}
                      ischecked={
                        item.name === this.state.registrationStatus
                          ? true
                          : false
                      }
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
              <label className="label">
                Premises Status <span className="required">*</span>
              </label>
              <div className="radio-items">
                {premises.map((item) => (
                  <label key={item.name}>
                    <RadioButtonInput
                      value={item.name}
                      name="premises"
                      ischecked={
                        item.name === this.state.premises ? true : false
                      }
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
              <span className="label">
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
              <span className="label">
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
              <span className="label">Specilizations </span>
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
            initvalue={this.state.humanResources}
            fac_type={this.state.fac_type}
            getVal={(data) => {
              let newData = { ...this.state.humanResources, ...data };
              this.setState({
                humanResources: newData,
              });
            }}
          />

          <div className="form-group">
            <div className="submit-button-container">
              <button
                onClick={this.submit}
                type="submit"
                className="form-control btn btn-success"
              >
                Update Facility
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default FormUpdate;
