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
import { Location } from "../../../interface/locationInterface";
import FormPage from "../component/form";

const styles = () =>
  createStyles({
    root: {
      flexGrow: 1
    }
  });

export interface UpdateLocationState {
  location_name: string;
  address: string;
  postal_code: string;
}
export interface Props
  extends InState,
    WithStyles<typeof styles>,
    SharedDispatchProps {}

interface InState {
  selectedLocation: Location;
}

class UpdateLocationPage extends Component<Props, UpdateLocationState> {
  constructor(props) {
    super(props);
    this.handleUpdateLocation = this.handleUpdateLocation.bind(this);
  }

  state: UpdateLocationState = {
    location_name: "",
    address: "",
    postal_code: ""
  };

  handleUpdateLocation = (e, data) => {
    e.preventDefault();
    this.props.updateLocation(data);
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
          create={false}
          updateData={this.props.selectedLocation}
          onSubmit={(e, data) => this.handleUpdateLocation(e, data)}
        />
      </div>
    );
  }
}

(UpdateLocationPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: any) {
  return {
    selectedLocation: state.locationReducer.selectedLocation
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UpdateLocationPage));
