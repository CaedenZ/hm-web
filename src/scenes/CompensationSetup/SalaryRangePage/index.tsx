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
import { SalaryRange } from "../../../interface/salaryRangeInterface";
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
  salaryrangeList: SalaryRange[],
}
class SalaryRangePage extends React.Component<Props, State> {

  state = {
    country: '',
    global: true,
  }

  componentDidMount() {
    console.log('SalaryRangePage MOunt')
    if (this.props.selectedCompany.company_id === '') {
      let data = {
        type: 'warning',
        object: 'Please Select a Company first',
        id: '1'
      }
      this.props.showDialog(data)
    }
    else this.props.getSalaryRangeList()
  }

  handleUpdateButtonClick = (salaryrange) => {
    this.props.selectSalaryRange(salaryrange)
    history.push('/salaryrange/update')
    console.log('clicked')
  }

  handleDelete = (id, index) => {

    const payload = {
      type: 'delete',
      object: 'salaryrange',
      id: id,
    }
    this.props.showDialog(payload)
  }

  handleNewGrade = () => {
    history.push('/salaryrange/create')
  }

  handleChange = () => {
    this.setState({ global: !this.state.global } as any);
    console.log(this.getdata())
  };

  handleChangeSelect = (statekay: keyof State) => (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ [statekay]: event.target.value } as any);
  };

  getdata = () => {
    if (this.state.global) {
      return this.props.salaryrangeList.filter(e => {
        return e.global === 1
      })
    }
    else if (this.state.country !== '') {
      return this.props.salaryrangeList.filter(e => {
        return e.country === this.state.country
      })
    }
    else {
      return []
    }
  }

  render() {
    let data = this.getdata()

    return (
      <main>
        <CustomButton onClick={this.handleNewGrade}>Create New Salary Range</CustomButton>
        <Grid container>
          <Grid item xs={3}>
            <FormControlLabel style={{ height: '100%', width: '100%' }}
              control={
                <Checkbox
                  checked={this.state.global}
                  onChange={this.handleChange}
                  color="primary"
                />
              }
              label="Global"
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl style={{ width: '100%' }} disabled={this.state.global}>
              <InputLabel htmlFor="country">Country</InputLabel>
              <Select
                value={this.state.country}
                onChange={this.handleChangeSelect('country')}
                inputProps={{
                  name: 'country',
                  id: 'country-simple',
                }}
              >
                {this.props.selectedCompany.country.map((country) =>
                  <MenuItem key={JSON.parse(country).country_name} value={JSON.parse(country).country_name}>{JSON.parse(country).country_name}</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <CustomizedTable salaryrangeList={data} />
      </main >
    );
  }
}

(SalaryRangePage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    countryList: state.countryReducer.countryList,
    selectedCompany: state.companyReducer.selectedCompany,
    salaryrangeList: state.salaryRangeReducer.salaryrangeList,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SalaryRangePage));
