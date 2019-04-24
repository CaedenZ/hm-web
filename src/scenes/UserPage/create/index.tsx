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
  MenuItem,
  InputLabel,
  Select
} from "@material-ui/core";
import CustomButton from "../component/CustomButton";
import Avatar from 'react-avatar-edit'
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { history } from "../../../store"
import FormPage from "../component/form"

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
  });


export interface Props extends WithStyles<typeof styles>, SharedDispatchProps { }


class CreateUserPage extends Component<Props> {



  handleCreateUser = (e, data) => {
    // console.log(this.props.business_titleList)
    e.preventDefault();
    this.props.createUser(data)
    history.push('/user')
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          New User
      </Typography>
        <FormPage create={true} updateData='' onSubmit={(e, data) => this.handleCreateUser(e, data)} />
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(CreateUserPage));
