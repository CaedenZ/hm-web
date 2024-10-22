import React, { Component } from "react";
import "./App.css";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import { store } from "./store";
import RootRoute from "./route";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "rgba(255, 170, 0, 0.66)",
      main: "rgba(245, 96, 0, 0.99)",
      dark: "rgba(245, 56, 0, 0.99)",
    },
    secondary: {
      light: "rgba(255, 170, 0, 0.99)",
      main: "rgba(255, 170, 0, 0.99)",
      dark: "rgba(255, 170, 0, 0.99)",
    }
  },
  typography: {
    useNextVariants: true,
    fontSize: 11
  }
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <RootRoute />
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
