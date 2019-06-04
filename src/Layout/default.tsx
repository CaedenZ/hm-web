import React, { Component } from "react";
import PermanentDrawerLeft from "./component/Drawer";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../helper/dispachProps";
import { SharedDispatchProps } from "../interface/propsInterface";
import CustomSnackBar from "./component/snackBar";
import CustomDialog from "./component/deleteDialog";
import ErrorBoundary from "./component/error";
import { history } from "../store";

export interface Props extends SharedDispatchProps {
  token: string;
  pathname: string;
}

class Layout extends Component<Props> {
  componentDidMount() {
    if (this.props.token !== "") {
      this.props.getCompanyList();
      this.props.getCountryList();
      this.props.getCurrencyList();
      this.props.getDistintCurrencyList();
      this.props.getSectorList();
      this.props.getJobFunctionList();
      this.props.getRoleFunctionList();
      this.props.getJobChartList();
    } else if (this.props.pathname !== "/resetpassword") {
      history.replace("/login");
    }
  }
  componentWillReceiveProps(newProps) {
    if (newProps.token === "") {
      history.replace("/login");
    }
  }
  render() {
    return (
      <PermanentDrawerLeft>
        <div style={{ display: "inline-block", height: "5vh" }} />
        <ErrorBoundary>{this.props.children}</ErrorBoundary>
        <CustomSnackBar />
        <CustomDialog />
      </PermanentDrawerLeft>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    token: state.authenticationReducer.token,
    pathname: state.router.location.pathname
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
