import React, { useContext, useState } from "react";
import { AppContext } from "../../store/store";
import "./home.css";
const Home = (props) => {
  const {
    setIsLoading,
    isLoading,
    setTokenHandler,

    setUserDataHandler,
    setIsLoggedInHandler,
  } = useContext(AppContext);
  const [flipclass, setflipclass] = useState(false);
  const [email, setEmail] = useState("emex4gman@gmail.com");
  const [password, setPassword] = useState("1234567890");
  const [errorMessage, setErrorMessage] = useState("");
  const validateform = () => {
    if (email === "" || password === "") {
      throw new Error("Some fields are empty");
    }
    if (email.length < 6) {
      throw new Error("Email is too short");
    }
    if (!email.includes("@") || !email.includes(".")) {
      throw new Error("Enter valid email address");
    }
    if (password.length < 6) {
      throw new Error("Password is too short");
    }
  };
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      validateform();
      let responce = await fetch(
        "https://reportahealthform.herokuapp.com/v1/auth/login",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let transformed = await responce.json();
      if (responce.status === 202) {
        setTokenHandler(transformed.data.token);
        setUserDataHandler(transformed.data.user);
        setIsLoggedInHandler(true);
      } else {
        setErrorMessage(transformed.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsLoading(false);
  };

  const register = async (email, password) => {
    try {
      validateform();
      let responce = await fetch(
        "https://reportahealthform.herokuapp.com/v1/auth/register",
        {
          method: "POST",
          body: JSON.stringify({ email: email, password: password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let transformed = await responce.json();
      if (responce.status > 300) {
        setErrorMessage(transformed.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  return (
    <div className="home">
      <div
        className={`auth-form-container ${flipclass ? "flip" : ""} ${
          isLoading ? "blur" : ""
        }`}
      >
        <div className="logo"></div>
        <div className="form-group">
          <label htmlFor="name">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            className="form-control"
            type="email"
            name="name"
            id="email"
            placeholder="enter email"
            required={true}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            className="form-control"
            type="password"
            name="password"
            id="password"
            placeholder="enter password"
            required={true}
          />
        </div>
        <div className="error-messsage">
          <p>{errorMessage}</p>
        </div>
        <button
          disabled={isLoading}
          onClick={() => {
            setErrorMessage("");
            !flipclass ? login(email, password) : register(email, password);
          }}
          type="button"
          className="btn btn-primary"
        >
          {!flipclass ? "Login" : "Register"}
        </button>
        <div className="forgotpassword">
          <a href="/">Forgot Password?</a>
        </div>
        <div className="register">
          {!flipclass
            ? " Don't have an account?  "
            : " Already have an account?  "}

          <a onClick={() => setflipclass(!flipclass)} href="#/">
            {!flipclass ? "Register here." : "Login here."}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
