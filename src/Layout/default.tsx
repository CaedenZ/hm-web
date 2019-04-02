import React, { Component } from "react";
import PermanentDrawerLeft from "./component/Drawer";
import { RootState } from "../reducer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { mapDispatchToProps } from "../helper/dispachProps";
import { SharedDispatchProps } from "../interface/propsInterface";
import CustomSnackBar from "./component/snackBar";

export interface Props extends SharedDispatchProps {
  token: string
}


class Layout extends Component<Props> {

  componentDidMount() {
    console.log(this.props.token)
    this.props.getCountryList()
    this.props.getJobFunctionList()
    this.props.getRoleFunctionList()
  }
  render() {
    if (this.props.token === '') {
      return (<Redirect to='/login' />)
    }
    else {
      return <PermanentDrawerLeft>{this.props.children}
        <CustomSnackBar />
      </PermanentDrawerLeft>;
    }
  }
}

function mapStateToProps(state: any) {
  return {
    token: state.authenticationReducer.token
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
