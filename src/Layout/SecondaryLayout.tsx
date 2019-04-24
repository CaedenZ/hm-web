import React, { Component } from "react";
import CustomDialog from "./component/deleteDialog";
import ErrorBoundary from "./component/error";



class SecondaryLayout extends Component {

  render() {
    return <main>
      <ErrorBoundary>{this.props.children}</ErrorBoundary>
      <CustomDialog />
    </main>
  }
}


export default SecondaryLayout;
