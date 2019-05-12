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
  Chip,
  Select,
  FormControl,
  MenuItem,
  InputLabel
} from "@material-ui/core";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { history } from "../../../store";
import {
  CREATEROLE,
  Function,
  RoleFunction
} from "../../../interface/roleInterface";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    textField: {
      width: "20rem",
      margin: "1rem"
    },
    chip: {
      margin: theme.spacing.unit / 2
    }
  });

export interface Props
  extends InState,
    WithStyles<typeof styles>,
    SharedDispatchProps {}

interface InState {
  roleFunctionList: RoleFunction[];
}

class CreateRolePage extends Component<Props, CREATEROLE> {
  constructor(props) {
    super(props);
    this.handleCreateRole = this.handleCreateRole.bind(this);
  }

  state: CREATEROLE = {
    role_name: "",
    role_description: "",
    role_function: []
  };

  handleCreateRole = e => {
    e.preventDefault();
    this.props.createRole(this.state);
    history.goBack();
  };

  handleDelete = roleFunction => () => {
    this.setState(state => {
      const roleFunctionList = [...state.role_function];
      const chipToDelete = roleFunctionList.indexOf(roleFunction);
      roleFunctionList.splice(chipToDelete, 1);
      return { role_function: roleFunctionList };
    });
  };

  handleChange = e => {
    console.log(e);
    this.setState(state => {
      const roleFunctionList = [...state.role_function];
      const newRoleFunction: Function = {
        function_id: e.target.value
      };
      roleFunctionList.push(newRoleFunction);
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
        <Paper style={{ marginTop: "2rem" }}>
          <form onSubmit={this.handleCreateRole} style={{ padding: "2rem" }}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={16}
            >
              <Grid item justify="center" container xs>
                <TextField
                  id="role_name"
                  label="role_name"
                  className={classes.textField}
                  value={this.state.role_name}
                  onChange={e => this.setState({ role_name: e.target.value })}
                  margin="normal"
                />
              </Grid>
              <Grid item justify="center" container xs>
                <TextField
                  id="role_description"
                  label="role_description"
                  className={classes.textField}
                  value={this.state.role_description}
                  onChange={e =>
                    this.setState({ role_description: e.target.value })
                  }
                  margin="normal"
                />
              </Grid>
              <Grid item justify="center" container xs>
                {this.props.roleFunctionList.length > 0 && (
                  <FormControl>
                    <InputLabel style={{ marginLeft: "20px" }}>
                      Role Function
                    </InputLabel>
                    <Select
                      id="roleFunction"
                      className={classes.textField}
                      onChange={e => this.handleChange(e)}
                      inputProps={{
                        name: "roleFunction",
                        id: "roleFunction-simple"
                      }}
                    >
                      {this.props.roleFunctionList.map(roleFunction => (
                        <MenuItem
                          key={roleFunction.function_id}
                          value={roleFunction.function_id}
                        >
                          {roleFunction.function_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Grid>
              <Grid item justify="center" container xs={12}>
                {this.state.role_function.map(roleFunction => (
                  <Chip
                    key={roleFunction.function_id}
                    label={roleFunction.function_id}
                    onDelete={this.handleDelete(roleFunction)}
                    className={classes.chip}
                  />
                ))}
              </Grid>
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreateRolePage));
