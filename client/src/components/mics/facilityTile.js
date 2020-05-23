import React from "react";
import "./facilityTile.css";
const FacilityTile = ({ facData, onClick }) => {
  return (
    <div className="facility-item">
      {/* <div class="alert alert-primary" role="alert">
        A simple primary alert—check it out!
      </div> */}
      <span onClick={onClick}>{facData.reg_fac_name}</span>
      <div className="action-button">
        <button type="button" className="btn btn-warning">
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
