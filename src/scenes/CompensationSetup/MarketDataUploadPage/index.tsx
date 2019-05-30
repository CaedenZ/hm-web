import React from "react";
import PropTypes from "prop-types";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import { RootState } from "../../../reducer";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { Button, Paper, Grid, Divider, Typography, TableCell, Theme, Table, TableHead, TableRow, TableBody, IconButton } from "@material-ui/core";

import $axios from "../../../plugin/axios";

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
      padding: '5px'
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
  queue: boolean;
  queueitem: boolean;
  queuelog: boolean;
  filename: string;
  listqueue: ListQueue[];
  listqueueitem: ListQueueItem[];
  listqueuelog: ListQueueLog[];
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

  state: State = {
    queue: false,
    queueitem: false,
    queuelog: false,
    filename: '',
    listqueue: [],
    listqueueitem: [],
    listqueuelog: [],
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

  listqueue = async () => {
    let data = {
      session_key: this.props.sessionkey,
      customer_id: this.props.companyid
    }
    const listqueue = await $axios.post('/company/getImportQueue', data);
    console.log(listqueue.data.data)
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
    console.log(listqueuelog.data.data)
    this.setState({ listqueuelog: listqueuelog.data.data })
    this.setState({ queuelog: true })

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

  render() {
    const { classes } = this.props
    return (
      <main>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <input
            accept="*"
            id="contained-button-file"
            type="file"
            onChange={this.readFile}
            name="file"
            style={{ display: "none" }}
          />
          <label htmlFor="contained-button-file" style={{ margin: "auto" }}>
            <Button color="primary" variant="contained" component="span">
              Upload
              </Button>
          </label>

          <Button color="primary" onClick={this.listqueue} variant="contained" component="span">
            List Queue
              </Button>

        </Grid>
        {this.state.queue && <Grid container>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h6">
              List Queue
          </Typography>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <CustomTableCell align="left">source_filepath</CustomTableCell>
                  <CustomTableCell align="left">Type</CustomTableCell>
                  <CustomTableCell align="left">uploaded</CustomTableCell>
                  <CustomTableCell align="left">status</CustomTableCell>
                  <CustomTableCell align="left">List Queue Items</CustomTableCell>
                </TableRow>
              </TableHead>
              {this.state.listqueue.length > 0 && (
                <TableBody>
                  {this.state.listqueue.map((row, index) => (
                    <TableRow className={classes.row} key={row.source_filepath}>
                      <CustomTableCell component="th" scope="row">
                        {row.source_filepath}
                      </CustomTableCell>
                      <CustomTableCell align="left">{row.type}</CustomTableCell>
                      <CustomTableCell align="left">{row.uploaded}</CustomTableCell>
                      <CustomTableCell align="left">{this.getstatus(row.status)}</CustomTableCell>
                      <CustomTableCell><Button color="primary" onClick={() => this.listqueueitem(row.source_filepath)} variant="contained" component="span">
                        List Queue Items
              </Button></CustomTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
            <Divider />
          </Paper>
        </Grid>}
        {this.state.queueitem && <Grid container>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h6">
              List Queue
          </Typography>
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
          </Paper>
        </Grid>}
        {this.state.queuelog && <Grid container>
          <Paper className={classes.paper}>
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
          </Paper>
        </Grid>}
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
