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
import { JobGrade } from "../../../interface/jobgradeInterface";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Divider,
  Paper,
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
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
  });

export interface Props
  extends WithStyles<typeof styles>,
  SharedDispatchProps,
  InState { }

interface State {
  filtercountry: string;
  filterglobal: boolean;
  jobgrade_name: string;
  type: string;
  global: boolean;
  country: string;
  created: boolean;
}

interface InState {
  countryList: Country[];
  selectedCompany: Company;
  jobgradeList: JobGrade[];
}
class JobGradePage extends React.Component<Props, State> {
  state = {
    filtercountry: "",
    filterglobal: false,
    jobgrade_name: "",
    type: "",
    global: false,
    country: "",
    created: false,
  };

  componentDidMount() {
    console.log("JobGradePage MOunt");
    if (this.props.selectedCompany.company_id === "") {
      let data = {
        type: "warning",
        object: "Please Select a Company first",
        id: "1"
      };
      this.props.showDialog(data);
    } else this.props.getJobGradeList();
  }

  handleUpdate = jobgrade => {
    this.props.updateJobGrade(jobgrade);
    this.setState({ created: false })
  };

  handleDelete = id => {
    const payload = {
      type: "delete",
      object: "jobgrade",
      id: id
    };
    this.props.showDialog(payload);
  };

  handleNewGrade = () => {
    history.push("/jobgrade/create");
  };

  handleChangeglobal = () => {
    this.setState({ filterglobal: !this.state.filterglobal } as any);
    this.setState({ filtercountry: '' } as any);
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
    this.setState({ global: !this.state.global } as any);
    this.setState({ country: "" });
  };

  getdata = () => {
    if (this.state.filterglobal) {
      return this.props.jobgradeList.filter(e => {
        return e.global === 'Y';
      });
    } else if (this.state.filtercountry !== "") {
      return this.props.jobgradeList.filter(e => {
        return e.country === this.state.filtercountry;
      });
    } else {
      return this.props.jobgradeList;
    }
  };

  handleCreateJobGrade = () => {
    if (!this.state.created) {
      const data = {
        jobgrade_name: "",
        type: "",
        global: 'Y',
        country: "Global",
      }
      this.props.createJobGrade(data)
      this.setState({ created: true })
    } else {
      this.props.showDialog({
        type: 'warning',
        object: 'Please do not create multiple entry in a single time',
        id: '1'
      })
    }
  }

  render() {
    let data = this.getdata();

    let { classes } = this.props
    return (
      <main>
        <CustomButton onClick={this.handleCreateJobGrade}>Create</CustomButton>
        <Divider />
        <CustomizedTable jobgradeList={data} onUpdate={this.handleUpdate} />
      </main>
    );
  }
}

(JobGradePage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    countryList: state.countryReducer.countryList,
    selectedCompany: state.companyReducer.selectedCompany,
    jobgradeList: state.jobgradeReducer.jobgradeList
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(JobGradePage));
