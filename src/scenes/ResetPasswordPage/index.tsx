import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import { SharedDispatchProps } from "../../interface/propsInterface";
import { mapDispatchToProps } from "../../helper/dispachProps";
import { connect } from "react-redux";
import { history } from "../../store";
import { parse as ParseQuery } from "querystringify";
import $axios from "../../plugin/axios";

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
  pwSpacing: {
    margin: "0.5rem 0"
  }
});

export interface Props extends SharedDispatchProps, WithStyles<typeof styles> {}

export interface State {
  password: string;
  confirmPassword: string;
}

class ResetPasswordPage extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: ""
    };

    this.handleReset = this.handleReset.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.dynSetState = this.dynSetState.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }

  dynSetState(key: keyof State, value: string) {
    this.setState({
      [key]: value
    } as Pick<State, keyof State>);
  }

  handleChange(event) {
    this.dynSetState(event.target.id, event.target.value);
  }

  handleReset = async event => {
    event.preventDefault();
    const queryStrings = history.location.search;
    const queryObject = ParseQuery(queryStrings);
    const token = queryObject.token;
    const email = queryObject.email;
    const resetPWObject = {
      app_key: "p9Eg6HN7FFXjA9WTNZ5n",
      token: token,
      email: email,
      password: this.state.password
    };
    const resetResponse = await $axios.post(
      "/user/resetPassword",
      resetPWObject
    );
    if (resetResponse.data.error) {
      const dialogData = {
        type: "warning",
        object: resetResponse.data.message,
        id: "1"
      };
      this.props.showDialog(dialogData);
    } else {
      history.push("/login");
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.centerLogin}>
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <ValidatorForm
              ref="form"
              onSubmit={this.handleReset}
              debounceTime={500}
            >
              <Typography component="h1" variant="h5">
                Set your new password
              </Typography>
              <TextValidator
                fullWidth
                required
                label="Password"
                onChange={this.handleChange}
                type="password"
                id="password"
                name="password"
                value={this.state.password}
                validators={["required"]}
                errorMessages={["this field is required"]}
                className={classes.pwSpacing}
              />
              <TextValidator
                fullWidth
                required
                label="Confirm Password"
                onChange={this.handleChange}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={this.state.confirmPassword}
                validators={["isPasswordMatch", "required"]}
                errorMessages={["password mismatch", "this field is required"]}
                className={classes.pwSpacing}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Confirm
              </Button>
            </ValidatorForm>
          </Paper>
        </main>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(ResetPasswordPage));
