import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Grid,
  Paper,
  TextField,
  Divider,
  FormControl,
  Button,
  MenuItem,
  InputLabel
} from "@material-ui/core";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { Country } from "../../../interface/countryInterface";
import { history } from "../../../store";
import { Company } from "../../../interface/companyInterface";
import { CREATEREGIONCRED } from "../../../interface/regionInterface";
import Select from "react-select";
import components from "../../../function/react-select-components";

const styles = (theme: Theme) =>
  createStyles({
    textField: {
      width: "20rem",
      margin: "1rem"
    },
    selectField: {
      width: "40rem",
      margin: "1rem"
    }
  });

interface FormState {
  region_name: string;
  country_list: string[];
  displayCountry: object[];
}
export interface Props
  extends InState,
    WithStyles<typeof styles>,
    SharedDispatchProps {}

interface InState {
  countryList: Country[];
  selectedCompany: Company;
  onSubmit: any;
  create: boolean;
  updateData: any;
}

class CreateRegionPage extends Component<Props, FormState> {
  constructor(props) {
    super(props);
    this.handleCreateRegion = this.handleCreateRegion.bind(this);
  }

  state: FormState = {
    region_name: "",
    country_list: [],
    displayCountry: []
  };

  componentDidMount() {
    if (!this.props.create) {
      this.setState(this.props.updateData);
      let tmpListObject: any = null;
      tmpListObject = [];
      for (const country of this.props.updateData.country_list) {
        tmpListObject.push({
          value: country,
          label: country
        });
      }

      this.setState({ displayCountry: tmpListObject });
    }
  }

  handleCreateRegion = e => {
    e.preventDefault();
    const a: CREATEREGIONCRED = {
      ...this.state,
      country_list: []
    };

    this.state.country_list.forEach(element => {
      a.country_list.push(element);
    });

    this.props.createRegion(a);
    history.goBack();
  };

  handleChangeSelect = (statekay: keyof FormState) => value => {
    let tmpListObject: any = null;
    tmpListObject = [];
        for (const country of value) {
          const tmpObject = country.value;
          tmpListObject.push(tmpObject);
        }
        
        const myData = value
        .sort((a, b) => a.value.localeCompare(b.value))
        .map(country => ({
          value: country,
          label: country
        }));

        console.log(tmpListObject);
        //console.log(myData);
        this.setState({ displayCountry: value });
        this.setState(({ [statekay]: tmpListObject } as unknown) as Pick<
        FormState,
        keyof FormState
      >);
    //this.setState(({ [statekay]: event.target.value } as unknown) as Pick<
      //FormState,
      //keyof FormState
    //>);
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper style={{ marginTop: "2rem", maxWidth:"50rem"}}>
        <form
          onSubmit={e => this.props.onSubmit(e, this.state)}
          style={{ padding: "2rem" }}
        >
          <Grid item container>
            <TextField
              id="region_name"
              label="Region"
              className={classes.textField}
              value={this.state.region_name}
              onChange={e => this.setState({ region_name: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item container xs>
            {this.props.selectedCompany.country.length > 0 && (
              <FormControl>
                {/*<InputLabel style={{ marginLeft: "20px" }}>Country</InputLabel>*/}
                <Select
                      fullWidth
                      className={classes.selectField}
                      classes={classes}
                      textFieldProps={{
                        label: "Country",
                        InputLabelProps: {
                          shrink: true
                        }
                      }}
                      options={this.props.selectedCompany.country.map(
                        country => ({
                          value: country,
                          label: country
                        })
                      )}
                      components={components}
                      value={this.state.displayCountry}
                      onChange={this.handleChangeSelect("country_list")}
                      placeholder="Select multiple countries"
                      isMulti
                    />
              {/*<Select
                  id="country"
                  multiple
                  className={classes.textField}
                  value={this.state.country_list}
                  onChange={this.handleChangeSelect("country_list")}
                  inputProps={{
                    name: "country",
                    id: "country-simple"
                  }}
                >
                  {this.props.selectedCompany.country.map(country => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                  </Select>*/}
              </FormControl>
            )}
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

(CreateRegionPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: any) {
  return {
    countryList: state.countryReducer.countryList,
    selectedCompany: state.companyReducer.selectedCompany
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreateRegionPage));
