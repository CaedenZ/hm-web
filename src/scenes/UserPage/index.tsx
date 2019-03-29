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
import { render } from "react-dom";
import CustomButton from "./component/CustomButton";
import { RootState } from "../../reducer";
import { mapDispatchToProps } from "../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../interface/propsInterface";
import { User } from "../../interface/userInterface";
import { Button, IconButton } from "@material-ui/core";
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

interface State { }

interface InState {
  userList: User[]
}
class CustomizedTable extends React.Component<Props, State> {


  componentDidMount() {
    this.props.getUserList()
  }

  handleUpdateButtonClick = (unit) => {
    console.log('clicked')
    // this.props.selectUnit(unit)
    // this.setState({
    //   redirect: true
    // })
  }

  handleDelete = (id) => {
    console.log('clicked')
  }

  render() {
    const { classes } = this.props;

    return (
      <main>
        <CustomButton link="/user/create">New User</CustomButton>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>Email</CustomTableCell>
                <CustomTableCell align="right">Firstname</CustomTableCell>
                <CustomTableCell align="right">Lastname</CustomTableCell>
                <CustomTableCell align="right">Status</CustomTableCell>
                <CustomTableCell align="right">Action</CustomTableCell>
              </TableRow>
            </TableHead>
            {this.props.userList.length > 0 && <TableBody>
              {this.props.userList.map(row => (
                <TableRow className={classes.row} key={row.email}>
                  <CustomTableCell component="th" scope="row">{row.email}</CustomTableCell>
                  <CustomTableCell align="right">{row.firstname}</CustomTableCell>
                  <CustomTableCell align="right">{row.lastname}</CustomTableCell>
                  <CustomTableCell align="right">{row.status}</CustomTableCell>
                  <CustomTableCell align="right">
                    <Button color="primary" variant="contained" onClick={() => this.handleUpdateButtonClick(row)}>view</Button>
                    <IconButton onClick={() => this.handleDelete(row.email)}><DeleteIcon /></IconButton>
                  </CustomTableCell>
                </TableRow>
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

function mapStateToProps(state: RootState) {
  return {
    userList: state.userReducer.userList
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CustomizedTable));
