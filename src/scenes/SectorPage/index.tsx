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
import CustomButton from "./component/CustomButton";
import { mapDispatchToProps } from "../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../interface/propsInterface";
import { Collapse, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import classnames from "classnames";
import { history } from "../../store";
import { Sector } from "../../interface/sectorInterface";
import { isMaster, isTechnical, isSales } from "../../function/checkRole";

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
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: "rotate(180deg)"
    }
  });

export interface Props
  extends WithStyles<typeof styles>,
    SharedDispatchProps,
    InState {}

interface InState {
  sectorList: Sector[];
  role: string;
}
class CustomizedTable extends React.Component<Props, any> {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleNewIndustryClick = this.handleNewIndustryClick.bind(this);
    this.handleDeleteSector = this.handleDeleteSector.bind(this);
    this.handleDeleteIndustry = this.handleDeleteIndustry.bind(this);
  }

  state = {
    1: false
  };

  componentDidMount() {
    console.log("SectorPage Mount");
  }

  handleNewIndustryClick = (sector: Sector) => {
    this.props.selectSector(sector);
    history.push("/sector/createindustry");
  };

  handleDeleteSector = id => {
    const payload = {
      type: "delete",
      object: "sector",
      id: id
    };
    this.props.showDialog(payload);
  };

  handleDeleteIndustry = id => {
    const payload = {
      type: "delete",
      object: "industry",
      id: id
    };
    this.props.showDialog(payload);
  };

  handleClick = (index: any) => {
    this.setState(state => ({ [index]: !state[index] }));
    console.log(this.state);
  };

  render() {
    const { classes } = this.props;

    return (
      <main>
        {!isTechnical(this.props.role) && !isSales(this.props.role) && (
          <CustomButton link="/sector/create">New Sector</CustomButton>
        )}
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <colgroup>
              <col style={{ width: "20%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "30%" }} />
              <col style={{ width: "40%" }} />
            </colgroup>
            <TableHead>
              <TableRow>
                <CustomTableCell align="left">Sector</CustomTableCell>
                <CustomTableCell align="left">Industry</CustomTableCell>
                <CustomTableCell align="center">Delete</CustomTableCell>
              </TableRow>
            </TableHead>
            {this.props.sectorList.length > 0 && (
              <TableBody>
                {this.props.sectorList.map((row, index) => [
                  <TableRow className={classes.row} key={row.name}>
                    <CustomTableCell component="th" scope="row">
                      {row.name}
                    </CustomTableCell>
                    <CustomTableCell align="left">
                      <IconButton
                        className={classnames(classes.expand, {
                          [classes.expandOpen]: this.state[index]
                        })}
                        onClick={() => this.handleClick(index)}
                        aria-expanded={this.state[index]}
                        aria-label="Show more"
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </CustomTableCell>

                    {!this.state[index] ? (
                      <CustomTableCell align="center">
                        {isMaster(this.props.role) && (
                          <IconButton
                            onClick={() =>
                              this.handleDeleteSector(row.sector_id)
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </CustomTableCell>
                    ) : (
                      <CustomTableCell align="right">
                        <Collapse
                          key={row.name}
                          in={this.state[index]}
                          timeout="auto"
                          unmountOnExit={true}
                        >
                          {row.industry.length > 0 && (
                            <Table>
                              <TableBody>
                                {row.industry.map(row => (
                                  <TableRow
                                    className={classes.row}
                                    key={row.name}
                                  >
                                    <CustomTableCell align="left">
                                      {row.name}
                                    </CustomTableCell>
                                    <CustomTableCell align="left">
                                      {isMaster(this.props.role) && (
                                        <IconButton
                                          onClick={() =>
                                            this.handleDeleteIndustry(
                                              row.industry_id
                                            )
                                          }
                                        >
                                          <DeleteIcon />
                                        </IconButton>
                                      )}
                                    </CustomTableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          )}
                          {isMaster(this.props.role) && (
                            <IconButton
                              onClick={() => this.handleNewIndustryClick(row)}
                            >
                              <AddIcon />
                            </IconButton>
                          )}
                        </Collapse>
                      </CustomTableCell>
                    )}
                  </TableRow>
                ])}
              </TableBody>
            )}
          </Table>
        </Paper>
      </main>
    );
  }
}

(CustomizedTable as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: any) {
  return {
    sectorList: state.sectorReducer.sectorList,
    role: state.authenticationReducer.profile.info.role_name
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CustomizedTable));
