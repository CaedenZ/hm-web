import React, { Component } from "react";
import PermanentDrawerLeft from "./component/Drawer";
import { RootState } from "../reducer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { mapDispatchToProps } from "../helper/dispachProps";
import { SharedDispatchProps } from "../interface/propsInterface";
import CustomSnackBar from "./component/snackBar";
import CustomDialog from "./component/deleteDialog";
import ErrorBoundary from "./component/error";
import { Button } from "@material-ui/core";
import goback from "../function/goback";
import Layout from "./default"


class PrimaryLayout extends Component {

    render() {
        return <Layout>
            {this.props.children}
        </Layout>
    }
}


export default PrimaryLayout;
