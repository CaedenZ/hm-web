import React, { Component } from "react";
import PermanentDrawerLeft from "./component/Drawer";
import { connect } from "react-redux";
import { Redirect, Link as RouterLink } from "react-router-dom";
import { mapDispatchToProps } from "../helper/dispachProps";
import { SharedDispatchProps } from "../interface/propsInterface";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Typography from "@material-ui/core/Typography";
import CustomSnackBar from "./component/snackBar";
import CustomDialog from "./component/deleteDialog";
import ErrorBoundary from "./component/error";
import { history } from "../store";

export interface Props extends SharedDispatchProps {
  token: string;
}

class Layout extends Component<Props> {
  componentDidMount() {
    this.props.getCountryList();
    this.props.getCurrencyList();
    this.props.getDistintCurrencyList();
    this.props.getSectorList();
    this.props.getJobFunctionList();
    this.props.getRoleFunctionList();
    this.props.getJobChartList();
  }
  render() {
    if (this.props.token === "") {
      return <Redirect to="/login" />;
    } else {
      return (
        <PermanentDrawerLeft>
          <div style={{ display: "inline-block", height: "5vh" }}>
            {/* <Home /> */}
            {/* {breadcrumb()} */}
          </div>
          <ErrorBoundary>{this.props.children}</ErrorBoundary>
          <CustomSnackBar />
          <CustomDialog />
        </PermanentDrawerLeft>
      );
    }
  }
}

function mapStateToProps(state: any) {
  return {
    token: state.authenticationReducer.token
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
