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
import { Contract } from "../../../interface/contractInterface";
import FormPage from "../component/form";

const styles = () =>
  createStyles({
    root: {
      flexGrow: 1
    }
  });

export interface UpdateContractState {
  contract_name: string;
  address: string;
  postal_code: string;
}
export interface Props
  extends InState,
    WithStyles<typeof styles>,
    SharedDispatchProps {}

interface InState {
  selectedContract: Contract;
}

class UpdateContractPage extends Component<Props, UpdateContractState> {
  constructor(props) {
    super(props);
    this.handleUpdateContract = this.handleUpdateContract.bind(this);
  }

  state: UpdateContractState = {
    contract_name: "",
    address: "",
    postal_code: ""
  };

  handleUpdateContract = (e, data) => {
    e.preventDefault();
    this.props.updateContract(data);
    history.goBack();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          New Contract
        </Typography>
        <FormPage
          create={false}
          updateData={this.props.selectedContract}
          onSubmit={(e, data) => this.handleUpdateContract(e, data)}
        />
      </div>
    );
  }
}

(UpdateContractPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: any) {
  return {
    selectedContract: state.contractReducer.selectedContract
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UpdateContractPage));
