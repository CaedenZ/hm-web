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
import { RootState } from "../../../reducer";
import { Unit, Company } from "../../../interface/companyInterface";
import { history } from "../../../store";
import { Country } from "../../../interface/countryInterface";
import { Region } from "../../../interface/regionInterface";

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
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
  });

export interface UpdateUnitState {
  unit_id: string,
  unit_name: string,
  unit_type: string,
  unit_data: string,
  parent_unit: string,
  main_unit: string,
  company_id: string,
}
export interface Props extends WithStyles<typeof styles>, SharedDispatchProps, InState { }

interface InState {
  selectedUnit: Unit;
  countryList: Country[];
  regionList: Region[]
}

class UpdateMainUnitPage extends Component<Props, UpdateUnitState> {


  constructor(props) {
    super(props)
    this.handleUpdateUnit = this.handleUpdateUnit.bind(this)
  }


  state: UpdateUnitState = {
    unit_id: '',
    unit_name: '',
    unit_type: '',
    unit_data: '',
    parent_unit: '',
    main_unit: '',
    company_id: '',
  }

  handleChange = (statekay: keyof UpdateUnitState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [statekay]: event.target.value } as Pick<UpdateUnitState, keyof UpdateUnitState>);
  };


  handleChangeSelect = (statekay: keyof UpdateUnitState) => (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ [statekay]: event.target.value } as Pick<UpdateUnitState, keyof UpdateUnitState>);
  };

  handleChangeSelectRegionData = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // this.setState({ unit_data: this.props.regionList[event.target.value] });
    this.setState({ unit_data: event.target.value });
    // console.log(this.state.unit_data.region_name)
  };

  handleChangeSelectCountryData = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // this.setState({ unit_data: this.props.countryList[event.target.value] } as Pick<CreateUnitState, keyof CreateUnitState>);
    this.setState({ unit_data: event.target.value });
    // console.log(this.state.unit_data.country_name)
  };

  handleUpdateUnit = (e) => {
    e.preventDefault()
    this.props.updateUnit(this.state)
    history.goBack()
  }

  componentDidMount = () => {
    this.setState(this.props.selectedUnit)
  }

  render() {
    const { classes } = this.props;

    const unitData = () => {
      switch (this.state.unit_type) {
        case 'BU':
          return <TextField
            id="unit_data"
            label="unit_data"
            className={classes.textField}
            value={this.state.unit_data}
            onChange={this.handleChange('unit_data')}
            margin="normal"
          />
        case 'region':
          return <FormControl className={classes.formControl}>
            <InputLabel>Unit Data</InputLabel>
            <Select
              value={this.state.unit_data}
              onChange={this.handleChangeSelectRegionData}
              inputProps={{
                name: 'unit_data',
                id: 'unit_data',
              }}
            >
              {this.props.regionList.map((region, index) =>
                <MenuItem key={region.region_id} value={region.region_name}>{region.region_name}</MenuItem>
              )}
            </Select>
          </FormControl>
        case 'country':
          return <FormControl className={classes.formControl}>
            <InputLabel>Unit Data</InputLabel>
            <Select
              value={this.state.unit_data}
              onChange={this.handleChangeSelectCountryData}
              inputProps={{
                name: 'unit_data',
                id: 'unit_data',
              }}
            >
              {this.props.countryList.map((country, index) =>
                <MenuItem key={country.country_name} value={country.country_name}>{country.country_name}</MenuItem>
              )}
            </Select>
          </FormControl>
      }
    }

    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          Update Unit
      </Typography>
        <Paper>
          <form onSubmit={this.handleUpdateUnit}>
            <Grid container className={classes.grid} spacing={16}>
              <Grid item justify="center" container xs>
                <div style={{ margin: 20, display: 'flex', flexDirection: 'column' }}>
                  <TextField
                    id="unit_name"
                    label="unit_name"
                    className={classes.textField}
                    value={this.state.unit_name}
                    onChange={this.handleChange('unit_name')}
                    margin="normal"
                  />
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-simple">Unit Type</InputLabel>
                    <Select
                      value={this.state.unit_type}
                      onChange={this.handleChangeSelect('unit_type')}
                      inputProps={{
                        name: 'unit_type',
                        id: 'unit_type',
                      }}
                    >
                      <MenuItem value={'BU'}>BU</MenuItem>
                      <MenuItem value={'region'}>region</MenuItem>
                      <MenuItem value={'country'}>country</MenuItem>
                    </Select>
                  </FormControl>
                  {unitData()}
                </div>
              </Grid>
              <Grid item justify="center" container xs>
                <div style={{ margin: 20 }}>
                  <TextField
                    disabled
                    id="parent_unit"
                    label="parent_unit"
                    className={classes.textField}
                    value={this.state.parent_unit}
                    onChange={this.handleChange('parent_unit')}
                    margin="normal"
                  />
                  <TextField
                    disabled
                    id="main_unit"
                    label="main_unit"
                    className={classes.textField}
                    value={this.state.main_unit}
                    onChange={this.handleChange('main_unit')}
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
      </div>
    );
  }
}

(UpdateMainUnitPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    selectedUnit: state.companyReducer.selectUpdateUnit,
    regionList: state.regionReducer.regionList,
    countryList: state.countryReducer.countryList,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UpdateMainUnitPage));
