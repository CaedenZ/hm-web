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
import { JobChart } from "../../../interface/jobchartInterface";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import { Company } from "../../../interface/companyInterface";
import CustomizedTable from "./component/table";
import { getJobChartByID } from "../../../api/jobchartAPI";
import { isMaster } from "../../../function/checkRole";

const styles = (theme: Theme) => createStyles({});

export interface Props
  extends WithStyles<typeof styles>,
    SharedDispatchProps,
    InState {}

interface State {
  data: JobChart[];
  company: string;
  country: string;
  global: boolean;
}

interface InState {
  sessionkey: string;
  companyList: Company[];
  jobchartList: JobChart[];
  role: string;
}
class JobChartPage extends React.Component<Props, State> {
  state: State = {
    data: [],
    company: "",
    country: "",
    global: true
  };

  componentDidMount() {
    this.props.getJobChartList();
  }

  handleChange = () => {
    this.setState({ global: !this.state.global } as any);
    this.setState({ country: "" } as any);
  };

  handleChangeSelectCompany = event => {
    this.setState({ company: event.target.value } as any);
  };

  handleChangeSelectCountry = event => {
    this.setState({ country: event.target.value } as any);
  };

  handleAdd = () => {
    getJobChartByID(
      this.props.sessionkey,
      JSON.parse(this.state.company).company_id,
      this.state.country
    ).then(res => {
      let joined = this.state.data.concat(res);
      this.setState({ data: joined });
    });
  };

  removeCompanyData = index => {
    let array = [...this.state.data];
    array.splice(index, 1);
    this.setState({ data: array });
  };

  render() {
    return (
      <main>
        <Grid container>
          <Grid item xs={3}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel htmlFor="company">company</InputLabel>
              <Select
                value={this.state.company}
                onChange={this.handleChangeSelectCompany}
                inputProps={{
                  name: "company",
                  id: "company-simple"
                }}
              >
                {this.props.companyList.map(company => (
                  <MenuItem
                    key={company.company_name}
                    value={JSON.stringify(company)}
                  >
                    {company.company_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {this.state.company !== "" && (
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
          )}
          {this.state.company !== "" && (
            <Grid item xs={3}>
              <FormControl
                style={{ width: "100%" }}
                disabled={this.state.global}
              >
                <InputLabel htmlFor="country">Country</InputLabel>
                <Select
                  value={this.state.country}
                  onChange={this.handleChangeSelectCountry}
                  inputProps={{
                    name: "country",
                    id: "country-simple"
                  }}
                >
                  {JSON.parse(this.state.company).country.map(country => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
          {this.state.company !== "" && (
            <Grid item xs={3}>
              {isMaster(this.props.role) && (
                <CustomButton onClick={this.handleAdd}>Add</CustomButton>
              )}
            </Grid>
          )}
        </Grid>
        <CustomizedTable
          jobchartList={this.props.jobchartList}
          companyData={this.state.data}
          removeCompanyData={this.removeCompanyData}
        />
      </main>
    );
  }
}

(JobChartPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    sessionkey: state.authenticationReducer.token,
    companyList: state.companyReducer.companyList,
    jobchartList: state.jobchartReducer.jobchartList,
    role: state.authenticationReducer.profile.info.role_name
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(JobChartPage));
