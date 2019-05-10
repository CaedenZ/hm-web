import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Grid,
  Paper,
  TextField,
  Divider,
  FormControl,
  Checkbox,
  FormControlLabel,
  Button,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import CustomButton from "../component/CustomButton";
import Avatar from 'react-avatar-edit'
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { Company, UPDATECOMPANYCRED } from "../../../interface/companyInterface";
import { Country, CountryState } from "../../../interface/countryInterface";
import { history } from "../../../store";
import FormPage from "../component/form"

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    grid: {
      margin: 20
    },
    textField: {
      width: 200,
      margin: 20,
    },
    // formControl: {
    //   margin: theme.spacing.unit * 3,
    // },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: "center",
      color: theme.palette.text.secondary,
      flexDirection: "column"
    },
    preview: {
    },
    divAvatar: {
      margin: theme.spacing.unit * 3,
      alignSelf: "baseline",
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
    bigAvatar: {
      width: "auto",
      height: "auto"
    },
    profilebutton: {
      alignContent: "center",
      alignSelf: "center",
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
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
export interface Props extends InState, WithStyles<typeof styles>, SharedDispatchProps { }

interface InState {
  updatingCompany: Company;
  paremeterList: CountryState;
}
class UpdateCompanyPage extends Component<Props, UpdateCompanyState> {


  constructor(props) {
    super(props)
    this.onCrop = this.onCrop.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onMainCrop = this.onMainCrop.bind(this)
    this.onMainClose = this.onMainClose.bind(this)
    this.handleUpdateCompany = this.handleUpdateCompany.bind(this)
  }


  state: UpdateCompanyState = {
    company_id: '',
    sector: [],
    location: '',
    company_name: '',
    industry: [],
    country: [],
    address: '',
    postal_code: '',
    logo_small: '',
    contact_person: '',
    contact_number: '',
    contact_email: '',
    hq_name: '',
    financialyr_dt: '',
    base_currency_id: '',
    logo_main: '',
    parentcompany_id: '',
    webpage_url: '',
  }

  // componentDidMount() {
  //   const s: UpdateCompanyState = {
  //     ...this.props.updatingCompany,
  //     industry: [],
  //     country: [],
  //     sector: [],
  //   }

  //   this.props.updatingCompany.industry.forEach(element => {
  //     s.industry.push(element.name)
  //   });
  //   this.props.updatingCompany.sector.forEach(element => {
  //     s.sector.push(element.name)
  //   });
  //   this.props.updatingCompany.country.forEach(element => {
  //     s.country.push(element.country_name)
  //   });

  //   this.setState(s)
  // }
  onClose() {
    this.setState({ logo_small: '' })
  }

  onCrop(image) {
    this.setState({ logo_small: image })
    console.log(this.state)
  }

  onMainClose() {
    this.setState({ logo_main: '' })
  }

  onMainCrop(logoMain) {
    this.setState({ logo_main: logoMain })
    console.log(this.state)
  }

  handleChange = (statekay: keyof UpdateCompanyState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [statekay]: event.target.value } as unknown as Pick<UpdateCompanyState, keyof UpdateCompanyState>);
  };

  handleChangeSelect = (statekay: keyof UpdateCompanyState) => (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ [statekay]: event.target.value } as unknown as Pick<UpdateCompanyState, keyof UpdateCompanyState>);
  };

  handleUpdateCompany = (e, data) => {
    e.preventDefault()
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

    this.props.updateCompany(data)
    history.goBack()
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          New Company
      </Typography>
        <FormPage create={false} updateData={this.props.updatingCompany} onSubmit={(e, data) => this.handleUpdateCompany(e, data)} />
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
    paremeterList: state.countryReducer
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UpdateCompanyPage));