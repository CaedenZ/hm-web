import React, { Component } from "react";
import PermanentDrawerLeft from "./component/Drawer";
import { RootState } from "../reducer";
import { connect } from "react-redux";
import { Redirect, Link as RouterLink } from "react-router-dom";
import { mapDispatchToProps } from "../helper/dispachProps";
import { SharedDispatchProps } from "../interface/propsInterface";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import CustomSnackBar from "./component/snackBar";
import CustomDialog from "./component/deleteDialog";
import ErrorBoundary from "./component/error";
import { Button, Link } from "@material-ui/core";
import { history } from "../store";

export interface Props extends SharedDispatchProps {
  token: string;
}

class Layout extends Component<Props> {
  componentDidMount() {
    this.props.getCountryList();
    this.props.getCurrencyList();
    this.props.getDistintCurrencyList();
    this.props.getSectorList();
    this.props.getJobFunctionList();
    this.props.getRoleFunctionList();
  }
  render() {
    const breadcrumb = () => {
      // const url = history.location.pathname.split("/");
      // const breadcrumbList: any = [];
      // let link = "/";
      // for (let index = 1; index < url.length; index++) {
      //   const element = url[index];
      //   if (element === "") {
      //     break;
      //   }
      //   link += element + "/";
      //   breadcrumbList.push(
      //     <p key={element + ">"} style={{ display: "inline-block" }}>
      //       >
      //     </p>
      //   );
      //   breadcrumbList.push(
      //     <RouterLink
      //       key={element}
      //       to={link}
      //       style={{ display: "inline-block" }}
      //     >
      //       <p>{element}</p>
      //     </RouterLink>
      //   );
      // }
      const pathnames = history.location.pathname.split("/").filter(x => x);
      const breadcrumbList: any = [];

      return (
        <Breadcrumbs separator="›" arial-label="Breadcrumb">
          <RouterLink key="/" to="/">
            <p>Home</p>
          </RouterLink>
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            const displayTo = to.substring(1);
            return last ? (
              <Typography color="textPrimary" key={to}>
                {displayTo}
              </Typography>
            ) : (
              <RouterLink key={to} to={to}>
                <p>{displayTo}</p>
              </RouterLink>
            );
          })}
        </Breadcrumbs>
      );
    };

    // const Home = props => (
    //   <RouterLink to="/" style={{ display: "inline-block" }}>
    //     <p>Home</p>
    //   </RouterLink>
    // );

    if (this.props.token === "") {
      return <Redirect to="/login" />;
    } else {
      return (
        <PermanentDrawerLeft>
          <div style={{ display: "inline-block" }}>
            {/* <Home /> */}
            {breadcrumb()}
          </div>
          <ErrorBoundary>{this.props.children}</ErrorBoundary>
          <CustomSnackBar />
          <CustomDialog />
        </PermanentDrawerLeft>
      );
    }
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
)(Layout);
