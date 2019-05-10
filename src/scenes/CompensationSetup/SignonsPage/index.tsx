import React from "react";
import PropTypes from "prop-types";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { render } from "react-dom";
import CustomButton from "./component/CustomButton";
import { RootState } from "../../../reducer";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { Signons } from "../../../interface/signonsInterface";
import { Button, IconButton, FormControl, InputLabel, Select, MenuItem, Grid, FormControlLabel, Checkbox } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import { history } from "../../../store";
import UpdateIcon from '@material-ui/icons/PlaylistAddCheck';
import ResetIcon from '@material-ui/icons/BorderColor';
import ResetPassword from './component/resetPassword';
import { Company } from "../../../interface/companyInterface";
import { Country } from "../../../interface/countryInterface";
import CustomizedTable from './component/table'


const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginTop: theme.spacing.unit * 3,
      overflowX: "auto"
    },
    table: {
      minWidth: 700
    },
    row: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.background.default
      }
    },
    logo: {
      height: "20px"
    },
  });

export interface Props extends WithStyles<typeof styles>, SharedDispatchProps, InState { }

interface State {
  country: string,
  global: boolean,
}

interface InState {
  countryList: Country[],
  selectedCompany: Company,
  signonsList: Signons[],
}
class SignonsPage extends React.Component<Props, State> {

  state = {
    country: '',
    global: true,
  }

  componentDidMount() {
    console.log('SignonsPage MOunt')
    if (this.props.selectedCompany.company_id === '') {
      let data = {
        type: 'warning',
        object: 'Please Select a Company first',
        id: '1'
      }
      this.props.showDialog(data)
    }
    else this.props.getSignonsList()
  }

  handleUpdateButtonClick = (signons) => {
    this.props.selectSignons(signons)
    history.push('/signons/update')
    console.log('clicked')
  }

  handleDelete = (id, index) => {

    const payload = {
      type: 'delete',
      object: 'signons',
      id: id,
    }
    this.props.showDialog(payload)
  }

  handleNewGrade = () => {
    history.push('/signons/create')
  }



  render() {

    return (
      <main>
        <CustomButton onClick={this.handleNewGrade}>Create New Sign Ons</CustomButton>
        <CustomizedTable signonsList={this.props.signonsList} />
      </main >
    );
  }
}

(SignonsPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    countryList: state.countryReducer.countryList,
    selectedCompany: state.companyReducer.selectedCompany,
    signonsList: state.signonsReducer.signonsList,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignonsPage));
