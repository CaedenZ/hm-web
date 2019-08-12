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
import { RootState } from "../../reducer";
import { mapDispatchToProps } from "../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../interface/propsInterface";
import { User } from "../../interface/userInterface";
import { IconButton, Dialog, DialogContent } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { history } from "../../store";
import UpdateIcon from "@material-ui/icons/LibraryBooks";
import ResetIcon from "@material-ui/icons/Lock";
import DetailIcon from "@material-ui/icons/RecentActors";
import ResetPassword from "./component/resetPassword";
import { Company } from "../../interface/companyInterface";
import { isUserHR, isUserPowerOrHR } from "../../function/checkRole";
import FormPage from "./component/form";
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
    },
    logo: {
      height: "20px"
    },
    dialogMaxWidth: {
      maxWidth: "100%"
    }
  });

export interface Props
  extends WithStyles<typeof styles>,
  SharedDispatchProps,
  InState { }

interface State {
  resetPassword: boolean;
  isModalOpen: boolean;
  viewUser: any;
}

interface InState {
  selectedCompany: Company;
  userList: User[];
  currentUserEmail: string;
  role: string;
}
class CustomizedTable extends React.Component<Props, State> {
  state = {
    resetPassword: false,
    isModalOpen: false,
    viewUser: null
  };

  componentDidMount() {
    console.log("UserPage MOunt");
    if (this.props.selectedCompany.company_id === "") {
      let data = {
        type: "warning",
        object: "Please Select a Company first",
        id: "1"
      };
      this.props.showDialog(data);
    } else this.props.getUserList();
  }

  handleViewButtonClick = user => {
    this.setState({ viewUser: user, isModalOpen: true });
    this.forceUpdate();
    console.log(this.state);
  };

  handleModalClose = () => {
    this.setState({ isModalOpen: false });
  };

  handleViewUser = (e, data) => { };

  handleUpdateButtonClick = user => {
    this.props.selectUser(user);
    history.push("/user/update");
  };

  handleResetPassword = user => {
    this.props.selectUser(user);
    this.setState({ resetPassword: true });
  };

  handleClose = () => {
    this.setState({ resetPassword: false });
  };
  handleDelete = (id, index) => {
    const payload = {
      type: "delete",
      object: "user",
      id: id
    };
    this.props.showDialog(payload);
  };

  handleNewUser = () => {
    history.push("/user/create");
  };

  render() {
    const { classes } = this.props;

    return (
      <main>
        {!isUserHR(this.props.role) && (
          <CustomButton onClick={this.handleNewUser}>New User</CustomButton>
        )}
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell />
                <CustomTableCell align="left">First Name</CustomTableCell>
                <CustomTableCell align="left">Last Name</CustomTableCell>
                <CustomTableCell align="left">Email</CustomTableCell>
                <CustomTableCell align="left">Role</CustomTableCell>
                <CustomTableCell align="left">Status</CustomTableCell>
                <CustomTableCell align="left">Action</CustomTableCell>
              </TableRow>
            </TableHead>
            {this.props.userList.length > 0 && (
              <TableBody>
                {this.props.userList.map((row, index) => (
                  <TableRow className={classes.row} key={row.email} style={{height: "6rem"}}>
                    <CustomTableCell component="th" scope="row" style={{height: "6rem"}}>
                      <img 
                        className={classes.logo}
                        src={row.image}
                        alt=""
                        style={{height: "5rem"}}
                      />
                    </CustomTableCell>
                    <CustomTableCell align="left">
                      {row.firstname}
                    </CustomTableCell>
                    <CustomTableCell align="left">
                      {row.lastname}
                    </CustomTableCell>
                    <CustomTableCell align="left">{row.email}</CustomTableCell>
                    <CustomTableCell align="left">{row.role_name}</CustomTableCell>
                    <CustomTableCell align="left">{row.status}</CustomTableCell>
                    <CustomTableCell align="left">
                      <IconButton
                        onClick={() => this.handleViewButtonClick(row)}
                      >
                        <DetailIcon />
                      </IconButton>
                      {!isUserHR(this.props.role) && (
                        <IconButton
                          onClick={() => this.handleUpdateButtonClick(row)}
                        >
                          <UpdateIcon />
                        </IconButton>
                      )}
                      {!isUserHR(this.props.role) && (
                        <IconButton
                          onClick={() => this.handleResetPassword(row)}
                        >
                          <ResetIcon />
                        </IconButton>
                      )}
                      {row.email !== this.props.currentUserEmail &&
                        !isUserPowerOrHR(this.props.role) && (
                          <IconButton
                            onClick={() => this.handleDelete(row.email, index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                    </CustomTableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </Paper>
        <ResetPassword
          open={this.state.resetPassword}
          handleClose={this.handleClose}
        />
        <Dialog
          open={this.state.isModalOpen}
          onClose={this.handleModalClose}
          maxWidth={false}
        >
          <DialogContent>
            <FormPage
              view={true}
              create={false}
              updateData={this.state.viewUser}
              onSubmit={(e, data) => this.handleViewUser(e, data)}
            />
          </DialogContent>
        </Dialog>
      </main>
    );
  }
}

(CustomizedTable as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    selectedCompany: state.companyReducer.selectedCompany,
    userList: state.userReducer.userList,
    currentUserEmail: state.authenticationReducer.email,
    role: state.authenticationReducer.profile.info.role_name
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CustomizedTable));
