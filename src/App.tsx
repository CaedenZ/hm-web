import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { Provider } from "react-redux";
import { store } from "./store";
import RootRoute from "./route";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "rgba(255, 170, 0, 0.66)",
      main: "rgba(245, 96, 0, 0.99)",
      dark: "rgba(245, 56, 0, 0.99)",
    }
  },
  typography: {
    useNextVariants: true,
  },
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <RootRoute init={false} />
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
