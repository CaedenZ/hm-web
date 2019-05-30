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
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import { history } from "../../../store";
import { Company } from "../../../interface/companyInterface";
import { Country } from "../../../interface/countryInterface";
import CustomizedTable from "./component/table";

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
    }
  });

export interface Props
  extends WithStyles<typeof styles>,
    SharedDispatchProps,
    InState {}

interface State {
  country: string;
  global: boolean;
}

interface InState {
  countryList: Country[];
  selectedCompany: Company;
  allowancesList: Allowances[];
}
class AllowancesPage extends React.Component<Props, State> {
  state = {
    country: "",
    global: true
  };

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

  handleChange = () => {
    this.setState({ global: !this.state.global } as any);
    this.setState({ country: "" } as any);
    console.log(this.getdata());
  };

  handleChangeSelect = (statekay: keyof State) => (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    this.setState({ [statekay]: event.target.value } as any);
  };

  getdata = () => {
    if (this.props.allowancesList instanceof Array) {
      if (this.state.global) {
        return this.props.allowancesList.filter(e => {
          return e.jobgrade_global === 1;
        });
      } else if (this.state.country !== "") {
        return this.props.allowancesList.filter(e => {
          return e.country === this.state.country;
        });
      } else {
        return this.props.allowancesList;
      }
    } else {
      return [];
    }
  };

  render() {
    let data = this.getdata();

    return (
      <main>
        <CustomButton onClick={this.handleNewGrade}>
          Create New Allowances
        </CustomButton>
        <Grid container>
          <Grid item xs={3}>
            <FormControlLabel
              style={{ height: "100%", width: "100%" }}
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
            <FormControl style={{ width: "100%" }} disabled={this.state.global}>
              <InputLabel htmlFor="country">Country</InputLabel>
              <Select
                value={this.state.country}
                onChange={this.handleChangeSelect("country")}
                inputProps={{
                  name: "country",
                  id: "country-simple"
                }}
              >
                {this.props.selectedCompany.country.map(country => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <CustomizedTable allowancesList={data} />
      </main>
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
    allowancesList: state.allowancesReducer.allowancesList
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AllowancesPage));
