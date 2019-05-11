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
import { IconButton, MenuItem, Menu } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { history } from "../../../../store";
import UpdateIcon from "@material-ui/icons/PlaylistAddCheck";
import { SharedDispatchProps } from "../../../../interface/propsInterface";
import { Company } from "../../../../interface/companyInterface";
import { SalaryRange } from "../../../../interface/salaryRangeInterface";
import { RootState } from "../../../../reducer";
import { mapDispatchToProps } from "../../../../helper/dispachProps";
import { connect } from "react-redux";

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
    }
  });

export interface Props
  extends WithStyles<typeof styles>,
    SharedDispatchProps,
    InState {}

interface State {}

interface InState {
  selectedCompany: Company;
  salaryrangeList: SalaryRange[];
}
class CustomizedTable extends React.Component<Props, State> {
  state = {
    country: "",
    global: false,
    anchorEl: null
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
    this.props.selectSalaryRange(salaryrange);
    history.push("/salaryrange/update");
    console.log("clicked");
  };

  handleDelete = (id, index) => {
    const payload = {
      type: "delete",
      object: "salaryrange",
      id: id
    };
    this.props.showDialog(payload);
  };

  handleListButtonClick = (event, row) => {
    this.setState({ anchorEl: event.currentTarget });
    this.props.selectSalaryRange(row);
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleRedirect = path => {
    history.push("/salaryrange/" + path);
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell align="left">Jobgrade Name</CustomTableCell>
              <CustomTableCell align="left">Type</CustomTableCell>
              <CustomTableCell align="left">Min</CustomTableCell>
              <CustomTableCell align="left">Mid</CustomTableCell>
              <CustomTableCell align="left">Max</CustomTableCell>
              <CustomTableCell align="left">Action</CustomTableCell>
            </TableRow>
          </TableHead>
          {this.props.salaryrangeList.length > 0 && (
            <TableBody>
              {this.props.salaryrangeList.map((row, index) => (
                <TableRow className={classes.row} key={row.salary_range_id}>
                  <CustomTableCell component="th" scope="row">
                    {row.jobgrade_name}
                  </CustomTableCell>
                  <CustomTableCell align="left">{row.type}</CustomTableCell>
                  <CustomTableCell align="left">{row.min}</CustomTableCell>
                  <CustomTableCell align="left">{row.mid}</CustomTableCell>
                  <CustomTableCell align="left">{row.max}</CustomTableCell>
                  <CustomTableCell align="left">
                    <IconButton
                      onClick={() => this.handleUpdateButtonClick(row)}
                    >
                      <UpdateIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        this.handleDelete(row.salary_range_id, index)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={this.state.anchorEl}
                      open={Boolean(this.state.anchorEl)}
                      onClose={this.handleClose}
                    >
                      <MenuItem
                        onClick={() => this.handleRedirect("salaryrange")}
                      >
                        SalaryRange
                      </MenuItem>
                      <MenuItem
                        onClick={() => this.handleRedirect("equityrange")}
                      >
                        EquityRange
                      </MenuItem>
                      <MenuItem
                        onClick={() => this.handleRedirect("salaryrange")}
                      >
                        SalaryRange
                      </MenuItem>
                      <MenuItem
                        onClick={() => this.handleRedirect("targetbonus")}
                      >
                        TargetBonus
                      </MenuItem>
                    </Menu>
                  </CustomTableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </Paper>
    );
  }
}

(CustomizedTable as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    selectedCompany: state.companyReducer.selectedCompany
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CustomizedTable));
