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
  Table,
  TableHead,
  TableRow,
  TableBody,
  withStyles,
  TableCell
} from "@material-ui/core";
import $axios from "../../../plugin/axios";
import { RootState } from "../../../reducer";
import { User } from "../../../interface/userInterface";
import { Location } from "../../../interface/locationInterface";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

export interface Props extends SharedDispatchProps, InState { }

interface InState {
  open: boolean;
  handleClose: any;
  id: string;
  sessionkey: string;
  locationdata: Location[];
  userdata: User[];
}
export interface State {
}

class Detail extends Component<Props, State> {




  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Detail</DialogTitle>
        <DialogContent>
          <DialogContentText>User</DialogContentText>
          <Table >
            <TableHead>
              <TableRow>
                <CustomTableCell />
                <CustomTableCell align="left">First Name</CustomTableCell>
                <CustomTableCell align="left">Last Name</CustomTableCell>
                <CustomTableCell align="left">Email</CustomTableCell>
                <CustomTableCell align="left">Status</CustomTableCell>
              </TableRow>
            </TableHead>
            {this.props.userdata.length > 0 && (
              <TableBody>
                {this.props.userdata.map((row, index) => (
                  <TableRow key={row.email}>
                    <CustomTableCell component="th" scope="row">
                      <img
                        src={row.image}
                        alt="user"
                      />
                    </CustomTableCell>
                    <CustomTableCell align="left">
                      {row.firstname}
                    </CustomTableCell>
                    <CustomTableCell align="left">
                      {row.lastname}
                    </CustomTableCell>
                    <CustomTableCell align="left">{row.email}</CustomTableCell>
                    <CustomTableCell align="left">{row.status}</CustomTableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
          <DialogContentText>Location</DialogContentText>
          <Table >
            <TableHead>
              <TableRow>
                <CustomTableCell align="left">Name</CustomTableCell>
                <CustomTableCell align="left">Address</CustomTableCell>
                <CustomTableCell align="left">Postal Code</CustomTableCell>
              </TableRow>
            </TableHead>
            {this.props.locationdata.length > 0 && (
              <TableBody>
                {this.props.locationdata.map(row => (
                  <TableRow key={row.location_id}>
                    <CustomTableCell component="th" scope="row">
                      {row.location_name}
                    </CustomTableCell>
                    <CustomTableCell component="th" scope="row">
                      {row.address}
                    </CustomTableCell>
                    <CustomTableCell component="th" scope="row">
                      {row.postal_code}
                    </CustomTableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}


export default connect(
  null,
  mapDispatchToProps
)(Detail);
