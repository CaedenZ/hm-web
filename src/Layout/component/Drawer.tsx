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
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
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
import RegionIcon from "@material-ui/icons/SwapHoriz";
import SettingIcon from "@material-ui/icons/Settings";
import JobFunctionIcon from "@material-ui/icons/AccountCircle";
import LogoutIcon from "@material-ui/icons/PowerSettingsNew";
import MenuIcon from "@material-ui/icons/Menu";
import PrimarySearchAppBar from "./AppBar";
import { Link } from "react-router-dom";
import logo from 'assets/images/3CGradient Full.png';
import { mapDispatchToProps } from "../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../interface/propsInterface";
import { Company } from "../../interface/companyInterface";

const drawerWidth = 240;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    logo: {
      height: "100%",
      padding: "20px"
    },
    menubar: {
      background: "linear-gradient(#F0F0F0 0%, #FFFFFF 30%)",
    },
    menudivider: {

    },
    navlist: {

    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
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

export interface Props extends InState, SharedDispatchProps, WithStyles<typeof styles> { }

interface InState {
  selectedCompany: Company
}
interface State { }

class PermanentDrawerLeft extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = () => {
    this.props.logout()
  }
  render() {
    const { classes } = this.props;

    const itemlist1 = [
      {
        title: "Dashboard",
        path: "/"
      },
    ];

    const itemlist2 = [
      {
        title: "User",
        path: "/user",
        icon: <UserIcon />,
      },
      {
        title: "Sub Company",
        path: "/subcompany",
        icon: <CompanyIcon />,
      },
      {
        title: "Unit",
        path: "/unit",
        icon: <UnitIcon />,
      },
      {
        title: "Role",
        path: "/role",
        icon: <RoleIcon />,
      },
      {
        title: "Region",
        path: "/region",
        icon: <RegionIcon />,
      }
    ];

    const adminfunction = (): any => {

      let adm = [
        {
          title: "Setting",
          path: "/setting",
          icon: <SettingIcon />,
        },
        {
          title: "Job Function",
          path: "/jobfunction",
          icon: <JobFunctionIcon />,
        },
        {
          title: "Company",
          path: "/company",
          icon: <CompanyIcon />,
        },
      ]

      let user = [
        {
          title: "Company",
          path: "/company/update",
          icon: <CompanyIcon />,
        },
      ]

      if (this.props.selectedCompany.company_id === '5ZwOXIkeKuPhpFriTsmD') {
        return adm
      }
      else return user
    }

    const itemlist3 = [
      {
        title: "Logout",
        path: "/login",
        icon: <LogoutIcon />,
      },
    ];

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
              <Link key={item.title} to={item.path} style={{ textDecoration: "none" }}>
                <ListItem button >
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <ListItem className={classes.menubar}>
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            <ListItemText primary="Company" />
          </ListItem>
          <List className={classes.navlist}>
            {itemlist2.map((item, index) => (
              <Link key={item.title} to={item.path} style={{ textDecoration: "none" }}>
                <ListItem button >
                  <ListItemIcon style={{ marginLeft: "20px" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <ListItem className={classes.menubar}>
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            <ListItemText primary="Configuration" />
          </ListItem>
          <List className={classes.navlist}>
            {adminfunction().map((item, index) => (
              <Link key={item.title} to={item.path} style={{ textDecoration: "none" }}>
                <ListItem button >
                  <ListItemIcon style={{ marginLeft: "20px" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <List>
            {itemlist3.map((item, index) => (
              <Link key={item.title} to={item.path} style={{ textDecoration: "none" }}>
                <ListItem button onClick={() => this.handleLogout()}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
              </Link>
            ))}
          </List>
          <List>
            <ListItem button onClick={() => this.props.showSnackBar()}>
              <ListItemText primary={'V1.2'} />
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
    selectedCompany: state.companyReducer.selectedCompany,
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PermanentDrawerLeft));
