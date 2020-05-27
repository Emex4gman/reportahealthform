import React from "react";
import "./model.css";

export const modelControl = (action) => {
  switch (action) {
    case "open":
      document.querySelector("body").style.overflow = "hidden";
      document.querySelector(".model-container").style.display = "block";
      document
        .querySelector(".model-container")
        .classList.add("model-container-open");
      setTimeout(() => {
        document
          .querySelector(".model-content-container")
          .classList.add("open");
      }, 0.1);
      break;
    case "close":
      document.querySelector("body").style.removeProperty("overflow");
      document
        .querySelector(".model-container")
        .classList.remove("model-container-open");
      document.querySelector(".model-container").style.display = "none";
      document
        .querySelector(".model-content-container")
        .classList.remove("open");
      break;
    default:
      break;
  }
};

const CustomModel = ({ message, succed }) => {
  let loaderIcon;
  switch (succed) {
    case true:
      loaderIcon = <div className="loader-image-success"></div>;
      break;
    case false:
      loaderIcon = <div className="loader-image-fail"></div>;
      break;
    default:
      loaderIcon = <div className="loader-image"></div>;
      break;
  }
  return (
    <div className="model-container">
      <div className="model-background">
        <div
          // onClick={() => modelControl("close")}
          className="model-content-container"
        >
          <div className="model-content ">
            <div className="model-content-header">{loaderIcon}</div>

            <div className="model-content-body">{message}</div>
            <div className="model-content-footer">
              <button
                className="btn btn-danger"
                onClick={() => {
                  modelControl("close");
                }}
              >
                close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModel;
