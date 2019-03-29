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
import { RootState } from "../../reducer";
import { mapDispatchToProps } from "../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../interface/propsInterface";
import { JobFunction } from "../../interface/jobfunctionInterface";
import { Collapse, Button, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';

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

let id = 0;
function createData(
  name: any,
  calories: any,
  fat: any,
  carbs: any,
  protein: any
) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}


export interface Props extends WithStyles<typeof styles>, SharedDispatchProps, InState { }

interface State {
}

interface InState {
  jobFunctionList: JobFunction[]
}
class CustomizedTable extends React.Component<Props, any> {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleNewJobFunctionClick = this.handleNewJobFunctionClick.bind(this)
    this.handleDeleteJF = this.handleDeleteJF.bind(this)
    this.handleDeleteSJF = this.handleDeleteSJF.bind(this)
  }

  state = {
    1: false
  }

  componentDidMount() {
    this.props.getJobFunctionList()
  }

  handleNewJobFunctionClick = (jobFunction: JobFunction) => {
    this.props.selectJobFunction(jobFunction)
  }

  handleDeleteJF = (id) => {
    console.log(this.state)
    this.props.deleteJobFunction(id)
  }

  handleDeleteSJF = (id) => {
    console.log(this.state)
    this.props.deleteSubJobFunction(id)
  }

  handleClick = (index: any) => {
    this.setState(state => ({ [index]: !state[index] }));
    console.log(this.state)
  }

  render() {
    const { classes } = this.props;

    return (
      <main>
        <CustomButton link="/jobfunction/create">New JobFunction</CustomButton>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <colgroup>
              <col style={{ width: '20%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '30%' }} />
              <col style={{ width: '40%' }} />
            </colgroup>
            <TableHead>
              <TableRow>
                <CustomTableCell align="right">job_name</CustomTableCell>
                <CustomTableCell align="right">description</CustomTableCell>
                <CustomTableCell align="right">Action</CustomTableCell>
                <CustomTableCell align="right">Child</CustomTableCell>
              </TableRow>
            </TableHead>
            {this.props.jobFunctionList.length > 0 && <TableBody>
              {this.props.jobFunctionList.map((row, index) => ([
                <TableRow className={classes.row} key={row.jobfunction_id}>
                  <CustomTableCell component="th" scope="row">{row.job_name}</CustomTableCell>
                  <CustomTableCell align="right">{row.description}</CustomTableCell>
                  <CustomTableCell align="right">
                    <Button color="secondary" fullWidth variant="contained" onClick={() => this.handleClick(index)} >Expend Child</Button>
                    <Link to='/jobfunction/createsub' style={{ textDecoration: "none" }}><Button color="primary" fullWidth variant="contained" onClick={() => this.handleNewJobFunctionClick(row)} >New SubJobFunction</Button></Link>
                  </CustomTableCell>
                  <CustomTableCell align="right">
                    {!this.state[index] ? <IconButton onClick={() => this.handleDeleteJF(row.jobfunction_id)}><DeleteIcon /></IconButton> :
                      <Collapse key={row.job_name} in={this.state[index]} timeout="auto" unmountOnExit={true}>
                        {row.sjobfunction.length > 0 && <TableBody>
                          {row.sjobfunction.map(row => (
                            <TableRow className={classes.row} key={row.sjobfunction_id}>
                              {/* <CustomTableCell component="th" scope="row">{row.sjobfunction_id}</CustomTableCell> */}
                              <CustomTableCell align="right">{row.subjob_name}</CustomTableCell>
                              <CustomTableCell align="right">{row.description}</CustomTableCell>
                              <CustomTableCell align="right">
                                <IconButton onClick={() => this.handleDeleteSJF(row.sjobfunction_id)}><DeleteIcon /></IconButton>
                              </CustomTableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                        }
                      </Collapse>
                    }
                  </CustomTableCell>
                </TableRow>,
              ]
              ))}
            </TableBody>}
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
    jobFunctionList: state.jobFunctionReducer.jobFunctionList
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CustomizedTable));