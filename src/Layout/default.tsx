import React, { Component } from "react";
import PermanentDrawerLeft from "./component/Drawer";
import { RootState } from "../reducer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { mapDispatchToProps } from "../helper/dispachProps";
import { SharedDispatchProps } from "../interface/propsInterface";

export interface Props extends SharedDispatchProps {
  token: string
}


class Layout extends Component<Props> {

  componentDidMount() {
    this.props.getCountryList()
  }
  render() {
    if (this.props.token === null || '') {
      return (<Redirect to='/login' />)
    }
    else {
      return <PermanentDrawerLeft>{this.props.children}</PermanentDrawerLeft>;
    }
  }
}

function mapStateToProps(state: any) {
  return {
    token: state.authenticationReducer.token
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
