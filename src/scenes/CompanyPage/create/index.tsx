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
  Select,
  MenuItem,
  InputLabel
} from "@material-ui/core";
import CustomButton from "../component/CustomButton";
import Avatar from 'react-avatar-edit'
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { RootState } from "../../../reducer";
import { Country, CountryState } from "../../../interface/countryInterface";
import { history } from "../../../store";
import { CREATECOMPANYCRED } from "../../../interface/companyInterface";
import FormPage from '../component/form';

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
    }
  });

export interface Props extends WithStyles<typeof styles>, SharedDispatchProps, InState { }

interface InState {
  paremeterList: CountryState
}

class CreateCompanyPage extends Component<Props> {


  constructor(props) {
    super(props)
    this.handleCreateCompany = this.handleCreateCompany.bind(this)
  }



  handleCreateCompany = (e, data) => {
    e.preventDefault()
    this.props.createCompany(data)
    history.goBack()
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          New Company
      </Typography>
        <FormPage create={true} updataData='' onSubmit={this.handleCreateCompany} />
      </div >
    );
  }
}

(CreateCompanyPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;


export default connect(null, mapDispatchToProps)(withStyles(styles)(CreateCompanyPage));
