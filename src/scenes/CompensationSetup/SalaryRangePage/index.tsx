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
import { JobGrade } from "../../../interface/jobgradeInterface";
import { Button, IconButton, FormControl, InputLabel, Select, MenuItem, Grid, FormControlLabel, Checkbox } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import { history } from "../../../store";
import UpdateIcon from '@material-ui/icons/PlaylistAddCheck';
import ResetIcon from '@material-ui/icons/BorderColor';
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
}
class JobGradePage extends React.Component<Props, State> {

  state = {
    country: '',
    global: false,
  }

  componentDidMount() {
    console.log('JobGradePage MOunt')
    if (this.props.selectedCompany.company_id === '') {
      let data = {
        type: 'warning',
        object: 'Please Select a Company first',
        id: '1'
      }
      this.props.showDialog(data)
    }
    else this.props.getJobGradeList()
  }

  handleUpdateButtonClick = (jobgrade) => {
    this.props.selectJobGrade(jobgrade)
    history.push('/jobgrade/update')
    console.log('clicked')
  }

  handleDelete = (id, index) => {

    const payload = {
      type: 'delete',
      object: 'jobgrade',
      id: id,
    }
    this.props.showDialog(payload)
  }

  handleNewGrade = () => {
    history.push('/jobgrade/create')
  }

  handleChange = () => {
    this.setState({ global: !this.state.global } as any);
  };

  handleChangeSelect = (statekay: keyof State) => (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ [statekay]: event.target.value } as any);
  };


  render() {
    const { classes } = this.props;

    return (
      <main>
        <CustomButton onClick={this.handleNewGrade}>Create New Grade</CustomButton>
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
            <FormControl style={{ width: '100%' }}>
              <InputLabel htmlFor="country">Country</InputLabel>
              <Select
                value={this.state.country}
                onChange={this.handleChangeSelect('country')}
                inputProps={{
                  name: 'country',
                  id: 'country-simple',
                }}
              >
                {this.props.countryList.map((country) =>
                  <MenuItem key={country.country_name} value={country.country_name}>{country.country_name}</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <CustomizedTable />
      </main>
    );
  }
}

(JobGradePage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    countryList: state.countryReducer.countryList,
    selectedCompany: state.companyReducer.selectedCompany,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(JobGradePage));
