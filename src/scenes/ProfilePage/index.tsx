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
  Button,
  FormControl,
  InputLabel,
  NativeSelect
} from "@material-ui/core";
import Avatar from "react-avatar-edit";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import logo from "assets/images/companylogo2.png";
import { connect } from "react-redux";
import { Profile, UPDATEPROFILECRED } from "../../interface/authInterface";
import { Country } from "../../interface/countryInterface";

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
export interface Props extends InState, WithStyles<typeof styles> {}

export interface State {
  email: string;
  firstname: string;
  lastname: string;
  alias: string;
  employee_id: string;
  image: string;
  business_title: string;
  country: string;
  address: string;
  postal_code: string;
  status: string;
  remarks: string;
  info: any;
  isCompanyContact: number;
  isUpdating: boolean;
  newProfilePic: string;
}

interface InState {
  countryList: Country[];
  profile: Profile;
}
class UserProfilePage extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
    // this.changeProfilePic = this.changeProfilePic.bind(this);
  }

  state: State = {
    email: "",
    firstname: "",
    lastname: "",
    alias: "",
    employee_id: "",
    image: "",
    business_title: "",
    country: "",
    address: "",
    postal_code: "",
    status: "",
    remarks: "",
    info: "",
    isCompanyContact: 0,
    isUpdating: false,
    newProfilePic: ""
  };

  componentDidMount() {
    this.setState(this.props.profile);
  }

  handleChange = (statekay: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState(({ [statekay]: event.target.value } as unknown) as Pick<
      State,
      keyof State
    >);
  };

  onClose() {
    this.setState({
      newProfilePic: ""
    });
  }

  onCrop(image) {
    this.setState({ image: image });
  }

  handleChangeSelect = (statekay: keyof State) => (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    this.setState(({ [statekay]: event.target.value } as unknown) as Pick<
      State,
      keyof State
    >);
  };

  handleIsUpdating = e => {
    this.setState({ isUpdating: !this.state.isUpdating });
  };

  handleUpdate = e => {
    e.preventDefault();
    let data = this.state;
    const profileData: UPDATEPROFILECRED = {
      company_id: data.info[0].company_id,
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      country: data.country,
      address: data.address,
      postal_code: data.postal_code,
      image: data.image,
      remarks: data.remarks,
      status: data.status,
      business_title: data.business_title,
      alias: data.alias,
      employee_id: data.employee_id,
      role_id: data.info[0].roles[0].role_id,
      isCompanyContact: this.state.isCompanyContact ? 1 : 0
    };
    console.log(data);
    // this.props.profileData(profileData);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        <Paper style={{ marginTop: "2rem" }}>
          <ValidatorForm ref="form" onSubmit={this.handleUpdate}>
            <div style={{ padding: "2rem" }}>
              <Grid container spacing={16}>
                <Grid item justify="center" xs container>
                  <Grid
                    item
                    container
                    justify="center"
                    alignContent="center"
                    alignItems="center"
                    direction="column"
                    spacing={16}
                    xs
                  >
                    {!this.state.isUpdating && (
                      <img
                        style={{
                          height: "10vh",
                          width: "10vh",
                          margin: "2rem"
                        }}
                        src={this.state.image}
                        onError={(e: any) => {
                          e.target.onerror = null;
                          e.target.src = logo;
                        }}
                        alt="Preview"
                      />
                    )}
                    {this.state.isUpdating && (
                      <div style={{ height: "10vh", margin: "2rem" }}>
                        <Avatar
                          width={200}
                          height={150}
                          onCrop={this.onCrop}
                          onClose={this.onClose}
                        />
                      </div>
                    )}
                  </Grid>
                </Grid>
                <Grid item justify="center" xs container>
                  <TextValidator
                    disabled
                    label="Email"
                    onChange={this.handleChange("email")}
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={this.state.email}
                    validators={["required", "isEmail"]}
                    errorMessages={[
                      "this field is required",
                      "email is not valid"
                    ]}
                    className={classes.textField}
                  />
                  <TextField
                    disabled={!this.state.isUpdating}
                    id="firstname"
                    label="First Name"
                    className={classes.textField}
                    value={this.state.firstname}
                    onChange={this.handleChange("firstname")}
                  />
                  <TextField
                    disabled={!this.state.isUpdating}
                    id="lastname"
                    label="Last Name"
                    className={classes.textField}
                    value={this.state.lastname}
                    onChange={this.handleChange("lastname")}
                  />
                </Grid>
                <Grid item justify="center" container xs>
                  {this.state.info !== "" && (
                    <TextField
                      disabled
                      id="role"
                      label="Role"
                      className={classes.textField}
                      value={this.state.info[0].roles[0].role}
                    />
                  )}
                  {this.props.countryList.length > 0 && (
                    <FormControl className={classes.textField}>
                      <InputLabel required>Country</InputLabel>
                      <NativeSelect
                        disabled={!this.state.isUpdating}
                        id="country"
                        value={this.state.country}
                        onChange={this.handleChangeSelect("country")}
                        inputProps={{
                          name: "country",
                          id: "country-simple"
                        }}
                      >
                        <option value="" />
                        {this.props.countryList.map(country => (
                          <option
                            value={country.country_name}
                            key={country.country_name}
                          >
                            {country.country_name}
                          </option>
                        ))}
                      </NativeSelect>
                    </FormControl>
                  )}
                  <TextField
                    disabled={!this.state.isUpdating}
                    id="address"
                    label="Address"
                    className={classes.textField}
                    value={this.state.address}
                    onChange={this.handleChange("address")}
                  />
                  <TextValidator
                    disabled={!this.state.isUpdating}
                    label="Postal Code"
                    onChange={this.handleChange("postal_code")}
                    id="postal_code"
                    name="postal_code"
                    autoComplete="postal-code"
                    value={this.state.postal_code}
                    validators={["required", "isNumber"]}
                    errorMessages={[
                      "this field is required",
                      "postal code is not valid"
                    ]}
                    className={classes.textField}
                  />
                </Grid>
              </Grid>
              <Divider />
              <div
                style={{
                  display: "flex",
                  paddingTop: "1rem"
                }}
              >
                {this.state.isUpdating ? (
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    style={{ marginLeft: "auto" }}
                    onClick={this.handleIsUpdating}
                  >
                    Cancel
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    style={{ marginLeft: "auto" }}
                    onClick={this.handleIsUpdating}
                  >
                    Edit
                  </Button>
                )}
                <Button
                  disabled={!this.state.isUpdating}
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ marginLeft: "1rem" }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </ValidatorForm>
        </Paper>
      </div>
    );
  }
}

(UserProfilePage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state) {
  return {
    profile: state.authenticationReducer.profile,
    countryList: state.countryReducer.countryList
  };
}

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(UserProfilePage));
