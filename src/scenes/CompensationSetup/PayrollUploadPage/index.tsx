import React from "react";
import PropTypes from "prop-types";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import { RootState } from "../../../reducer";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { Button, Paper, Grid, Divider, Typography, TableCell, Theme, Table, TableHead, TableRow, TableBody, IconButton, Modal, Dialog } from "@material-ui/core";
import ManualForm from "./form"
import $axios from "../../../plugin/axios";
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
class PayrollUploadPage extends React.Component<Props, State> {
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
    filters: {},
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
      type: 1,
      file_name: key,
      original_file_name: fileToBeUploaded.name,
    }

    await $axios.post("/company/uploadExceldata", data);
    this.setState({ filename: fileToBeUploaded.name })
  };

  listdata = async () => {
    let data = {
      session_key: this.props.sessionkey,
      type: 1,
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
      type: 1,
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
        return 'File Failed'
      case 4:
        return 'Format Failed'
      case 5:
        return 'Partial Success'
      default:
        return 'Unknown Error'  
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
        <CustomButton onClick={() => history.push("/payrollupload/upload")}>File Upload</CustomButton>

        {/* <Button color="primary" onClick={this.listqueue} variant="contained" component="span">
            List Queue
              </Button>
          <Button color="primary" onClick={this.handleManualEntry} variant="contained" component="span">
            Manual Entry
              </Button> */}

        {this.state.data && <Grid container>
          <Paper className={classes.root}>
            <GridComponent dataSource={this.state.listdata} toolbar={this.toolbarOptions} allowSorting={true} allowTextWrap={true} showColumnChooser={true} allowPaging={true} pageSettings={{ pageCount: 5 }}
                    dataBound={this.dataBound.bind(this)} load={this.load} allowFiltering={true} filterSettings={this.filterSettings}>
              <ColumnsDirective>
                <ColumnDirective field='year' headerText='Year' width='120' textAlign='Left'></ColumnDirective>
                <ColumnDirective field='country' headerText='Country' width='180' textAlign='Left'></ColumnDirective>
                <ColumnDirective field='currency' headerText='Currency' visible={false} width='150' textAlign='Left'></ColumnDirective>
                <ColumnDirective field='gender' headerText='Gender' width='150' textAlign='Left'></ColumnDirective>
                <ColumnDirective field='jobfunction' headerText='Job Name' textAlign='Left'></ColumnDirective>
                <ColumnDirective field='sjobfunction' headerText='Sub Job' visible={false} textAlign='Left'></ColumnDirective>
                <ColumnDirective field='grade' headerText='Grade' textAlign='Left'></ColumnDirective>
                <ColumnDirective field='business_title' headerText='Business Title' textAlign='Left'></ColumnDirective>
                <ColumnDirective field='department' headerText='Department' visible={false} textAlign='Left'></ColumnDirective>
                <ColumnDirective field='annual_base_pay' headerText='Annual Base' textAlign='Left'></ColumnDirective>
                <ColumnDirective field='annual_cash_allowance' headerText='Annual Cash' textAlign='Left'></ColumnDirective>
                <ColumnDirective field='annual_fixed_pay' headerText='Annual Fixed' textAlign='Left'></ColumnDirective>                
              </ColumnsDirective>
              <Inject services={[Page, Group, Sort, Filter,ColumnChooser]} />
            </GridComponent>
            </Paper>
          </Grid>}
        </Paper>

        {/*<Dialog open={this.state.queue} onClose={this.handleClose} scroll='paper' >
          <div style={{ width: '800px' }}>
            <ReactDataGrid
              columns={columns}
              rowGetter={i => this.state.listqueue[i]}
              rowsCount={this.state.listqueue.length}
              getCellActions={getCellActions}
              enableCellSelect={true} />
            <Divider />
          </div>
        </Dialog>*/}

        <Dialog open={this.state.queueitem} onClose={this.handleClose} scroll='paper'>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell align="left">source_filepath</CustomTableCell>
                <CustomTableCell align="left">uploaded</CustomTableCell>
                <CustomTableCell align="left">user</CustomTableCell>
                <CustomTableCell align="left">customer_id</CustomTableCell>
                <CustomTableCell align="left">status</CustomTableCell>
                <CustomTableCell align="left">process_dt</CustomTableCell>
              </TableRow>
            </TableHead>
            {this.state.listqueueitem.length > 0 && (
              <TableBody>
                {this.state.listqueueitem.map((row, index) => (
                  <TableRow className={classes.row} key={row.source_filepath}>
                    <CustomTableCell component="th" scope="row">
                      {row.source_filepath}
                    </CustomTableCell>
                    <CustomTableCell align="left">{row.uploaded}</CustomTableCell>
                    <CustomTableCell align="left">{row.user}</CustomTableCell>
                    <CustomTableCell align="left">{row.customer_id}</CustomTableCell>
                    <CustomTableCell align="left">{this.getstatus(row.status)}</CustomTableCell>
                    <CustomTableCell align="left">{row.process_dt}</CustomTableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
          <Divider />
        </Dialog>

        <Dialog open={this.state.queuelog} onClose={this.handleClose} scroll='paper'>
          <Typography component="h1" variant="h6">
            List Queue
          </Typography>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell align="left">record_no</CustomTableCell>
                <CustomTableCell align="left">status</CustomTableCell>
                <CustomTableCell align="left">message</CustomTableCell>
              </TableRow>
            </TableHead>
            {this.state.listqueuelog.length > 0 && (
              <TableBody>
                {this.state.listqueuelog.map((row, index) => (
                  <TableRow className={classes.row} key={row.record_no}>
                    <CustomTableCell component="th" scope="row">{row.record_no}</CustomTableCell>
                    <CustomTableCell align="left">{row.status}</CustomTableCell>
                    <CustomTableCell align="left">{row.message}</CustomTableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
          <Divider />
        </Dialog>

        <Dialog open={this.state.manual} onClose={this.handleClose} scroll='paper'>
          <ManualForm />
        </Dialog>
      </main>
    );
  }
}

(PayrollUploadPage as React.ComponentClass<Props>).propTypes = {
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
)(withStyles(styles)(PayrollUploadPage));
