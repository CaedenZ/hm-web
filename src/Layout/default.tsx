import React, { Component } from "react";
import PermanentDrawerLeft from "./component/Drawer";

class Layout extends Component {
  render() {
    return <PermanentDrawerLeft>{this.props.children}</PermanentDrawerLeft>;
  }
}

export default Layout;
