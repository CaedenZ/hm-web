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
import { Company } from "../../../interface/companyInterface";
import { CountryState } from "../../../interface/countryInterface";
import { history } from "../../../store";
import FormPage from "../component/form";
import { isUserHR } from "../../../function/checkRole";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  });

export interface UpdateCompanyState {
  company_id: string;
  sector: string[];
  location: string;
  company_name: string;
  industry: string[];
  country: string[];
  address: string;
  postal_code: string;
  logo_small: string;
  contact_person: string;
  contact_number: string;
  contact_email: string;
  hq_name: string;
  financialyr_dt: string;
  base_currency_id: string;
  logo_main: string;
  parentcompany_id: string;
  webpage_url: string;
}
export interface Props
  extends InState,
    WithStyles<typeof styles>,
    SharedDispatchProps {}

interface InState {
  updatingCompany: Company;
  paremeterList: CountryState;
  role: string;
}
class UpdateCompanyPage extends Component<Props, UpdateCompanyState> {
  constructor(props) {
    super(props);
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onMainCrop = this.onMainCrop.bind(this);
    this.onMainClose = this.onMainClose.bind(this);
    this.handleUpdateCompany = this.handleUpdateCompany.bind(this);
  }

  state: UpdateCompanyState = {
    company_id: "",
    sector: [],
    location: "",
    company_name: "",
    industry: [],
    country: [],
    address: "",
    postal_code: "",
    logo_small: "",
    contact_person: "",
    contact_number: "",
    contact_email: "",
    hq_name: "",
    financialyr_dt: "",
    base_currency_id: "",
    logo_main: "",
    parentcompany_id: "",
    webpage_url: ""
  };

  onClose() {
    this.setState({ logo_small: "" });
  }

  onCrop(image) {
    this.setState({ logo_small: image });
    console.log(this.state);
  }

  onMainClose() {
    this.setState({ logo_main: "" });
  }

  onMainCrop(logoMain) {
    this.setState({ logo_main: logoMain });
    console.log(this.state);
  }

  handleChange = (statekay: keyof UpdateCompanyState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState(({ [statekay]: event.target.value } as unknown) as Pick<
      UpdateCompanyState,
      keyof UpdateCompanyState
    >);
  };

  handleChangeSelect = (statekay: keyof UpdateCompanyState) => (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    this.setState(({ [statekay]: event.target.value } as unknown) as Pick<
      UpdateCompanyState,
      keyof UpdateCompanyState
    >);
  };

  handleUpdateCompany = (e, data) => {
    e.preventDefault();
    // const a: UPDATECOMPANYCRED = {
    //   ...this.state,
    //   country: [],
    //   sector: [],
    //   industry: [],
    // }

    // this.state.country.forEach(element => {
    //   a.country.push({ country_name: element })
    // });

    // this.state.sector.forEach(element => {
    //   a.sector.push({ name: element })
    // });

    // this.state.industry.forEach(element => {
    //   a.industry.push({ name: element })
    // });

    this.props.updateCompany(data);
    history.goBack();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          My Company
        </Typography>
        <FormPage
          view={isUserHR(this.props.role)}
          create={!isUserHR(this.props.role)}
          updateData={this.props.updatingCompany}
          onSubmit={(e, data) => this.handleUpdateCompany(e, data)}
        />
      </div>
    );
  }
}

(UpdateCompanyPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: any) {
  return {
    updatingCompany: state.companyReducer.companyList[0],
    paremeterList: state.countryReducer,
    role: state.authenticationReducer.profile.info.role_name
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UpdateCompanyPage));
