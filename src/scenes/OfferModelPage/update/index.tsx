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
import { OfferModel } from "../../../interface/offerModelInterface";
import OfferModelPage from "../Component";

const styles = () =>
  createStyles({
    root: {
      flexGrow: 1
    }
  });

export interface UpdateOfferModelState {
  offermodel_name: string;
  address: string;
  postal_code: string;
}
export interface Props
  extends InState,
  WithStyles<typeof styles>,
  SharedDispatchProps { }

interface InState {
  selectedOfferModel: OfferModel;
}

class UpdateOfferModelPage extends Component<Props, UpdateOfferModelState> {
  constructor(props) {
    super(props);
    this.handleUpdateOfferModel = this.handleUpdateOfferModel.bind(this);
  }

  state: UpdateOfferModelState = {
    offermodel_name: "",
    address: "",
    postal_code: ""
  };

  handleUpdateOfferModel = (data) => {
    this.props.updateOfferModel(data);
    history.goBack();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          Update OfferModel
        </Typography>
        <OfferModelPage
        create={false}
        updateData={this.props.selectedOfferModel}
        onSubmit={(data) => this.handleUpdateOfferModel(data)}
      />
      </div>
    );
  }
}

(UpdateOfferModelPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: any) {
  return {
    selectedOfferModel: state.offerModelReducer.selectedOfferModel
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UpdateOfferModelPage));
