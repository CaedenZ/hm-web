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
  Button
} from "@material-ui/core";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { history } from "../../../store";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    textField: {
      width: "20rem",
      margin: "1rem"
    }
  });

export interface CreateJobFunctionState {
  job_name: string;
  description: string;
}
export interface Props extends WithStyles<typeof styles>, SharedDispatchProps {}

class CreateJobFunctionPage extends Component<Props, CreateJobFunctionState> {
  constructor(props) {
    super(props);
    this.handleCreateJobFunction = this.handleCreateJobFunction.bind(this);
  }

  state: CreateJobFunctionState = {
    job_name: "",
    description: ""
  };

  handleChange = (statekay: keyof CreateJobFunctionState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ [statekay]: event.target.value } as Pick<
      CreateJobFunctionState,
      keyof CreateJobFunctionState
    >);
  };

  handleCreateJobFunction = e => {
    e.preventDefault();
    this.props.createJobFunction(this.state);
    history.goBack();
  };

  // componentDidMount = () => {
  // }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          New Job Function
        </Typography>
        <Paper style={{ marginTop: "2rem" }}>
          <form
            onSubmit={this.handleCreateJobFunction}
            style={{ padding: "2rem" }}
          >
            <Grid container spacing={16}>
              <Grid item justify="center" container xs>
                <TextField
                  id="job_name"
                  label="job_name"
                  className={classes.textField}
                  value={this.state.job_name}
                  onChange={this.handleChange("job_name")}
                  margin="normal"
                />
              </Grid>
              <Grid item justify="center" container xs>
                <TextField
                  id="description"
                  label="description"
                  className={classes.textField}
                  value={this.state.description}
                  onChange={this.handleChange("description")}
                  margin="normal"
                />
              </Grid>
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
          </form>
        </Paper>
      </div>
    );
  }
}

(CreateJobFunctionPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: any) {
  return {
    parentCompany: state.companyReducer.selectedCompany
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreateJobFunctionPage));
