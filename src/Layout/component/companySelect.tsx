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
import { Grid } from "@material-ui/core";
import { mapDispatchToProps } from "../../helper/dispachProps";
import { connect } from "react-redux";
import { Company } from "../../interface/companyInterface";
import { SharedDispatchProps } from "../../interface/propsInterface";
// import logo from "../../assets/images/companylogo1.png";

const styles = (theme: Theme) =>
  createStyles({
    listitem: {
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

  render() {
    const { classes } = this.props;

    return (
      <div>
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
              <ListItem className={classes.listitem}>
                {this.props.companyList[this.state.selectedIndex].logo_small !==
                  "" && (
                  <img
                    alt="company small logo"
                    style={{ height: "50px" }}
                    src={
                      this.props.companyList[this.state.selectedIndex]
                        .logo_small
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
