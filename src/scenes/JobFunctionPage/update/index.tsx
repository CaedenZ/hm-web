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

export interface CreateJobFunctionState {
  job_name: string;
  description: string;
}
export interface Props extends WithStyles<typeof styles>, SharedDispatchProps { }



class CreateJobFunctionPage extends Component<Props, CreateJobFunctionState> {


  constructor(props) {
    super(props)
    this.handleCreateJobFunction = this.handleCreateJobFunction.bind(this)
  }


  state: CreateJobFunctionState = {
    job_name: "",
    description: ""
  }

  handleChange = (statekay: keyof CreateJobFunctionState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [statekay]: event.target.value } as Pick<CreateJobFunctionState, keyof CreateJobFunctionState>);
  };

  handleCreateJobFunction = () => {
    this.props.createJobFunction(this.state)
  }

  // componentDidMount = () => {
  // }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          New JobFunction
      </Typography>
        <Paper>
          <Grid container className={classes.grid} spacing={16}>
            <Grid item justify="center" container xs>
              <div style={{ margin: 20 }}>
                <TextField
                  id="job_name"
                  label="job_name"
                  className={classes.textField}
                  value={this.state.job_name}
                  onChange={this.handleChange('job_name')}
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
            <Button onClick={this.handleCreateJobFunction}>Submmit</Button>
          </div>

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
    parentCompany: state.companyReducer.selectedCompany,
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateJobFunctionPage));
