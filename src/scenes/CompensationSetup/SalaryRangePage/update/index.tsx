import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Grid,
  Paper,
  TextField,
  Divider,
  FormControl,
  Checkbox,
  FormControlLabel,
  Button,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import CustomButton from "../component/CustomButton";
import Avatar from 'react-avatar-edit'
import { mapDispatchToProps } from "../../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../../interface/propsInterface";
import { history } from "../../../../store"
import { RootState } from "../../../../reducer";
import { SalaryRange } from "../../../../interface/salaryRangeInterface";
import { Country } from "../../../../interface/countryInterface";
import FormPage from "../component/form"

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    grid: {
      margin: 20
    },
    textField: {
      width: 200,
      margin: 20,
    },
    // formControl: {
    //   margin: theme.spacing.unit * 3,
    // },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: "center",
      color: theme.palette.text.secondary,
      flexDirection: "column"
    },
    preview: {
    },
    divAvatar: {
      margin: theme.spacing.unit * 3,
      alignSelf: "baseline",
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
    bigAvatar: {
      width: "auto",
      height: "auto"
    },
    profilebutton: {
      alignContent: "center",
      alignSelf: "center",
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
  });

export interface Props extends InState, WithStyles<typeof styles>, SharedDispatchProps { }
interface InState {
  salaryrange: SalaryRange,
  countryList: Country[],
}

class UpdateSalaryRangePage extends Component<Props> {


  constructor(props) {
    super(props)
    this.handleUpdateSalaryRange = this.handleUpdateSalaryRange.bind(this)
  }



  handleUpdateSalaryRange = (e, data) => {
    e.preventDefault()
    this.props.updateSalaryRange(data)
    history.goBack()
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          Update SalaryRange
      </Typography>
        <FormPage create={false} updateData={this.props.salaryrange} onSubmit={(e, data) => this.handleUpdateSalaryRange(e, data)} />
      </div>
    );
  }
}

(UpdateSalaryRangePage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    salaryrange: state.salaryRangeReducer.selectSalaryRange,
    countryList: state.countryReducer.countryList,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UpdateSalaryRangePage));
