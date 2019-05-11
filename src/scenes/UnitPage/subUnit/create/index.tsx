import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  createStyles,
  WithStyles,
  withStyles
} from "@material-ui/core";
import { mapDispatchToProps } from "../../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../../interface/propsInterface";
import { RootState } from "../../../../reducer";
import { Unit, Company } from "../../../../interface/companyInterface";
import { history } from "../../../../store";
import { Country } from "../../../../interface/countryInterface";
import { Region } from "../../../../interface/regionInterface";
import FormPage from "../../component/form";

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
  parentUnit: Unit;
  parentCompany: Company;
  countryList: Country[];
  regionList: Region[];
}

class CreateUnitPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.handleCreateUnit = this.handleCreateUnit.bind(this);
  }

  handleCreateUnit = (e, data) => {
    e.preventDefault();

    this.props.createSubUnit(data);
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
          updateData={{
            parent_unit: this.props.parentUnit.unit_id,
            main_unit: this.props.parentUnit.main_unit,
            company_id: this.props.parentCompany.company_id
          }}
          onSubmit={(e, data) => this.handleCreateUnit(e, data)}
        />
      </div>
    );
  }
}

(CreateUnitPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    parentUnit: state.companyReducer.selectedUnit,
    parentCompany: state.companyReducer.selectedCompany
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreateUnitPage));
