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
  Select,
  MenuItem,
  InputLabel
} from "@material-ui/core";
import CustomButton from "../component/CustomButton";
import Avatar from 'react-avatar-edit'
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { RootState } from "../../../reducer";
import { Country } from "../../../interface/countryInterface";
import { history } from "../../../store";
import { Company } from "../../../interface/companyInterface";

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

export interface CreateCompanyState {
  sector: string;
  location: string;
  company_name: string;
  industry: string;
  country: string;
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
export interface Props extends WithStyles<typeof styles>, SharedDispatchProps, InState { }

interface InState {
  countryList: Country[],
  selectedCompany: Company,
}

class CreateSubCompanyPage extends Component<Props, CreateCompanyState> {


  constructor(props) {
    super(props)
    this.onCrop = this.onCrop.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onMainCrop = this.onMainCrop.bind(this)
    this.onMainClose = this.onMainClose.bind(this)
    this.handleCreateCompany = this.handleCreateCompany.bind(this)
  }


  state: CreateCompanyState = {
    sector: '',
    location: '',
    company_name: '',
    industry: '',
    country: '',
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

  componentDidMount() {
    this.setState({ parentcompany_id: this.props.selectedCompany.company_id })
  }

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

  handleChange = (statekay: keyof CreateCompanyState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [statekay]: event.target.value } as Pick<CreateCompanyState, keyof CreateCompanyState>);
  };

  handleChangeSelect = (statekay: keyof CreateCompanyState) => (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ [statekay]: event.target.value } as Pick<CreateCompanyState, keyof CreateCompanyState>);
  };

  handleCreateCompany = (e) => {
    e.preventDefault()
    this.props.createSubCompany(this.state)
    history.goBack()
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          New Company
      </Typography>
        <Paper>
          <form onSubmit={this.handleCreateCompany}>
            <Grid container className={classes.grid} spacing={16}>
              <Grid item justify="center" xs container>
                <Grid container direction="column" spacing={16}>
                  <div style={{ margin: 20, justifyContent: 'center' }}>
                    <Avatar
                      width={200}
                      height={150}
                      onCrop={this.onMainCrop}
                      onClose={this.onMainClose}
                    />
                    <Typography variant="h6">Main Logo</Typography>
                  </div>
                </Grid>
                <Grid container direction="column" spacing={16}>
                  <div style={{ margin: 20, justifyContent: 'center' }}>
                    <Avatar
                      width={200}
                      height={150}
                      onCrop={this.onCrop}
                      onClose={this.onClose}
                    />
                    <Typography variant="h6">Small Logo</Typography>
                  </div>
                </Grid>
              </Grid>
              <Grid item justify="center" xs container>
                <div style={{ margin: 20 }}>
                  <TextField
                    id="company_name"
                    label="company_name"
                    className={classes.textField}
                    value={this.state.company_name}
                    onChange={this.handleChange('company_name')}
                    margin="normal"
                  />
                  <TextField
                    id="hq_name"
                    label="hq_name"
                    className={classes.textField}
                    value={this.state.hq_name}
                    onChange={this.handleChange('hq_name')}
                    margin="normal"
                  />
                </div>
              </Grid>
              <Grid item justify="center" container xs>
                <div style={{ margin: 20 }}>
                  {this.props.countryList.length > 0 && <FormControl>
                    <InputLabel>Country</InputLabel>
                    <Select
                      id="country"
                      className={classes.textField}
                      value={this.state.country}
                      onChange={this.handleChangeSelect('country')}
                      inputProps={{
                        name: 'country',
                        id: 'country-simple',
                      }}>
                      {this.props.countryList.map((country) =>
                        <MenuItem key={country.country_name} value={country.country_name}>{country.country_name}</MenuItem>
                      )}
                    </Select></FormControl>}
                  <TextField
                    id="address"
                    label="Address"
                    className={classes.textField}
                    value={this.state.address}
                    onChange={this.handleChange('address')}
                    margin="normal"
                  />
                  <TextField
                    id="postal_code"
                    label="Postal Code"
                    className={classes.textField}
                    value={this.state.postal_code}
                    onChange={this.handleChange('postal_code')}
                    margin="normal"
                  />
                </div>
              </Grid>
              <Grid item justify="center" container xs>
                <div style={{ margin: 20 }}>
                  <TextField
                    id="contact_email"
                    label="contact_email"
                    className={classes.textField}
                    value={this.state.contact_email}
                    onChange={this.handleChange('contact_email')}
                    margin="normal"
                  />
                  <TextField
                    id="contact_number"
                    label="contact_number"
                    className={classes.textField}
                    value={this.state.contact_number}
                    onChange={this.handleChange('contact_number')}
                    margin="normal"
                  />
                  <TextField
                    id="contact_person"
                    label="contact_person"
                    className={classes.textField}
                    value={this.state.contact_person}
                    onChange={this.handleChange('contact_person')}
                    margin="normal"
                  />
                </div>
              </Grid>
              <Grid item justify="center" container xs>
                <div style={{ margin: 20 }}>
                  <TextField
                    id="base_currency_id"
                    label="base_currency_id"
                    className={classes.textField}
                    value={this.state.base_currency_id}
                    onChange={this.handleChange('base_currency_id')}
                    margin="normal"
                  />
                  <TextField
                    id="financialyr_dt"
                    label="financialyr_dt"
                    className={classes.textField}
                    value={this.state.financialyr_dt}
                    onChange={this.handleChange('financialyr_dt')}
                    margin="normal"
                  />
                  <TextField
                    id="parentcompany_id"
                    label="parentcompany_id"
                    className={classes.textField}
                    value={this.state.parentcompany_id}
                    onChange={this.handleChange('parentcompany_id')}
                    margin="normal"
                  />
                </div>
              </Grid>
              <Grid item justify="center" container xs>
                <div style={{ margin: 20 }}>
                  <TextField
                    id="industry"
                    label="industry"
                    className={classes.textField}
                    value={this.state.industry}
                    onChange={this.handleChange('industry')}
                    margin="normal"
                  />
                  <TextField
                    id="sector"
                    label="sector"
                    className={classes.textField}
                    value={this.state.sector}
                    onChange={this.handleChange('sector')}
                    margin="normal"
                  />
                  <TextField
                    id="webpage_url"
                    label="webpage_url"
                    className={classes.textField}
                    value={this.state.webpage_url}
                    onChange={this.handleChange('webpage_url')}
                    margin="normal"
                  />
                </div>
              </Grid>

            </Grid>
            <Divider />
            <Divider />
            <div style={{
              width: '100%', flex: 1,
              flexDirection: 'row',
              justifyContent: 'center', alignItems: 'flex-end'
            }}>
              <Button variant="contained" color="primary" type="submit">Submit</Button>
            </div>
          </form>
        </Paper>
      </div >
    );
  }
}

(CreateSubCompanyPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    countryList: state.countryReducer.countryList,
    selectedCompany: state.companyReducer.selectedCompany
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateSubCompanyPage));
