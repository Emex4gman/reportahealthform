import React from "react";
import "./loader.css";
const Loader = (props) => {
  return props.isLoading ? (
    <div className="animated yt-loader"></div>
  ) : (
    <div className="empty-loader"></div>
  );
};

export default Loader;
