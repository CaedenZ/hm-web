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
import { SharedDispatchProps } from "../../interface/propsInterface";
import { Company, Unit } from "../../interface/companyInterface";
import { RootState } from "../../reducer";
import { mapDispatchToProps } from "../../helper/dispachProps";
import { connect } from "react-redux";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { history } from "../../store";
import UpdateIcon from "@material-ui/icons/PlaylistAddCheck";
import ViewIcon from "@material-ui/icons/ZoomIn";
import CompanyIcon from "@material-ui/icons/Business";
import CustomButton from "../../helper/components/CustomButton";

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
    }
  });

export interface Props
  extends WithStyles<typeof styles>,
    SharedDispatchProps,
    InState {}

interface State {
  anchorEl: any;
}

interface InState {
  unitList: Unit[];
  entityList: Company[];
}

class UnitPage extends React.Component<Props, State> {
  state = {
    anchorEl: null
  };

  constructor(props) {
    super(props);
    this.handleViewButtonClick = this.handleViewButtonClick.bind(this);
    this.handleUpdateButtonClick = this.handleUpdateButtonClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    console.log("Unit Page Mount");
    this.props.getUnitList();
  }

  handleViewButtonClick = unit => {
    this.props.selectUnit(unit);
    history.push("/unit/subunit");
  };

  handleUpdateButtonClick = unit => {
    console.log("clicked");
    this.props.selectUpdateUnit(unit);
    history.push("/unit/update");
  };

  handleEntity = (row, event) => {
    switch (row.unit_type) {
      case "country":
        this.props.getCompanyByCountry(row.unit_data);
        break;
      case "region":
        const b = JSON.parse(row.unit_data);
        console.log(b.region_id);
        this.props.getCompanyByRegion(b.region_id);
        break;
    }
    this.setState({ anchorEl: event.currentTarget });
  };

  handleDelete = id => {
    const payload = {
      type: "delete",
      object: "unit",
      id: id
    };
    this.props.showDialog(payload);
    // this.props.deleteUnit(id)
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    return (
      <main>
        <CustomButton onClick={()=> history.push("/unit/create")}>New Division</CustomButton>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>unit_name</CustomTableCell>
                <CustomTableCell align="right">unit_type</CustomTableCell>
                <CustomTableCell align="right">Action</CustomTableCell>
              </TableRow>
            </TableHead>
            {this.props.unitList.length > 0 && (
              <TableBody>
                {this.props.unitList.map(row => (
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
                      <IconButton
                        onClick={() => this.handleUpdateButtonClick(row)}
                      >
                        <UpdateIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => this.handleDelete(row.unit_id)}
                      >
                        <DeleteIcon />
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

(UnitPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    unitList: state.companyReducer.unitList,
    entityList: state.companyReducer.unitEntity
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UnitPage));
