import React, { Component } from "react";
import PermanentDrawerLeft from "./component/Drawer";
import { RootState } from "../reducer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

export interface Props {
  token: string
}

class Layout extends Component<Props> {
  render() {
    if (this.props.token === null || '') {
      return (<Redirect to='/login' />)
    }
    else {
      return <PermanentDrawerLeft>{this.props.children}</PermanentDrawerLeft>;
    }
  }
}

function mapStateToProps(state: RootState) {
  return {
    token: state.authenticationReducer.token
  }
}

export default connect(mapStateToProps, null)(Layout);
