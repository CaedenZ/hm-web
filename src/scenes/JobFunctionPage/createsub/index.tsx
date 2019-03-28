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
  FormControl,
  Checkbox,
  FormControlLabel,
  Button
} from "@material-ui/core";
import CustomButton from "../component/CustomButton";
import Avatar from 'react-avatar-edit'
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { RootState } from "../../../reducer";
import { SubJobFunction, JobFunction } from "../../../interface/jobfunctionInterface";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    grid: {
      margin: 20
    },
    textField: {
      width: 200,
      margin: 20,
    },
    // formControl: {
    //   margin: theme.spacing.unit * 3,
    // },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: "center",
      color: theme.palette.text.secondary,
      flexDirection: "column"
    },
    preview: {
    },
    divAvatar: {
      margin: theme.spacing.unit * 3,
      alignSelf: "baseline",
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
    bigAvatar: {
      width: "auto",
      height: "auto"
    },
    profilebutton: {
      alignContent: "center",
      alignSelf: "center",
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    }
  });

export interface CreateSubJobFunctionState {
  subjob_name: string;
  description: string;
  jobfunction_id: string;
}
export interface Props extends WithStyles<typeof styles>, SharedDispatchProps, InState { }

interface InState {
  parentJobFunction: string;
}
class CreateSubJobFunctionPage extends Component<Props, CreateSubJobFunctionState> {


  constructor(props) {
    super(props)
    this.handleCreateSubJobFunction = this.handleCreateSubJobFunction.bind(this)
  }


  state: CreateSubJobFunctionState = {
    subjob_name: "",
    description: "",
    jobfunction_id: "",
  }

  handleChange = (statekay: keyof CreateSubJobFunctionState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [statekay]: event.target.value } as Pick<CreateSubJobFunctionState, keyof CreateSubJobFunctionState>);
  };

  handleCreateSubJobFunction = () => {
    this.props.createSubJobFunction(this.state)
  }

  componentDidMount = () => {
    this.setState({ jobfunction_id: this.props.parentJobFunction })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          New SubJobFunction
      </Typography>
        <Paper>
          <Grid container className={classes.grid} spacing={16}>
            <Grid item justify="center" container xs>
              <div style={{ margin: 20 }}>
                <TextField
                  id="subjob_name"
                  label="subjob_name"
                  className={classes.textField}
                  value={this.state.subjob_name}
                  onChange={this.handleChange('subjob_name')}
                  margin="normal"
                />
                <TextField
                  id="description"
                  label="description"
                  className={classes.textField}
                  value={this.state.description}
                  onChange={this.handleChange('description')}
                  margin="normal"
                />
                <TextField
                  disabled
                  id="jobfunction_id"
                  label="jobfunction_id"
                  className={classes.textField}
                  value={this.state.jobfunction_id}
                  onChange={this.handleChange('jobfunction_id')}
                  margin="normal"
                />
              </div>
            </Grid>
          </Grid>
          <Divider />
          <Divider />
          <div style={{
            width: '100%', flex: 1,
            flexDirection: 'row',
            justifyContent: 'center', alignItems: 'flex-end'
          }}>
            <Button onClick={this.handleCreateSubJobFunction}>Submmit</Button>
          </div>

        </Paper>
      </div>
    );
  }
}

(CreateSubJobFunctionPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    parentJobFunction: state.jobFunctionReducer.selectedJobFunction,
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateSubJobFunctionPage));
