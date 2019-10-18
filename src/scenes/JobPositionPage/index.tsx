import React from "react";
import PropTypes from "prop-types";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import { Typography, Grid, InputBase, Dialog, DialogContent } from "@material-ui/core";
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
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Edit, CommandColumn, CommandClickEventArgs, CommandModel, Group, Sort, Filter } from '@syncfusion/ej2-react-grids';
import StatsBox from "./component/statsbox"
import ModellerButton from "./component/modelButton"
import FormPage from "./component/form"
import $axios from "../../plugin/axios";

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

interface State { 
  isModalOpen: boolean,
  isModalUpdateOpen: boolean,
  listdata: ListData,
  data: boolean;
}

interface InState {
  selectedCompany: Company;
  jobPositionList: JobPosition[];
  role;
  sessionkey: string;  
}

interface ListData {
  total_close_offer: number;
  total_new_offer: number;
  total_offer: number;
}

class JobPositionPage extends React.Component<Props, State> {
  public groupOptions: Object = { showGroupedColumn: true };
  public filterSettings: any = { type: 'CheckBox' }

  state = {
    isModalOpen: false,
    isModalUpdateOpen: false,
    listdata: null,
    data: false
  }

  componentDidMount() {
    console.log("JobPosition Page Mounted");
    if (this.props.selectedCompany.company_id === "") {
      let data = {
        type: "warning",
        object: "Please Select a Company first",
        id: "1"
      };
      this.props.showDialog(data);
    } else 
    {
      this.listdataFunc();
      this.props.getJobPositionList();
    }
  }

  listdataFunc = async () => {
    let data = {
      session_key: this.props.sessionkey,
      company_id: this.props.selectedCompany.company_id
    }
    const listdata = await $axios.post('/job/getOfferCount', data);
    console.log(listdata.data.data)
    console.log(this.state.listdata)
    this.setState({ listdata: listdata.data.data })
    this.setState({ data: true })
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
    const result = args.rowData as JobPosition;
    console.log(result);
    this.props.selectJobPosition(result);
    history.push("/jobposition/offermodel")
  }

  handleDelete = id => {
    const payload = {
      type: "delete",
      object: "jobposition",
      id: id 
    };
    this.props.showDialog(payload);
  };

  //Create Job Position
  handleModelCreateButtonClick = () => {
    this.setState({ isModalOpen: true });
    this.forceUpdate();
    console.log(this.state);
  };

  handleCreateJobPosition = (e, data) => {
    e.preventDefault();
    this.props.createJobPosition(data);
    this.setState({ isModalOpen: false });
  };

   //General Handle Close
   handleModalClose = () => {
    this.setState({ isModalOpen: false });
    this.setState({ isModalUpdateOpen: false });
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
        {this.state.data && <Grid container>
        <Grid container spacing={16} style={{ marginBottom:"0.3rem" }}>
            <Grid item xs={12} md={4} lg={3}>
              <Paper>
                <StatsBox statstype={"new"} statsvalue={this.state.listdata.total_new_offer}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper>
                <StatsBox statstype={"close"} statsvalue={this.state.listdata.total_close_offer}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper>
                <StatsBox statstype={"total"} statsvalue={this.state.listdata.total_offer}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper>
                <ModellerButton onClick={() => this.handleModelCreateButtonClick()}/>
              </Paper>
            </Grid>
        </Grid>
        <Paper className={classes.root}>
        <GridComponent id='gridcomp' dataSource={this.props.jobPositionList} allowGrouping={true} groupSettings={this.groupOptions} allowSorting={true} editSettings={this.editSettings} allowFiltering={true} filterSettings={this.filterSettings} commandClick={this.commandClick.bind(this)} >
            <ColumnsDirective>
              <ColumnDirective field='country' headerText='Country' textAlign='Left'></ColumnDirective>
              <ColumnDirective field='jobgrade_name' headerText='Job Grade' textAlign='Left'></ColumnDirective>
              <ColumnDirective field='business_title' headerText='Business Title'textAlign='Left'></ColumnDirective>
              <ColumnDirective field='job_name' headerText='Job Function' textAlign='Left'></ColumnDirective>
              <ColumnDirective field='status' headerText='Status' textAlign='Left'></ColumnDirective>
              <ColumnDirective headerText='Manage Records' commands={this.commands}></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Page, CommandColumn, Edit, Group, Sort, Filter]} />
          </GridComponent>
        </Paper>
        </Grid>}
        <Dialog
          open={this.state.isModalOpen}
          onClose={this.handleModalClose}
          maxWidth={false}
        >
          <DialogContent>
            <Typography component="h1" variant="h5" style = {{margin:"1rem"}}>
            Create Job Position
            </Typography>
            <FormPage
              create={true}
              updateData=""
              onSubmit={(e, data) => this.handleCreateJobPosition(e, data)}
            />
          </DialogContent>
        </Dialog>
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
    role: state.authenticationReducer.profile.info.role_name,
    sessionkey: state.authenticationReducer.token,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(JobPositionPage));
