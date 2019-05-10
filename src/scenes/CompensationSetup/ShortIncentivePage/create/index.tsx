import React, { Component } from "react";
import {
  Typography,
  Theme,
  createStyles,
  WithStyles,
  withStyles} from "@material-ui/core";
import { mapDispatchToProps } from "../../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../../interface/propsInterface";
import { history } from "../../../../store"
import FormPage from "../component/form"

const styles = () =>
  createStyles({
    root: {
      flexGrow: 1
    },
  });


export interface Props extends WithStyles<typeof styles>, SharedDispatchProps { }


class CreateShortIncentivePage extends Component<Props> {



  handleCreateShortIncentive = (e, data) => {
    // console.log(this.props.business_titleList)
    e.preventDefault();
    this.props.createShortIncentive(data)
    history.goBack()
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          New ShortIncentive
      </Typography>
        <FormPage create={true} updateData='' onSubmit={(e, data) => this.handleCreateShortIncentive(e, data)} />
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(CreateShortIncentivePage));