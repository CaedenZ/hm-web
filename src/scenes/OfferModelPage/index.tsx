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
import { IconButton, Grid, Button, Dialog, DialogContent, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ConfirmIcon from "@material-ui/icons/Done";
import RejectIcon from "@material-ui/icons/Close";
import ReportIcon from "@material-ui/icons/Assignment";
import ContractIcon from "@material-ui/icons/Email";
import OfferIcon from "@material-ui/icons/Beenhere";
import { OfferModel } from "../../interface/offerModelInterface";
import { history } from "../../store";
import UpdateIcon from "@material-ui/icons/PlaylistAddCheck";
import { Company } from "../../interface/companyInterface";
import { isUserHR, isUserPowerOrHR } from "../../function/checkRole";
import CustomButton from "../../helper/components/CustomButton";
import ChangeStatus from "./Component/changeStatus";
import JobPanel from "./Component/jobinfo";
import ModelButton from "./Component/modelButton";
import { JobPosition } from "../../interface/jobpositionInterface";
import { GridComponent, ColumnsDirective, Inject, ColumnDirective, CommandColumn, Edit, Sort, CommandModel, CommandClickEventArgs } from "@syncfusion/ej2-react-grids";
import FormPage from "../JobPositionPage/component/form"
import $axios from "../../plugin/axios";

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
  isModalOpen: boolean;
  setcurrency: boolean;
}

interface InState {
  selectedCompany: Company;
  offerModelList: OfferModel[];
  selectedJobPosition: JobPosition;
  role;
  sessionkey: string;
}
class OfferModelPage extends React.Component<Props, State> {
  state = {
    changeStatus: false,
    isModalOpen: false,
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
    history.push("/jobposition/offermodel/update");
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

  handleArchive = async () => {
    const data = {
      session_key: this.props.sessionkey,
      jobposition_id: this.props.selectedJobPosition.jobposition_id,
    }

    const response = await $axios.post('/job/archivejob', data);
    history.push("/jobposition");
  };

  handleDeletJob = () => {
    this.props.deleteJobPosition(this.props.selectedJobPosition.jobposition_id);
    history.push("/jobposition")
  };

  handleReport = offermodel => {
    this.props.selectOfferModel(offermodel);
    history.push("/jobposition/offermodel/report")
  }

  handleContract = offermodel => {
    this.props.selectOfferModel(offermodel);
    history.push("/jobposition/offermodel/contract")
  }

  handleAcceptButtonClick = (row) => {
    return
  }

  handleRejectButtonClick = (row) => {
    return
  }

  handleModelCreateButtonClick = () => {
    this.setState({ isModalOpen: true });
    this.forceUpdate();
    console.log(this.state);
  };

  handleCreateJobPosition = (e, data) => {
    e.preventDefault();
    this.props.updateJobPosition(data);
    this.setState({ isModalOpen: false });
    history.push("/jobposition")
    //window.location.reload();
  };

   //General Handle Close
   handleModalClose = () => {
    this.setState({ isModalOpen: false });
  };

  public commandClick(args: CommandClickEventArgs): void  {    
    const result = args.rowData as OfferModel;
    console.log(result);
    this.props.selectOfferModel(result);
    history.push("/jobposition/offermodel/update");
  }

  public commands: CommandModel[] = [
    {
      buttonOption: {
        content: 'View', cssClass: 'e-primary e-outline'
      }
    }
  ];

  render() {
    const { classes } = this.props;

    const archiveFunction = (): any => {
        let archivebutton = (
          <Button size="small" color="primary" onClick={e =>
            window.confirm("Are you sure you wish to archive this job?") &&
            this.handleArchive()
          }>Archive</Button>
        );

        if (this.props.selectedJobPosition.status != 'ARCHIVE') {
            return archivebutton;
        } else return "";
      };

      const editFunction = (): any => {
        let editbutton = (
          <Button size="small" color="primary" onClick={() => this.handleModelCreateButtonClick()}
          >Edit</Button>
        );

        if (this.props.selectedJobPosition.status != 'ARCHIVE') {
            return editbutton;
        } else return "";
      };

      const createModelFunction = (): any => {
        let createModelbutton = (
          <Grid item xs={12} md={4} lg={3}>
              <Paper>
              <ModelButton onClick={() => history.push("/jobposition/offermodel/create")}/>
              </Paper>
          </Grid>
        );

        if (this.props.selectedJobPosition.status != 'ARCHIVE') {
            return createModelbutton;
        } else return "";
      };

    return (
      <main>
        {archiveFunction()}
        {editFunction()}
        <Button size="small" color="primary" onClick={e =>
          window.confirm("Are you sure you wish to delete this job?") &&
          this.handleDeletJob()
        }>Delete</Button>
        <Grid container spacing={16} style={{ marginBottom:"0.3rem" }}>      
            <Grid item xs={12} md={12} lg={9}>
              <Paper>
                <JobPanel/>
              </Paper>
            </Grid>
            {createModelFunction()}
        </Grid>
        
        <Paper className={classes.root}>
        <GridComponent id='gridcomp' dataSource={this.props.offerModelList} allowSorting={true} commandClick={this.commandClick.bind(this)} >
            <ColumnsDirective>
              <ColumnDirective field='candidate_name' headerText='Candidate Name' textAlign='Left'></ColumnDirective>
              <ColumnDirective field='model_type' headerText='Model Type' textAlign='Left'></ColumnDirective>
              <ColumnDirective field='job_flag' headerText='Jog Flag'textAlign='Left'></ColumnDirective>
              <ColumnDirective field='status' headerText='Status' textAlign='Left'></ColumnDirective>
              <ColumnDirective headerText='Manage Records' commands={this.commands}></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[CommandColumn, Edit, Sort]} />
          </GridComponent>
        </Paper>
        {/*<Paper className={classes.root}>
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
                </Paper>*/}
        <ChangeStatus
          open={this.state.changeStatus}
          handleClose={this.handleClose}
        />
        <Dialog
          open={this.state.isModalOpen}
          onClose={this.handleModalClose}
          maxWidth={false}
        >
          <DialogContent>
            <Typography component="h1" variant="h5" style = {{margin:"1rem"}}>
            Edit Job Position
            </Typography>
            <FormPage
              create={false}
              updateData={this.props.selectedJobPosition}
              onSubmit={(e, data) => this.handleCreateJobPosition(e, data)}
            />
          </DialogContent>
        </Dialog>
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
    role: state.authenticationReducer.profile.info.role_name,
    selectedJobPosition: state.jobPositionReducer.selectedJobPosition,
    sessionkey: state.authenticationReducer.token
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(OfferModelPage));
