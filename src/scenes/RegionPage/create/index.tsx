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
import { CREATEREGIONCRED } from "../../../interface/regionInterface";
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
    },
    chip: {
      margin: theme.spacing.unit / 2,
    },
  });

export interface CreateRegionState {
  region_name: string;
  country_list: string[];
}
export interface Props extends InState, WithStyles<typeof styles>, SharedDispatchProps { }

interface InState {
  countryList: Country[],
  selectedCompany: Company,
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

  handleCreateRegion = (e, data) => {
    e.preventDefault()
    // const a: CREATEREGIONCRED = {
    //   ...this.state,
    //   country_list: [],
    // }

    // this.state.country_list.forEach(element => {
    //   a.country_list.push({ country_name: element })
    // });

    this.props.createRegion(data)
    history.goBack()
  }

  handleChangeSelect = (statekay: keyof CreateRegionState) => (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ [statekay]: event.target.value } as unknown as Pick<CreateRegionState, keyof CreateRegionState>);
  };


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          New Region
      </Typography>
        <FormPage create={true} updateData='' onSubmit={(e, data) => this.handleCreateRegion(e, data)} />
      </div>
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
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateRegionPage));
