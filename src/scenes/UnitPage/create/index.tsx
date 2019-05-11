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
import { RootState, history } from "../../../reducer";
import { Company } from "../../../interface/companyInterface";
import { Country } from "../../../interface/countryInterface";
import { Region } from "../../../interface/regionInterface";
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
  parentCompany: Company;
  countryList: Country[];
  regionList: Region[];
}

class CreateMainUnitPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.handleCreateUnit = this.handleCreateUnit.bind(this);
  }

  handleCreateUnit = (e, data) => {
    e.preventDefault();

    this.props.createUnit(data);
    history.goBack();
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          New Division
        </Typography>
        <FormPage
          create={true}
          updateData={{ company_id: this.props.parentCompany.company_id }}
          onSubmit={(e, data) => this.handleCreateUnit(e, data)}
        />
      </div>
    );
  }
}

(CreateMainUnitPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    parentCompany: state.companyReducer.selectedCompany,
    regionList: state.regionReducer.regionList,
    countryList: state.countryReducer.countryList
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreateMainUnitPage));
