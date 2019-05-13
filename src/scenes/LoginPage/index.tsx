import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Paper from "@material-ui/core/Paper";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import { Redirect } from "react-router-dom";
import { Divider } from "@material-ui/core";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../helper/dispachProps";
import { SharedDispatchProps } from "../../interface/propsInterface";

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
      width: "20vw"
    }
  },
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: `${theme.spacing.unit * 3}px`
  },
  loginSpacing: {
    margin: "1rem 0"
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
              <ValidatorForm
                ref="form"
                onSubmit={this.handleLogin}
                debounceTime={500}
              >
                <TextValidator
                  fullWidth
                  label="Email"
                  onChange={this.handleChange}
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={this.state.email}
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "this field is required",
                    "email is not valid"
                  ]}
                  className={classes.loginSpacing}
                />
                <TextValidator
                  fullWidth
                  label="Password"
                  onChange={this.handleChange}
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  value={this.state.password}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  className={classes.loginSpacing}
                />
                <Divider className={classes.loginSpacing} />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Sign in
                </Button>
              </ValidatorForm>
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
