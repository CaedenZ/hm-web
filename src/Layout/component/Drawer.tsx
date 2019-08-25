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
import InboxIcon from "@material-ui/icons/Web";
import MailIcon from "@material-ui/icons/Work";
import UserIcon from "@material-ui/icons/Person";
import CompanyIcon from "@material-ui/icons/Business";
import UnitIcon from "@material-ui/icons/Group";
// import RoleIcon from "@material-ui/icons/Functions";
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
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PrimarySearchAppBar from "./AppBar";
import { Link } from "react-router-dom";
import logo from "../../assets/images/3CGradient Full.png";
import { mapDispatchToProps } from "../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../interface/propsInterface";
import { Company } from "../../interface/companyInterface";
import { Collapse } from "@material-ui/core";
import packageJson from "../../../package.json";
import { isMaster } from "../../function/checkRole";
import { history } from "../../store";

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
    navlist: {
      paddingLeft: "3.5rem"
    },
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
  WithStyles<typeof styles> { }

interface InState {
  companyList: Company[];
  role: string;
}
interface State {
  expended1: boolean;
  expended2: boolean;
  expended3: boolean;
  expended4: boolean;
  selectedIndex: number | null;
}

class PermanentDrawerLeft extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.handleExpand = this.handleExpand.bind(this);
  }

  state: State = {
    expended1: false,
    expended2: false,
    expended3: false,
    expended4: false,
    selectedIndex: null
  };

  handleExpand = (expansion: number) => {
    switch (expansion) {
      case 1:
        this.setState(state => ({
          expended1: !state.expended1,
          expended2: false,
          expended3: false,
          expended4: false
        }));
        break;
      case 2:
        this.setState(state => ({
          expended1: false,
          expended2: !state.expended2,
          expended3: false,
          expended4: false
        }));
        break;
        case 3:
          this.setState(state => ({
            expended1: false,
            expended2: false,
            expended3: !state.expended3,
            expended4: false
          }));
          break;
        case 4:
          this.setState(state => ({
            expended1: false,
            expended2: false,
            expended3: false,
            expended4: !state.expended4
          }));
          break;
      default:
        break;
    }
  };

  handleListItemClick = (index: number) => {
    this.setState(state => ({
      selectedIndex: index
    }));
  };

  handleOfferModel = () => {
    history.push('/offermodel')
  }

  render() {
    const { classes } = this.props;

    const mainmenufunctin = (): any => {
      let adm = [
        {
          title: "Customer",
          path: "/company"
        }
      ]

      let usr = [
        {
          title: "Company",
          path: "/company/info"
        }
      ]     

      if (this.props.companyList.length > 1) {
        return adm;
      } else if (this.props.companyList.length === 1) {
        if (this.props.companyList[0].company_id === "5ZwOXIkeKuPhpFriTsmD") {
          return adm;
        } else return usr;
      } else return usr;
    };

    const mainmenu2functin = (): any => {
      let adm = [
        {
          title: "Offer Modeller",
          path: "/jobposition"
        }
      ]
       return adm;
    };



    const companyfunction = (): any => {
      let adm = [
        {
          title: "User",
          path: "/user",
          icon: <UserIcon />,
          index: 4
        },
        {
          title: "Division",
          path: "/unit",
          icon: <UnitIcon />,
          index: 1
        },
        // {
        //   title: "Division",
        //   path: "/division",
        //   icon: <UnitIcon />,
        // },
        {
          title: "Legal Entity",
          path: "/entity",
          icon: <CompanyIcon />,
          index: 2
        },
        {
          title: "Region",
          path: "/region",
          icon: <RegionIcon />,
          index: 3
        },
        {
          title: "Location",
          path: "/location",
          icon: <LocationOnIcon />,
          index: 5
        }
        // {
        //   title: "Role",
        //   path: "/role",
        //   icon: <RoleIcon />,
        //   index: 6
        // }
      ];

      let user = [
        {
          title: "User",
          path: "/user",
          icon: <UserIcon />,
          index: 4
        },
        {
          title: "Division",
          path: "/unit",
          icon: <UnitIcon />,
          index: 1
        },
        // {
        //   title: "Division",
        //   path: "/division",
        //   icon: <UnitIcon />,
        // },
        {
          title: "Entity",
          path: "/entity",
          icon: <CompanyIcon />,
          index: 2
        },
        {
          title: "Region",
          path: "/region",
          icon: <RegionIcon />,
          index: 3
        },
        {
          title: "Location",
          path: "/location",
          icon: <LocationOnIcon />,
          index: 5
        },
        // {
        //   title: "Role",
        //   path: "/role",
        //   icon: <RoleIcon />,
        //   index: 6
        // },
        //{
        //  title: "Company",
        //  path: "/company/updateself",
        //  icon: <CompanyIcon />,
        //  index: 7
        //}
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
          onClick={() => this.handleExpand(2)}
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
      // Init the admin list
      let adm: object[] = [];
      if (isMaster(this.props.role)) {
        // Only SuperAdmin is allowed to use the Setting
        /*adm.push({
          title: "Setting",
          path: "/setting",
          icon: <SettingIcon />,
          index: 7
        });*/
      }
      const remainingList = [
        {
          title: "Job Name",
          path: "/jobfunction",
          icon: <JobFunctionIcon />,
          index: 8
        },
        {
          title: "Industry/Sector",
          path: "/sector",
          icon: <SectorIcon />,
          index: 9
        },
        /*{
          title: "Customer",
          path: "/company",
          icon: <CompanyIcon />,
          index: 10
        },*/
        {
          title: "Rosetta Stone",
          path: "/jobchart",
          icon: <CompanyIcon />,
          index: 11
        }
      ];
      for (const menuItem of remainingList) {
        adm.push(menuItem);
      }
      return adm;
    };

    const jobgradefunction = (): any => {
      let adm = [
        {
          title: "Job Grade",
          path: "/jobgrade",
          icon: <JobGradeIcon />,
          index: 12
        },
        {
          title: "Salary Range",
          path: "/salaryrange",
          icon: <SalaryRangeIcon />,
          index: 13
        },
        {
          title: "Allowances",
          path: "/allowances",
          icon: <AllowanceIcon />,
          index: 14
        },
        {
          title: "Signons",
          path: "/signons",
          icon: <TargetBonusIcon />,
          index: 16
        },
        {
          title: "Short Term Incentive",
          path: "/shortincentive",
          icon: <ShortIncentiveIcon />,
          index: 17
        },
        {
          title: "Long Term Incentive",
          path: "/longincentive",
          icon: <LongIncentiveIcon />,
          index: 18
        },
        {
          title: "Payroll Upload",
          path: "/payrollupload",
          icon: <JobGradeIcon />,
          index: 19
        },
        {
          title: "Market Data Upload",
          path: "/marketdataupload",
          icon: <JobGradeIcon />,
          index: 20
        }
      ];
      return adm;
    };

    const offermodelfunction = (): any => {
      let adm = [
        {
          title: "Job Position",
          path: "/jobposition",
          icon: <JobGradeIcon />,
          index: 21
        },
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
            <img className={classes.logo} src={logo} alt="logo" />
          </div>
          <Divider className={classes.menudivider} />
          <List className={classes.menubar}>
            {mainmenufunctin().map((item, index) => (
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
            onClick={() => this.handleExpand(1)}
          >
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            <ListItemText primary="Company Setup" />
          </ListItem>
          <Collapse in={this.state.expended1} timeout="auto" unmountOnExit collapsedHeight="auto">
            <List disablePadding className={classes.navlist}>
              {companyfunction().map(item => (
                <Link
                  key={item.title}
                  to={item.path}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem
                    button
                    selected={this.state.selectedIndex === item.index}
                    onClick={() => this.handleListItemClick(item.index)}
                  >
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
            onClick={() => this.handleExpand(3)}
          >
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            <ListItemText primary="Compensation Setup" />
          </ListItem>
          <Collapse in={this.state.expended3} timeout="auto" unmountOnExit collapsedHeight="auto">
            <List className={classes.navlist}>
              {jobgradefunction().map(item => (
                <Link
                  key={item.title}
                  to={item.path}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem
                    button
                    selected={this.state.selectedIndex === item.index}
                    onClick={() => this.handleListItemClick(item.index)}
                  >
                    <ListItemText primary={item.title} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Collapse>
          <Divider />
          {configurationfunctin()}
          <Collapse in={this.state.expended2} timeout="auto" unmountOnExit collapsedHeight="auto">
            <List className={classes.navlist}>
              {adminfunction().map(item => (
                <Link
                  key={item.title}
                  to={item.path}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem
                    button
                    selected={this.state.selectedIndex === item.index}
                    onClick={() => this.handleListItemClick(item.index)}
                  >
                    <ListItemText primary={item.title} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Collapse>
          <Divider />
          <List className={classes.menubar}>
            {mainmenu2functin().map((item, index) => (
              <Link
                key={item.title}
                to={item.path}
                style={{ textDecoration: "none" }}
              >
                <ListItem button>
                  <ListItemIcon>
                    {index % 2 === 0 ? <MailIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
              </Link>
            ))}
          </List>
          {/* <Divider />
          <ListItem
            className={classes.menubar}
            button
            onClick={() => this.handleExpand(4)}
          >
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            <ListItemText primary="Offer Modeler" />
          </ListItem>
          <Collapse in={this.state.expended4} timeout="auto" unmountOnExit collapsedHeight="auto">
            <List className={classes.navlist}>
              {offermodelfunction().map(item => (
                <Link
                  key={item.title}
                  to={item.path}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem
                    button
                    selected={this.state.selectedIndex === item.index}
                    onClick={() => this.handleListItemClick(item.index)}
                  >
                    <ListItemText primary={item.title} />
                  </ListItem>
                </Link>
              ))}
            </List>
              </Collapse> */}
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
    companyList: state.companyReducer.companyList,
    role: state.authenticationReducer.profile.info.role_name
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PermanentDrawerLeft));
