import React from "react";
import "./faclityPreview.css";
import FacilityClass from "../../helper/facilityClass";
const FacilityPreview = ({ facData, onClick }) => {
  console.log(facData);
  let facClass = new FacilityClass(facData);

  return (
    <div className="preview-items">
      <div className="preview-item">
        <span>Facility Name: </span>
        <span>{facClass.reg_fac_name}</span>
      </div>
      <div className="preview-item">
        <span>State Location: </span>
        <span>{facClass.statename} State</span>
      </div>
      <div className="preview-item">
        <span>Lga: </span>
        <span>{facClass.lganame} Local Government Area</span>
      </div>
      <div className="preview-item">
        <span>Address: </span>
        <span>{facClass.street_name}</span>
      </div>
      <div className="preview-item">
        <span>Operational Status: </span>
        <span>{facClass.operationalStatus} </span>
      </div>
      <div className="preview-item">
        <span>Type of Facility: </span>
        <span>{facClass.fac_type}</span>
      </div>
      <div className="preview-item">
        <span>Services: </span>
        <span>{facClass.services} </span>
      </div>
      <div className="preview-item">
        <span>Area of Specilizations: </span>
        <span>{facClass.specilizations} </span>
      </div>
      <div className="preview-item">
        <span>Facility Level: </span>
        <span>{facClass.facility_level}</span>
      </div>
      <div className="preview-item">
        <span>Ownership: </span>
        <span>{facClass.ownership} </span>
      </div>
      <div className="preview-item">
        <span>Registration Status: </span>
        <span>{facClass.registrationStatus}</span>
      </div>
      <div className="preview-item">
        <span>License Status: </span>
        <span>{facClass.licenseStatus}</span>
      </div>

      <div className="preview-item">
        <span>Premises: </span>
        <span>{facClass.premises}</span>
      </div>
      <div className="preview-item">
        <span>Operational hours: </span>
        <span>{facClass.operational_hours}</span>
      </div>
      <div className="preview-item">
        <span>Days of Operations: </span>
        <span>{facClass.daysOfOperations}</span>
      </div>
    </div>
  );
};

export default FacilityPreview;
