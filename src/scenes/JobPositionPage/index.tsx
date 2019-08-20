import React from "react";
import PropTypes from "prop-types";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import { Typography, Grid, InputBase } from "@material-ui/core";
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
import { JobPosition } from "../../interface/jobpositionInterface";
import { history } from "../../store";
import UpdateIcon from "@material-ui/icons/PlaylistAddCheck";
import { Company } from "../../interface/companyInterface";
import { isUserHR, isUserPowerOrHR } from "../../function/checkRole";
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Edit, CommandColumn, CommandClickEventArgs, CommandModel } from '@syncfusion/ej2-react-grids';
import StatsBox from "./component/statsbox"
import ModellerButton from "./component/modelButton"

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
    fixedHeight: {
      height: 150,
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
  jobPositionList: JobPosition[];
  role;
}
class JobPositionPage extends React.Component<Props, State> {
  componentDidMount() {
    console.log("JobPosition Page Mounted");
    if (this.props.selectedCompany.company_id === "") {
      let data = {
        type: "warning",
        object: "Please Select a Company first",
        id: "1"
      };
      this.props.showDialog(data);
    } else this.props.getJobPositionList();
  }

  handleUpdateButtonClick = jobposition => {
    this.props.selectJobPosition(jobposition);
    history.push("/jobposition/update");
  };

  handleOfferButtonClick = jobposition => {
    console.log('clicked');
    this.props.selectJobPosition(jobposition);
    history.push("/jobposition/offermodel")
  }

  public commandClick(args: CommandClickEventArgs): void  {
    console.log(args.rowData);
  }

  handleDelete = id => {
    const payload = {
      type: "delete",
      object: "jobposition",
      id: id 
    };
    this.props.showDialog(payload);
  };

  public editSettings: any = { allowEditing: true, allowAdding: true, allowDeleting: true, allowEditOnDblClick: false };
  public commands: CommandModel[] = [
    {
      buttonOption: {
        content: 'Offers', cssClass: 'e-primary e-outline'
      }
    }
  ];
  
  render() {
    const { classes } = this.props;

    return (
      <main>
        <Grid container spacing={16} style={{ marginBottom:"0.3rem" }}>
            <Grid item xs={12} md={4} lg={3}>
              <Paper>
                <StatsBox statstype={"new"} statsvalue={"10"}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper>
                <StatsBox statstype={"close"} statsvalue={"10"}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper>
                <StatsBox statstype={"total"} statsvalue={"10"}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper>
                <ModellerButton onClick={() => history.push("/jobposition/create")}/>
              </Paper>
            </Grid>
        </Grid>
        <Paper className={classes.root}>
        <GridComponent id='gridcomp' dataSource={this.props.jobPositionList} editSettings={this.editSettings} commandClick={this.commandClick} >
            <ColumnsDirective>
              <ColumnDirective field='country' headerText='Country' width='160' textAlign='Left'></ColumnDirective>
              <ColumnDirective field='jobgrade_name' headerText='Job Grade' width='120' textAlign='Left'></ColumnDirective>
              <ColumnDirective field='business_title' headerText='Business Title'textAlign='Left'></ColumnDirective>
              <ColumnDirective field='job_name' headerText='Job Function' textAlign='Left'></ColumnDirective>
              <ColumnDirective headerText='Manage Records' commands={this.commands}></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Page, CommandColumn, Edit]} />
          </GridComponent>

          {/*<Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell align="left">Country</CustomTableCell>
                <CustomTableCell align="left">Job Grade</CustomTableCell>
                <CustomTableCell align="left">Business Title</CustomTableCell>
                <CustomTableCell align="left">Job Function</CustomTableCell>
                <CustomTableCell align="right">Action</CustomTableCell>
              </TableRow>
            </TableHead>
            {this.props.jobPositionList.length > 0 && (
              <TableBody>
                {this.props.jobPositionList.map(row => (
                  <TableRow className={classes.row} key={row.jobposition_id}>
                    <CustomTableCell component="th" scope="row">
                      {row.country}
                    </CustomTableCell>
                    <CustomTableCell component="th" scope="row">
                      {row.jobgrade_name}
                    </CustomTableCell>
                    <CustomTableCell component="th" scope="row">
                      {row.business_title}
                    </CustomTableCell>
                    <CustomTableCell component="th" scope="row">
                      {row.job_name}
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
                      {!isUserPowerOrHR(this.props.role) && (
                        <IconButton
                          onClick={() => this.handleDelete(row.jobposition_id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </CustomTableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
                      </Table>*/}
        </Paper>
      </main>
    );
  }
}

(JobPositionPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    selectedCompany: state.companyReducer.selectedCompany,
    jobPositionList: state.jobPositionReducer.jobpositionList,
    role: state.authenticationReducer.profile.info.role_name
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(JobPositionPage));
