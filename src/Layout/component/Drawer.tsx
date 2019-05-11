import React from "react";
import PropTypes from "prop-types";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import UserIcon from "@material-ui/icons/Person";
import CompanyIcon from "@material-ui/icons/Business";
import UnitIcon from "@material-ui/icons/Group";
import RoleIcon from "@material-ui/icons/Functions";
import JobGradeIcon from "@material-ui/icons/Note";
import RegionIcon from "@material-ui/icons/SwapHoriz";
import SettingIcon from "@material-ui/icons/Settings";
import JobFunctionIcon from "@material-ui/icons/AccountCircle";
import SectorIcon from "@material-ui/icons/Work";
import TargetBonusIcon from "@material-ui/icons/Star";
import AllowanceIcon from "@material-ui/icons/MonetizationOn";
import ShortIncentiveIcon from "@material-ui/icons/PlayArrow";
import LongIncentiveIcon from "@material-ui/icons/FastForward";
import SalaryRangeIcon from "@material-ui/icons/CompareArrows";
import MenuIcon from "@material-ui/icons/Menu";
import PrimarySearchAppBar from "./AppBar";
import { Link } from "react-router-dom";
import logo from "assets/images/3CGradient Full.png";
import { mapDispatchToProps } from "../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../interface/propsInterface";
import { Company } from "../../interface/companyInterface";
import { Collapse } from "@material-ui/core";
import packageJson from "../../../package.json";

const drawerWidth = "15vw";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    logo: {
      height: "100%",
      padding: "20px"
    },
    menubar: {
      background: "linear-gradient(#F0F0F0 0%, #FFFFFF 30%)"
    },
    menudivider: {},
    navlist: {},
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth,
      boxShadow: "10px 0px 50px 0px rgba(0,0,0,0.2)"
    },
    toolbar: {
      height: theme.spacing.unit * 10
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing.unit * 3
    }
  });

export interface Props
  extends InState,
    SharedDispatchProps,
    WithStyles<typeof styles> {}

interface InState {
  companyList: Company[];
}
interface State {
  expended1: boolean;
  expended2: boolean;
  expended3: boolean;
}

class PermanentDrawerLeft extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  state: State = {
    expended1: false,
    expended2: false,
    expended3: false
  };

  handleLogout = () => {
    this.props.logout();
  };

  handleExpandClick1 = () => {
    this.setState(state => ({
      ...state,
      expended1: !state.expended1
    }));
  };

  handleExpandClick2 = () => {
    this.setState(state => ({
      ...state,
      expended2: !state.expended2
    }));
    console.log(this.state);
  };

  handleExpandClick3 = () => {
    this.setState(state => ({
      ...state,
      expended3: !state.expended3
    }));
    console.log(this.state);
  };

  render() {
    const { classes } = this.props;
    const itemlist1 = [
      {
        title: "Dashboard",
        path: "/"
      }
    ];

    const companyfunction = (): any => {
      let adm = [
        {
          title: "Division",
          path: "/unit",
          icon: <UnitIcon />
        },
        // {
        //   title: "Division",
        //   path: "/division",
        //   icon: <UnitIcon />,
        // },
        {
          title: "Entity",
          path: "/entity",
          icon: <CompanyIcon />
        },
        {
          title: "Region",
          path: "/region",
          icon: <RegionIcon />
        },
        {
          title: "User",
          path: "/user",
          icon: <UserIcon />
        },
        {
          title: "Role",
          path: "/role",
          icon: <RoleIcon />
        }
      ];

      let user = [
        {
          title: "Division",
          path: "/unit",
          icon: <UnitIcon />
        },
        // {
        //   title: "Division",
        //   path: "/division",
        //   icon: <UnitIcon />,
        // },
        {
          title: "Entity",
          path: "/entity",
          icon: <CompanyIcon />
        },
        {
          title: "Region",
          path: "/region",
          icon: <RegionIcon />
        },
        {
          title: "User",
          path: "/user",
          icon: <UserIcon />
        },
        {
          title: "Role",
          path: "/role",
          icon: <RoleIcon />
        },
        {
          title: "Company",
          path: "/company/updateself",
          icon: <CompanyIcon />
        }
      ];
      if (this.props.companyList.length > 1) {
        return adm;
      } else if (this.props.companyList.length === 1) {
        if (this.props.companyList[0].company_id === "5ZwOXIkeKuPhpFriTsmD") {
          return adm;
        } else return user;
      } else return user;
    };

    const configurationfunctin = (): any => {
      let adm = (
        <ListItem
          className={classes.menubar}
          button
          onClick={this.handleExpandClick2}
        >
          <ListItemIcon>
            <MenuIcon />
          </ListItemIcon>
          <ListItemText primary="Configuration" />
        </ListItem>
      );

      if (this.props.companyList.length > 1) {
        return adm;
      } else if (this.props.companyList.length === 1) {
        if (this.props.companyList[0].company_id === "5ZwOXIkeKuPhpFriTsmD") {
          return adm;
        } else return null;
      } else return null;
    };
    const adminfunction = (): any => {
      let adm = [
        {
          title: "Setting",
          path: "/setting",
          icon: <SettingIcon />
        },
        {
          title: "Job Function",
          path: "/jobfunction",
          icon: <JobFunctionIcon />
        },
        {
          title: "Sector",
          path: "/sector",
          icon: <SectorIcon />
        },
        {
          title: "Customer",
          path: "/company",
          icon: <CompanyIcon />
        }
      ];
      return adm;
    };

    const jobgradefunction = (): any => {
      let adm = [
        {
          title: "Job Grade",
          path: "/jobgrade",
          icon: <JobGradeIcon />
        },
        {
          title: "Salary Range",
          path: "/salaryrange",
          icon: <SalaryRangeIcon />
        },
        {
          title: "Allowances",
          path: "/allowances",
          icon: <AllowanceIcon />
        },
        {
          title: "Target Bonus",
          path: "/targetbonus",
          icon: <TargetBonusIcon />
        },
        {
          title: "Signons",
          path: "/signons",
          icon: <TargetBonusIcon />
        },
        {
          title: "Short Term Incentive",
          path: "/shortincentive",
          icon: <ShortIncentiveIcon />
        },
        {
          title: "Long Term Incentive",
          path: "/longincentive",
          icon: <LongIncentiveIcon />
        },
        {
          title: "Payroll Upload",
          path: "/payrollupload",
          icon: <JobGradeIcon />
        },
        {
          title: "Market Data Upload",
          path: "/jobgrade",
          icon: <JobGradeIcon />
        }
      ];
      return adm;
    };

    return (
      <div className={classes.root}>
        <CssBaseline />
        <PrimarySearchAppBar />
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          anchor="left"
        >
          <div className={classes.toolbar}>
            <img className={classes.logo} src={logo} />
          </div>
          <Divider className={classes.menudivider} />
          <List className={classes.menubar}>
            {itemlist1.map((item, index) => (
              <Link
                key={item.title}
                to={item.path}
                style={{ textDecoration: "none" }}
              >
                <ListItem button>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <ListItem
            className={classes.menubar}
            button
            onClick={this.handleExpandClick1}
          >
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            <ListItemText primary="Company Setup" />
          </ListItem>
          <Collapse in={this.state.expended1} timeout="auto" unmountOnExit>
            <List className={classes.navlist}>
              {companyfunction().map(item => (
                <Link
                  key={item.title}
                  to={item.path}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem button>
                    <ListItemIcon style={{ marginLeft: "20px" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Collapse>
          <Divider />
          <ListItem
            className={classes.menubar}
            button
            onClick={this.handleExpandClick3}
          >
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            <ListItemText primary="Compensation Setup" />
          </ListItem>
          <Collapse in={this.state.expended3} timeout="auto" unmountOnExit>
            <List className={classes.navlist}>
              {jobgradefunction().map(item => (
                <Link
                  key={item.title}
                  to={item.path}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem button>
                    <ListItemIcon style={{ marginLeft: "20px" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Collapse>
          <Divider />
          {configurationfunctin()}
          <Collapse in={this.state.expended2} timeout="auto" unmountOnExit>
            <List className={classes.navlist}>
              {adminfunction().map(item => (
                <Link
                  key={item.title}
                  to={item.path}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem button>
                    <ListItemIcon style={{ marginLeft: "20px" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Collapse>
          <Divider />
          <List>
            <ListItem button onClick={() => this.props.showSnackBar()}>
              <ListItemText primary={packageJson.version} />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
    );
  }
}

(PermanentDrawerLeft as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: any) {
  return {
    companyList: state.companyReducer.companyList
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PermanentDrawerLeft));
