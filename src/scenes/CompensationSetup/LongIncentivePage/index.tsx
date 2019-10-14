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
import { Typography, Divider, Paper } from "@material-ui/core";
import CustomButton from "../../../helper/components/CustomButton";
import EquityrangePage from "./EquityRangePage"
import CustomizedTable_v2 from "./component/stable";
import Component from "../../OfferModelPage/Component";

const styles = (theme: Theme) =>
  createStyles({
    main: {
      width: "100%",
      padding: "1rem"
    },
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
  selectedlti: string;
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
    selectedlti: ""
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

  handleEquityRangeClick = equityrange => {
    console.log(equityrange)
    this.setState({ selectedlti: "Showing Equity Range for " + equityrange.type })
    this.props.selectLongIncentive(equityrange.longterm_incentive_id);
    this.props.getEquityRangeList()
    this.setState({ equityrange: true })
  }

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
        country: ' ',
        equity_type: ' ',
        job_grade: ' ',
        min: 0,
        mid: 0,
        max: 0,
        share_symbol: ' ',
        share_exchange: ' ',
        share_price: 0,
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
    let { classes } = this.props;
    return (
      <main>
        <Paper className={classes.main}>
        <CustomizedTable_v2 longincentiveList={this.props.longincentiveList} onUpdate={this.handleUpdateButtonClick} onEquityRange={this.handleEquityRangeClick} />
        </Paper>
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
