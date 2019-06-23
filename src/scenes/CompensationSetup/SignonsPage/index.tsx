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
import { Signons } from "../../../interface/signonsInterface";
import { history } from "../../../store";
import { Company } from "../../../interface/companyInterface";
import { Country } from "../../../interface/countryInterface";
import CustomizedTable from "./component/table";
import { Typography } from "@material-ui/core";
import CustomButton from "../../../helper/components/CustomButton";
import Breakdown from "./component/breakdown"
import { getBreakdownList, updateBreakdown, createBreakdown, deleteBreakdown } from "../../../api/signonbreakdownAPI";

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
  breakdownList: any[];
  breakdown: boolean;
  selectsignonid: string;
}

interface InState {
  countryList: Country[];
  selectedCompany: Company;
  signonsList: Signons[];
  sessionkey: string;
}
class SignonsPage extends React.Component<Props, State> {
  state = {
    country: "",
    global: true,
    created: false,
    breakdownList: [],
    breakdown: false,
    selectsignonid: '',
  };

  componentDidMount() {
    console.log("SignonsPage MOunt");
    if (this.props.selectedCompany.company_id === "") {
      let data = {
        type: "warning",
        object: "Please Select a Company first",
        id: "1"
      };
      this.props.showDialog(data);
    } else this.props.getSignonsList();
  }

  handleUpdateButtonClick = signons => {
    this.props.updateSignons(signons);
  };

  handleUpdateBreakdownButtonClick = async breakdown => {
    await updateBreakdown(this.props.sessionkey, breakdown, this.state.selectsignonid)
    const data = await getBreakdownList(this.props.sessionkey, this.state.selectsignonid)
    this.setState({ breakdownList: data })
  }

  handleBreakdownClick = async row => {
    this.setState({ selectsignonid: row.signons_id })
    const data = await getBreakdownList(this.props.sessionkey, row.signons_id)
    this.setState({ breakdown: true })
    this.setState({ breakdownList: data })
  }

  handleCreateBreakdown = async () => {
    const createdata = {
      month: '',
      value: ''
    }

    await createBreakdown(this.props.sessionkey, createdata, this.state.selectsignonid)

    const data = await getBreakdownList(this.props.sessionkey, this.state.selectsignonid)
    this.setState({ breakdownList: data })

  }

  handleDelete = id => {
    const payload = {
      type: "delete",
      object: "signons",
      id: id
    };
    this.props.showDialog(payload);
  };

  handleDeleteBreakdown = async id => {
    await deleteBreakdown(this.props.sessionkey, id)
    const data = await getBreakdownList(this.props.sessionkey, this.state.selectsignonid)
    this.setState({ breakdownList: data })
  }

  handleNewGrade = () => {
    if (!this.state.created) {
      const data = {
        value: ' ',
        type: ' ',
        isOptional: 'N',
      }
      this.props.createSignons(data)
    }
    else {
      this.props.showDialog({
        type: 'warning',
        object: 'Please do not create multiple entry in a single time',
        id: '1'
      })
    }
  };

  render() {
    return (
      <main>
        <CustomButton onClick={this.handleNewGrade}>
          Create
        </CustomButton>
        <CustomizedTable signonsList={this.props.signonsList} onUpdate={this.handleUpdateButtonClick} onBreakdown={this.handleBreakdownClick} />
        {this.state.breakdown && <Breakdown breakdownList={this.state.breakdownList} onCreate={this.handleCreateBreakdown} onUpdate={this.handleUpdateBreakdownButtonClick} onDelete={this.handleDeleteBreakdown} />}
      </main>
    );
  }
}

(SignonsPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    countryList: state.countryReducer.countryList,
    selectedCompany: state.companyReducer.selectedCompany,
    signonsList: state.signonsReducer.signonsList,
    sessionkey: state.authenticationReducer.token,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SignonsPage));
