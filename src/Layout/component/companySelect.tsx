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
import { RootState } from '../../reducer';
import { mapDispatchToProps } from '../../helper/dispachProps';
import { connect } from 'react-redux';
import { Company } from '../../interface/companyInterface';
import { SharedDispatchProps } from '../../interface/propsInterface';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: theme.spacing.unit * 10,
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    listitem: {
      height: theme.spacing.unit * 10,
    }
  });

const options = [
  {
    logo: require('assets/images/companylogo1.png'),
    title: 'company1',
    location: 'abc'
  },
  {
    logo: require('assets/images/companylogo2.png'),
    title: 'company2',
    location: 'cba'
  },
];

export interface Props extends WithStyles<typeof styles>, SharedDispatchProps, InState { }

interface State { }

interface InState {
  companyList: Company[]
}
class CompanySelectMenu extends React.Component<Props, State> {
  state = {
    anchorEl: null,
    selectedIndex: 0,
  };

  componentDidMount() {
    this.props.getCompanyList()
  }

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null });
    this.props.selectCompany(this.props.companyList[index])
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <div className={classes.root}>
        {this.props.companyList.length > 0 && <ListItem
          button
          aria-haspopup="true"
          onClick={this.handleClickListItem}
          className={classes.listitem}
        >
          <img style={{ height: '50px' }} src={this.props.companyList[this.state.selectedIndex].logo_small} />
          <ListItemText
            primary={this.props.companyList[this.state.selectedIndex].company_name}
            secondary={`location: ${this.props.companyList[this.state.selectedIndex].location}`}
          />
        </ListItem>}
        {this.props.companyList.length > 0 && <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {this.props.companyList.map((company, index) => (
            <MenuItem
              key={company.company_id}
              // disabled={index === 0}
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
              <img style={{ height: '100%' }} src={company.logo_small} />
              <div style={{ marginLeft: '10px' }} >
                <Typography>{company.company_name}</Typography>
                <Typography>{`location: ${company.location}`}</Typography>
              </div>
            </MenuItem>
          ))}
        </Menu>}
      </div>
    );
  }
}

(CompanySelectMenu as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: any) {
  return {
    companyList: state.companyReducer.companyList,
    selectedCompany: state.companyReducer.selectedCompany,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CompanySelectMenu));