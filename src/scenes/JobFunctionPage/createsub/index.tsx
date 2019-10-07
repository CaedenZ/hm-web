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

export interface CreateSubJobFunctionState {
  subjob_name: string;
  description: string;
  jobfunction_id: string;
}
export interface Props
  extends WithStyles<typeof styles>,
    SharedDispatchProps,
    InState {}

interface InState {
  parentJobFunction: string;
}
class CreateSubJobFunctionPage extends Component<
  Props,
  CreateSubJobFunctionState
> {
  constructor(props) {
    super(props);
    this.handleCreateSubJobFunction = this.handleCreateSubJobFunction.bind(
      this
    );
  }

  state: CreateSubJobFunctionState = {
    subjob_name: "",
    description: "",
    jobfunction_id: ""
  };

  handleChange = (statekay: keyof CreateSubJobFunctionState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ [statekay]: event.target.value } as Pick<
      CreateSubJobFunctionState,
      keyof CreateSubJobFunctionState
    >);
  };

  handleCreateSubJobFunction = e => {
    e.preventDefault();
    this.props.createSubJobFunction(this.state);
    history.goBack();
  };

  componentDidMount = () => {
    this.setState({ jobfunction_id: this.props.parentJobFunction });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          New Job Sub Function
        </Typography>
        <Paper style={{ marginTop: "2rem" }}>
          <form
            onSubmit={this.handleCreateSubJobFunction}
            style={{ padding: "2rem" }}
          >
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={16}
            >
              <Grid item justify="center" container xs>
                <TextField
                  id="subjob_name"
                  label="Job Sub Function"
                  className={classes.textField}
                  value={this.state.subjob_name}
                  onChange={this.handleChange("subjob_name")}
                  margin="normal"
                />

                {/* <TextField
                    disabled
                    id="jobfunction_id"
                    label="jobfunction_id"
                    className={classes.textField}
                    value={this.state.jobfunction_id}
                    onChange={this.handleChange('jobfunction_id')}
                    margin="normal"
                  /> */}
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

(CreateSubJobFunctionPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: any) {
  return {
    parentJobFunction: state.jobFunctionReducer.selectedJobFunction
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreateSubJobFunctionPage));
