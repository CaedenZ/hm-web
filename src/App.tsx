import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./scenes/LoginPage";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./scenes/HomePage";
import ResponsiveDrawer from "./Layout/default";
import ForgetPasswordPage from "./scenes/ForgetPasswordPage";
import ResetPasswordPage from "./scenes/ResetPasswordPage";
import UserCreatePage from "./scenes/UserPage/create/index";
import UserPage from "./scenes/UserPage";

class App extends Component {
  render() {
    return (
      <Router>

        <Switch>
          {/* <Route exact path="/" component={Home} /> */}
          {/* both /roster and /roster/:number begin with /roster */}
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/forgetpassword" component={ForgetPasswordPage} />
          <Route exact path="/resetpassword" component={ResetPasswordPage} />
          {/* <Route exact path="/" component={ResponsiveDrawer} /> */}
          <Route exact path="/" render={() => <ResponsiveDrawer><HomePage/></ResponsiveDrawer>} />
          <Route exact path="/homepage" component={HomePage} /> 
          <Route exact path="/user" render={() => <ResponsiveDrawer><UserPage/></ResponsiveDrawer>} />
          <Route exact path="/user/create" render={() => <ResponsiveDrawer><UserCreatePage/></ResponsiveDrawer>} />
          {/* <Route path="/schedule" component={Schedule} /> */}
        </Switch>
      </Router>
    );
  }
}

export default App;
