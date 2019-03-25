import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./scenes/LoginPage";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./scenes/HomePage";
import ResponsiveDrawer from "./Layout/default";
import ForgetPasswordPage from "./scenes/ForgetPasswordPage";
import ResetPasswordPage from "./scenes/ResetPasswordPage";
import CreateUserPage from "./scenes/UserPage/create/index";
import UserPage from "./scenes/UserPage";
import CompanyPage from "./scenes/CompanyPage";
import ProfilePage from "./scenes/ProfilePage";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "rgba(255, 170, 0, 0.66)",
      main: "rgba(245, 96, 0, 0.99)",
      dark: "rgba(245, 56, 0, 0.99)",
    }
  } 
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme = {theme}>
      <Router>
        <Switch>
          {/* <Route exact path="/" component={Home} /> */}
          {/* both /roster and /roster/:number begin with /roster */}
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/forgetpassword" component={ForgetPasswordPage} />
          <Route exact path="/resetpassword" component={ResetPasswordPage} />
          {/* <Route exact path="/" component={ResponsiveDrawer} /> */}
          <Route
            exact
            path="/"
            render={() => (
              <ResponsiveDrawer>
                <HomePage />
              </ResponsiveDrawer>
            )}
          />
          <Route exact path="/homepage" component={HomePage} />
          <Route
            exact
            path="/profile"
            render={() => (
              <ResponsiveDrawer>
                <ProfilePage />
              </ResponsiveDrawer>
            )}
          />
          <Route
            exact
            path="/user"
            render={() => (
              <ResponsiveDrawer>
                <UserPage />
              </ResponsiveDrawer>
            )}
          />
          <Route
            exact
            path="/user/create"
            render={() => (
              <ResponsiveDrawer>
                <CreateUserPage />
              </ResponsiveDrawer>
            )}
          />
          <Route
            exact
            path="/company"
            render={() => (
              <ResponsiveDrawer>
                <CompanyPage />
              </ResponsiveDrawer>
            )}
          />
          {/* <Route path="/schedule" component={Schedule} /> */}
        </Switch>
      </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
