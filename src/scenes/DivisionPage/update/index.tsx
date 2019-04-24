import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { RootState } from "../../../reducer";
import { Unit, Company, UPDATEUNITCRED } from "../../../interface/companyInterface";
import { history } from "../../../store";
import { Country } from "../../../interface/countryInterface";
import { Region } from "../../../interface/regionInterface";
import FormPage from "../component/form";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
  });


export interface Props extends WithStyles<typeof styles>, SharedDispatchProps, InState { }

interface InState {
  selectedUnit: Unit;
  countryList: Country[];
  regionList: Region[];
  parentCompany: Company;
}

class UpdateMainUnitPage extends Component<Props> {


  constructor(props) {
    super(props)
    this.handleUpdateUnit = this.handleUpdateUnit.bind(this)
  }




  handleUpdateUnit = (e, data) => {
    e.preventDefault()

    this.props.updateUnit(data)
    history.goBack()
  }

  render() {
    const { classes } = this.props;


    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          Update Division
      </Typography>
        <FormPage create={false} updateData={this.props.selectedUnit} onSubmit={(e, data) => this.handleUpdateUnit(e, data)} />
      </div>
    );
  }
}

(UpdateMainUnitPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    selectedUnit: state.companyReducer.selectUpdateUnit,
    regionList: state.regionReducer.regionList,
    countryList: state.countryReducer.countryList,
    parentCompany: state.companyReducer.selectedCompany
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UpdateMainUnitPage));
