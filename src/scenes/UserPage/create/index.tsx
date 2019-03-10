import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Avatar,
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Grid,
  Paper
} from "@material-ui/core";
import CustomButton from "../component/CustomButton";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: "center",
      color: theme.palette.text.secondary
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

interface State {}

class CreateUserPage extends Component<Props, State> {
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item justify="center" xs={2}>
          <Paper className={classes.paper}>
            <div className={classes.profilebutton}>
              <Avatar className={classes.bigAvatar}>R</Avatar>

              <CustomButton link="">Change Picture</CustomButton>
            </div>
          </Paper>
        </Grid>
        <Grid item justify="center" xs={6}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item justify="center" xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item justify="center" xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
      </Grid>
    );
  }
}

(CreateUserPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(CreateUserPage);
