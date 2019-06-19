import React from "react";
import PropTypes from "prop-types";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import CustomButton from "./component/CustomButton";
import { RootState } from "../../../reducer";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { ShortIncentive } from "../../../interface/shortIncentiveInterface";
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
import { Company } from "../../../interface/companyInterface";
import { Country } from "../../../interface/countryInterface";
import CustomizedTable from "./component/table";

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
  shortincentiveList: ShortIncentive[];
}
class ShortIncentivePage extends React.Component<Props, State> {
  state = {
    country: "",
    global: false,
    created: false,
  };

  componentDidMount() {
    console.log("ShortIncentivePage MOunt");
    if (this.props.selectedCompany.company_id === "") {
      let data = {
        type: "warning",
        object: "Please Select a Company first",
        id: "1"
      };
      this.props.showDialog(data);
    } else this.props.getShortIncentiveList();
  }

  handleUpdateButtonClick = shortincentive => {
    this.props.updateShortIncentive(shortincentive);
    this.setState({ created: false })
  };

  handleDelete = id => {
    const payload = {
      type: "delete",
      object: "shortincentive",
      id: id
    };
    this.props.showDialog(payload);
  };

  handleNewGrade = () => {
    if (!this.state.created) {
      const data = {
        jobgrade_id: ' ',
        jobgrade_name: ' ',
        jobgrade_global: ' ',
        type: ' ',
        country: ' ',
        value: ' ',
        isOptional: ' ',
        value_type: ' ',
      }
      this.props.createShortIncentive(data)
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
      return this.props.shortincentiveList.filter(e => {
        return e.jobgrade_global === 'Y';
      });
    } else if (this.state.country !== "") {
      return this.props.shortincentiveList.filter(e => {
        return e.country === this.state.country;
      });
    } else {
      return this.props.shortincentiveList;
    }
  };

  render() {
    let data = this.getdata();

    return (
      <main>
        <CustomButton onClick={this.handleNewGrade}>
          Create
        </CustomButton>
        <Typography component="h1" variant="h6">
          Current Short Term Incentive
          </Typography>
        <CustomizedTable shortincentiveList={data} onUpdate={this.handleUpdateButtonClick} />
      </main>
    );
  }
}

(ShortIncentivePage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    countryList: state.countryReducer.countryList,
    selectedCompany: state.companyReducer.selectedCompany,
    shortincentiveList: state.shortIncentiveReducer.shortincentiveList
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ShortIncentivePage));
