import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../helper/dispachProps";
import { SharedDispatchProps } from "../../interface/propsInterface";

const styles = (theme: any) => ({
  center: {
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
  spacing: {
    margin: "0.5rem 0"
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
  app_key: string;
}

class ForgetPasswordPage extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.dynSetState = this.dynSetState.bind(this);
  }

  state = {
    email: "",
    app_key: "p9Eg6HN7FFXjA9WTNZ5n"
  };

  handleChange(event) {
    this.dynSetState(event.target.id, event.target.value);
    // console.dir(event.target)
  }

  dynSetState(key: keyof State, value: string) {
    this.setState({
      [key]: value
    } as Pick<State, keyof State>);
  }
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.forgetPassword(this.state);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.center}>
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              Enter your email
            </Typography>
            <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
              <TextValidator
                autoFocus
                fullWidth
                label="Email"
                onChange={this.handleChange}
                id="email"
                name="email"
                autoComplete="email"
                value={this.state.email}
                validators={["required", "isEmail"]}
                errorMessages={["this field is required", "email is not valid"]}
                className={classes.spacing}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                className={classes.spacing}
              >
                Submit
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
)(withStyles(styles)(ForgetPasswordPage));
