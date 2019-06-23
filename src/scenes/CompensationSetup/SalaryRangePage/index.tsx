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
import { SalaryRange } from "../../../interface/salaryRangeInterface";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  FormControlLabel,
  Checkbox,
  Typography
} from "@material-ui/core";
import { history } from "../../../store";
import { Company } from "../../../interface/companyInterface";
import { Country } from "../../../interface/countryInterface";
import CustomizedTable from "./component/table";
import CustomButton from "../../../helper/components/CustomButton";

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
    }
  });

export interface Props
  extends WithStyles<typeof styles>,
  SharedDispatchProps,
  InState { }

interface State {
  country: string;
  global: boolean;
  created: boolean;
}

interface InState {
  countryList: Country[];
  selectedCompany: Company;
  salaryrangeList: SalaryRange[];
}
class SalaryRangePage extends React.Component<Props, State> {
  state = {
    country: "",
    global: false,
    created: false,
  };

  componentDidMount() {
    console.log("SalaryRangePage MOunt");
    if (this.props.selectedCompany.company_id === "") {
      let data = {
        type: "warning",
        object: "Please Select a Company first",
        id: "1"
      };
      this.props.showDialog(data);
    } else this.props.getSalaryRangeList();
  }

  handleUpdateButtonClick = salaryrange => {
    this.props.updateSalaryRange(salaryrange);
    this.setState({ created: false })
  };

  handleDelete = id => {
    const payload = {
      type: "delete",
      object: "salaryrange",
      id: id
    };
    this.props.showDialog(payload);
  };

  handleNewGrade = () => {
    if (!this.state.created) {
      const data: any = {
        country: "Global",
        jobgrade_country: "",
        jobgrade_global: "",
        jobgrade_id: "",
        jobgrade_name: "",
        max: "",
        mid: "",
        min: "",
        type: "",
      }
      this.props.createSalaryRange(data)
    }
    else {
      this.props.showDialog({
        type: 'warning',
        object: 'Please do not create multiple entry in a single time',
        id: '1'
      })
    }
  };

  handleChange = () => {
    this.setState({ global: !this.state.global } as any);
    this.setState({ country: '' } as any);
  };

  handleChangeSelect = (statekay: keyof State) => (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    this.setState({ [statekay]: event.target.value } as any);
  };

  getdata = () => {
    if (this.state.global) {
      return this.props.salaryrangeList.filter(e => {
        return e.jobgrade_global === 'Y';
      });
    } else if (this.state.country !== "") {
      return this.props.salaryrangeList.filter(e => {
        return e.country === this.state.country;
      });
    } else {
      return this.props.salaryrangeList;
    }
  };

  render() {
    let data = this.getdata();

    return (
      <main>
        <CustomButton onClick={this.handleNewGrade}>
          Create
        </CustomButton>
        <CustomizedTable salaryrangeList={data} onUpdate={this.handleUpdateButtonClick} />
      </main>
    );
  }
}

(SalaryRangePage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    countryList: state.countryReducer.countryList,
    selectedCompany: state.companyReducer.selectedCompany,
    salaryrangeList: state.salaryRangeReducer.salaryrangeList
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SalaryRangePage));
