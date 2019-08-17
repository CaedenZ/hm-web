import React from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  createStyles,
  Theme,
  WithStyles
} from "@material-ui/core/styles";
import { Typography, Grid, InputBase } from "@material-ui/core";
import { mapDispatchToProps } from "../../helper/dispachProps";
import { connect } from "react-redux";
import { Company } from "../../interface/companyInterface";
import { SharedDispatchProps } from "../../interface/propsInterface";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import { Link as RouterLink } from "react-router-dom";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { fade } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from "@material-ui/icons/Search";
import { isUserHR } from "../../function/checkRole";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#edeae8",
      width: "100%"
    },
    link: {
      color: "#000",
      textDecoration: "none",
      "&:visited": { color: "#000", textDecoration: "none" }
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginRight: 12,
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "auto"
      }
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit",
      width: "100%"
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: 200
      }
    }
  });

export interface Props
  extends WithStyles<typeof styles>,
    SharedDispatchProps,
    InState {}

interface State {}

interface InState {
  companyList: Company[];
  selectedCompany: Company;
  role: string;
  history: any;
}
class BottomAppBar extends React.Component<Props, State> {
  state = {
    anchorEl: null,
    selectedIndex: 0
  };

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null });
    this.props.selectIndex(index);
    this.props.selectCompany(this.props.companyList[index]);
    this.props.selectUpdateCompany(this.props.companyList[index]);
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  breadcrumb = classes => {
    const pathnames = this.props.history.location.pathname
      .split("/")
      .filter(x => x);
    return (
      <Breadcrumbs
        separator={
          <NavigateNextIcon fontSize="small" style={{ color: "#000" }} />
        }
        arial-label="Breadcrumb"
        style={{ marginLeft: "1rem" }}
      >
        <RouterLink key="/" to="/" className={classes.link}>
          <p>Dashboard</p>
        </RouterLink>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          var displayTo = to.split("/")[to.split("/").length - 1];
          if(displayTo === "unit")
            displayTo = "Division";
          if(displayTo === "sector")
            displayTo = "Industry/Sector";
          displayTo = Capitalize(displayTo);
          const isUserHRAndPageIsCompany =
            isUserHR(this.props.role) && displayTo === "company";
          return last ? (
            <Typography key={to} style={{ color: "#000" }}>
              {displayTo}
            </Typography>
          ) : (
            !isUserHRAndPageIsCompany && (
              <RouterLink key={to} to={to} className={classes.link}>
                <p>{displayTo}</p>
              </RouterLink>
            )
          );
        })}
      </Breadcrumbs>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid
            container
            item
            xs={6}
            justify="flex-start"
            alignContent="center"
            alignItems="center"
          >
            {this.breadcrumb(classes)}
          </Grid>
          <Grid
            container
            item
            xs={6}
            justify="flex-end"
            alignContent="center"
            alignItems="center"
          >
            {/*<div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
              </div>*/}
          </Grid>
        </Grid>
      </div>
    );
  }
}

(BottomAppBar as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: any) {
  return {
    companyList: state.companyReducer.companyList,
    selectedCompany: state.companyReducer.selectedCompany,
    role: state.authenticationReducer.profile.info.role_name,
    history: state.router
  };
}

function Capitalize(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(BottomAppBar));
