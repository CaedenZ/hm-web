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
  DialogActions,
  Select,
  MenuItem
} from "@material-ui/core";
import classes from "*.module.css";
import { RootState } from "../../../reducer";
import { Currency } from "../../../interface/countryInterface";
import { history } from "../../../store";

export interface Props extends SharedDispatchProps, InState { }

interface InState {
  open: boolean;
  handleClose: any;
  currencyList:Currency[];
}
export interface State {
  status: string;
}

class SetCurrency extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      status: "Draft"
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.dynSetState = this.dynSetState.bind(this);
  }

  dynSetState(key: keyof State, value: string) {
    this.setState({
      [key]: value
    } as Pick<State, keyof State>);
  }

  handleChange(event) {
    this.setState({status:event.target.value});
    // console.dir(event.target)
  }

  handleSubmit = event => {
    event.preventDefault();
    history.push("/offermodel/create?currency="+this.state.status)
  };
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">SetCurrency</DialogTitle>
        <DialogContent>
          <DialogContentText>SetCurrency</DialogContentText>
          <Select
            value={this.state.status}
            onChange={this.handleChange}
            inputProps={{
              name: "status",
              id: "status-simple"
            }}
          >
            {this.props.currencyList.map( item => <MenuItem value={item.code} >{item.code}</MenuItem>)}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
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
      //     <form className={classes.form} onSubmit={this.handleSubmit}>
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

function mapStateToProps(state: RootState) {
  return {
    currencyList: state.countryReducer.currencyList,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetCurrency);
