import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Theme,
  createStyles,
  WithStyles,
  withStyles
} from "@material-ui/core";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { CountryState } from "../../../interface/countryInterface";
import { history } from "../../../store";
import FormPage from "../component/form";
import { CREATECOMPANYCRED } from "../../../interface/companyInterface";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  });

export interface Props
  extends WithStyles<typeof styles>,
    SharedDispatchProps,
    InState {}

interface InState {
  paremeterList: CountryState;
}

class CreateCompanyPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.handleCreateCompany = this.handleCreateCompany.bind(this);
  }

  handleCreateCompany = (e, data) => {
    e.preventDefault();
    const companyData: CREATECOMPANYCRED = {
      logo_main: data.logo_main,
      logo_small: data.logo_small,
      company_name: data.company_name,
      webpage_url: data.webpage_url,
      industry: data.industry,
      sector: data.sector,
      country: data.country,
      base_currency_id: data.base_currency_id,
      financialyr_dt: data.financialyr_dt,
      parentcompany_id: data.parentcompany_id
    };
    this.props.createCompany(companyData);
    history.goBack();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          New Company
        </Typography>
        <FormPage
          create={true}
          updataData=""
          onSubmit={this.handleCreateCompany}
        />
      </div>
    );
  }
}

(CreateCompanyPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(CreateCompanyPage));
