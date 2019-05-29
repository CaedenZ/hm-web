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
  Button
} from "@material-ui/core";
import Select from "react-select";
import Avatar from "react-avatar-edit";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { RootState } from "../../../reducer";
import { CountryState } from "../../../interface/countryInterface";
import { Sector, Industry } from "../../../interface/sectorInterface";
import theme from "../../../assets/theme";
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import components from "../../../function/react-select-components";

const styles = () =>
  createStyles({
    textField: {
      width: "20rem",
      margin: "1rem"
    },
    disabled: {
      color: "#545454"
    },
    countrySelect: {
      width: "56rem",
      margin: "1rem"
    },
    root: {
      flexGrow: 1,
      height: 250
    },
    input: {
      display: "flex",
      padding: 0
    },
    valueContainer: {
      display: "flex",
      flexWrap: "wrap",
      flex: 1,
      alignItems: "center",
      overflow: "hidden"
    },
    chip: {
      margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
    },
    chipFocused: {
      backgroundColor: emphasize(
        theme.palette.type === "light"
          ? theme.palette.grey[300]
          : theme.palette.grey[700],
        0.08
      )
    },
    noOptionsMessage: {
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
    },
    singleValue: {
      fontSize: 16
    },
    placeholder: {
      position: "absolute",
      left: 2,
      fontSize: 16
    },
    paper: {
      position: "absolute",
      zIndex: 1,
      marginTop: theme.spacing.unit,
      left: 0,
      right: 0
    },
    divider: {
      height: theme.spacing.unit * 2
    }
  });

interface FormState {
  company_id?: string;
  sector: Sector | null;
  company_name: string;
  industry: Industry | null;
  country: string[];
  logo_small: string;
  financialyr_dt: string;
  base_currency_id: string;
  logo_main: string;
  parentcompany_id: string;
  webpage_url: string;
  displayCountry: object[];
  display_base_currency_id: object;
  displaySector: object;
  displayIndustry: object;
}

interface Props
  extends WithStyles<typeof styles>,
    SharedDispatchProps,
    InState {}

interface InState {
  parameterList: CountryState;
  sectorList: Sector[];
  onSubmit: any;
  create: boolean;
  updateData: any;
  view: boolean;
}

class CreateCompanyPage extends Component<Props, FormState> {
  constructor(props) {
    super(props);
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onMainCrop = this.onMainCrop.bind(this);
    this.onMainClose = this.onMainClose.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
  }

  state: FormState = {
    sector: null,
    company_name: "",
    industry: null,
    country: [],
    logo_small: "",
    financialyr_dt: "",
    base_currency_id: "",
    logo_main: "",
    parentcompany_id: "",
    webpage_url: "",
    displayCountry: [],
    display_base_currency_id: {},
    displaySector: {},
    displayIndustry: {}
  };

  componentDidMount() {
    if (!this.props.create) {
      this.setState(this.props.updateData);

      const tmpCountryList: object[] = [];
      for (const country of this.props.updateData.country) {
        tmpCountryList.push({
          value: country,
          label: country
        });
      }
      this.setState({ displayCountry: tmpCountryList });
      this.setState({
        display_base_currency_id: {
          value: this.props.updateData.base_currency_id,
          label: this.props.updateData.base_currency_id
        }
      });

      this.setState({
        displaySector: {
          value: JSON.stringify(this.props.updateData.sector),
          label: this.props.updateData.sector.name
        }
      });
      if (this.props.updateData.industry) {
        this.setState({
          displayIndustry: {
            value: JSON.stringify(this.props.updateData.industry),
            label: this.props.updateData.industry.name
          }
        });
      }
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

  handleChangeSelect = (statekay: keyof FormState) => value => {
    let tmpListObject: any = null;
    switch (statekay) {
      case "country":
        tmpListObject = [];
        for (const country of value) {
          const tmpObject = country.value;
          tmpListObject.push(tmpObject);
        }
        console.log(tmpListObject);
        this.setState({ displayCountry: value });
        break;
      case "base_currency_id":
        tmpListObject = value.value;
        this.setState({ display_base_currency_id: value });
        break;
      case "sector":
        tmpListObject = JSON.parse(value.value);
        this.setState({ displaySector: value });
        break;
      case "industry":
        tmpListObject = JSON.parse(value.value);
        this.setState({ displayIndustry: value });
        break;
      default:
        break;
    }
    this.setState(({ [statekay]: tmpListObject } as unknown) as Pick<
      FormState,
      keyof FormState
    >);
  };

  companyIcon = () => {
    if (this.props.view) {
      if (this.state.logo_small !== "") {
        return (
          <img
            alt="company icon"
            src={this.state.logo_small}
            style={{ width: 200, height: 150 }}
          />
        );
      } else {
        return <div style={{ width: 200, height: 150 }} />;
      }
    } else {
      return (
        <Avatar
          width={200}
          height={150}
          onCrop={this.onCrop}
          onClose={this.onClose}
        />
      );
    }
  };

  companyMain = () => {
    if (this.props.view) {
      if (this.state.logo_small !== "") {
        return (
          <img
            alt="company main"
            src={this.state.logo_main}
            style={{ width: 200, height: 150 }}
          />
        );
      } else {
        return <div style={{ width: 200, height: 150 }} />;
      }
    } else {
      return (
        <Avatar
          width={200}
          height={150}
          onCrop={this.onMainCrop}
          onClose={this.onMainClose}
        />
      );
    }
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
            <Grid item direction="column" xs={3} container>
              <Grid item xs={6}>
                <Typography variant="h6">Company Icon</Typography>
                <div style={{ margin: "1rem 1rem", marginTop: 0 }}>
                  {/* {this.props.view ? (
                    <img
                      alt="company icon"
                      src={this.state.logo_small}
                      style={{ width: 200, height: 150 }}
                    />
                  ) : (
                    <Avatar
                      width={200}
                      height={150}
                      onCrop={this.onCrop}
                      onClose={this.onClose}
                    />
                  )} */}
                  {this.companyIcon()}
                </div>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">Main Logo</Typography>
                <div style={{ margin: "1rem 1rem", marginTop: 0 }}>
                  {/* {this.props.view ? (
                    <img
                      alt="company main"
                      src={this.state.logo_main}
                      style={{ width: 200, height: 150 }}
                    />
                  ) : (
                    <Avatar
                      width={200}
                      height={150}
                      onCrop={this.onMainCrop}
                      onClose={this.onMainClose}
                    />
                  )} */}
                  {this.companyMain()}
                </div>
              </Grid>
            </Grid>
            <Grid alignItems="center" container item xs>
              <Grid container>
                <Grid container item xs={6}>
                  <TextField
                    disabled={this.props.view}
                    InputProps={{ classes: { disabled: classes.disabled } }}
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
                    disabled={this.props.view}
                    InputProps={{ classes: { disabled: classes.disabled } }}
                    id="webpage_url"
                    label="Company Webpage URL​"
                    className={classes.textField}
                    value={this.state.webpage_url}
                    onChange={this.handleChange("webpage_url")}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid justify="flex-start" container />
          <Divider />
          <Typography component="h1" variant="h6">
            Operational Infomation
          </Typography>
          <Grid justify="center" container>
            <Grid item direction="column" xs={3} container />
            <Grid container item xs>
              <Grid container>
                <Grid container item xs={6}>
                  {this.props.parameterList.distintCurrencyList.length > 0 && (
                    <Select
                      isDisabled={this.props.view}
                      className={classes.textField}
                      classes={classes}
                      textFieldProps={{
                        label: "Base Currency",
                        InputLabelProps: {
                          shrink: true
                        }
                      }}
                      options={this.props.parameterList.distintCurrencyList.map(
                        currency => ({
                          value: currency.code,
                          label: currency.code
                        })
                      )}
                      components={components}
                      value={this.state.display_base_currency_id}
                      onChange={this.handleChangeSelect("base_currency_id")}
                      placeholder="Base Currency"
                    />
                  )}
                </Grid>
                <Grid container item xs={6}>
                  {this.props.sectorList.length > 0 && (
                    <Select
                      isDisabled={this.props.view}
                      className={classes.textField}
                      classes={classes}
                      textFieldProps={{
                        label: "Sector",
                        InputLabelProps: {
                          shrink: true
                        }
                      }}
                      options={this.props.sectorList.map(sector => ({
                        value: JSON.stringify(sector),
                        label: sector.name
                      }))}
                      components={components}
                      value={this.state.displaySector}
                      onChange={this.handleChangeSelect("sector")}
                      placeholder="Sector"
                    />
                  )}
                </Grid>
                {this.state.sector && (
                  <Grid container item xs={6}>
                    {this.state.sector.industry && (
                      <Select
                        isDisabled={this.props.view}
                        className={classes.textField}
                        classes={classes}
                        textFieldProps={{
                          label: "Industry",
                          InputLabelProps: {
                            shrink: true
                          }
                        }}
                        options={this.state.sector.industry.map(industry => ({
                          value: JSON.stringify(industry),
                          label: industry.name
                        }))}
                        components={components}
                        value={this.state.displayIndustry}
                        onChange={this.handleChangeSelect("industry")}
                        placeholder="Industry"
                      />
                    )}
                  </Grid>
                )}
              </Grid>
              <Grid container>
                <Grid container item xs={12}>
                  {this.props.parameterList.countryList.length > 0 && (
                    <Select
                      isDisabled={this.props.view}
                      fullWidth
                      className={classes.countrySelect}
                      classes={classes}
                      textFieldProps={{
                        label: "Country",
                        InputLabelProps: {
                          shrink: true
                        }
                      }}
                      options={this.props.parameterList.countryList.map(
                        country => ({
                          value: country.country_name,
                          label: country.country_name
                        })
                      )}
                      components={components}
                      value={this.state.displayCountry}
                      onChange={this.handleChangeSelect("country")}
                      placeholder="Select multiple countries"
                      isMulti
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <Divider />
          <div
            style={{
              display: "flex",
              paddingTop: "1rem"
            }}
          >
            <Button
              disabled={this.props.view}
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
    parameterList: state.countryReducer,
    sectorList: state.sectorReducer.sectorList
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreateCompanyPage));
