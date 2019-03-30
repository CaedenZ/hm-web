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
  Chip,
  Select,
  MenuItem
} from "@material-ui/core";
import CustomButton from "../component/CustomButton";
import Avatar from 'react-avatar-edit'
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { RootState } from "../../../reducer";
import { Country } from "../../../interface/countryInterface";
import { history } from "../../../store";

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
    chip: {
      margin: theme.spacing.unit / 2,
    },
  });

export interface CreateRegionState {
  region_name: string;
  country_list: Country[];
}
export interface Props extends InState, WithStyles<typeof styles>, SharedDispatchProps { }

interface InState {
  countryList: Country[],
}


class CreateRegionPage extends Component<Props, CreateRegionState> {


  constructor(props) {
    super(props)
    this.handleCreateRegion = this.handleCreateRegion.bind(this)
  }


  state: CreateRegionState = {
    region_name: "",
    country_list: [],
  }

  handleCreateRegion = (e) => {
    e.preventDefault()
    this.props.createRegion(this.state)
    history.goBack()
  }

  handleDelete = country => () => {

    this.setState(state => {
      const countryList = [...state.country_list];
      const chipToDelete = countryList.indexOf(country);
      countryList.splice(chipToDelete, 1);
      return { country_list: countryList };
    });
  };

  handleChange = (e) => {
    console.log(e)
    this.setState(state => {
      const countryList = [...state.country_list];
      const newCountry: Country = {
        country_name: e.target.value
      }
      countryList.push(newCountry)
      return { country_list: countryList };
    });
  };


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          New Region
      </Typography>
        <Paper>
          <form onSubmit={this.handleCreateRegion}>
            <Grid container className={classes.grid} spacing={16}>
              <Grid item justify="center" container xs>
                <div style={{ margin: 20 }}>
                  <TextField
                    id="region_name"
                    label="region_name"
                    className={classes.textField}
                    value={this.state.region_name}
                    onChange={(e) => this.setState({ region_name: e.target.value })}
                    margin="normal"
                  />
                </div>
              </Grid>
              <Grid item justify="center" container xs>
                <Typography>Country</Typography>
                {this.props.countryList.length > 0 && <Select
                  id="country"
                  className={classes.textField}
                  onChange={(e) => this.handleChange(e)}
                  inputProps={{
                    name: 'country',
                    id: 'country-simple',
                  }}>
                  {this.props.countryList.map((country) =>
                    <MenuItem key={country.country_name} value={country.country_name}>{country.country_name}</MenuItem>
                  )}
                </Select>}
              </Grid>
              <Grid item justify="center" container xs={12}>
                {this.state.country_list.map(country =>
                  <Chip
                    key={country.country_name}
                    label={country.country_name}
                    onDelete={this.handleDelete(country)}
                    className={classes.chip}
                  />
                )}
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

(CreateRegionPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: any) {
  return {
    countryList: state.countryReducer.countryList
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateRegionPage));
