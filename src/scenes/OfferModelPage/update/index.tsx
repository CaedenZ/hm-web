import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  createStyles,
  WithStyles,
  withStyles
} from "@material-ui/core";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { history } from "../../../store";
import { JobPosition } from "../../../interface/jobpositionInterface";
import FormPage from "../Component";

const styles = () =>
  createStyles({
    root: {
      flexGrow: 1
    }
  });

export interface UpdateJobPositionState {
  jobposition_name: string;
  address: string;
  postal_code: string;
}
export interface Props
  extends InState,
  WithStyles<typeof styles>,
  SharedDispatchProps { }

interface InState {
  selectedJobPosition: JobPosition;
}

class UpdateJobPositionPage extends Component<Props, UpdateJobPositionState> {
  constructor(props) {
    super(props);
    this.handleUpdateJobPosition = this.handleUpdateJobPosition.bind(this);
  }

  state: UpdateJobPositionState = {
    jobposition_name: "",
    address: "",
    postal_code: ""
  };

  handleUpdateJobPosition = (e, data) => {
    e.preventDefault();
    this.props.updateJobPosition(data);
    history.goBack();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          New JobPosition
        </Typography>
        <FormPage
          create={false}
          updateData={this.props.selectedJobPosition}
          onSubmit={(e, data) => this.handleUpdateJobPosition(e, data)}
        />
      </div>
    );
  }
}

(UpdateJobPositionPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: any) {
  return {
    selectedJobPosition: state.jobPositionReducer.selectedJobPosition
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UpdateJobPositionPage));
