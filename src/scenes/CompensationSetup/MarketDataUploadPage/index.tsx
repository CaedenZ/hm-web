import React from "react";
import PropTypes from "prop-types";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import { RootState } from "../../../reducer";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { Button, Paper, Grid, Divider, Typography, TableCell, Theme, Table, TableHead, TableRow, TableBody, IconButton, Dialog } from "@material-ui/core";
import ManualForm from "./form"
import $axios from "../../../plugin/axios";
import ReactDataGrid from "react-data-grid";
import DeleteIcon from '@material-ui/icons/Delete';
import CustomButton from "../../../helper/components/CustomButton";
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Group, Sort, Filter, VirtualScroll, ColumnChooser } from "@syncfusion/ej2-react-grids";
import { enableRipple, getValue } from '@syncfusion/ej2-base';
import { history } from "../../../store";

enableRipple(true);
let refresh: Boolean;

const styles = (theme: Theme) =>
  createStyles({
    main: {
      width: "100%",
      padding: "1rem"
    },
    root: {
      width: "100%",
      height: "100%",
      marginTop: theme.spacing.unit * 1,
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
    paper: {
      padding: '5px',
      width: '100%'
    }
  });

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

export interface Props
  extends WithStyles<typeof styles>,
  SharedDispatchProps,
  InState { }

interface State {
  data: boolean,
  queue: boolean;
  queueitem: boolean;
  queuelog: boolean;
  manual: boolean;
  filename: string;
  listdata: ListData[];
  listqueue: ListQueue[];
  listqueueitem: ListQueueItem[];
  listqueuelog: ListQueueLog[];
  filters: any
}

interface ListData {
  id: number,
  company_id: string,
  user_id: string,
  year: string,
  country: string,
  survey_company: string,
  employee_id: string,
  company_grade: string,
  survey_grade: string,
  jobfunction: string,
  sjobfunction: string,
  currency: string,
  annual_base_pay: string,
  annual_cash_allowance: string,
  annual_fixed_pay: string,
  target_total: string,
  target_direct_comp: string,
  target_total_rem: string,
  uploaded_dt: string
}

interface ListQueue {
  source_filepath: string;
  type: number;
  uploaded: string;
  status: number;
}

interface ListQueueItem {
  source_filepath: string;
  uploaded: string;
  user: string;
  customer_id: string;
  status: number;
  process_dt: string;
}

interface ListQueueLog {
  record_no: number;
  status: string;
  message: string;
}

interface InState {
  sessionkey: string;
  companyid: string;
}
class MarketDataUploadPage extends React.Component<Props, State> {
  public toolbarOptions: any = ['ColumnChooser'];
  public filterSettings: any = { type: 'CheckBox' }
  
  state: State = {
    data: false,
    queue: false,
    queueitem: false,
    queuelog: false,
    manual: false,
    filename: '',
    listdata: [],
    listqueue: [],
    listqueueitem: [],
    listqueuelog: [],
    filters: {}
  }

  componentDidMount() {
    this.listdata()
  }

  readFile = async (e: any) => {
    // this.setState({ data: e.target.files[0] });
    console.dir(e.target.files[0]);
    // Set the file to be uploaded
    const fileToBeUploaded = e.target.files[0];
    // Get the presigned URL
    const retURLData = await $axios.post("/company/getPresignedUrl", {
      session_key: this.props.sessionkey
    });
    const presignedURLData = retURLData.data;
    console.log(presignedURLData);
    if (presignedURLData.error) {
      // Error occured
      this.props.showSnackBar();
      return;
    }
    // Continue if no error
    const presignedURL = presignedURLData.data.presigned_url;
    const key = presignedURLData.data.key
    // Create the formdata to be sent

    // Send to S3
    const retUploadData = await $axios.put(presignedURL, fileToBeUploaded, {
      headers: {
        'Content-Type': fileToBeUploaded.type,
        'key': key,
      }
    });
    console.log(retUploadData);
    if (retUploadData.data.error) {
      // Error occured
      this.props.showSnackBar();
      return;
    }
    console.log(retUploadData);

    let data = {
      session_key: this.props.sessionkey,
      company_id: this.props.companyid,
      type: 0,
      file_name: key,
      original_file_name: fileToBeUploaded.name,
    }

    await $axios.post("/company/uploadExceldata", data);
    this.setState({ filename: fileToBeUploaded.name })
  };

  listdata = async () => {
    let data = {
      session_key: this.props.sessionkey,
      type: 0,
      company_id: this.props.companyid
    }
    const listdata = await $axios.post('/company/getData', data);
    console.log(listdata.data.data)
    console.log(this.state.listdata)
    this.setState({ listdata: listdata.data.data })
    this.setState({ data: true })
  }

  listqueue = async () => {
    let data = {
      session_key: this.props.sessionkey,
      customer_id: this.props.companyid
    }
    const listqueue = await $axios.post('/company/getImportQueue', data);
    console.log(listqueue.data.data)
    console.log(this.state.listqueue)
    this.setState({ listqueue: listqueue.data.data })
    this.setState({ queue: true })
  }

  listqueueitem = async (filepath) => {
    let data = {
      session_key: this.props.sessionkey,
      type: 0,
      source_filepath: filepath,
    }
    const listqueueitem = await $axios.post('/company/getImportQueueData', data);
    console.log(listqueueitem.data.data)
    this.setState({ listqueueitem: listqueueitem.data.data })
    this.setState({ queueitem: true })

  }

  listQueueLogs = async (filepath) => {
    let data = {
      session_key: this.props.sessionkey,
      source_filepath: filepath,
    }
    const listqueuelog = await $axios.post('/company/getDataLog', data);
    // console.log(listqueuelog.data.data)
    this.setState({ listqueuelog: listqueuelog.data.data })
    this.setState({ queuelog: true })

  }
  handleManualEntry = () => {
    this.setState({ manual: true })
  }

  getstatus = (id) => {
    switch (id) {
      case 0:
        return 'Uploaded'
      case 1:
        return 'Processing'
      case 2:
        return 'Success'
      case 3:
        return 'Failed'
    }
  }

  handleClose = () => {
    this.setState({
      queue: false,
      queueitem: false,
      queuelog: false,
      manual: false,
    })
  }

  public groupOptions: Object = { showGroupedColumn: true, columns: ['country'] };
  private gridInstance: GridComponent;
  public dataBound() {
    if(refresh) {
      this.gridInstance.groupColumn('country');
      refresh = false;
    }
  }
  public load() {
      refresh = (this as any).refreshing;
  }

  render() {
    const { classes } = this.props
    const that = this

    const handleFilterChange = filter => {
      console.log(this.state.filters)
      const newFilters = { ...this.state.filters };
      if (filter.filterTerm) {
        newFilters[filter.column.key] = filter;
      } else {
        delete newFilters[filter.column.key];
      }
      this.setState({ filters: newFilters });
    };

    function getValidFilterValues(rows, columnId) {
      return rows
        .map(r => r[columnId])
        .filter((item, i, a) => {
          return i === a.indexOf(item);
        });
    }

    function actions(row) {
      return [
        // {
        //   icon: <DeleteIcon />,
        //   callback: () => {
        //     alert(row.source_filepath);
        //   }
        // },
        {
          icon: <Button color='primary'>Item</Button>,
          callback: () => {
            that.listqueueitem(row.source_filepath);
          }
        },
        {
          icon: <Button color='primary'>Log</Button>,
          callback: () => {
            that.listQueueLogs(row.source_filepath);
          }
        }
      ];
    }

    function getCellActions(column, row) {
      const cellActions = {
        action: actions(row)
      };
      return cellActions[column.key];
    }

    return (
      <main>
        <Paper className={classes.main}>
        <CustomButton onClick={() => history.push("/marketdataupload/upload")}>File Upload</CustomButton>

        {this.state.data && <Grid container>
          <Paper className={classes.root}>
            <GridComponent dataSource={this.state.listdata} toolbar={this.toolbarOptions} allowSorting={true} allowTextWrap={true} showColumnChooser={true} allowPaging={true} pageSettings={{ pageCount: 5 }}
                    dataBound={this.dataBound.bind(this)} load={this.load} allowFiltering={true} filterSettings={this.filterSettings}>
              <ColumnsDirective>
                <ColumnDirective field='year' headerText='Year' width='120' textAlign='Left'></ColumnDirective>
                <ColumnDirective field='country' headerText='Country' width='180' textAlign='Left'></ColumnDirective>
                <ColumnDirective field='survey_company' headerText='Survey' visible={false} width='150' textAlign='Left'></ColumnDirective>
                <ColumnDirective field='jobfunction' headerText='Job Function' textAlign='Left'></ColumnDirective>
                <ColumnDirective field='sjobfunction' headerText='Sub Job' visible={false} textAlign='Left'></ColumnDirective>
                <ColumnDirective field='company_grade' headerText='Company Grade' textAlign='Left'></ColumnDirective>
                <ColumnDirective field='survey_grade' headerText='Survey Grade' visible={false} textAlign='Left'></ColumnDirective>
                <ColumnDirective field='annual_base_pay' headerText='Annual Base' visible={false} textAlign='Left'></ColumnDirective>
                <ColumnDirective field='annual_cash_allowance' headerText='Annual Cash' visible={false} textAlign='Left'></ColumnDirective>
                <ColumnDirective field='annual_fixed_pay' headerText='Annual Fixed' visible={false} textAlign='Left'></ColumnDirective>   
                <ColumnDirective field='target_total' headerText='Target Total' textAlign='Left'></ColumnDirective> 
                <ColumnDirective field='target_direct_comp' headerText='Target Direct' textAlign='Left'></ColumnDirective> 
                <ColumnDirective field='target_total_rem' headerText='Total Rem' textAlign='Left'></ColumnDirective>              
              </ColumnsDirective>
              <Inject services={[Page, Group, Sort, Filter,ColumnChooser]} />
            </GridComponent>
          </Paper>
        </Grid>}
      </Paper>

      </main>
    );
  }
}

(MarketDataUploadPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    sessionkey: state.authenticationReducer.token,
    companyid: state.companyReducer.selectedCompany.company_id,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MarketDataUploadPage));
