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
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import OfferIcon from "@material-ui/icons/More";
import { Contract } from "../../interface/contractInterface";
import { history } from "../../store";
import UpdateIcon from "@material-ui/icons/PlaylistAddCheck";
import { Company } from "../../interface/companyInterface";
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
  InState { }

interface State { }

interface InState {
  selectedCompany: Company;
  contractList: Contract[];
  role;
}
class ContractPage extends React.Component<Props, State> {
  componentDidMount() {
    console.log("Contract Page Mounted");
    if (this.props.selectedCompany.company_id === "") {
      let data = {
        type: "warning",
        object: "Please Select a Company first",
        id: "1"
      };
      this.props.showDialog(data);
    } else this.props.getContractList();
  }

  handleUpdateButtonClick = contract => {
    this.props.selectContract(contract);
    history.push("/jobposition/offermodel/contract/update");
  };

  handleOfferButtonClick = contract => {
    this.props.selectContract(contract);
    history.push("/jobposition/offermodel/contract/offermodel")
  }

  handleDelete = id => {
    const payload = {
      type: "delete",
      object: "contract",
      id: id 
    };
    this.props.showDialog(payload);
  };

  render() {
    const { classes } = this.props;

    return (
      <main>
        {!isUserHR(this.props.role) && (
          <CustomButton onClick={() => history.push("/jobposition/offermodel/contract/create")}>New Contract</CustomButton>
        )}
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell align="left">Country</CustomTableCell>
                <CustomTableCell align="left">Job Grade</CustomTableCell>
                <CustomTableCell align="left">Business Title</CustomTableCell>
                <CustomTableCell align="left">Job Function</CustomTableCell>
                <CustomTableCell align="right">Action</CustomTableCell>
              </TableRow>
            </TableHead>
            {this.props.contractList.length > 0 && (
              <TableBody>
                {this.props.contractList.map(row => (
                  <TableRow className={classes.row} key={row.contract_id}>
                    <CustomTableCell component="th" scope="row">
                      {row.contract_id}
                    </CustomTableCell>
                    <CustomTableCell component="th" scope="row">
                      {row.employee_nric}
                    </CustomTableCell>
                    <CustomTableCell component="th" scope="row">
                      {row.date_issue}
                    </CustomTableCell>
                    <CustomTableCell component="th" scope="row">
                      {row.medical_benefits}
                    </CustomTableCell>
                    <CustomTableCell align="right">
                      <IconButton
                        onClick={() => this.handleOfferButtonClick(row)}
                      >
                        <OfferIcon />
                      </IconButton>
                      {!isUserHR(this.props.role) && (
                        <IconButton
                          onClick={() => this.handleUpdateButtonClick(row)}
                        >
                          <UpdateIcon />
                        </IconButton>
                      )}
                      {/* <Button color="primary" variant="contained" onClick={() => this.handleUpdateButtonClick(row)}>view</Button> */}
                      {!isUserPowerOrHR(this.props.role) && (
                        <IconButton
                          onClick={() => this.handleDelete(row.contract_id)}
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

(ContractPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    selectedCompany: state.companyReducer.selectedCompany,
    contractList: state.contractReducer.contractList,
    role: state.authenticationReducer.profile.info.role_name
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ContractPage));
