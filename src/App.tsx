import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./scenes/LoginPage";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./scenes/HomePage";
import ResponsiveDrawer from "./Layout/default";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          {/* <Route exact path="/" component={Home} /> */}
          {/* both /roster and /roster/:number begin with /roster */}
          <Route exact path="/login" component={LoginPage} />
          <Route path="/" component={ResponsiveDrawer} />
          <Route exact path="/homepage" component={HomePage} />
          {/* <Route path="/schedule" component={Schedule} /> */}
        </div>
      </Router>
    );
  }
}

export default App;
