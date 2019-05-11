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
import CustomButton from "../component/CustomButton";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { Company, Unit } from "../../../interface/companyInterface";
import { RootState } from "../../../reducer";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { IconButton, Typography, Menu, MenuItem } from "@material-ui/core";
import { history } from "../../../store";
import ViewIcon from "@material-ui/icons/ZoomIn";
import CompanyIcon from "@material-ui/icons/Business";

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
    parentrow: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.background.default
      },
      height: 20
    },
    parentTable: {
      width: 300
    }
  });

export interface Props
  extends WithStyles<typeof styles>,
    SharedDispatchProps,
    InState {}

interface State {}

interface InState {
  subUnitList: Unit[];
  parentUnit: Unit;
  entityList: Company[];
}

class SubUnitPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.handleViewButtonClick = this.handleViewButtonClick.bind(this);
  }

  state = {
    anchorEl: null
  };

  componentDidMount() {
    this.props.getSubUnitList();
  }

  handleViewButtonClick = unit => {
    this.props.selectSubUnit(unit);
    history.push("/unit/subunit/childunit");
  };

  handleUpdateButtonClick = unit => {
    console.log("clicked");
    this.props.selectUpdateUnit(unit);
    history.push("/unit/subunit/update");
  };

  handleEntity = (row, event) => {
    switch (row.unit_type) {
      case "country":
        const a = JSON.parse(row.unit_data);
        console.log(a.country_name);
        this.props.getCompanyByCountry(a.country_name);
        break;
      case "region":
        const b = JSON.parse(row.unit_data);
        console.log(b.region_id);
        this.props.getCompanyByRegion(b.region_id);
        break;
    }
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleDelete = id => {
    const payload = {
      type: "delete",
      object: "subunit",
      id: id
    };
    this.props.showDialog(payload);
    // this.props.deleteSubUnit(id)
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    return (
      <main>
        <div>
          <Typography>Parent</Typography>
          <Table className={classes.parentTable}>
            <TableHead>
              <TableRow className={classes.parentrow}>
                <CustomTableCell>division_name</CustomTableCell>
                <CustomTableCell align="right">division_type</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableRow className={classes.parentrow}>
              <CustomTableCell component="th" scope="row">
                {this.props.parentUnit.unit_name}
              </CustomTableCell>
              <CustomTableCell align="right">
                {this.props.parentUnit.unit_type}
              </CustomTableCell>
            </TableRow>
          </Table>
        </div>
        <CustomButton link="/unit/subunit/create">New Division</CustomButton>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>division_name</CustomTableCell>
                <CustomTableCell align="right">division_type</CustomTableCell>
                <CustomTableCell align="right">Action</CustomTableCell>
              </TableRow>
            </TableHead>
            {this.props.subUnitList.length > 0 && (
              <TableBody>
                {this.props.subUnitList.map(row => (
                  <TableRow className={classes.row} key={row.unit_id}>
                    <CustomTableCell component="th" scope="row">
                      {row.unit_name}
                    </CustomTableCell>
                    <CustomTableCell align="right">
                      {row.unit_type}
                      {row.unit_type !== "Division" && (
                        <IconButton onClick={e => this.handleEntity(row, e)}>
                          <CompanyIcon />
                        </IconButton>
                      )}
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}
                      >
                        {this.props.entityList.length > 0 ? (
                          this.props.entityList.map(e => {
                            return (
                              <MenuItem
                                key={e.company_id}
                                onClick={this.handleClose}
                              >
                                {e.company_name}
                              </MenuItem>
                            );
                          })
                        ) : (
                          <MenuItem onClick={this.handleClose}>
                            No exist entity
                          </MenuItem>
                        )}
                      </Menu>
                    </CustomTableCell>
                    <CustomTableCell align="right">
                      <IconButton
                        onClick={() => this.handleViewButtonClick(row)}
                      >
                        <ViewIcon />
                      </IconButton>
                    </CustomTableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </Paper>
      </main>
    );
  }
}

(SubUnitPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    subUnitList: state.companyReducer.subUnitList,
    parentUnit: state.companyReducer.selectedUnit,
    entityList: state.companyReducer.unitEntity
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SubUnitPage));
