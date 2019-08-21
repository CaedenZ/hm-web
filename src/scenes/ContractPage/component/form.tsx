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
  Contract,
  CREATECONTRACTCRED,
  Deduction,
  SalaryComponent,
  Leave
} from "../../../interface/contractInterface";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { RootState } from "../../../reducer";
import { Country } from "../../../interface/countryInterface";
import { JobGrade } from "../../../interface/jobgradeInterface";
import { JobFunction } from "../../../interface/jobfunctionInterface";
import { Location } from "../../../interface/locationInterface";

const styles = () =>
  createStyles({
    textField: {
      width: "20rem",
      margin: "1rem"
    }
  });

interface FormState {
  contract_id?: string,
	date_issue: string,
	employee_nric: string,
	start_date: string,
	duty: string,
	duration: string,
	working_hour: string,
	salary_period: string,
	workplace: string,
	working_day: string,
	rest_day: string,
	ot_payment: string,
	salary_date: string,
	deduction: Deduction[],
	ot_rate: string,
	salary_component: SalaryComponent[]
	annual_leave: string,
	sick_leave: string,
	hospitalisation_leave: string,
	medical_benefits: string,
	other_leave: Leave[],
	birthday_leave: string,
	notice_period: string,
	probation: string,
	probation_start_date: string,
	probation_end_date: string
}
export interface Props
  extends InState,
  WithStyles<typeof styles>,
  SharedDispatchProps { }

interface InState {
  selectedContract: Contract;
  onSubmit: any;
  create: boolean;
  updateData: any;
  countryList: Country[];
  jobgradeList: JobGrade[];
  jobfunctionList: JobFunction[];
  locationList: Location[];
}

class CreateContractPage extends Component<Props, FormState> {
  constructor(props) {
    super(props);
    this.handleCreateContract = this.handleCreateContract.bind(this);
  }

  state: FormState = {
	date_issue: "2019-08-20",
	employee_nric: "S7923561E",
	start_date: "2019-08-01",
	duty: "As a member of the sales team, you inspire leading companies, schools and government agencies to work smarter with suite of Singapore SME solution.",
	duration: "Full Time",
	working_hour: "Weekday 9am to 6pm, 12pm to 12.45pm, Lunch Break",
	salary_period: "Monthly",
	workplace: "23 Shenton Way #2-290 UOB Tower A Singapore 229876",
	working_day: "5",
	rest_day: "2",
	ot_payment: "Monthly",
	salary_date: "25th day of the month",
	deduction: [ 
		{
			type: "CDAC",
			value: "1"
		}
	],
	ot_rate: "21",
	salary_component: [ 
		{
			"type": "Eligibility for variable bonus"
		}
	],
	annual_leave: "14",
	sick_leave: "14",
	hospitalisation_leave: "60",
	medical_benefits: "As per employee handbook",
	other_leave: [ 
		{
			"name": "Maternity Leave"
		},
		{
			"name": "Paternity Leave"
		}
	],
	birthday_leave: "1 month",
	notice_period: "1 month",
	probation: "1 month",
	probation_start_date: "2019-08-01",
	probation_end_date: "2019-10-01"
  };

  componentDidMount() {
    if (!this.props.create) {
      this.setState(this.props.updateData);
    }
  }

  handleCreateContract = e => {
    e.preventDefault();
    const a: any = {
      ...this.state
    };

    this.props.createContract(a);
    history.goBack();
  };

  handleChangeSelect = (statekay: keyof FormState) => (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    this.setState(({ [statekay]: event.target.value } as unknown) as Pick<
      FormState,
      keyof FormState
    >);
  };

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
              id="annual_leave"
              label="annual_leave"
              className={classes.textField}
              value={this.state.annual_leave}
              onChange={e => this.setState({ annual_leave: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            <TextField
              required
              id="birthday_leave"
              label="birthday_leave"
              className={classes.textField}
              value={this.state.birthday_leave}
              onChange={e => this.setState({ birthday_leave: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            <TextField
              required
              id="duration"
              label="duration"
              className={classes.textField}
              value={this.state.duration}
              onChange={e => this.setState({ duration: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            <TextField
              required
              id="employee_nric"
              label="employee_nric"
              className={classes.textField}
              value={this.state.employee_nric}
              onChange={e => this.setState({ employee_nric: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            <TextField
              required
              id="hospitalisation_leave"
              label="hospitalisation_leave"
              className={classes.textField}
              value={this.state.hospitalisation_leave}
              onChange={e => this.setState({ hospitalisation_leave: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            <TextField
              required
              id="medical_benefits"
              label="medical_benefits"
              className={classes.textField}
              value={this.state.medical_benefits}
              onChange={e => this.setState({ medical_benefits: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            <TextField
              required
              id="notice_period"
              label="notice_period"
              className={classes.textField}
              value={this.state.notice_period}
              onChange={e => this.setState({ notice_period: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            <TextField
              id="duty"
              label="duty"
              className={classes.textField}
              value={this.state.duty}
              onChange={e => this.setState({ duty: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            <TextField
              id="ot_payment"
              label="ot_payment"
              className={classes.textField}
              value={this.state.ot_payment}
              onChange={e => this.setState({ ot_payment: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            <TextField
              id="ot_rate"
              label="ot_rate"
              className={classes.textField}
              value={this.state.ot_rate}
              onChange={e => this.setState({ ot_rate: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            <TextField
              id="probation"
              label="probation"
              className={classes.textField}
              value={this.state.probation}
              onChange={e => this.setState({ probation: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            <TextField
              id="probation_start_date"
              label="probation_start_date"
              className={classes.textField}
              value={this.state.probation_start_date}
              onChange={e => this.setState({ probation_start_date: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            <TextField
              id="probation_end_date"
              label="probation_end_date"
              className={classes.textField}
              value={this.state.probation_end_date}
              onChange={e => this.setState({ probation_end_date: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            <TextField
              id="rest_day"
              label="rest_day"
              className={classes.textField}
              value={this.state.rest_day}
              onChange={e => this.setState({ rest_day: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            <TextField
              id="salary_date"
              label="salary_date"
              className={classes.textField}
              value={this.state.salary_date}
              onChange={e => this.setState({ salary_date: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            <TextField
              id="salary_period"
              label="salary_period"
              className={classes.textField}
              value={this.state.salary_period}
              onChange={e => this.setState({ salary_period: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            <TextField
              id="sick_leave"
              label="sick_leave"
              className={classes.textField}
              value={this.state.sick_leave}
              onChange={e => this.setState({ sick_leave: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            <TextField
              id="start_date"
              label="start_date"
              className={classes.textField}
              value={this.state.start_date}
              onChange={e => this.setState({ start_date: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            <TextField
              id="working_day"
              label="working_day"
              className={classes.textField}
              value={this.state.working_day}
              onChange={e => this.setState({ working_day: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            <TextField
              id="working_hour"
              label="working_hour"
              className={classes.textField}
              value={this.state.working_hour}
              onChange={e => this.setState({ working_hour: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            <TextField
              id="workplace"
              label="workplace"
              className={classes.textField}
              value={this.state.workplace}
              onChange={e => this.setState({ workplace: e.target.value })}
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

(CreateContractPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;


function mapStateToProps(state: RootState) {
  return {
    countryList: state.countryReducer.countryList,
    jobgradeList: state.jobgradeReducer.jobgradeList,
    jobfunctionList: state.jobFunctionReducer.jobFunctionList,
    locationList: state.locationReducer.locationList,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreateContractPage));
