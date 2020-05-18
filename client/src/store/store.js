import React, { createContext, useState } from "react";
export const AppContext = createContext();

const AppContextProvider = (props) => {
  let _appState = JSON.parse(window.localStorage.getItem("appstate"));
  let _isloggedIn = window.localStorage.getItem("isloggedIn");
  let _token = window.localStorage.getItem("token");
  let _userData = JSON.parse(window.localStorage.getItem("userData"));
  if (_userData === null) {
    window.localStorage.setItem("userData", JSON.stringify({}));
    _userData = {};
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
  const [isloggedIn, setIsLoggedIn] = useState(_isloggedIn);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(_token);

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
  const setTokenHandler = (value) => {
    window.localStorage.setItem("token", "Bearer " + value);
    setToken("Bearer " + value);
  };
  return (
    <AppContext.Provider
      value={{
        userData,
        setUserDataHandler,
        appState,
        isloggedIn,
        setIsLoggedInHandler,
        token,
        setTokenHandler,
        isLoading,
        setIsLoading,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
