import React, { useContext } from "react";
import "./header.css";
import { AppContext } from "../../store/store";

const Header = () => {
  const {
    isloggedIn,
    setIsLoggedInHandler,
    setIsLoading,
    setUserDataHandler,
    setTokenHandler,
    setFacilityDataHandler,
  } = useContext(AppContext);
  const logout = (e) => {
    setIsLoading(true);
    e.preventDefault();
    setTimeout(() => {
      setIsLoggedInHandler(false);
      setIsLoading(false);
      setTokenHandler("");
      setUserDataHandler({});
      setFacilityDataHandler([]);
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
              <a href="/" className="nav-link">
                Home
              </a>
            </li>
            {isloggedIn ? (
              <li className="nav-item">
                <a
                  onClick={(e) => {
                    logout(e);
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
