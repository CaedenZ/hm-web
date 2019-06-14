import React from "react";
import PropTypes from "prop-types";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import CustomButton from "./component/CustomButton";
import { RootState } from "../../../reducer";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { Allowances } from "../../../interface/allowanceInterface";
import { FormControl, InputLabel, Select, MenuItem, Grid, FormControlLabel, Checkbox, Paper, Typography, TextField, Button, Divider } from "@material-ui/core";
import { history } from "../../../store";
import { Company } from "../../../interface/companyInterface";
import { Country } from "../../../interface/countryInterface";
import CustomizedTable from './component/table'
import { JobGrade } from "../../../interface/jobgradeInterface";

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
    textField: {
      width: "100%",
      margin: "1rem"
    },
    textFieldValue: {
      width: "16rem",
    },
    textFieldSign: {
      width: "3rem",
      margin: "8px",
    }
  });

export interface Props
  extends WithStyles<typeof styles>,
  SharedDispatchProps,
  InState { }

interface State {
  filtercountry: string,
  filterglobal: boolean,
  created: boolean,
  jobgrade_id: string;
  type: string;
  value: string;
  isBonus: boolean;
  isOptional: boolean;
  country: string;
  sign: string;
  value_type: string;
}

interface InState {
  countryList: Country[],
  selectedCompany: Company,
  allowancesList: Allowances[],
  jobgradeList: JobGrade[],
}
class AllowancesPage extends React.Component<Props, State> {
  state = {
    filtercountry: '',
    filterglobal: false,
    created: false,
    jobgrade_id: "",
    type: "",
    value: "",
    isBonus: false,
    isOptional: false,
    country: "",
    value_type: "",
    sign: "",
  }

  componentDidMount() {
    console.log("AllowancesPage MOunt");
    if (this.props.selectedCompany.company_id === "") {
      let data = {
        type: "warning",
        object: "Please Select a Company first",
        id: "1"
      };
      this.props.showDialog(data);
    } else this.props.getAllowancesList();
  }

  handleUpdateButtonClick = allowances => {
    this.props.selectAllowances(allowances);
    history.push("/allowances/update");
    console.log("clicked");
  };

  handleDelete = id => {
    const payload = {
      type: "delete",
      object: "allowances",
      id: id
    };
    this.props.showDialog(payload);
  };

  handleNewGrade = () => {
    history.push("/allowances/create");
  };

  handleChangeSelect = (statekay: keyof State) => (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    this.setState({ [statekay]: event.target.value } as any);
  };

  handleChange = (statekay: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ [statekay]: event.target.value } as any);
  };

  handleChangeCheck = () => {
    this.setState({ filterglobal: !this.state.filterglobal } as any);
    this.setState({ filtercountry: '' } as any);
    console.log('aaa')
    console.log(this.getdata())
  };


  getdata = () => {
    if (this.state.filterglobal) {
      return this.props.allowancesList.filter(e => {
        return e.jobgrade_global === 'Y'
      })
    }
    else if (this.state.filtercountry !== '') {
      return this.props.allowancesList.filter(e => {
        return e.country === this.state.filtercountry
      })
    }
    else { return this.props.allowancesList }
  };

  handleCreateAllowance = () => {
    const data = {
      country: "country",
      isBonus: "Y",
      isOptional: "Y",
      jobgrade_country: "jobgrade_country",
      jobgrade_global: "Y",
      jobgrade_id: "jobgrade_id",
      jobgrade_name: "jobgrade_name",
      type: "test",
      value: "0",
      value_type: 1
    }
    this.props.createAllowances(data)
  }

  handleChangeCheckisBonus = () => {
    this.setState({ isBonus: !this.state.isBonus } as any);
  };

  handleChangeCheckisOptional = () => {
    this.setState({ isOptional: !this.state.isOptional } as any);
  };

  render() {
    let data = this.getdata()
    const { classes } = this.props
    return (
      <main>

        <CustomButton onClick={this.handleCreateAllowance}>Create</CustomButton>
        <Divider />

        <Typography component="h1" variant="h6">
          Current Allowances
          </Typography>
        <Paper>
          <Grid container>
            <Grid item xs={3}>
              <FormControlLabel style={{ height: '100%', width: '100%' }}
                control={
                  <Checkbox
                    checked={this.state.filterglobal}
                    onChange={this.handleChangeCheck}
                    color="primary"
                  />
                }
                label="Global"
              />
            </Grid>
            <Grid item xs={3}>
              <FormControl style={{ width: '100%' }} disabled={this.state.filterglobal}>
                <InputLabel htmlFor="filtercountry">Country</InputLabel>
                <Select
                  value={this.state.filtercountry}
                  onChange={this.handleChangeSelect('filtercountry')}
                  inputProps={{
                    name: 'filtercountry',
                    id: 'filtercountry-simple',
                  }}
                >
                  {this.props.selectedCompany.country.map((country) =>
                    <MenuItem key={(country)} value={(country)}>{(country)}</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <CustomizedTable allowancesList={data} />
        </Paper>
      </main >
    );
  }
}

(AllowancesPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    countryList: state.countryReducer.countryList,
    selectedCompany: state.companyReducer.selectedCompany,
    allowancesList: state.allowancesReducer.allowancesList,
    jobgradeList: state.jobgradeReducer.jobgradeList
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AllowancesPage));
