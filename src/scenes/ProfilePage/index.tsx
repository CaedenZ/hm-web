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
import Avatar from 'react-avatar-edit'
import logo from 'assets/images/companylogo2.png';
import theme from "../../assets/theme";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Profile } from "../../interface/authInterface";

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
export interface Props extends InState, WithStyles<typeof styles> { }

export interface State {
  email: string,
  firstname: string,
  lastname: string,
  alias: string,
  employee_id: string,
  image: string,
  jobfunction: string,
  country: string,
  address: string,
  postal_code: string,
  status: string,
  remarks: string,
  info: any
}

interface InState {
  profile: Profile,
}
class UserProfilePage extends Component<Props, State> {


  constructor(props) {
    super(props)
  }


  state: State = {
    email: '',
    firstname: '',
    lastname: '',
    alias: '',
    employee_id: '',
    image: '',
    jobfunction: '',
    country: '',
    address: '',
    postal_code: '',
    status: '',
    remarks: '',
    info: ''
  }

  componentDidMount() {
    this.setState(this.props.profile)
  }

  handleChange = (statekay: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [statekay]: event.target.value } as Pick<State, keyof State>);
  };


  render() {
    const { classes } = this.props;
    const that = this;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          Profile
      </Typography>
        <Paper>
          <Grid container className={classes.grid} spacing={16}>
            <Grid item justify="center" xs container>
              <Grid container direction="column" spacing={16} xs>
                <div style={{ height: 'inherit', justifyContent: 'center' }}>
                  <div style={{ height: theme.spacing.unit * 10, margin: 20, justifyContent: 'center' }}>
                    <img style={{ height: 'inherit' }} src={this.state.image} onError={(e: any) => { e.target.onerror = null; e.target.src = logo }} alt="Preview" />
                    <Typography>Profile Picture</Typography>
                  </div>
                </div>


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
                  onChange={this.handleChange('email')}
                  margin="normal"
                />
                <TextField
                  disabled
                  id="firstname"
                  label="Firstname"
                  className={classes.textField}
                  value={this.state.firstname}
                  onChange={this.handleChange('firstname')}
                  margin="normal"
                />
                <TextField
                  disabled
                  id="lastname"
                  label="Lastname"
                  className={classes.textField}
                  value={this.state.lastname}
                  onChange={this.handleChange('lastname')}
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
                  onChange={this.handleChange('country')}
                  margin="normal"
                />
                <TextField
                  disabled
                  id="address"
                  label="Address"
                  className={classes.textField}
                  value={this.state.address}
                  onChange={this.handleChange('address')}
                  margin="normal"
                />
                <TextField
                  disabled
                  id="postal_code"
                  label="Postal Code"
                  className={classes.textField}
                  value={this.state.postal_code}
                  onChange={this.handleChange('postal_code')}
                  margin="normal"
                />
              </div>
            </Grid>

          </Grid>
          <Typography style={{ margin: 20 }} component="h1" variant="h5">
            Role
      </Typography>
          <Divider />
          {this.state.info !== '' && <Grid container className={classes.grid} spacing={16}>
            <Divider />
          </Grid>}
          <Divider />

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
  }
}

export default connect(mapStateToProps, null)(withStyles(styles)(UserProfilePage));
