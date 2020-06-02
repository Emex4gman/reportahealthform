import React, { Component } from "react";
import "./App.css";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { AppContext } from "./store/store";
import Home from "./components/home/home";
import Loader from "./components/loader/loader";
import UserDashboard from "./components/dashboard/userDashboard";
export default class App extends Component {
  static contextType = AppContext;
  render() {
    const { isloggedIn, isLoading } = this.context;
    return (
      <div className="app">
        <Header />
        <Loader isLoading={isLoading} />
        <div className="main">{isloggedIn ? <UserDashboard /> : <Home />}</div>

        <Footer />
      </div>
    );
  }
}
