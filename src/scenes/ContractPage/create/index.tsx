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
import FormPage from "../component/form"

const styles = () =>
  createStyles({
    root: {
      flexGrow: 1
    }
  });

export interface CreateJobPositionState {}
export interface Props extends WithStyles<typeof styles>, SharedDispatchProps {}

class CreateJobPositionPage extends Component<Props, CreateJobPositionState> {
  constructor(props) {
    super(props);
    this.handleCreateJobPosition = this.handleCreateJobPosition.bind(this);
  }


  handleCreateJobPosition = (e, data) => {
    e.preventDefault();
    this.props.createJobPosition(data);
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
          create={true}
          updateData=""
          onSubmit={(e, data) => this.handleCreateJobPosition(e, data)}
        />
      </div>
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
