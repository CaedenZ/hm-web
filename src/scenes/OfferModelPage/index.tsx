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
import ConfirmIcon from "@material-ui/icons/Done";
import RejectIcon from "@material-ui/icons/Close";
import OfferIcon from "@material-ui/icons/Beenhere";
import { OfferModel } from "../../interface/offerModelInterface";
import { history } from "../../store";
import UpdateIcon from "@material-ui/icons/PlaylistAddCheck";
import { Company } from "../../interface/companyInterface";
import { isUserHR, isUserPowerOrHR } from "../../function/checkRole";
import CustomButton from "../../helper/components/CustomButton";
import ChangeStatus from "./Component/changeStatus"

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
  InState { }

interface State {
  changeStatus: boolean;
  setcurrency: boolean;
}

interface InState {
  selectedCompany: Company;
  offerModelList: OfferModel[];
  role;
}
class OfferModelPage extends React.Component<Props, State> {
  state = {
    changeStatus: false,
    setcurrency: false,
  }
  componentDidMount() {
    console.log("OfferModel Page Mounted");
    if (this.props.selectedCompany.company_id === "") {
      let data = {
        type: "warning",
        object: "Please Select a Company first",
        id: "1"
      };
      this.props.showDialog(data);
    } else this.props.getOfferModelList();
  }

  handleUpdateButtonClick = offermodel => {
    this.props.selectOfferModel(offermodel);
    history.push("/offermodel/update");
  };

  handleStatesButtonClick = offermodel => {
    this.props.selectOfferModel(offermodel);
    this.setState({ changeStatus: true })
  }

  handleDelete = id => {
    const payload = {
      type: "delete",
      object: "offermodel",
      id: id
    };
    this.props.showDialog(payload);
  };

  handleClose = () => {
    this.setState({ changeStatus: false, setcurrency: false });
  };

  handleAcceptButtonClick = (row) => {
    return
  }

  handleRejectButtonClick = (row) => {
    return
  }

  render() {
    const { classes } = this.props;

    const getActionButton = (row) => {
      switch (row.status) {
        case "Draft":
          return (
            <CustomTableCell align="right">
              <IconButton
                onClick={() => this.handleUpdateButtonClick(row)}
              >
                <UpdateIcon />
              </IconButton>
              <IconButton
                onClick={() => this.handleDelete(row.offermodel_id)}
              >
                <DeleteIcon />
              </IconButton>
            </CustomTableCell>
          )
        case "Generated":
          return (
            <CustomTableCell align="right">
              <IconButton
                onClick={() => this.handleAcceptButtonClick(row)}
              >
                <ConfirmIcon />
              </IconButton>
              <IconButton
                onClick={() => this.handleRejectButtonClick(row)}
              >
                <RejectIcon />
              </IconButton>
              <IconButton
                onClick={() => this.handleDelete(row.offermodel_id)}
              >
                <DeleteIcon />
              </IconButton>
            </CustomTableCell>
          )
        default:
          return (
            <CustomTableCell align="right">
              <IconButton
                onClick={() => this.handleDelete(row.offermodel_id)}
              >
                <DeleteIcon />
              </IconButton>
            </CustomTableCell>
          )

      }
    }

    return (
      <main>
        {!isUserHR(this.props.role) && (
          <CustomButton onClick={() => history.push("/offermodel/create")}>New OfferModel</CustomButton>
        )}
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell align="left">candidate_name</CustomTableCell>
                <CustomTableCell align="left">model_type</CustomTableCell>
                <CustomTableCell align="left">job_flag</CustomTableCell>
                <CustomTableCell align="left">status</CustomTableCell>
                <CustomTableCell align="right">Action</CustomTableCell>
              </TableRow>
            </TableHead>
            {this.props.offerModelList.length > 0 && (
              <TableBody>
                {this.props.offerModelList.map(row => (
                  <TableRow className={classes.row} key={row.offermodel_id}>
                    <CustomTableCell component="th" scope="row">
                      {row.candidate_name}
                    </CustomTableCell>
                    <CustomTableCell component="th" scope="row">
                      {row.model_type}
                    </CustomTableCell>
                    <CustomTableCell component="th" scope="row">
                      {row.job_flag}
                    </CustomTableCell>
                    <CustomTableCell component="th" scope="row">
                      {row.status}
                    </CustomTableCell>
                    {getActionButton(row)}
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </Paper>
        <ChangeStatus
          open={this.state.changeStatus}
          handleClose={this.handleClose}
        />
      </main>
    );
  }
}

(OfferModelPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    selectedCompany: state.companyReducer.selectedCompany,
    offerModelList: state.offerModelReducer.offerModelList,
    role: state.authenticationReducer.profile.info.role_name
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(OfferModelPage));
