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
  Button,
  Card,
  CardContent,
  CardActions
} from "@material-ui/core";
import Chip from '@material-ui/core/Chip';
import { mapDispatchToProps } from "../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../interface/propsInterface";
import { RootState } from "../../reducer";
import { CountryState } from "../../interface/countryInterface";
import { Sector, Industry } from "../../interface/sectorInterface";
import StarsIcon from '@material-ui/icons/Stars';
import { Company } from "../../interface/companyInterface";
import { isUserMaster } from "../../function/checkRole";
import { history } from "../../store";

const styles = () =>
  createStyles({
    main: {
        width: "100%",
        padding: "1rem"
    },
    chip: {
      marginBottom: "1rem"
    },
    card: {
      width: "100%",
    },
    title: {
      fontSize: 14,
    },
    subtitle: {
      color: "grey",
    },
    pos: {
      marginBottom: "2rem",
    },
    infotext: {
      marginBottom: 12,
    },
  });

interface State { }

interface Props
  extends WithStyles<typeof styles>,
    SharedDispatchProps,
    InState {}

interface InState {
  selectedCompany: Company;
  role: string;
}

interface IndustryData {
  name: string;
  industry_id: string;
}

class CompanyInfoPage extends Component<Props, State> {

  state: State = {

  };

  componentDidMount() {

  }

  getIndustry() {
    let pdata = this.props.selectedCompany.industry as any;
    return pdata.name;
  }

  getSector() {
    let pdata = this.props.selectedCompany.sector as any;
    return pdata.name;
  }

  getCountries() {
    let countrydata = "";
    this.props.selectedCompany.country.forEach(element => {
      console.log(element);
      if(countrydata == "")
      {
        countrydata = element;
      }
      else
      {
        countrydata = countrydata + ", " + element;
      }
    })
    console.log("##TEST##");
    console.log(this.props.selectedCompany.country);
    return countrydata;
  }
  

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.main}>
        <Grid spacing={16} container>        
            <Grid item xs={8} container>
              <Grid item xs={12} container>
                <Card className={classes.card}>
                  <CardContent>
                    <Chip
                      icon={<StarsIcon />}
                      label="Company"
                      className={classes.chip}
                      color="primary"
                    />
                    <Grid item xs={12} container>
                      {this.props.selectedCompany.logo_small !== "" && (
                      <img
                        alt="company small logo"
                        style={{ width: "40px", marginRight: "1rem" }}
                        src={this.props.selectedCompany.logo_small}
                      />
                      )}
                      <Typography variant="h3" component="h2">
                        {this.props.selectedCompany.company_name}
                      </Typography>
                    </Grid>
                    <Typography className={classes.pos} color="textSecondary">
                      {this.props.selectedCompany.webpage_url}
                    </Typography>
                    <Typography className={classes.subtitle} variant="h6" component="p">
                      Industry/Sector
                    </Typography>
                    <Typography variant="h5" component="p">
                      {this.getIndustry()}
                    </Typography>
                    <Typography className={classes.infotext} variant="h5" component="p">
                      {this.getSector()}
                    </Typography>
                    <Typography className={classes.subtitle} variant="h6" component="p">
                      Countries
                    </Typography>
                    <Typography className={classes.infotext} variant="h5" component="p">
                      {this.getCountries()}
                    </Typography>
                    <Typography className={classes.subtitle} variant="h6" component="p">
                      Base Currency
                    </Typography>
                    <Typography className={classes.infotext} variant="h5" component="p">
                      {this.props.selectedCompany.base_currency_id}
                    </Typography>
                  </CardContent>
                  <CardActions>
                  {isUserMaster(this.props.role) && (
                      <Button size="small" color="primary" onClick={() => history.push("/company/info")}>Edit</Button>
                  )}
                  </CardActions>
                </Card>
              </Grid>
            </Grid> 
            <Grid item xs={4} container alignContent="flex-start" justify="flex-start"> 
              {this.props.selectedCompany.logo_main !== "" && (
                  <img
                    alt="company main logo"
                    style={{ width: "80%", margin: "2rem" }}
                    src={this.props.selectedCompany.logo_main}
                  />
              )}
            </Grid>
        </Grid>
      </Paper>
    );
  }
}

(CompanyInfoPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    parameterList: state.countryReducer,
    sectorList: state.sectorReducer.sectorList,
    selectedCompany: state.companyReducer.selectedCompany,
    role: state.authenticationReducer.profile.info.role_name,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CompanyInfoPage));
