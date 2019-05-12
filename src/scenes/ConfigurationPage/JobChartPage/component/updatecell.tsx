import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../../interface/propsInterface";
import { mapDispatchToProps } from "../../../../helper/dispachProps";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions
} from "@material-ui/core";

export interface Props extends SharedDispatchProps, InState { }

interface InState {
  open: boolean;
  handleClose: any;
  handleSubmit: any;
}
export interface State {
  value: string;
}

class UpdateCell extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
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
    // console.dir(event.target)
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">UpdateCell</DialogTitle>
        <DialogContent>
          <DialogContentText>New Value</DialogContentText>
          <TextField
            autoFocus
            id="value"
            label="value"
            onChange={this.handleChange}
            value={this.state.value}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => this.props.handleSubmit(this.state.value)} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(UpdateCell);
