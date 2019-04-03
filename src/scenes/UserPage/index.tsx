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
import { history } from "../../store";
import UpdateIcon from '@material-ui/icons/PlaylistAddCheck';

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
  });

export interface Props extends WithStyles<typeof styles>, SharedDispatchProps, InState { }

interface State { }

interface InState {
  userList: User[]
}
class CustomizedTable extends React.Component<Props, State> {


  componentDidMount() {
    console.log('UserPage MOunt')
  }

  handleUpdateButtonClick = (user) => {
    this.props.selectUser(user)
    history.push('/user/update')
    console.log('clicked')
  }

  handleDelete = (id, index) => {

    const payload = {
      type: 'delete',
      object: 'user',
      id: id,
    }
    this.props.showDialog(payload)
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
                <CustomTableCell>/</CustomTableCell>
                <CustomTableCell align="left">Firstname</CustomTableCell>
                <CustomTableCell align="left">Lastname</CustomTableCell>
                <CustomTableCell align="left">Email</CustomTableCell>
                <CustomTableCell align="left">Status</CustomTableCell>
                <CustomTableCell align="left">Action</CustomTableCell>
              </TableRow>
            </TableHead>
            {this.props.userList.length > 0 && <TableBody>
              {this.props.userList.map((row, index) => (
                <TableRow className={classes.row} key={row.email}>
                  <CustomTableCell component="th" scope="row"><img className={classes.logo} src={row.image} /></CustomTableCell>
                  <CustomTableCell align="left">{row.firstname}</CustomTableCell>
                  <CustomTableCell align="left">{row.lastname}</CustomTableCell>
                  <CustomTableCell align="left">{row.email}</CustomTableCell>
                  <CustomTableCell align="left">{row.status}</CustomTableCell>
                  <CustomTableCell align="left">
                    <IconButton onClick={() => this.handleUpdateButtonClick(row)}><UpdateIcon /></IconButton>
                    <IconButton onClick={() => this.handleDelete(row.email, index)}><DeleteIcon /></IconButton>
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
