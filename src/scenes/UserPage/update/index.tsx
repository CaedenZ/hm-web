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

export interface CreateUserState {
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
  jobfunction: string;
  contact: string;
  alias: string;
  employee_id: string;
}
export interface Props extends WithStyles<typeof styles>, SharedDispatchProps { }

class CreateUserPage extends Component<Props, CreateUserState> {


  constructor(props) {
    super(props)
    this.onCrop = this.onCrop.bind(this)
    this.onClose = this.onClose.bind(this)
    this.handleCreateUser = this.handleCreateUser.bind(this)
  }


  state: CreateUserState = {
    image: '',
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    employee_id: '',
    alias: '',
    country: '',
    address: '',
    postal_code: '',
    remarks: '',
    status: '',
    jobfunction: '',
    contact: '',
  }

  onClose() {
    this.setState({ image: '' })
  }

  onCrop(image) {
    this.setState({ image })
    console.log(this.state)
  }

  handleChange = (statekay: keyof CreateUserState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [statekay]: event.target.value } as Pick<CreateUserState, keyof CreateUserState>);
  };

  handleCreateUser = () => {
    this.props.createUser(this.state)
  }

  render() {
    const { classes } = this.props;
    const that = this;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          New User
      </Typography>
        <Paper>
          <Grid container className={classes.grid} spacing={16}>
            <Grid item justify="center" xs container>
              <Grid container direction="column" spacing={16}>
                <div style={{ margin: 20, justifyContent: 'center' }}>
                  <Avatar
                    width={200}
                    height={150}
                    onCrop={this.onCrop}
                    onClose={this.onClose}
                  />
                  <Typography variant="h6">Profile Picture</Typography>
                </div>

              </Grid>
            </Grid>
            <Grid item justify="center" xs container>
              <div style={{ margin: 20 }}>
                <TextField
                  id="email"
                  label="Email"
                  className={classes.textField}
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                  margin="normal"
                />
                <TextField
                  id="standard-password-input"
                  label="Password"
                  className={classes.textField}
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  value={this.state.password}
                  onChange={this.handleChange('password')}
                />
              </div>
            </Grid>
            <Grid item justify="center" xs container>
              <div style={{ margin: 20 }}>
                <TextField
                  id="firstname"
                  label="Firstname"
                  className={classes.textField}
                  value={this.state.firstname}
                  onChange={this.handleChange('firstname')}
                  margin="normal"
                />
                <TextField
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
                  id="country"
                  label="Country"
                  className={classes.textField}
                  value={this.state.country}
                  onChange={this.handleChange('country')}
                  margin="normal"
                />
                <TextField
                  id="address"
                  label="Address"
                  className={classes.textField}
                  value={this.state.address}
                  onChange={this.handleChange('address')}
                  margin="normal"
                />
                <TextField
                  id="postal_code"
                  label="Postal Code"
                  className={classes.textField}
                  value={this.state.postal_code}
                  onChange={this.handleChange('postal_code')}
                  margin="normal"
                />
              </div>
            </Grid>
            <Grid item justify="center" container xs>
              <div style={{ margin: 20 }}>
                <TextField
                  id="alias"
                  label="alias"
                  className={classes.textField}
                  value={this.state.alias}
                  onChange={this.handleChange('alias')}
                  margin="normal"
                />
                <TextField
                  id="employee_id"
                  label="employee_id"
                  className={classes.textField}
                  value={this.state.employee_id}
                  onChange={this.handleChange('employee_id')}
                  margin="normal"
                />
                <TextField
                  id="contact"
                  label="contact"
                  className={classes.textField}
                  value={this.state.contact}
                  onChange={this.handleChange('contact')}
                  margin="normal"
                />
              </div>
            </Grid>
            <Grid item justify="center" container xs>
              <div style={{ margin: 20 }}>
                <TextField
                  id="jobfunction"
                  label="jobfunction"
                  className={classes.textField}
                  value={this.state.jobfunction}
                  onChange={this.handleChange('jobfunction')}
                  margin="normal"
                />
                <TextField
                  id="status"
                  label="status"
                  className={classes.textField}
                  value={this.state.status}
                  onChange={this.handleChange('status')}
                  margin="normal"
                />
                <TextField
                  id="remarks"
                  label="remarks"
                  className={classes.textField}
                  value={this.state.remarks}
                  onChange={this.handleChange('remarks')}
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
            <Button onClick={this.handleCreateUser}>Submmit</Button>
          </div>

        </Paper>
      </div>
    );
  }
}

(CreateUserPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default connect(null, mapDispatchToProps)(withStyles(styles)(CreateUserPage));