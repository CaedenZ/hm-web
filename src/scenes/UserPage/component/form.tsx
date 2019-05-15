import React, { Component } from "react";
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
  Button,
  MenuItem,
  InputLabel,
  Select,
  NativeSelect
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Avatar from "react-avatar-edit";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { RootState } from "../../../reducer";
import { Country } from "../../../interface/countryInterface";

const styles = (theme: Theme) =>
  createStyles({
    textField: {
      width: "20rem",
      margin: "1rem"
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
      maxWidth: "5vw"
    },
    selectEmpty: {
      width: "20rem",
      margin: "1rem",
      marginTop: theme.spacing.unit * 2
    }
  });

interface FormState {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  country: string;
  address: string;
  postal_code: string;
  image: string;
  remarks: string;
  status: string;
  business_title: string;
  contact: string;
  alias: string;
  employee_id: string;
}
interface Props
  extends InState,
    WithStyles<typeof styles>,
    SharedDispatchProps {}

interface InState {
  countryList: Country[];
  create: boolean;
  updateData: any;
  onSubmit: any;
}

class FormPage extends Component<Props, FormState> {
  constructor(props) {
    super(props);
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  state: FormState = {
    image: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    employee_id: "",
    alias: "",
    country: "",
    address: "",
    postal_code: "",
    remarks: "",
    status: "Active",
    business_title: "",
    contact: ""
  };
  componentDidMount() {
    if (!this.props.create) {
      this.setState(this.props.updateData);
    }
  }

  onClose() {
    this.setState({ image: "" });
  }

  onCrop(image) {
    this.setState({ image });
    console.log(this.state);
  }

  handleChange = (statekay: keyof FormState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ [statekay]: event.target.value } as Pick<
      FormState,
      keyof FormState
    >);
  };

  handleChangeSelect = (statekay: keyof FormState) => (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    this.setState({ [statekay]: event.target.value } as Pick<
      FormState,
      keyof FormState
    >);
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper style={{ marginTop: "2rem" }}>
        <ValidatorForm
          ref="form"
          debounceTime={500}
          onSubmit={e => this.props.onSubmit(e, this.state)}
          style={{ padding: "2rem" }}
        >
          <Typography component="h1" variant="h6">
            User Infomation
          </Typography>
          <Grid justify="center" container>
            <Grid item xs={3}>
              <div style={{ margin: "1rem" }}>
                <Typography variant="h6">Profile Picture</Typography>
                <Avatar
                  width={200}
                  height={150}
                  onCrop={this.onCrop}
                  onClose={this.onClose}
                />
              </div>
            </Grid>
            <Grid container item xs>
              <Grid container>
                <Grid container item xs={6}>
                  {/* <TextField
                    required
                    type="email"
                    id="email"
                    label="Email"
                    className={classes.textField}
                    value={this.state.email}
                    onChange={this.handleChange("email")}
                    margin="normal"
                  /> */}
                  <TextValidator
                    fullWidth
                    className={classes.textField}
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
                    margin="normal"
                  />
                </Grid>
                {this.props.create && (
                  <Grid container item xs={6}>
                    <TextField
                      required
                      id="standard-password-input"
                      label="Password"
                      className={classes.textField}
                      autoComplete="current-password"
                      margin="normal"
                      value={this.state.password}
                      onChange={this.handleChange("password")}
                    />
                  </Grid>
                )}
              </Grid>
              <Grid container>
                <Grid container item xs>
                  <TextField
                    required
                    id="firstname"
                    label="First Name"
                    className={classes.textField}
                    value={this.state.firstname}
                    onChange={this.handleChange("firstname")}
                    margin="normal"
                  />
                </Grid>
                <Grid container item xs>
                  <TextField
                    id="lastname"
                    label="Last Name"
                    className={classes.textField}
                    value={this.state.lastname}
                    onChange={this.handleChange("lastname")}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid justify="center" container>
            <Grid item direction="column" xs={3} container>
              <FormControl className={classes.formControl}>
                <InputLabel required>status</InputLabel>
                <Select
                  value={this.state.status}
                  onChange={this.handleChangeSelect("status")}
                  inputProps={{
                    name: "status",
                    id: "status"
                  }}
                >
                  <MenuItem value={"Active"}>Active</MenuItem>
                  <MenuItem value={"Inactive"}>Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid container item xs>
              <Grid container item xs={6}>
                <TextField
                  id="alias"
                  label="Alias"
                  className={classes.textField}
                  value={this.state.alias}
                  onChange={this.handleChange("alias")}
                  margin="normal"
                />
              </Grid>
              <Grid container item xs={6}>
                <TextField
                  id="employee_id"
                  label="Employee ID"
                  className={classes.textField}
                  value={this.state.employee_id}
                  onChange={this.handleChange("employee_id")}
                  margin="normal"
                />
              </Grid>
            </Grid>
          </Grid>

          <Divider />
          <Divider />

          <Typography component="h1" variant="h6">
            Job Infomation
          </Typography>
          <Grid justify="center" container>
            <Grid item direction="column" xs={3} container />
            <Grid container item xs>
              <Grid container>
                <Grid container item xs={6}>
                  <TextField
                    id="address"
                    multiline
                    label="Address"
                    className={classes.textField}
                    value={this.state.address}
                    onChange={this.handleChange("address")}
                    margin="normal"
                  />
                </Grid>
                <Grid container item xs={6}>
                  {/* <TextField
                    id="postal_code"
                    label="Postal Code"
                    className={classes.textField}
                    value={this.state.postal_code}
                    onChange={this.handleChange("postal_code")}
                    margin="normal"
                  /> */}
                  <TextValidator
                    fullWidth
                    className={classes.textField}
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
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  {this.props.countryList.length > 0 && (
                    <FormControl className={classes.textField}>
                      <InputLabel required>Country</InputLabel>
                      <NativeSelect
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
                          <option value={country.country_name} key={country.country_name}>
                            {country.country_name}
                          </option>
                        ))}
                      </NativeSelect>
                    </FormControl>
                  )}
                </Grid>
                <Grid item xs>
                  {/* <TextField
                    required
                    id="contact"
                    label="contact"
                    className={classes.textField}
                    value={this.state.contact}
                    onChange={this.handleChange("contact")}
                    margin="normal"
                  /> */}
                  <TextValidator
                    fullWidth
                    className={classes.textField}
                    label="Contact"
                    onChange={this.handleChange("contact")}
                    id="contact"
                    name="contact"
                    autoComplete="tel"
                    value={this.state.contact}
                    validators={["required", "isNumber"]}
                    errorMessages={[
                      "this field is required",
                      "contact is not valid"
                    ]}
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <Grid container item xs={6}>
                <TextField
                  id="business_title"
                  label="Business Title"
                  className={classes.textField}
                  value={this.state.business_title}
                  onChange={this.handleChange("business_title")}
                  margin="normal"
                />
              </Grid>
              <Grid container item xs={6}>
                <TextField
                  id="remarks"
                  label="Remarks"
                  className={classes.textField}
                  value={this.state.remarks}
                  onChange={this.handleChange("remarks")}
                  margin="normal"
                />
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item justify="center" container xs>
                        
                    </Grid>
                    <Grid item justify="center" container xs>
                        <div style={{ margin: 20 }}>
                            
                            

                        </div>
                    </Grid>
                    <Grid item justify="center" container xs>
                        <div style={{ margin: 20 }}>
                            
                            

                        </div>
                    </Grid> */}

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

function mapStateToProps(state: RootState) {
  return {
    countryList: state.countryReducer.countryList
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FormPage));
