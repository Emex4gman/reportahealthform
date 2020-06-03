import React, { useState } from "react";
import CustomModel, { modelControl } from "../modeldialog/customModel";

import "./facilityTile.css";
import FormUpdate from "../form/formUpdate";
const FacilityTile = ({ facData, onClick, onUpdateCLick }) => {
  const [toUpdate, setToUpdate] = useState(false);
  const [modelMessage, setModelMessage] = useState("");
  const [succed, setSucced] = useState("");

  return (
    <div className="facility-item">
      <CustomModel
        message={modelMessage}
        succed={succed}
        htmlElement={
          toUpdate ? (
            <FormUpdate
              setModelMessage={setModelMessage}
              setSucced={setSucced}
              closeForm={() => setToUpdate(!toUpdate)}
              facData={facData}
            />
          ) : (
            false
          )
        }
      />
      {/* <div class="alert alert-primary" role="alert">
        A simple primary alert—check it out!
      </div> */}
      <span onClick={onClick}>{facData.reg_fac_name}</span>
      <div className="action-button">
        <button
          onClick={() => {
            setToUpdate(!toUpdate);
            modelControl("open");
          }}
          type="button"
          className="btn btn-warning"
        >
          UPDATE
        </button>
        {/* <button type="button" className="btn btn-danger">
          DELETE
        </button> */}
      </div>
    </div>
  );
};

export default FacilityTile;
