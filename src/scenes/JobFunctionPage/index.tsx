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
import { mapDispatchToProps } from "../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../interface/propsInterface";
import { JobFunction } from "../../interface/jobfunctionInterface";
import { Collapse, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import classnames from "classnames";
import { history } from "../../store";
import { isMaster } from "../../function/checkRole";
import CustomButton from "../../helper/components/CustomButton";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#FF5733",
    color: theme.palette.common.white,
    fontSize: 12
  },
  body: {
    fontSize: 12
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
  InState { }

interface InState {
  jobFunctionList: JobFunction[];
  role: string;
}
class CustomizedTable extends React.Component<Props, any> {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleNewJobFunctionClick = this.handleNewJobFunctionClick.bind(this);
    this.handleDeleteJF = this.handleDeleteJF.bind(this);
    this.handleDeleteSJF = this.handleDeleteSJF.bind(this);
  }

  state = {
    1: false
  };

  componentDidMount() {
    console.log("JobFunctionPage Mount");
  }

  sortJobFunctioncompare(a: { job_name: string }, b: { job_name: string }) {
    return a.job_name.localeCompare(b.job_name);
  }

  handleNewJobFunctionClick = (jobFunction: JobFunction) => {
    this.props.selectJobFunction(jobFunction);
    history.push("/jobfunction/createsub");
  };

  handleDeleteJF = id => {
    const payload = {
      type: "delete",
      object: "jobfunction",
      id: id
    };
    this.props.showDialog(payload);
  };

  handleDeleteSJF = id => {
    const payload = {
      type: "delete",
      object: "subjobfunction",
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
        {isMaster(this.props.role) && (
          <CustomButton onClick={() => { history.push("/jobfunction/create") }}>
            New Job Function
          </CustomButton>
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
                <CustomTableCell align="left">Job Function</CustomTableCell>
                <CustomTableCell align="left">Job Sub Function</CustomTableCell>
                <CustomTableCell align="center">Delete</CustomTableCell>
              </TableRow>
            </TableHead>
            {this.props.jobFunctionList.length > 0 && (
              <TableBody>
                {this.props.jobFunctionList
                  .sort(this.sortJobFunctioncompare)
                  .map((row, index) => [
                    <TableRow className={classes.row} key={row.jobfunction_id}>
                      <CustomTableCell component="th" scope="row">
                        {row.job_name}
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
                                this.handleDeleteJF(row.jobfunction_id)
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </CustomTableCell>
                      ) : (
                          <CustomTableCell align="right">
                            <Collapse
                              key={row.job_name}
                              in={this.state[index]}
                              timeout="auto"
                              unmountOnExit={true}
                            >
                              {row.sjobfunction.length > 0 && (
                                <Table>
                                  <TableBody>
                                    {row.sjobfunction.map(row => (
                                      <TableRow
                                        className={classes.row}
                                        key={row.sjobfunction_id}
                                      >
                                        <CustomTableCell align="right">
                                          {row.subjob_name}
                                        </CustomTableCell>
                                        <CustomTableCell align="right">
                                          {isMaster(this.props.role) && (
                                            <IconButton
                                              onClick={() =>
                                                this.handleDeleteSJF(
                                                  row.sjobfunction_id
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
                              {/* <Button color="primary" variant="contained" onClick={() => this.handleNewJobFunctionClick(row)} >New SubJobFunction</Button> */}
                              {isMaster(this.props.role) && (
                                <IconButton
                                  onClick={() =>
                                    this.handleNewJobFunctionClick(row)
                                  }
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
    jobFunctionList: state.jobFunctionReducer.jobFunctionList,
    role: state.authenticationReducer.profile.info.role_name
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CustomizedTable));
