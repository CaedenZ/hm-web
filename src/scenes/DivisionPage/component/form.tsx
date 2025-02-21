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
  Select,
  MenuItem,
  InputLabel
} from "@material-ui/core";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { RootState } from "../../../reducer";
import { Company } from "../../../interface/companyInterface";
import { Country } from "../../../interface/countryInterface";
import { Region } from "../../../interface/regionInterface";

const styles = (theme: Theme) =>
  createStyles({
    grid: {
      margin: 20
    },
    textField: {
      width: "20rem",
      margin: "1rem"
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
    preview: {},
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
    },
    formControl: {
      //margin: theme.spacing.unit,
      //minWidth: 120
      width: "20rem",
      margin: "1rem"
    }
  });

export interface CreateUnitState {
  unit_name: string;
  unit_type: string;
  unit_data: any;
  parent_unit: string;
  main_unit: string;
  company_id: string;
}

export interface Props
  extends WithStyles<typeof styles>,
    SharedDispatchProps,
    InState {}

interface InState {
  parentCompany: Company;
  countryList: Country[];
  regionList: Region[];
  create: boolean;
  updateData: any;
  onSubmit: any;
}

class CreateMainUnitPage extends Component<Props, CreateUnitState> {
  state: CreateUnitState = {
    unit_name: "",
    unit_type: "Division",
    unit_data: "",
    parent_unit: "",
    main_unit: "",
    company_id: ""
  };

  handleChange = (statekay: keyof CreateUnitState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ [statekay]: event.target.value } as Pick<
      CreateUnitState,
      keyof CreateUnitState
    >);
  };

  handleChangeSelect = (statekay: keyof CreateUnitState) => (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    this.setState({ [statekay]: event.target.value } as Pick<
      CreateUnitState,
      keyof CreateUnitState
    >);
  };

  handleChangeSelectRegionData = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    // this.setState({ unit_data: this.props.regionList[event.target.value] });
    this.setState({ unit_data: event.target.value });
    // console.log(this.state.unit_data.region_name)
  };

  handleChangeSelectCountryData = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    // this.setState({ unit_data: this.props.countryList[event.target.value] } as Pick<CreateUnitState, keyof CreateUnitState>);
    this.setState({ unit_data: event.target.value });
    // console.log(this.state.unit_data.country_name)
  };

  componentDidMount = () => {
    if (!this.props.create) {
      console.log(this.props.updateData);
      this.setState(this.props.updateData);
    } else {
      this.setState({ ...this.props.updateData });
    }
  };

  render() {
    const { classes } = this.props;

    const regionmenu = () => {
      if (this.props.regionList.length > 0) {
        return this.props.regionList.map(region => (
          <MenuItem key={region.region_id} value={JSON.stringify(region)}>
            {region.region_name}
          </MenuItem>
        ));
      } else return <MenuItem value="">Please Create a Region</MenuItem>;
    };

    const unitData = () => {
      switch (this.state.unit_type) {
        case "Division":
          return (
            <TextField
              id="unit_data"
              label="Data"
              className={classes.textField}
              value={this.state.unit_data}
              onChange={this.handleChange("unit_data")}
              margin="normal"
            />
          );
        case "region":
          return (
            <FormControl className={classes.formControl}>
              <InputLabel>Unit Data</InputLabel>
              <Select
                value={this.state.unit_data}
                onChange={this.handleChangeSelectRegionData}
                inputProps={{
                  name: "Data",
                  id: "unit_data"
                }}
              >
                {regionmenu()}
              </Select>
            </FormControl>
          );
        case "country":
          return (
            <FormControl className={classes.formControl}>
              <InputLabel>Unit Data</InputLabel>
              <Select
                value={this.state.unit_data}
                onChange={this.handleChangeSelectCountryData}
                inputProps={{
                  name: "Data",
                  id: "unit_data"
                }}
              >
                {this.props.parentCompany.country.map(country => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
      }
    };

    return (
      <Paper>
        <form onSubmit={e => this.props.onSubmit(e, this.state)}>
          <Grid justify="center" spacing={16} container>
            <Grid item justify="center" container xs>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  id="unit_name"
                  label="Name"
                  className={classes.textField}
                  value={this.state.unit_name}
                  onChange={this.handleChange("unit_name")}
                  margin="normal"
                />
                <FormControl className={classes.formControl}>
                  <InputLabel>Unit Type</InputLabel>
                  <Select
                    value={this.state.unit_type}
                    onChange={this.handleChangeSelect("unit_type")}
                    inputProps={{
                      name: "Type",
                      id: "unit_type"
                    }}
                  >
                    <MenuItem value={"Division"}>Division</MenuItem>
                    <MenuItem value={"region"}>region</MenuItem>
                    <MenuItem value={"country"}>country</MenuItem>
                  </Select>
                </FormControl>
                {unitData()}
              </div>
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

(CreateMainUnitPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    parentCompany: state.companyReducer.selectedCompany,
    regionList: state.regionReducer.regionList,
    countryList: state.countryReducer.countryList
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreateMainUnitPage));
