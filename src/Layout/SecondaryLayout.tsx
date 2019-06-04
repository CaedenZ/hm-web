import React, { Component } from "react";
import CustomDialog from "./component/deleteDialog";
import ErrorBoundary from "./component/error";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../helper/dispachProps";
import { SharedDispatchProps } from "../interface/propsInterface";
import { history } from "../store";

export interface Props extends SharedDispatchProps {
  token: string;
}
class SecondaryLayout extends Component<Props> {
  componentDidMount() {
    if (this.props.token !== "") {
      history.replace("/");
    }
  }
  componentWillReceiveProps(newProps) {
    if (newProps.token !== "") {
      history.replace("/");
    }
  }
  render() {
    return (
      <main>
        <ErrorBoundary>{this.props.children}</ErrorBoundary>
        <CustomDialog />
      </main>
    );
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
)(SecondaryLayout);
