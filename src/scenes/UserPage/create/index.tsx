import React, { Component } from "react";
import {
  Typography,
  createStyles,
  WithStyles,
  withStyles
} from "@material-ui/core";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { history } from "../../../store";
import FormPage from "../component/form";
import { CREATEUSERCRED } from "../../../interface/userInterface";

const styles = () =>
  createStyles({
    root: {
      flexGrow: 1
    }
  });

export interface Props extends WithStyles<typeof styles>, SharedDispatchProps {}

class CreateUserPage extends Component<Props> {
  handleCreateUser = (e, data) => {
    e.preventDefault();
    data.isCompanyContact = data.isCompanyContact ? 1 : 0;
    const userData: CREATEUSERCRED = {
      email: data.email,
      password: data.password,
      firstname: data.firstname,
      lastname: data.lastname,
      country: data.country,
      address: data.address,
      postal_code: data.postal_code,
      image: data.image,
      remarks: data.remarks,
      status: data.status,
      business_title: data.business_title,
      contact: data.contact,
      alias: data.alias,
      employee_id: data.employee_id,
      role_id: data.role_id,
      isCompanyContact: data.isCompanyContact
    };
    this.props.createUser(userData);
    history.push("/user");
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          New User
        </Typography>
        <FormPage
          create={true}
          updateData=""
          onSubmit={(e, data) => this.handleCreateUser(e, data)}
        />
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(CreateUserPage));
