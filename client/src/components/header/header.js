import React, { useContext, useEffect } from "react";
import "./header.css";
import { AppContext } from "../../store/store";
import moment from "moment";

const Header = () => {
  const {
    isloggedIn,
    setIsLoggedInHandler,
    setIsLoading,
    setUserDataHandler,
    setTokenHandler,
    setFacilityDataHandler,
    expireIn,
    setExpireInHandler,
  } = useContext(AppContext);
  useEffect(() => {
    if (expireIn !== "end") {
      let tokenHasExpired = moment().isAfter(expireIn);
      if (tokenHasExpired) {
        logout();
      }
    }
  });
  const logout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoggedInHandler(false);
      setIsLoading(false);
      setTokenHandler("");
      setUserDataHandler({});
      setFacilityDataHandler([]);
      setExpireInHandler("end");
      window.location.reload();
    }, 1200);
  };

  return (
    <div className="header">
      <div className="header-content">
        <nav className="navbar ">
          <a className="navbar-brand" href="/">
            <img
              className="brand-image"
              src="https://reportahealth.org/images/logo.svg"
              alt=""
            />
          </a>
          <ul className="navlist">
            <li className="nav-item">
              <a href="https://reportahealth.org" className="nav-link">
                Home
              </a>
            </li>
            {isloggedIn ? (
              <li className="nav-item">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                  }}
                  href="/"
                  className="nav-link"
                >
                  Logout
                </a>
              </li>
            ) : (
              <li className="nav-item">
                <a href="/" className="nav-link">
                  Login
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
