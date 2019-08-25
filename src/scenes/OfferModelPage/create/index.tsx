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


  handleCreateOfferModel = (data) => {
    delete data.comparator_data
    this.props.createOfferModel(data);
    history.push("/jobposition/offermodel");
    //history.goBack();
  };

  handleCreateOfferModelGenerate = (data) => {
    delete data.comparator_data
    this.props.createOfferModel(data);
    this.props.selectOfferModel(data);
    history.push("/jobposition/offermodel/report");
  };

  handleCreateOfferModelContract = (data) => {
    delete data.comparator_data
    this.props.createOfferModel(data);
    this.props.selectOfferModel(data);
    history.push("/jobposition/offermodel/contract");
  };

  handleCreateOfferModelClose = (data) => {
    
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <OfferModel
        create={true}
        updateData=""
        onSubmit={(data) => this.handleCreateOfferModel(data)}
        onGenerate={(data) => this.handleCreateOfferModelGenerate(data)}
        onContract={(data) => this.handleCreateOfferModelContract(data)}
        onClose={(data) => this.handleCreateOfferModelClose(data)}
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
