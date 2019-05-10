import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import { Link, Redirect } from "react-router-dom";
import { Divider } from "@material-ui/core";
import { connect } from "react-redux";
import { loginAction } from "../../actions/authenticationAction";
import { mapDispatchToProps } from "../../helper/dispachProps";
import { SharedDispatchProps } from "../../interface/propsInterface";
import { RootState } from "../../reducer";

const styles = (theme: any) => ({
  centerLogin: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh"
  },
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: "40vh"
    }
  },
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: `${theme.spacing.unit * 3}px`
  }
});

export interface Props
  extends SharedDispatchProps,
    InState,
    WithStyles<typeof styles> {}

interface InState {
  usertoken: string;
}
export interface State {
  email: string;
  password: string;
  app_key: string;
}

class SignIn extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      app_key: "p9Eg6HN7FFXjA9WTNZ5n"
    };

    this.handleChange = this.handleChange.bind(this);
    this.dynSetState = this.dynSetState.bind(this);
  }

  dynSetState(key: keyof State, value: string) {
    this.setState({
      [key]: value
    } as Pick<State, keyof State>);
  }

  handleChange(event) {
    this.dynSetState(event.target.id, event.target.value);
  }

  handleLogin = event => {
    event.preventDefault();
    this.props.login(this.state);
  };

  render() {
    const { classes } = this.props;
    if (this.props.usertoken === "") {
      return (
        <div className={classes.centerLogin}>
          <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
              <form onSubmit={this.handleLogin}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </FormControl>
                {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
                <Divider />
                {/* <div style={{ marginTop: 20 }}>
                <Link to="/forgetpassword">Forget password</Link>
              </div> */}
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Sign in
                </Button>
              </form>
            </Paper>
          </main>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

function mapStateToProps(state: any) {
  return {
    usertoken: state.authenticationReducer.token
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SignIn));
