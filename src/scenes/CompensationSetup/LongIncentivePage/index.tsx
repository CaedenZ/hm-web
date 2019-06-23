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
import { LongIncentive } from "../../../interface/longIncentiveInterface";
import { history } from "../../../store";
import { Company } from "../../../interface/companyInterface";
import { Country } from "../../../interface/countryInterface";
import CustomizedTable from "./component/table";
import { Typography } from "@material-ui/core";
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
  equityrange: boolean;
}

interface InState {
  countryList: Country[];
  selectedCompany: Company;
  longincentiveList: LongIncentive[];
}
class LongIncentivePage extends React.Component<Props, State> {
  state = {
    country: "",
    global: true,
    created: false,
    equityrange: false,
  };

  componentDidMount() {
    console.log("LongIncentivePage MOunt");
    if (this.props.selectedCompany.company_id === "") {
      let data = {
        type: "warning",
        object: "Please Select a Company first",
        id: "1"
      };
      this.props.showDialog(data);
    } else this.props.getLongIncentiveList();
  }

  handleUpdateButtonClick = longincentive => {
    this.props.updateLongIncentive(longincentive);
    this.setState({ created: false })
  };

  handleDelete = id => {
    const payload = {
      type: "delete",
      object: "longincentive",
      id: id
    };
    this.props.showDialog(payload);
  };

  handleNewGrade = () => {
    if (!this.state.created) {
      const data = {
        value: ' ',
        type: ' ',
        investing_type: ' ',
        share_symbol: ' ',
        share_exchange: ' ',
        currency: ' ',
        isOptional: ' ',
        year1: 0,
        year2: 0,
        year3: 0,
        year4: 0,
        year5: 0,
        year6: 0,
      }
      this.props.createLongIncentive(data)
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
        <CustomizedTable longincentiveList={this.props.longincentiveList} onUpdate={this.handleUpdateButtonClick} />

        
      </main>
    );
  }
}

(LongIncentivePage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    countryList: state.countryReducer.countryList,
    selectedCompany: state.companyReducer.selectedCompany,
    longincentiveList: state.longIncentiveReducer.longincentiveList
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LongIncentivePage));
