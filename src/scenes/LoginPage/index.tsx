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
import { Link } from "react-router-dom";
import { Divider } from "@material-ui/core";
import { connect } from "react-redux";
import { loginAction } from "../../actions/authenticationAction";
import { mapDispatchToProps } from "../../helper/dispachProps";
import { SharedDispatchProps } from "../../interface/propsInterface";

const styles = (theme: any) => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    // flexDirection: 'column',
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

export interface Props extends SharedDispatchProps, WithStyles<typeof styles> { }

export interface State {
  email: string;
  password: string;
  app_key: string;
}


class SignIn extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      email: 'pseudoscops.tc.test@gmail.com',
      password: '123456',
      app_key: 'p9Eg6HN7FFXjA9WTNZ5n'
    }

    this.handleChange = this.handleChange.bind(this);
    this.dynSetState = this.dynSetState.bind(this);
  }

  dynSetState(key: keyof State, value: string) {
    this.setState({
      [key]: value
    } as Pick<State, keyof State>)
  }

  handleChange(event) {
    this.dynSetState(event.target.id, event.target.value);
    // console.dir(event.target)
  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography> */}
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus value={this.state.email} onChange={this.handleChange} />
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Divider />
            <div style={{ marginTop: 20 }}>
              <Link to="/forgetpassword">Forget password</Link>
            </div>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => {
                this.props.login(this.state)
              }}
            >
              Sign in
          </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(SignIn));
