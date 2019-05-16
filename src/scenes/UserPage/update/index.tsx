import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Theme,
  createStyles,
  WithStyles,
  withStyles
} from "@material-ui/core";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { history } from "../../../store";
import { RootState } from "../../../reducer";
import { User, UPDATEUSERCRED } from "../../../interface/userInterface";
import { Country } from "../../../interface/countryInterface";
import FormPage from "../component/form";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  });

export interface Props
  extends InState,
    WithStyles<typeof styles>,
    SharedDispatchProps {}
interface InState {
  user: User;
  countryList: Country[];
}

class UpdateUserPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
  }

  handleUpdateUser = (e, data) => {
    e.preventDefault();
    data.isCompanyContact = data.isCompanyContact ? 1 : 0;
    const userData: UPDATEUSERCRED = {
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
    this.props.updateUser(userData);
    history.goBack();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          Update User
        </Typography>
        <FormPage
          create={false}
          updateData={this.props.user}
          onSubmit={(e, data) => this.handleUpdateUser(e, data)}
        />
      </div>
    );
  }
}

(UpdateUserPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    user: state.userReducer.user,
    countryList: state.countryReducer.countryList
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UpdateUserPage));
