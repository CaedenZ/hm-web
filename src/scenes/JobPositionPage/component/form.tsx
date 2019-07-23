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
  Button
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
    remarks: string;
}
export interface Props
  extends InState,
    WithStyles<typeof styles>,
    SharedDispatchProps {}

interface InState {
  selectedJobPosition: JobPosition;
  onSubmit: any;
  create: boolean;
  updateData: any;
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
              label="JobPosition Name"
              className={classes.textField}
              value={this.state.business_title}
              onChange={e => this.setState({ business_title: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            <TextField
              required
              id="country"
              label="countey"
              className={classes.textField}
              value={this.state.country}
              onChange={e => this.setState({ country: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            <TextField
              required
              id="location"
              label="location"
              className={classes.textField}
              value={this.state.location}
              onChange={e => this.setState({ location: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            <TextField
              required
              id="jobgrade_id"
              label="jobgrade_id"
              className={classes.textField}
              value={this.state.jobgrade_id}
              onChange={e => this.setState({ jobgrade_id: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            <TextField
              required
              id="jobfunction"
              label="jobfunction"
              className={classes.textField}
              value={this.state.jobfunction}
              onChange={e => this.setState({ jobfunction: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            <TextField
              required
              id="sjobfunction"
              label="sjobfunction"
              className={classes.textField}
              value={this.state.sjobfunction}
              onChange={e => this.setState({ sjobfunction: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            <TextField
              id="description"
              label="description"
              className={classes.textField}
              value={this.state.description}
              onChange={e => this.setState({ description: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            <TextField
              id="remarks"
              label="remarks"
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

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(CreateJobPositionPage));
