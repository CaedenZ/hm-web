import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  createStyles,
  WithStyles,
  withStyles
} from "@material-ui/core";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { history } from "../../../store";
import OfferModel from "../Component"

const styles = () =>
  createStyles({
    root: {
      flexGrow: 1
    }
  });

export interface CreateOfferModelState {}
export interface Props extends WithStyles<typeof styles>, SharedDispatchProps {}

class CreateOfferModelPage extends Component<Props, CreateOfferModelState> {
  constructor(props) {
    super(props);
    this.handleCreateOfferModel = this.handleCreateOfferModel.bind(this);
  }


  handleCreateOfferModel = (e, data) => {
    e.preventDefault();
    this.props.createOfferModel(data);
    history.goBack();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <OfferModel
        create={true}
        updateData=""
        onSubmit={(e, data) => this.handleCreateOfferModel(e, data)}
        />
      </div>
    );
  }
}

(CreateOfferModelPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(CreateOfferModelPage));
