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

export interface CreateLocationState {}
export interface Props extends WithStyles<typeof styles>, SharedDispatchProps {}

class CreateLocationPage extends Component<Props, CreateLocationState> {
  constructor(props) {
    super(props);
    this.handleCreateLocation = this.handleCreateLocation.bind(this);
  }


  handleCreateLocation = (e, data) => {
    e.preventDefault();
    this.props.createLocation(data);
    history.goBack();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          New Location
        </Typography>
        <FormPage
          create={true}
          updateData=""
          onSubmit={(e, data) => this.handleCreateLocation(e, data)}
        />
      </div>
    );
  }
}

(CreateLocationPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(CreateLocationPage));
