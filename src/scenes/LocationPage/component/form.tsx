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
  Location,
  CREATELOCATIONCRED
} from "../../../interface/locationInterface";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const styles = () =>
  createStyles({
    textField: {
      width: "20rem",
      margin: "1rem"
    }
  });

interface FormState {
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
  onSubmit: any;
  create: boolean;
  updateData: any;
}

class CreateLocationPage extends Component<Props, FormState> {
  constructor(props) {
    super(props);
    this.handleCreateLocation = this.handleCreateLocation.bind(this);
  }

  state: FormState = {
    location_name: "",
    address: "",
    postal_code: ""
  };

  componentDidMount() {
    if (!this.props.create) {
      this.setState(this.props.updateData);
    }
  }

  handleCreateLocation = e => {
    e.preventDefault();
    const a: CREATELOCATIONCRED = {
      ...this.state
    };

    this.props.createLocation(a);
    history.goBack();
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper style={{ marginTop: "2rem", maxWidth:"50rem" }}>
        <ValidatorForm
          ref="form"
          onSubmit={e => this.props.onSubmit(e, this.state)}
          style={{ padding: "2rem" }}
        >
          <Grid item justify="center" container xs>
            <TextField
              required
              id="location_name"
              label="Location Name"
              className={classes.textField}
              value={this.state.location_name}
              onChange={e => this.setState({ location_name: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            <TextField
              required
              id="address"
              label="Address"
              className={classes.textField}
              value={this.state.address}
              onChange={e => this.setState({ address: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            <TextValidator
              fullWidth
              label="Postal Code"
              onChange={e => this.setState({ postal_code: e.target.value })}
              id="postal_code"
              name="postal_code"
              autoComplete="postal_code"
              value={this.state.postal_code}
              validators={["required"]}
              errorMessages={[
                "this field is required",
                "postal code is not valid"
              ]}
              className={classes.textField}
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

(CreateLocationPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(CreateLocationPage));
