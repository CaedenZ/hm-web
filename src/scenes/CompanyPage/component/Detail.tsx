import React, { Component } from "react";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import {
  DialogContentText,
  Table,
  TableHead,
  TableRow,
  TableBody,
  withStyles,
  TableCell
} from "@material-ui/core";
import { User } from "../../../interface/userInterface";
import { Location } from "../../../interface/locationInterface";
import FormPage from "./form";
import { Company } from "../../../interface/companyInterface";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

export interface Props extends SharedDispatchProps, InState {}

interface InState {
  locationData: Location[];
  userData: User[];
  companyData: Company;
}
export interface State {}
class Detail extends Component<Props, State> {
  handleViewCompany = (_e: any, _data: any) => {};
  render() {
    return (
      <div>
        <FormPage
          create={false}
          view={true}
          updateData={this.props.companyData}
          onSubmit={(e, data) => this.handleViewCompany(e, data)}
        />
        <DialogContentText>User</DialogContentText>
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableCell />
              <CustomTableCell align="left">First Name</CustomTableCell>
              <CustomTableCell align="left">Last Name</CustomTableCell>
              <CustomTableCell align="left">Email</CustomTableCell>
              <CustomTableCell align="left">Contact No.</CustomTableCell>
              <CustomTableCell align="left">Status</CustomTableCell>
            </TableRow>
          </TableHead>
          {this.props.userData.length > 0 && (
            <TableBody>
              {this.props.userData.map(row => {
                if (row.isCompanyContact === 1) {
                  return (
                    <TableRow key={row.email}>
                      <CustomTableCell component="th" scope="row">
                        <img
                          src={row.image}
                          alt="user"
                          style={{ maxWidth: "20%" }}
                        />
                      </CustomTableCell>
                      <CustomTableCell align="left">
                        {row.firstname}
                      </CustomTableCell>
                      <CustomTableCell align="left">
                        {row.lastname}
                      </CustomTableCell>
                      <CustomTableCell align="left">
                        {row.email}
                      </CustomTableCell>
                      <CustomTableCell align="left">
                        {row.contact}
                      </CustomTableCell>
                      <CustomTableCell align="left">
                        {row.status}
                      </CustomTableCell>
                    </TableRow>
                  );
                } else {
                  return null;
                }
              })}
            </TableBody>
          )}
        </Table>
        <DialogContentText>Location</DialogContentText>
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableCell align="left">Name</CustomTableCell>
              <CustomTableCell align="left">Address</CustomTableCell>
              <CustomTableCell align="left">Postal Code</CustomTableCell>
            </TableRow>
          </TableHead>
          {this.props.locationData.length > 0 && (
            <TableBody>
              {this.props.locationData.map(row => (
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
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Detail);
