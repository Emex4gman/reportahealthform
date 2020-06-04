import React, { useState } from "react";
import {
  HospitalhumanResources,
  RadiologicalhumanResources,
} from "../../data/options";
import "./humanResourcesForm.css";
const HumanResourcesForm = ({ fac_type = "1", getVal, initvalue = {} }) => {
  const [formdata, setFormData] = useState({});

  const handleForm = (e, key) => {
    setFormData({ ...formdata, [key]: e.target.value });

    getVal(formdata);
  };

  switch (fac_type) {
    case "1":
      return (
        <div>
          <label className="label" htmlFor="human-resources">
            Human Resources contact information
            <span className="required">*</span>
          </label>
          <div className="human-resources">
            {HospitalhumanResources.map((hr) => {
              return (
                <div key={hr.key} className="form-group">
                  <label htmlFor="name">
                    {hr.label} <span className="required">*</span>
                  </label>
                  <input
                    defaultValue={initvalue[hr.key]}
                    className="form-control"
                    type="number"
                    name={hr.key}
                    onChange={(e) => handleForm(e, `${hr.key}`)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      );

    case "4":
      return (
        <div>
          <label className="label" htmlFor="human-resources">
            Human Resources contact information
            <span className="required">*</span>
          </label>
          <div className="human-resources">
            {RadiologicalhumanResources.map((hr) => {
              return (
                <div key={hr.key} className="form-group">
                  <label htmlFor="name">
                    {hr.label} <span className="required">*</span>
                  </label>
                  <input
                    defaultValue={initvalue[hr.key]}
                    className="form-control"
                    type="number"
                    name={hr.key}
                    onChange={(e) => handleForm(e, `${hr.key}`)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      );

    default:
      return <span></span>;
  }
};

export default HumanResourcesForm;
