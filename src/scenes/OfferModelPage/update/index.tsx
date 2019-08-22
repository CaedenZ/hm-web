import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  createStyles,
  WithStyles,
  withStyles,
  Paper
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
    },
    modeller: {
      padding: "1rem"
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

  handleUpdateOfferModelGenerate = (data) => {
    this.props.updateOfferModel(data);
    this.props.selectOfferModel(this.props.selectedOfferModel);
    history.push("/jobposition/offermodel/report");
  };

  handleUpdateOfferModelContract = (data) => {
    this.props.updateOfferModel(data);
    this.props.selectOfferModel(this.props.selectedOfferModel);
    history.push("/jobposition/offermodel/contract")
  };

  handleCreateOfferModelClose = (data) => {
    
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.modeller}>
            <OfferModelPage
            create={false}
            updateData={this.props.selectedOfferModel}
            onSubmit={(data) => this.handleUpdateOfferModel(data)}
            onGenerate={(data) => this.handleUpdateOfferModelGenerate(data)}
            onContract={(data) => this.handleUpdateOfferModelContract(data)}
            onClose={(data) => this.handleCreateOfferModelClose(data)}
          />
        </Paper>
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
