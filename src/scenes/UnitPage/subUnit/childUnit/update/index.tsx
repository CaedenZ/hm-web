import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  createStyles,
  WithStyles,
  withStyles
} from "@material-ui/core";
import { mapDispatchToProps } from "../../../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../../../interface/propsInterface";
import { RootState } from "../../../../../reducer";
import { Unit, Company } from "../../../../../interface/companyInterface";
import { history } from "../../../../../store";
import { Country } from "../../../../../interface/countryInterface";
import { Region } from "../../../../../interface/regionInterface";
import FormPage from "../../../component/form";

const styles = () =>
  createStyles({
    root: {
      flexGrow: 1
    }
  });

interface Props
  extends WithStyles<typeof styles>,
    SharedDispatchProps,
    InState {}

interface InState {
  parentCompany: Company;
  selectedUnit: Unit;
  countryList: Country[];
  regionList: Region[];
}

class UpdateUnitPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.handleUpdateUnit = this.handleUpdateUnit.bind(this);
  }

  handleUpdateUnit = (e, data) => {
    e.preventDefault();
    this.props.updateChildUnit(data);
    history.goBack();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          Update Division
        </Typography>
        <FormPage
          create={false}
          updateData={this.props.selectedUnit}
          onSubmit={(e, data) => this.handleUpdateUnit(e, data)}
        />
      </div>
    );
  }
}

(UpdateUnitPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    parentCompany: state.companyReducer.selectedCompany,
    selectedUnit: state.companyReducer.selectUpdateUnit,
    regionList: state.regionReducer.regionList,
    countryList: state.countryReducer.countryList
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UpdateUnitPage));
