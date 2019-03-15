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
  FormControlLabel
} from "@material-ui/core";
import CustomButton from "../component/CustomButton";
import Avatar from 'react-avatar-edit'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    grid:{
      margin:20
    },
    textField: {
      width: 200,
    },
    // formControl: {
    //   margin: theme.spacing.unit * 3,
    // },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: "center",
      color: theme.palette.text.secondary,
      flexDirection:"column"
    },
    preview:{
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
export interface Props extends WithStyles<typeof styles> {}

export interface State {
  name: string;
  age: string;
  multiline: string;
  currency: string;
  preview: any;
  src: any;
  roles: any;
}

class CreateUserPage extends Component<Props, State> {


  constructor(props) {
    super(props)
    
    
    this.onCrop = this.onCrop.bind(this)
    this.onClose = this.onClose.bind(this)
  }


  state: State = {
    preview: null,
    src: '',
    name: '',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
    roles: [
      {
        id:1,
        title:'Dummy 1',
        checked: false
      },
      {
        id:2,
        title:'Dummy 2',
        checked: false
      },
    ]
  }

  onClose() {
    this.setState({preview: null})
  }
  
  onCrop(preview) {
    this.setState({preview})
  }

  handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [name]: event.target.value } as Pick<State, keyof State>);
  };

  handleCheckbox = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.state.roles[index].checked = event.target.checked
    this.forceUpdate()
    console.log(this.state.roles)
  };
  
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
          <Paper className={classes.paper}>
            <Grid container direction="column" spacing={16} xs>
            Profile Picture
              <Avatar
                  width={200}
                  height={150}
                  onCrop={this.onCrop}
                  onClose={this.onClose}
                  src={this.state.src}
                />
            </Grid>
          </Paper>
        </Grid>
        <Grid item justify="center" xs container>
          <Paper className={classes.paper}>
          <TextField
            id="email"
            label="Email"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
          />
          <TextField
            id="standard-password-input"
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
          />
          </Paper>
        </Grid>
        <Grid item justify="center" xs container>
          <Paper className={classes.paper}>
          <TextField
            id="firstname"
            label="Firstname"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
          />
          <TextField
            id="lastname"
            label="Lastname"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
          />
          </Paper>
        </Grid>
        <Grid item justify="center" container xs>
          <Paper className={classes.paper}>
          <TextField
            id="country"
            label="Country"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
          />
          <TextField
            id="address"
            label="Address"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
          />
          <TextField
            id="postal_code"
            label="Postal Code"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
          />
          </Paper>
        </Grid>
        
      </Grid>
      <Typography component="h1" variant="h5">
          Role
      </Typography>
      <Divider/>
      <Grid container className={classes.grid} spacing={16}>
          {this.state.roles.map(function(role:any, index:number){
                        return (
                          <Grid item justify="center" xs container>
                            <FormControlLabel
                              control={
                                <Checkbox checked={role.checked} onChange={that.handleCheckbox(index)} value={role.title} />
                              }
                              label="Gilad Gray"
                            />
                          </Grid>
                        );
                      })}
      </Grid>
      </Paper>
      </div>
    );
  }
}

(CreateUserPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(CreateUserPage);
