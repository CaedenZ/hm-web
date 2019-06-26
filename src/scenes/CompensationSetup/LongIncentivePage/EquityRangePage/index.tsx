import React from "react";
import PropTypes from "prop-types";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import { RootState } from "../../../../reducer";
import { mapDispatchToProps } from "../../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../../interface/propsInterface";
import { JobGrade } from "../../../../interface/jobgradeInterface";
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
import { history } from "../../../../store";
import { Company } from "../../../../interface/companyInterface";
import { Country } from "../../../../interface/countryInterface";
import CustomizedTable from "./component/table";
import { EquityRange } from "../../../../interface/equityRangeInterface";
import CustomButton from "../../../../helper/components/CustomButton";

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
  created: boolean;
}

interface InState {
  countryList: Country[];
  selectedCompany: Company;
  equityrangeList: EquityRange[];
}
class EquityRangePage extends React.Component<Props, State> {
  state = {
    created: false,
  };

  componentDidMount() {
    console.log("EquityRangePage MOunt");
    if (this.props.selectedCompany.company_id === "") {
      let data = {
        type: "warning",
        object: "Please Select a Company first",
        id: "1"
      };
      this.props.showDialog(data);
    } else this.props.getEquityRangeList();
  }

  handleUpdate = jobgrade => {
    this.props.updateEquityRange(jobgrade);
    this.setState({ created: false })
  };

  handleDelete = payload => {
    this.props.showDialog(payload);
    this.setState({ created: false })
  };

  handleCreateEquityRange = () => {
    if (!this.state.created) {
      const data = {
        jobgrade_id: ' ',
        jobgrade_name: ' ',
        jobgrade_global: 'N',
        type: ' ',
        min: ' ',
        mid: ' ',
        max: ' ',
        country: ' ',
        value_type: 0,
      }
      this.props.createEquityRange(data)
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
    return (
      <main>
        <div style={{ marginTop: 20 }} />
        <CustomButton onClick={this.handleCreateEquityRange}>Create</CustomButton>
        <CustomizedTable equityrangeList={this.props.equityrangeList} onUpdate={this.handleUpdate} onDelete={this.handleDelete} />
      </main>
    );
  }
}

(EquityRangePage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    countryList: state.countryReducer.countryList,
    selectedCompany: state.companyReducer.selectedCompany,
    equityrangeList: state.equityrangeReducer.equityrangeList
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EquityRangePage));
