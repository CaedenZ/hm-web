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
    this.props.getCountryList()
    this.props.login({
      email: 'pseudoscops.tc.test@gmail.com',
      password: '123456',
      app_key: 'p9Eg6HN7FFXjA9WTNZ5n'
    })
  }
  render() {
    if (this.props.token === null || '') {
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
