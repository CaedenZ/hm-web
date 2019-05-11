import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions
} from "@material-ui/core";

export interface Props extends SharedDispatchProps, InState {}

interface InState {
  open: boolean;
  handleClose: any;
}
export interface State {
  password: string;
}

class ResetPassword extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      password: ""
    };

    this.handleReset = this.handleReset.bind(this);
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
    // console.dir(event.target)
  }

  handleReset = event => {
    event.preventDefault();
    this.props.updatePassword(this.state.password);
    console.log(this.state);
    this.props.handleClose();
  };
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">ResetPassword</DialogTitle>
        <DialogContent>
          <DialogContentText>New Password</DialogContentText>
          <TextField
            autoFocus
            id="password"
            label="password"
            type="password"
            onChange={this.handleChange}
            value={this.state.password}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleReset} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      // <main className={classes.main}>
      //   <CssBaseline />
      //   <Paper className={classes.paper}>
      //     <Typography component="h1" variant="h5">
      //       Set your new password
      //   </Typography>
      //     <form className={classes.form} onSubmit={this.handleReset}>
      //       <FormControl margin="normal" required fullWidth>
      //         <InputLabel htmlFor="password">New Password</InputLabel>
      //         <Input name="password" type="password" id="password" autoComplete="current-password" value={this.state.password} onChange={this.handleChange} />
      //       </FormControl>
      //       <FormControl margin="normal" required fullWidth>
      //         <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
      //         <Input name="confirmPassword" type="password" id="confirmPassword" autoComplete="current-password" value={this.state.confirmPassword} onChange={this.handleChange} />
      //       </FormControl>
      //       <Button
      //         type="submit"
      //         fullWidth
      //         variant="contained"
      //         color="primary"
      //         className={classes.submit}
      //       >
      //         Confirm
      //     </Button>
      //     </form>
      //   </Paper>
      // </main>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ResetPassword);
