import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Typography } from '@material-ui/core';
import Avatar from 'react-avatar-edit';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  });

const options = [
  {
    logo:require('assets/images/companylogo1.png'),
    title:'company1',
    location:'abc'
  },
  {
    logo:require('assets/images/companylogo2.png'),
    title:'company2',
    location:'cba'
  },
];

export interface Props extends WithStyles<typeof styles> {}

interface State {}

class CompanySelectMenu extends React.Component<Props, State> {
  state = {
    anchorEl: null,
    selectedIndex: 1,
  };

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <div className={classes.root}>
          <ListItem
            button
            aria-haspopup="true"
            onClick={this.handleClickListItem}
          >
            <img style={{height:'50px'}}  src={options[this.state.selectedIndex].logo} />
            <ListItemText
              primary={options[this.state.selectedIndex].title}
              secondary={`location: ${options[this.state.selectedIndex].location}`}
            />
          </ListItem>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option.title}
              disabled={index === 0}
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
              <img style={{height:'100%'}} src = {option.logo}/>
              <div style={{marginLeft:'10px'}} >
              <Typography>{option.title}</Typography>
              <Typography>{`location: ${option.location}`}</Typography>
              </div>
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

(CompanySelectMenu as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(CompanySelectMenu);