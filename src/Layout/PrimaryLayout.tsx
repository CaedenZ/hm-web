import React, { Component } from "react";
import Layout from "./default";

class PrimaryLayout extends Component {
  render() {
    return <Layout>{this.props.children}</Layout>;
  }
}

export default PrimaryLayout;
