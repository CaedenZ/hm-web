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
  Button,
  Chip,
  Select,
  MenuItem
} from "@material-ui/core";
import CustomButton from "../component/CustomButton";
import Avatar from 'react-avatar-edit'
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { RootState } from "../../../reducer";
import { history } from "../../../store";
import { CREATEROLE, Function, RoleFunction } from "../../../interface/roleInterface";

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
    },
    chip: {
      margin: theme.spacing.unit / 2,
    },
  });

export interface Props extends InState, WithStyles<typeof styles>, SharedDispatchProps { }

interface InState {
  roleFunctionList: RoleFunction[],
}


class CreateRolePage extends Component<Props, CREATEROLE> {


  constructor(props) {
    super(props)
    this.handleCreateRole = this.handleCreateRole.bind(this)
  }


  state: CREATEROLE = {
    role_name: "",
    role_description: "",
    role_function: [],
  }

  handleCreateRole = (e) => {
    e.preventDefault()
    this.props.createRole(this.state)
    history.goBack()
  }

  handleDelete = roleFunction => () => {
    this.setState(state => {
      const roleFunctionList = [...state.role_function];
      const chipToDelete = roleFunctionList.indexOf(roleFunction);
      roleFunctionList.splice(chipToDelete, 1);
      return { role_function: roleFunctionList };
    });
  };

  handleChange = (e) => {
    console.log(e)
    this.setState(state => {
      const roleFunctionList = [...state.role_function];
      const newRoleFunction: Function = {
        function_id: e.target.value
      }
      roleFunctionList.push(newRoleFunction)
      return { role_function: roleFunctionList };
    });
  };


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          New Role
      </Typography>
        <Paper>
          <form onSubmit={this.handleCreateRole}>
            <Grid container className={classes.grid} spacing={16}>
              <Grid item justify="center" container xs>
                <div style={{ margin: 20 }}>
                  <TextField
                    id="role_name"
                    label="role_name"
                    className={classes.textField}
                    value={this.state.role_name}
                    onChange={(e) => this.setState({ role_name: e.target.value })}
                    margin="normal"
                  />
                  <TextField
                    id="role_description"
                    label="role_description"
                    className={classes.textField}
                    value={this.state.role_description}
                    onChange={(e) => this.setState({ role_description: e.target.value })}
                    margin="normal"
                  />
                </div>
              </Grid>
              <Grid item justify="center" container xs>
                <Typography>RoleFunction</Typography>
                {this.props.roleFunctionList.length > 0 && <Select
                  id="roleFunction"
                  className={classes.textField}
                  onChange={(e) => this.handleChange(e)}
                  inputProps={{
                    name: 'roleFunction',
                    id: 'roleFunction-simple',
                  }}>
                  {this.props.roleFunctionList.map((roleFunction) =>
                    <MenuItem key={roleFunction.function_id} value={roleFunction.function_id}>{roleFunction.function_name}</MenuItem>
                  )}
                </Select>}
              </Grid>
              <Grid item justify="center" container xs={12}>
                {this.state.role_function.map(roleFunction =>
                  <Chip
                    key={roleFunction.function_id}
                    label={roleFunction.function_id}
                    onDelete={this.handleDelete(roleFunction)}
                    className={classes.chip}
                  />
                )}
              </Grid>
            </Grid>
            <Divider />
            <Divider />
            <div style={{
              width: '100%', flex: 1,
              flexDirection: 'row',
              justifyContent: 'center', alignItems: 'flex-end'
            }}>
              <Button variant="contained" color="primary" type="submit">Submit</Button>
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

(CreateRolePage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: any) {
  return {
    roleFunctionList: state.roleReducer.roleFunctionList
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateRolePage));
