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
import ReactDataGrid from "react-data-grid";
import DeleteIcon from '@material-ui/icons/Delete';
import CustomButton from "../../../helper/components/CustomButton";
import { Toolbar, Data, Filters } from "react-data-grid-addons";

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
      file_name: fileToBeUploaded.name
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

  render() {
    const { classes } = this.props
    const that = this

    const selectors = Data.Selectors;

    const {
      NumericFilter,
      AutoCompleteFilter,
      MultiSelectFilter,
      SingleSelectFilter
    } = Filters;

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

    function getRows(rows, filters) {
      return selectors.getRows({ rows, filters });
    }

    const filteredRows = getRows(this.state.listdata, this.state.filters);

    const columns: any = [
      { key: 'source_filepath', name: "source_filepath" },
      { key: 'type', name: "type" },
      { key: 'uploaded', name: "uploaded" },
      { key: 'status', name: "status" },
      { key: 'action', name: "action" },
    ]

    const defaultColumnProperties = {
      filterable: true,
    };
    const datacolumn: any = [
      { key: 'year', name: "Year", filterRenderer: AutoCompleteFilter ,width: 150},
      { key: 'country', name: "Country", filterRenderer: AutoCompleteFilter ,width: 150},
      { key: 'employee_id', name: "Employee ID", filterRenderer: AutoCompleteFilter ,width: 150},
      { key: 'gender', name: "Gender", filterRenderer: AutoCompleteFilter ,width: 150},
      { key: 'jobfunction', name: "Job Function", filterRenderer: AutoCompleteFilter ,width: 150},
      { key: 'sjobfunction', name: "Sub Job Function", filterRenderer: AutoCompleteFilter, width: 200 },
      { key: 'annual_base_pay', name: "Annual Base Pay", filterRenderer: AutoCompleteFilter ,width: 150},
      { key: 'annual_cash_allowance', name: "Annual Cash Allowance", filterRenderer: AutoCompleteFilter,width: 150 },
      { key: 'annual_fixed_pay', name: "Annual Fixed Pay", filterRenderer: AutoCompleteFilter,width: 150 },
      { key: 'business_title', name: "Business Title", filterRenderer: AutoCompleteFilter, width: 250 },
      { key: 'grade', name: "Grade", filterRenderer: AutoCompleteFilter ,width: 150},
      { key: 'department', name: "Department", filterRenderer: AutoCompleteFilter, width: 200 },
      { key: 'currency', name: "Currency", filterRenderer: AutoCompleteFilter ,width: 150},
    ].map(c => ({ ...c, ...defaultColumnProperties }));

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
        <input
          accept="*"
          id="contained-button-file"
          type="file"
          onChange={this.readFile}
          name="file"
          style={{ display: "none" }}
        />
        <label htmlFor="contained-button-file" >
          <CustomButton component="span">
            Upload
              </CustomButton>
        </label>

        {/* <Button color="primary" onClick={this.listqueue} variant="contained" component="span">
            List Queue
              </Button>
          <Button color="primary" onClick={this.handleManualEntry} variant="contained" component="span">
            Manual Entry
              </Button> */}

        {this.state.data && <Grid container>
          <Paper className={classes.paper}>
            <ReactDataGrid
              columns={datacolumn}
              rowGetter={i => filteredRows[i]}
              rowsCount={this.state.listdata.length}
              toolbar={<Toolbar enableFilter={true} />}
              onAddFilter={filter => handleFilterChange(filter)}
              onClearFilters={() => this.setState({ filters: {} })}
              getValidFilterValues={columnKey => getValidFilterValues(this.state.listdata, columnKey)}
              enableCellSelect={true} />
            <Divider />
          </Paper>
        </Grid>}

        <Dialog open={this.state.queue} onClose={this.handleClose} scroll='paper' >
          <div style={{ width: '800px' }}>
            <ReactDataGrid
              columns={columns}
              rowGetter={i => this.state.listqueue[i]}
              rowsCount={this.state.listqueue.length}
              getCellActions={getCellActions}
              enableCellSelect={true} />
            <Divider />
          </div>
        </Dialog>

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
