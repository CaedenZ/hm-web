import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  createStyles,
  WithStyles,
  withStyles,
  Grid,
  Paper,
  TextField,
  Divider,
  Button,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@material-ui/core";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { history } from "../../../store";
import {
  JobPosition,
  CREATEJOBPOSITIONCRED
} from "../../../interface/jobpositionInterface";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { RootState } from "../../../reducer";
import { Country } from "../../../interface/countryInterface";
import { JobGrade } from "../../../interface/jobgradeInterface";
import { JobFunction } from "../../../interface/jobfunctionInterface";
import { Location } from "../../../interface/locationInterface";
import { Region } from "../../../interface/regionInterface";
import { Unit, Entity } from "../../../interface/companyInterface";

const styles = () =>
  createStyles({
    textField: {
      width: "20rem",
      margin: "1rem"
    }
  });

interface FormState {
  business_title: string;
  country: string;
  description: string;
  jobgrade_id: string;
  location: string;
  jobfunction: string;
  sjobfunction: string;
  division: string;
	region: string;
	legal_entity: string;
	manager_name: string;
	manager_position_title: string;
	manager_grade: string;
  remarks: string;
}
export interface Props
  extends InState,
  WithStyles<typeof styles>,
  SharedDispatchProps { }

interface InState {
  selectedJobPosition: JobPosition;
  onSubmit: any;
  create: boolean;
  updateData: any;
  countryList: Country[];
  jobgradeList: JobGrade[];
  jobfunctionList: JobFunction[];
  locationList: Location[];
  regionList:Region[];
  divisionList:Unit[];
  companyList: Entity[];
}

class CreateJobPositionPage extends Component<Props, FormState> {
  constructor(props) {
    super(props);
    this.handleCreateJobPosition = this.handleCreateJobPosition.bind(this);
  }

  state: FormState = {
    business_title: "",
    country: "",
    description: "",
    jobgrade_id: "",
    location: "",
    jobfunction: "",
    sjobfunction: "",
    remarks: "",
    division: "",
	  region: "",
	  legal_entity: "",
	  manager_name: "",
	  manager_position_title: "",
  	manager_grade: "",
  };

  componentDidMount() {
    if (!this.props.create) {
      this.setState(this.props.updateData);
    }
  }

  handleCreateJobPosition = e => {
    e.preventDefault();
    const a: any = {
      ...this.state
    };

    this.props.createJobPosition(a);
    history.goBack();
  };

  handleLocationChangeSelect = () => (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    this.setState({
      location: event.target.value
    });
  };

  handleEntityChangeSelect = () => (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    this.setState({
      legal_entity: event.target.value
    });
  };

  handleRegionChangeSelect = () => (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const regionID = event.target.value;
    const tmpRegion = this.props.regionList.find(region => {
      return region.region_id === regionID;
    });
    
    if (tmpRegion) {
      this.setState({
        region: tmpRegion.region_id
      });
    }
  };

  handleDivisionChangeSelect = () => (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const divisionID = event.target.value;
    const tmpDivision = this.props.divisionList.find(division => {
      return division.unit_id === divisionID;
    });

    if (tmpDivision) {
      this.setState({
        division: tmpDivision.unit_id
      });
    }
  };

  handleJobGradeChangeSelect = () => (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const jobgradeID = event.target.value;
    const tmpjobgrade = this.props.jobgradeList.find(jobgrade => {
      return jobgrade.jobgrade_id === jobgradeID;
    });

    if (tmpjobgrade) {
      this.setState({
        jobgrade_id: tmpjobgrade.jobgrade_id
      });
    }
  };

  handleJobFunctionChangeSelect = () => (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const jobfunctionID = event.target.value;
    const tmpjobfunction = this.props.jobfunctionList.find(jobfunction => {
      return jobfunction.jobfunction_id === jobfunctionID;
    });

    if (tmpjobfunction) {
      this.setState({
        jobfunction: tmpjobfunction.jobfunction_id
      });
    }
  };

  handleSubJobFunctionChangeSelect = () => (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const sjobfunctionID = event.target.value;
    const tmpsjobfunction = this.getsjobfunctionList().find(sjobfunction => {
      return sjobfunction.sjobfunction_id === sjobfunctionID;
    });

    if (tmpsjobfunction) {
      this.setState({
        sjobfunction: tmpsjobfunction.sjobfunction_id
      });
    }
  };

  handleChangeSelect = (statekay: keyof FormState) => (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    this.setState(({ [statekay]: event.target.value } as unknown) as Pick<
      FormState,
      keyof FormState
    >);
  };

  getsjobfunctionList = () => {
    if (this.state.jobfunction === '') {
      return []
    }
    else {
      const jobfunction = this.props.jobfunctionList.find(jobfunction => {
        return jobfunction.jobfunction_id === this.state.jobfunction;
      });

      return jobfunction.sjobfunction
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper style={{ marginTop: "2rem" }}>
        <ValidatorForm
          ref="form"
          onSubmit={e => this.props.onSubmit(e, this.state)}
          style={{ padding: "2rem" }}
        >
          <Grid item justify="center" container xs>
            <TextField
              required
              id="busisness_title"
              label="Job Business Title"
              className={classes.textField}
              value={this.state.business_title}
              onChange={e => this.setState({ business_title: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            {this.props.countryList.length > 0 && (
              <FormControl className={classes.textField}>
                <InputLabel required>Country</InputLabel>
                <NativeSelect
                  required
                  id="country"
                  value={this.state.country}
                  onChange={this.handleChangeSelect("country")}
                  inputProps={{
                    name: "country",
                    id: "country-simple"
                  }}
                >
                  <option value="" />
                  {this.props.countryList.map(country => (
                    <option
                      value={country.country_name}
                      key={country.country_name}
                    >
                      {country.country_name}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            )}
          </Grid>
          <Grid item justify="center" container xs>
            {this.props.locationList.length > 0 && (
              <FormControl className={classes.textField}>
                <InputLabel required>Location</InputLabel>
                <NativeSelect
                  required
                  id="location"
                  value={this.state.location}
                  onChange={this.handleLocationChangeSelect()}
                  inputProps={{
                    name: "location",
                    id: "location-simple"
                  }}
                >
                  <option value={undefined} />
                  {this.props.locationList.map(location => (
                    <option
                      value={location.location_name}
                      key={location.location_name}
                    >
                      {location.location_name}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            )}
          </Grid>
          <Grid item justify="center" container xs>
            {this.props.regionList.length > 0 && (
              <FormControl className={classes.textField}>
                <InputLabel>Region</InputLabel>
                <NativeSelect
                  id="region"
                  value={this.state.region}
                  onChange={this.handleRegionChangeSelect()}
                  inputProps={{
                    name: "region",
                    id: "region-simple"
                  }}
                >
                  <option value={undefined} />
                  {this.props.regionList.map(region => (
                    <option
                      value={region.region_id}
                      key={region.region_id}
                    >
                      {region.region_name}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            )}
          </Grid>
          <Grid item justify="center" container xs>
            {this.props.divisionList.length > 0 && (
              <FormControl className={classes.textField}>
                <InputLabel>Division</InputLabel>
                <NativeSelect
                  id="division"
                  value={this.state.division}
                  onChange={this.handleDivisionChangeSelect()}
                  inputProps={{
                    name: "division",
                    id: "division-simple"
                  }}
                >
                  <option value={undefined} />
                  {this.props.divisionList.map(division => (
                    <option
                      value={division.unit_id}
                      key={division.unit_id}
                    >
                      {division.unit_name}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            )}
          </Grid>
          <Grid item justify="center" container xs>
            {this.props.jobgradeList.length > 0 && (
              <FormControl className={classes.textField}>
                <InputLabel required>Job Grade</InputLabel>
                <NativeSelect
                  required
                  id="jobgrade"
                  value={this.state.jobgrade_id}
                  onChange={this.handleJobGradeChangeSelect()}
                  inputProps={{
                    name: "jobgrade",
                    id: "jobgrade-simple"
                  }}
                >
                  <option value={undefined} />
                  {this.props.jobgradeList.map(jobgrade => (
                    <option
                      value={jobgrade.jobgrade_id}
                      key={jobgrade.jobgrade_id}
                    >
                      {jobgrade.jobgrade_name}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            )}
          </Grid>
          <Grid item justify="center" container xs>
            {this.props.jobfunctionList.length > 0 && (
              <FormControl className={classes.textField}>
                <InputLabel required>Job Function</InputLabel>
                <NativeSelect
                  required
                  id="jobgrade"
                  value={this.state.jobfunction}
                  onChange={this.handleJobFunctionChangeSelect()}
                  inputProps={{
                    name: "jobgrade",
                    id: "jobgrade-simple"
                  }}
                >
                  <option value={undefined} />
                  {this.props.jobfunctionList.map(jobfunction => (
                    <option
                      value={jobfunction.jobfunction_id}
                      key={jobfunction.jobfunction_id}
                    >
                      {jobfunction.job_name}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            )}
          </Grid>
          <Grid item justify="center" container xs>
            {this.getsjobfunctionList().length > 0 && (
              <FormControl className={classes.textField}>
                <InputLabel required>Sub Job Function</InputLabel>
                <NativeSelect
                  required
                  id="jobgrade"
                  value={this.state.sjobfunction}
                  onChange={this.handleSubJobFunctionChangeSelect()}
                  inputProps={{
                    name: "jobgrade",
                    id: "jobgrade-simple"
                  }}
                >
                  <option value={undefined} />
                  {this.getsjobfunctionList().map(jobfunction => (
                    <option
                      value={jobfunction.sjobfunction_id}
                      key={jobfunction.sjobfunction_id}
                    >
                      {jobfunction.subjob_name}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            )}
          </Grid>
          <Grid item justify="center" container xs>
            {this.props.companyList.length > 0 && (
              <FormControl className={classes.textField}>
                <InputLabel required>Legal Entity</InputLabel>
                <NativeSelect
                  required
                  id="legal_entity"
                  value={this.state.legal_entity}
                  onChange={this.handleEntityChangeSelect()}
                  inputProps={{
                    name: "legal_entity",
                    id: "legal_entity-simple"
                  }}
                >
                  <option value={undefined} />
                  {this.props.companyList.map(company => (
                    <option
                      value={company.company_name}
                      key={company.company_name}
                    >
                      {company.company_name}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            )}
          </Grid>
          <Grid item justify="center" container xs>
            <TextField
              id="manager_grade"
              label="Manager Grade"
              className={classes.textField}
              value={this.state.manager_grade}
              onChange={e => this.setState({ manager_grade: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            <TextField
              id="manager_name"
              label="Manager Name"
              className={classes.textField}
              value={this.state.manager_name}
              onChange={e => this.setState({ manager_name: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            <TextField
              id="manager_position_title"
              label="Manager Job Title"
              className={classes.textField}
              value={this.state.manager_position_title}
              onChange={e => this.setState({ manager_position_title: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            <TextField
              id="description"
              label="Description"
              className={classes.textField}
              value={this.state.description}
              onChange={e => this.setState({ description: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            <TextField
              id="remarks"
              label="Remarks"
              className={classes.textField}
              value={this.state.remarks}
              onChange={e => this.setState({ remarks: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Divider />
          <Divider />
          <div
            style={{
              display: "flex",
              paddingTop: "1rem"
            }}
          >
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginLeft: "auto" }}
            >
              Submit
            </Button>
          </div>
        </ValidatorForm>
      </Paper>
    );
  }
}

(CreateJobPositionPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;


function mapStateToProps(state: RootState) {
  return {
    countryList: state.countryReducer.countryList,
    jobgradeList: state.jobgradeReducer.jobgradeList,
    jobfunctionList: state.jobFunctionReducer.jobFunctionList,
    locationList: state.locationReducer.locationList,
    divisionList:state.companyReducer.divisionList,
    regionList:state.regionReducer.regionList,
    companyList: state.companyReducer.childCompanyList,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreateJobPositionPage));
