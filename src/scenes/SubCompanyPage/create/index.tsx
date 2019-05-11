import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  createStyles,
  WithStyles,
  withStyles
} from "@material-ui/core";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { RootState } from "../../../reducer";
import { CountryState } from "../../../interface/countryInterface";
import { history } from "../../../store";
import { Company } from "../../../interface/companyInterface";
import FormPage from "../component/form";

const styles = () =>
  createStyles({
    root: {
      flexGrow: 1
    }
  });

export interface Props
  extends WithStyles<typeof styles>,
    SharedDispatchProps,
    InState {}

interface InState {
  paremeterList: CountryState;
  selectedCompany: Company;
}

class CreateSubCompanyPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.handleCreateCompany = this.handleCreateCompany.bind(this);
  }

  handleCreateCompany = (e, data) => {
    e.preventDefault();

    this.props.createEntity(data);
    history.goBack();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          New Entity
        </Typography>
        <FormPage
          create={true}
          updateData=""
          onSubmit={(e, data) => this.handleCreateCompany(e, data)}
        />
      </div>
    );
  }
}

(CreateSubCompanyPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    paremeterList: state.countryReducer,
    selectedCompany: state.companyReducer.selectedCompany
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreateSubCompanyPage));
