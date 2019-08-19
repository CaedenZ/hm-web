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
import { Company, Entity } from "../../interface/companyInterface";
import { mapDispatchToProps } from "../../helper/dispachProps";
import { connect } from "react-redux";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { history } from "../../store";
import UpdateIcon from "@material-ui/icons/LibraryBooks";
import { isUserHR, isUserPowerOrHR } from "../../function/checkRole";
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
    }
  });

export interface Props
  extends WithStyles<typeof styles>,
    SharedDispatchProps,
    InState {}

interface State {}

interface InState {
  selectedCompany: Company;
  companyList: Entity[];
  role: string;
}

class CustomizedTable extends React.Component<Props, State> {
  componentDidMount() {
    console.log("clicked");
    if (this.props.selectedCompany.company_id === "") {
      let data = {
        type: "warning",
        object: "Please Select a Company first",
        id: "1"
      };
      this.props.showDialog(data);
    } else this.props.getChildCompanyList();
  }

  handleUpdateButtonClick = company => {
    this.props.selectUpdateEntity(company);
    history.push("/entity/update");
  };

  handleViewButtonClick = company => {
    this.props.selectCompany(company);
  };

  handleDelete = id => {
    const payload = {
      type: "delete",
      object: "subcompany",
      id: id
    };
    this.props.showDialog(payload);
    // this.props.deleteSubCompany(id)
  };

  render() {
    const { classes } = this.props;

    return (
      <main>
        {!isUserHR(this.props.role) && (
          <CustomButton onClick={()=> history.push("/entity/create")}>New Entity</CustomButton>
        )}
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell align="left">Country</CustomTableCell>
                <CustomTableCell>Company Name</CustomTableCell>
                <CustomTableCell align="left">Contact Person</CustomTableCell>
                <CustomTableCell align="left">Contact Number</CustomTableCell>
                <CustomTableCell align="left">Contact Email</CustomTableCell>               
                <CustomTableCell align="left">Action</CustomTableCell>
              </TableRow>
            </TableHead>
            {this.props.companyList.length > 0 && (
              <TableBody>
                {this.props.companyList.map(row => (
                  <TableRow className={classes.row} key={row.company_id}>
                    <CustomTableCell align="left">
                      {row.country}
                    </CustomTableCell>
                    <CustomTableCell component="th" scope="row">
                      {row.company_name}
                    </CustomTableCell>
                    <CustomTableCell align="left">
                      {row.contact_person}
                    </CustomTableCell>
                    <CustomTableCell align="left">
                      {row.contact_number}
                    </CustomTableCell>
                    <CustomTableCell align="left">
                      {row.contact_email}
                    </CustomTableCell>                   
                    <CustomTableCell align="left">
                      {/* <IconButton onClick={() => this.handleViewButtonClick(row)}><ViewIcon /></IconButton> */}
                      {!isUserHR(this.props.role) && (
                        <IconButton
                          onClick={() => this.handleUpdateButtonClick(row)}
                        >
                          <UpdateIcon />
                        </IconButton>
                      )}
                      {!isUserPowerOrHR(this.props.role) && (
                        <IconButton
                          onClick={() => this.handleDelete(row.company_id)}
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
      </main>
    );
  }
}

(CustomizedTable as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: any) {
  return {
    selectedCompany: state.companyReducer.selectedCompany,
    companyList: state.companyReducer.childCompanyList,
    role: state.authenticationReducer.profile.info.role_name
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CustomizedTable));
