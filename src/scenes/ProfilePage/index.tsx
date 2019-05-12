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
import Avatar from "react-avatar-edit";
import logo from "assets/images/companylogo2.png";
import { connect } from "react-redux";
import { Profile } from "../../interface/authInterface";

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
  jobfunction: string;
  country: string;
  address: string;
  postal_code: string;
  status: string;
  remarks: string;
  info: any;
  isChangingProfilePic: boolean;
  newProfilePic: string;
}

interface InState {
  profile: Profile;
}
class UserProfilePage extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
    this.changeProfilePic = this.changeProfilePic.bind(this);
  }

  state: State = {
    email: "",
    firstname: "",
    lastname: "",
    alias: "",
    employee_id: "",
    image: "",
    jobfunction: "",
    country: "",
    address: "",
    postal_code: "",
    status: "",
    remarks: "",
    info: "",
    isChangingProfilePic: false,
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

  changeProfilePic() {
    this.setState({ isChangingProfilePic: !this.state.isChangingProfilePic });
  }

  onClose() {
    this.setState({
      newProfilePic: "",
      isChangingProfilePic: !this.state.isChangingProfilePic
    });
  }

  onCrop(image) {
    this.setState({ newProfilePic: image });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        <Paper style={{ marginTop: "2rem" }}>
          <div style={{ padding: "2rem" }}>
            <Grid container spacing={16}>
              <Grid item justify="center" xs container>
                <Grid
                  item
                  container
                  justify="center"
                  alignContent="center"
                  direction="column"
                  spacing={16}
                  xs
                >
                  {!this.state.isChangingProfilePic && (
                    <img
                      style={{
                        height: "10vh",
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
                  {this.state.isChangingProfilePic && (
                    <div style={{ height: "10vh", margin: "2rem" }}>
                      <Avatar
                        width={200}
                        height={150}
                        onCrop={this.onCrop}
                        onClose={this.onClose}
                      />
                    </div>
                  )}
                  {/* <Typography align="center">Change Profile Picture</Typography> */}
                  <Button
                    disabled={this.state.isChangingProfilePic}
                    variant="contained"
                    color="primary"
                    onClick={() => this.changeProfilePic()}
                  >
                    Change Profile Picture
                  </Button>
                </Grid>
              </Grid>
              <Grid item justify="center" xs container>
                <div style={{ margin: 20 }}>
                  <TextField
                    disabled
                    id="email"
                    label="Email"
                    className={classes.textField}
                    value={this.state.email}
                    onChange={this.handleChange("email")}
                    margin="normal"
                  />
                  <TextField
                    disabled
                    id="firstname"
                    label="Firstname"
                    className={classes.textField}
                    value={this.state.firstname}
                    onChange={this.handleChange("firstname")}
                    margin="normal"
                  />
                  <TextField
                    disabled
                    id="lastname"
                    label="Lastname"
                    className={classes.textField}
                    value={this.state.lastname}
                    onChange={this.handleChange("lastname")}
                    margin="normal"
                  />
                </div>
              </Grid>
              <Grid item justify="center" container xs>
                <div style={{ margin: 20 }}>
                  <TextField
                    disabled
                    id="country"
                    label="Country"
                    className={classes.textField}
                    value={this.state.country}
                    onChange={this.handleChange("country")}
                    margin="normal"
                  />
                  <TextField
                    disabled
                    id="address"
                    label="Address"
                    className={classes.textField}
                    value={this.state.address}
                    onChange={this.handleChange("address")}
                    margin="normal"
                  />
                  <TextField
                    disabled
                    id="postal_code"
                    label="Postal Code"
                    className={classes.textField}
                    value={this.state.postal_code}
                    onChange={this.handleChange("postal_code")}
                    margin="normal"
                  />
                </div>
              </Grid>
            </Grid>
            <Typography style={{ margin: 20 }} component="h1" variant="h5">
              Role
            </Typography>
            <Divider />
            {this.state.info !== "" && (
              <Grid container spacing={16}>
                <Divider />
              </Grid>
            )}
            <Divider />
          </div>
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
    profile: state.authenticationReducer.profile
  };
}

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(UserProfilePage));
