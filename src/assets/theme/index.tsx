import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "rgba(255, 170, 0, 0.66)",
      main: "rgba(245, 96, 0, 0.99)",
      dark: "rgba(245, 56, 0, 0.99)"
    }
  },
  typography: {
    useNextVariants: true
  }
});

export default theme;
