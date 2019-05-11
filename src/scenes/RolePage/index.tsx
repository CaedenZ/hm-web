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
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Role } from "../../interface/roleInterface";
import { history } from "../../store";
import UpdateIcon from "@material-ui/icons/PlaylistAddCheck";
import { Company } from "../../interface/companyInterface";

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

export interface Props
  extends WithStyles<typeof styles>,
    SharedDispatchProps,
    InState {}

interface State {}

interface InState {
  selectedCompany: Company;
  roleList: Role[];
}
class RolePage extends React.Component<Props, State> {
  componentDidMount() {
    console.log("Role Page Mounted");
    if (this.props.selectedCompany.company_id === "") {
      let data = {
        type: "warning",
        object: "Please Select a Company first",
        id: "1"
      };
      this.props.showDialog(data);
    } else this.props.getRoleList();
  }

  handleUpdateButtonClick = role => {
    this.props.selectRole(role);
    history.push("/role/update");
  };

  handleDelete = id => {
    const payload = {
      type: "delete",
      object: "role",
      id: id
    };
    this.props.showDialog(payload);
  };

  render() {
    const { classes } = this.props;

    return (
      <main>
        <CustomButton link="/role/create">New Role</CustomButton>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>Name</CustomTableCell>
                <CustomTableCell align="right">Description</CustomTableCell>
                <CustomTableCell align="right">Action</CustomTableCell>
              </TableRow>
            </TableHead>
            {this.props.roleList.length > 0 && (
              <TableBody>
                {this.props.roleList.map(row => (
                  <TableRow className={classes.row} key={row.role_id}>
                    <CustomTableCell component="th" scope="row">
                      {row.role_name}
                    </CustomTableCell>
                    <CustomTableCell align="right">
                      {row.role_description}
                    </CustomTableCell>
                    <CustomTableCell align="right">
                      <IconButton
                        onClick={() => this.handleUpdateButtonClick(row)}
                      >
                        <UpdateIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => this.handleDelete(row.role_id)}
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

(RolePage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    selectedCompany: state.companyReducer.selectedCompany,
    roleList: state.roleReducer.roleList
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(RolePage));
