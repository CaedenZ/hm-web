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
import MenuIcon from "@material-ui/icons/Menu";
import PrimarySearchAppBar from "./AppBar";
import { Link } from "react-router-dom";
import logo from '../../assets/images/3CGradient Full.png';

const drawerWidth = 240;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    logo:{
        width: "100%",
        padding:"20px"
    },
    menubar:{
        background: "linear-gradient(#D1D1D1 0%, #FFFFFF 30%)",
    },
    menudivider:{
        
    },
    navlist:{
        
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
      width: drawerWidth
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing.unit * 3
    }
  });

export interface Props extends WithStyles<typeof styles> {}

interface State {}

class PermanentDrawerLeft extends React.Component<Props, State> {
  render() {
    const { classes } = this.props;

    var itemlist1 = [
      {
        title: "Dashboard",
        path: "/"
      },
      {
        title: "User",
        path: "/user"
      },
      {
        title: "Company",
        path: "/company"
      }
    ];

    var itemlist2 = [
      {
        title: "Logout",
        path: "/login"
      },
      {
        title: "Setting",
        path: "/setting"
      }
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
            <img className={classes.logo} src={logo}/>
          </div>
          <Divider className={classes.menudivider} />
          <ListItem className = {classes.menubar}>
            <ListItemIcon>
                <MenuIcon />
            </ListItemIcon>
            <ListItemText primary="menu"/>
          </ListItem>
          <List className={classes.navlist}>
            {itemlist1.map((item, index) => (
              <Link to={item.path} style={{ textDecoration: "none" }}>
                <ListItem button key={item.title}>
                  <ListItemIcon style={{ marginLeft:"20px"}}>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <List>
            {itemlist2.map((item, index) => (
              <Link to={item.path} style={{ textDecoration: "none" }}>
                <ListItem button key={item.title}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
              </Link>
            ))}
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

export default withStyles(styles)(PermanentDrawerLeft);
