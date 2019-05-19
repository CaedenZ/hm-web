import React from "react";
import PropTypes from "prop-types";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import { SharedDispatchProps } from "../../../../interface/propsInterface";
import { Company } from "../../../../interface/companyInterface";
import { JobChart, Cell } from "../../../../interface/jobchartInterface";
import { RootState } from "../../../../reducer";
import { mapDispatchToProps } from "../../../../helper/dispachProps";
import { connect } from "react-redux";
import UpdateCell from "./updatecell";
import { isMaster } from "../../../../function/checkRole";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

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
    hiddenbutton: {
      background: "black",
      color: "white",
      padding: "0"
    },
    button: {
      "&:disabled": {
        color: "black"
      },
      color: "blue"
    }
  });

export interface Props
  extends WithStyles<typeof styles>,
    SharedDispatchProps,
    InState {}

interface State {
  edit: boolean;
  updatebox: boolean;
  profile: Cell;
}

interface InState {
  removeCompanyData: any;
  selectedCompany: Company;
  jobchartList: JobChart[];
  companyData: JobChart[];
  role: string;
}
class CustomizedTable extends React.Component<Props, State> {
  state = {
    edit: false,
    updatebox: false,
    profile: {
      profile_id: 0,
      name: "",
      rank: 0,
      value: "",
      company_id: "",
      isCompany: 0
    }
  };

  componentDidMount() {
    console.log(this.props.companyData);
    console.log("this.props.companyData");
  }

  getProfile = (jobchart: JobChart, rank: number) => {
    let profile = jobchart.column_data.find(e => {
      return e.rank === rank;
    });

    return profile;
  };

  getValue = (jobchart: JobChart, rank: number) => {
    let profile = this.getProfile(jobchart, rank);
    if (profile !== undefined) {
      return profile.value;
    } else return "";
  };

  handleEditButtonClick = () => {
    this.setState({ edit: !this.state.edit });
  };

  handleUpdateButtonClick = (jobchart, rank) => {
    let profile = this.getProfile(jobchart, rank);
    this.setState({ updatebox: !this.state.updatebox });
    if (profile !== undefined) {
      this.setState({ profile: profile });
      console.log(profile);
    }
  };

  handleSubmit = value => {
    console.log("called");
    let profile = {
      ...this.state.profile,
      value: value
    };
    this.props.updateCell(profile);
    this.setState({ updatebox: false });
  };

  handleClose = () => {
    this.setState({ updatebox: false });
  };

  getCompanyDataHeader = () => {
    let rows: any = [];
    if (this.props.companyData.length > 0) {
      this.props.companyData.forEach((data, i) => {
        rows.push(
          <CustomTableCell align="left">
            <Button
              onClick={() => this.props.removeCompanyData(i)}
              className={this.props.classes.hiddenbutton}
              style={{ padding: 0 }}
            >
              {data.column_name}
            </Button>
          </CustomTableCell>
        );
      });
      return rows;
    } else {
      return;
    }
  };

  getCompanyDataCell = index => {
    let rows: any = [];
    if (this.props.companyData.length > 0) {
      this.props.companyData.forEach(data => {
        rows.push(
          <CustomTableCell component="th" scope="row">
            <Button
              className={this.props.classes.button}
              disabled={!this.state.edit}
              onClick={() => this.handleUpdateButtonClick(data, index)}
            >
              {this.getValue(data, index)}
            </Button>
          </CustomTableCell>
        );
      });
      return rows;
    } else {
      return;
    }
  };

  render() {
    const { classes } = this.props;

    const tbody = () => {
      let rows: any = [];
      for (let i = 1; i < 51; i++) {
        rows.push(
          <TableRow className={classes.row} key={i}>
            <CustomTableCell component="th" scope="row">
              {i}
            </CustomTableCell>
            {this.props.jobchartList.map(row => (
              <CustomTableCell component="th" scope="row" key={row.column_name}>
                <Button
                  className={classes.button}
                  disabled={!this.state.edit}
                  onClick={() => this.handleUpdateButtonClick(row, i)}
                >
                  {this.getValue(row, i)}
                </Button>
              </CustomTableCell>
            ))}
            {this.getCompanyDataCell(i)}
          </TableRow>
        );
      }

      return rows;
    };

    return (
      <Paper className={classes.root}>
        {isMaster(this.props.role) && (
          <Button onClick={this.handleEditButtonClick}>Edit</Button>
        )}
        <UpdateCell
          open={this.state.updatebox}
          handleClose={this.handleClose}
          handleSubmit={this.handleSubmit}
        />
        {this.props.jobchartList.length > 0 && (
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell align="left">Rank</CustomTableCell>
                {this.props.jobchartList.map(row => (
                  <CustomTableCell key={row.column_name} align="left">
                    {row.column_name}
                  </CustomTableCell>
                ))}
                {this.getCompanyDataHeader()}
              </TableRow>
            </TableHead>
            <TableBody>{tbody()}</TableBody>
          </Table>
        )}
      </Paper>
    );
  }
}

(CustomizedTable as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    selectedCompany: state.companyReducer.selectedCompany,
    role: state.authenticationReducer.profile.info.role_name
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CustomizedTable));
