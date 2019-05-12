import React, { Component } from "react";
import {
  Typography,
  createStyles,
  WithStyles,
  withStyles
} from "@material-ui/core";
import { mapDispatchToProps } from "../../../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../../../interface/propsInterface";
import { history } from "../../../../../store";
import FormPage from "../component/form";

const styles = () =>
  createStyles({
    root: {
      flexGrow: 1
    }
  });

export interface Props extends WithStyles<typeof styles>, SharedDispatchProps {}

class CreateEquityRangePage extends Component<Props> {
  handleCreateEquityRange = (e, data) => {
    // console.log(this.props.business_titleList)
    e.preventDefault();
    this.props.createEquityRange(data);
    history.goBack();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          New EquityRange
        </Typography>
        <FormPage
          create={true}
          updateData=""
          onSubmit={(e, data) => this.handleCreateEquityRange(e, data)}
        />
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(CreateEquityRangePage));
