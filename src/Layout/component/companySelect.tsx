import React from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  createStyles,
  Theme,
  WithStyles
} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// import MenuItem from "@material-ui/core/MenuItem";
// import Menu from "@material-ui/core/Menu";
import { Grid } from "@material-ui/core";
import { mapDispatchToProps } from "../../helper/dispachProps";
import { connect } from "react-redux";
import { Company } from "../../interface/companyInterface";
import { SharedDispatchProps } from "../../interface/propsInterface";
import logo from "../../assets/images/companylogo1.png";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      // height: theme.spacing.unit * 16,
      // maxWidth: "30vw",
      // backgroundColor: theme.palette.background.paper,
      // "@media (min-width: 1920px)": {
      //   maxWidth: "20vw"
      // }
    },
    listitem: {
      // height: theme.spacing.unit * 10
      width: "auto"
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
}
class CompanySelectMenu extends React.Component<Props, State> {
  state = {
    anchorEl: null,
    selectedIndex: 0
  };

  componentDidMount() {
    this.props.getCompanyList();
  }

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

  render() {
    const { classes } = this.props;
    // const { anchorEl } = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid
            container
            item
            xs={12}
            justify="flex-start"
            alignContent="center"
            alignItems="center"
            wrap="wrap"
          >
            {this.props.companyList.length > 0 && (
              <ListItem
                // button
                aria-haspopup="true"
                // onClick={this.handleClickListItem}
                className={classes.listitem}
              >
                {this.props.companyList[this.state.selectedIndex].logo_small ===
                  "" && (
                  <img
                    alt="company small logo"
                    style={{ height: "50px" }}
                    src={
                      logo
                      // this.props.companyList[this.state.selectedIndex]
                      //   .logo_small
                    }
                  />
                )}
                {this.props.selectedCompany.company_id !== "" ? (
                  <ListItemText
                    primary={this.props.selectedCompany.company_name}
                  />
                ) : (
                  <ListItemText primary="select a company" />
                )}
              </ListItem>
            )}
          </Grid>
          {/* {this.props.companyList.length > 0 && (
            <Menu
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
                  <div style={{ marginLeft: "10px" }}>
                    <Typography>{company.company_name}</Typography>
                  </div>
                </MenuItem>
              ))}
            </Menu>
          )} */}
        </Grid>
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
    selectedCompany: state.companyReducer.selectedCompany
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CompanySelectMenu));
