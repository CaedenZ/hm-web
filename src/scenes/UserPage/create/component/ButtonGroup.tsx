import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Button } from '@material-ui/core';
import classNames from 'classnames';


const drawerWidth = 240;

const styles = (theme: Theme) =>
  createStyles({
    root:{

    },
    button: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
  });

export interface Props extends WithStyles<typeof styles> {}

interface State {
}

class ButtonGroup extends React.Component<Props, State> {
  state: State = {
  };

  render() {
    const { classes,children } = this.props;

    return (
      <div className={classes.root}>
        <Button className={classes.button}>
        {children || 'N'}
        </Button>
        <Button className={classes.button}>
        {children || 'class names'}
        </Button>
        <Button className={classes.button}>
        {children || 'class names'}
        </Button>
        <Button className={classes.button}>
        {children || 'class names'}
        </Button>
      </div>
    );
  }
}

(ButtonGroup as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(ButtonGroup);