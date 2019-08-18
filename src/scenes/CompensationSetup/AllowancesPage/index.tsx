import React from "react";
import PropTypes from "prop-types";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import { RootState } from "../../../reducer";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { Allowances } from "../../../interface/allowanceInterface";
import { FormControl, InputLabel, Select, MenuItem, Grid, FormControlLabel, Checkbox, Paper, Typography, TextField, Button, Divider } from "@material-ui/core";
import { history } from "../../../store";
import { Company } from "../../../interface/companyInterface";
import { Country } from "../../../interface/countryInterface";
import CustomizedTable from './component/table'
import { JobGrade } from "../../../interface/jobgradeInterface";
import CustomButton from "../../../helper/components/CustomButton";
import CustomizedTable_v2 from "./component/stable";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginTop: theme.spacing.unit * 3,
      overflowX: "auto"
    },
    table: {
      minWidth: 700
    },
    row: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.background.default
      }
    },
    logo: {
      height: "20px"
    },
    textField: {
      width: "100%",
      margin: "1rem"
    },
    textFieldValue: {
      width: "16rem",
    },
    textFieldSign: {
      width: "3rem",
      margin: "8px",
    }
  });

export interface Props
  extends WithStyles<typeof styles>,
  SharedDispatchProps,
  InState { }

interface State {
  filtercountry: string,
  filterglobal: boolean,
  created: boolean,
}

interface InState {
  countryList: Country[],
  selectedCompany: Company,
  allowancesList: Allowances[],
  jobgradeList: JobGrade[],
}
class AllowancesPage extends React.Component<Props, State> {
  state = {
    filtercountry: '',
    filterglobal: false,
    created: false,
  }

  componentDidMount() {
    console.log("AllowancesPage MOunt");
    if (this.props.selectedCompany.company_id === "") {
      let data = {
        type: "warning",
        object: "Please Select a Company first",
        id: "1"
      };
      this.props.showDialog(data);
    } else this.props.getAllowancesList();
  }

  handleUpdateButtonClick = allowances => {
    this.props.updateAllowances(allowances);
    this.setState({ created: false })
  };

  handleDelete = id => {
    const payload = {
      type: "delete",
      object: "allowances",
      id: id
    };
    this.props.showDialog(payload);
  };

  handleNewGrade = () => {
    history.push("/allowances/create");
  };

  handleChangeSelect = (statekay: keyof State) => (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    this.setState({ [statekay]: event.target.value } as any);
  };

  handleChange = (statekay: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ [statekay]: event.target.value } as any);
  };

  handleChangeCheck = () => {
    this.setState({ filterglobal: !this.state.filterglobal } as any);
    this.setState({ filtercountry: '' } as any);
  };


  getdata = () => {
    if (this.state.filterglobal) {
      return this.props.allowancesList.filter(e => {
        return e.jobgrade_global === 'Y'
      })
    }
    else if (this.state.filtercountry !== '') {
      return this.props.allowancesList.filter(e => {
        return e.country === this.state.filtercountry
      })
    }
    else { return this.props.allowancesList }
  };

  handleCreateAllowance = () => {
    if (!this.state.created) {
      const data = {
        country: "Global",
        isBonus: "N",
        isOptional: "N",
        jobgrade_country: "",
        jobgrade_global: "",
        jobgrade_id: "",
        jobgrade_name: "",
        type: "",
        value: "",
        value_type: "Percent",
        percent_type: "Annual Base"
      }
      this.props.createAllowances(data)
    }
    else {
      this.props.showDialog({
        type: 'warning',
        object: 'Please do not create multiple entry in a single time',
        id: '1'
      })
    }
  }

  render() {
    let data = this.getdata()
    const { classes } = this.props
    return (
      <main>
          <CustomizedTable_v2 allowancesList={data} onUpdate={this.handleUpdateButtonClick} />
      </main >
    );
  }
}

(AllowancesPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    countryList: state.countryReducer.countryList,
    selectedCompany: state.companyReducer.selectedCompany,
    allowancesList: state.allowancesReducer.allowancesList,
    jobgradeList: state.jobgradeReducer.jobgradeList
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AllowancesPage));
