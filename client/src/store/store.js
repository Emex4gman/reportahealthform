import React, { createContext, useState } from "react";
import moment from "moment";

export const AppContext = createContext();
const AppContextProvider = (props) => {
  let _appState = JSON.parse(window.localStorage.getItem("appstate"));
  let _isloggedIn = window.localStorage.getItem("isloggedIn");
  let _token = window.localStorage.getItem("token");
  let _expireIn = window.localStorage.getItem("expireIn");
  let _userData = JSON.parse(window.localStorage.getItem("userData"));
  let _facilityData = JSON.parse(window.localStorage.getItem("facilityData"));
  if (_userData === null) {
    window.localStorage.setItem("userData", JSON.stringify({}));
    _userData = {};
  }
  if (_facilityData === null) {
    window.localStorage.setItem("facilityData", JSON.stringify([]));
    _facilityData = [];
  }
  if (_appState === null) {
    window.localStorage.setItem(
      "appstate",
      JSON.stringify({ isloggedIn: false })
    );
    let data = window.localStorage.getItem("appstate");
    _appState = JSON.parse(data);
  }
  if (_isloggedIn === null) {
    _isloggedIn = _appState.isloggedIn;
  }
  if (_token === null) {
    _token = "Bearer ";
  }

  const [appState] = useState(_appState);
  const [userData, setUserData] = useState(_userData);
  const [facilityData, setFacilityData] = useState(_facilityData);
  const [isloggedIn, setIsLoggedIn] = useState(_isloggedIn);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(_token);
  const [expireIn, setExpireIn] = useState(_expireIn);

  const setExpireInHandler = (value) => {
    let _expireIn = value || moment().add(1, "day").format();
    window.localStorage.expireIn = _expireIn;
    setExpireIn(_expireIn);
  };
  const setIsLoggedInHandler = (value) => {
    window.localStorage.setItem(
      "appstate",
      JSON.stringify({
        ...appState,
        isloggedIn: value,
      })
    );
    setIsLoggedIn(value);
  };
  const setUserDataHandler = (value) => {
    window.localStorage.userData = JSON.stringify(value);
    setUserData(value);
  };
  const setFacilityDataHandler = (value) => {
    window.localStorage.facilityData = JSON.stringify(value);
    setFacilityData(value);
  };
  const setTokenHandler = (value) => {
    window.localStorage.setItem("token", "Bearer " + value);
    setToken("Bearer " + value);
  };
  return (
    <AppContext.Provider
      value={{
        userData,
        setUserDataHandler,
        facilityData,
        setFacilityDataHandler,
        appState,
        isloggedIn,
        setIsLoggedInHandler,
        token,
        setTokenHandler,
        expireIn,
        setExpireInHandler,
        isLoading,
        setIsLoading,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
