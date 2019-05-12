import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  createStyles,
  WithStyles,
  withStyles,
  Grid,
  Paper,
  TextField,
  Divider,
  FormControl,
  Button,
  Select,
  MenuItem,
  InputLabel
} from "@material-ui/core";
import Avatar from "react-avatar-edit";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { RootState } from "../../../reducer";
import { CountryState } from "../../../interface/countryInterface";
import { history } from "../../../store";
import { CREATECOMPANYCRED } from "../../../interface/companyInterface";
import { Sector } from "../../../interface/sectorInterface";

const styles = () =>
  createStyles({
    textField: {
      width: "20rem",
      margin: "1rem"
    }
  });

interface FormState {
  company_id?: string;
  sector: string;
  location: string;
  company_name: string;
  industry: string;
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
interface Props
  extends WithStyles<typeof styles>,
    SharedDispatchProps,
    InState {}

interface InState {
  paremeterList: CountryState;
  sectorList: Sector[];
  onSubmit: any;
  create: boolean;
  updateData: any;
}

class CreateCompanyPage extends Component<Props, FormState> {
  constructor(props) {
    super(props);
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onMainCrop = this.onMainCrop.bind(this);
    this.onMainClose = this.onMainClose.bind(this);
    this.handleCreateCompany = this.handleCreateCompany.bind(this);
  }

  state: FormState = {
    sector: "",
    location: "",
    company_name: "",
    industry: "",
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

  componentDidMount() {
    if (!this.props.create) {
      this.setState(this.props.updateData);
    }
  }

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

  handleChange = (statekay: keyof FormState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState(({ [statekay]: event.target.value } as unknown) as Pick<
      FormState,
      keyof FormState
    >);
  };

  handleChangeCompany = event => {
    this.setState({ country: event.target.value });
  };

  handleChangeSelect = (statekay: keyof FormState) => (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    this.setState(({ [statekay]: event.target.value } as unknown) as Pick<
      FormState,
      keyof FormState
    >);
  };

  handleCreateCompany = e => {
    e.preventDefault();
    // console.log(this.props.countryList)
    const a: CREATECOMPANYCRED = {
      ...this.state,
      sector: JSON.parse(this.state.sector),
      industry: this.state.industry,
      country: []
    };

    this.state.country.forEach(element => {
      a.country.push({ country_name: element });
    });

    this.props.createCompany(a);
    history.goBack();
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper style={{ marginTop: "2rem" }}>
        <form
          onSubmit={e => this.props.onSubmit(e, this.state)}
          style={{ padding: "2rem" }}
        >
          <Grid justify="center" spacing={16} container>
            <Grid item xs={3}>
              <Typography variant="h6">Main Logo</Typography>
              <div style={{ margin: "1rem 1rem", marginTop: 0 }}>
                <Avatar
                  width={200}
                  height={150}
                  onCrop={this.onMainCrop}
                  onClose={this.onMainClose}
                />
              </div>
            </Grid>
            <Grid container item xs>
              <Grid container>
                <Grid container item xs={6}>
                  <TextField
                    required
                    id="company_name"
                    label="Company Name​"
                    className={classes.textField}
                    value={this.state.company_name}
                    onChange={this.handleChange("company_name")}
                    margin="normal"
                  />
                </Grid>
                <Grid container item xs={6}>
                  <TextField
                    id="webpage_url"
                    label="Company Webpage URL​"
                    className={classes.textField}
                    value={this.state.webpage_url}
                    onChange={this.handleChange("webpage_url")}
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid container item xs>
                  <TextField
                    id="location"
                    label="location"
                    className={classes.textField}
                    value={this.state.location}
                    onChange={this.handleChange("location")}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid justify="center" container>
            <Grid item xs={3}>
              <Typography variant="h6">Company Icon</Typography>
              <div style={{ margin: "1rem 1rem", marginTop: 0 }}>
                <Avatar
                  width={200}
                  height={150}
                  onCrop={this.onCrop}
                  onClose={this.onClose}
                />
              </div>
            </Grid>
            <Grid container item xs>
              <Grid container>
                <Grid container item xs={6}>
                  <TextField
                    multiline
                    id="address"
                    label="Registered Address​"
                    className={classes.textField}
                    value={this.state.address}
                    onChange={this.handleChange("address")}
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid container item xs>
                  <TextField
                    id="postal_code"
                    label="Postal Code"
                    className={classes.textField}
                    value={this.state.postal_code}
                    onChange={this.handleChange("postal_code")}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <Typography component="h1" variant="h6">
            Contact Infomation
          </Typography>
          <Grid justify="center" container>
            <Grid item direction="column" xs={3} container />
            <Grid container item xs>
              <Grid container>
                <Grid container item xs={6}>
                  <TextField
                    id="contact_person"
                    label="Contact Person Name​"
                    className={classes.textField}
                    value={this.state.contact_person}
                    onChange={this.handleChange("contact_person")}
                    margin="normal"
                  />
                </Grid>
                <Grid container item xs={6}>
                  <TextField
                    id="contact_number"
                    label="Contact Person Number​"
                    className={classes.textField}
                    value={this.state.contact_number}
                    onChange={this.handleChange("contact_number")}
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid container item xs>
                  <TextField
                    id="contact_email"
                    label="Contact Person Email​"
                    className={classes.textField}
                    value={this.state.contact_email}
                    onChange={this.handleChange("contact_email")}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <Typography component="h1" variant="h6">
            Operational Infomation
          </Typography>
          <Grid justify="center" container>
            <Grid item direction="column" xs={3} container />
            <Grid container item xs>
              <Grid container>
                <Grid container item xs={6}>
                  {this.props.paremeterList.countryList.length > 0 && (
                    <FormControl>
                      <InputLabel style={{ marginLeft: "20px" }} required>
                        Country
                      </InputLabel>
                      <Select
                        id="country"
                        multiple
                        className={classes.textField}
                        value={this.state.country}
                        onChange={this.handleChangeSelect("country")}
                        inputProps={{
                          name: "country",
                          id: "country-simple"
                        }}
                      >
                        {this.props.paremeterList.countryList.map(country => (
                          <MenuItem
                            key={country.country_name}
                            value={JSON.stringify(country)}
                          >
                            {country.country_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </Grid>
                <Grid container item xs={6}>
                  {this.props.paremeterList.distintCurrencyList.length > 0 && (
                    <FormControl>
                      <InputLabel style={{ marginLeft: "20px" }} required>
                        Base Currency
                      </InputLabel>
                      <Select
                        id="base_currency_id"
                        className={classes.textField}
                        value={this.state.base_currency_id}
                        onChange={this.handleChangeSelect("base_currency_id")}
                        inputProps={{
                          name: "base_currency_id",
                          id: "base_currency_id-simple"
                        }}
                      >
                        {this.props.paremeterList.distintCurrencyList.map(
                          currency => (
                            <MenuItem key={currency.code} value={currency.code}>
                              {currency.code}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </FormControl>
                  )}
                </Grid>
              </Grid>
              <Grid container>
                <Grid container item xs={6}>
                  {this.props.sectorList.length > 0 && (
                    <FormControl>
                      <InputLabel style={{ marginLeft: "20px" }} required>
                        Sector
                      </InputLabel>
                      <Select
                        id="sector"
                        className={classes.textField}
                        value={this.state.sector}
                        onChange={this.handleChangeSelect("sector")}
                        inputProps={{
                          name: "sector",
                          id: "sector-simple"
                        }}
                      >
                        {this.props.sectorList.map(sector => (
                          <MenuItem
                            key={sector.name}
                            value={JSON.stringify(sector)}
                          >
                            {sector.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </Grid>
                {this.state.sector !== "" && (
                  <Grid container item xs={6}>
                    {JSON.parse(this.state.sector).industry.length > 0 && (
                      <FormControl>
                        <InputLabel style={{ marginLeft: "20px" }} required>
                          Industry
                        </InputLabel>
                        <Select
                          id="industry"
                          className={classes.textField}
                          value={this.state.industry}
                          onChange={this.handleChangeSelect("industry")}
                          inputProps={{
                            name: "industry",
                            id: "industry-simple"
                          }}
                        >
                          {JSON.parse(this.state.sector).industry.map(
                            industry => (
                              <MenuItem
                                key={industry.name}
                                value={JSON.stringify(industry)}
                              >
                                {industry.name}
                              </MenuItem>
                            )
                          )}
                        </Select>
                      </FormControl>
                    )}
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid container className={classes.grid} spacing={16}>
                                    
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
                                    {this.props.paremeterList.industryList.length > 0 && <FormControl>
                                        <InputLabel>Industry</InputLabel>
                                        <Select
                                            id="industry"
                                            multiple
                                            className={classes.textField}
                                            value={this.state.industry}
                                            onChange={this.handleChangeSelect('industry')}
                                            inputProps={{
                                                name: 'industry',
                                                id: 'industry-simple',
                                            }}>
                                            {this.props.paremeterList.industryList.map((industry) =>
                                                <MenuItem key={industry.name} value={industry.name}>{industry.name}</MenuItem>
                                            )}
                                        </Select></FormControl>}
                                    
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

                        </Grid> */}
          <Divider />
          <Divider />
          <div
            style={{
              display: "flex",
              paddingTop: "1rem"
            }}
          >
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginLeft: "auto" }}
            >
              Submit
            </Button>
          </div>
        </form>
      </Paper>
    );
  }
}

(CreateCompanyPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    paremeterList: state.countryReducer,
    sectorList: state.sectorReducer.sectorList
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreateCompanyPage));
