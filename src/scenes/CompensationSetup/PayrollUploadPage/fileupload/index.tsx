import React from "react";
import PropTypes from "prop-types";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import { RootState } from "../../../../reducer";
import { mapDispatchToProps } from "../../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../../interface/propsInterface";
import { Button, Paper, Grid, Divider, Typography, TableCell, Theme, Table, TableHead, TableRow, TableBody, IconButton, Modal, Dialog } from "@material-ui/core";
import ManualForm from "../form"
import $axios from "../../../../plugin/axios";
import DeleteIcon from '@material-ui/icons/Delete';
import CustomButton from "../../../../helper/components/CustomButton";
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Group, Sort, Filter, VirtualScroll, ColumnChooser, CommandModel, CommandClickEventArgs, CommandColumn, Edit, EditSettingsModel } from "@syncfusion/ej2-react-grids";
import { enableRipple, getValue } from '@syncfusion/ej2-base';
import moment from "moment";
import { history } from "../../../../store";

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
  data: boolean;
  raw_listqueue: ListQueue[];
  format_listqueue: ListQueueData[];
  filename: string;
}

interface ListQueue {
  source_filepath: string;
  uploaded: string;
  original_filename: string;
  active: number,
  status: number;
  source_url: string;
}

interface ListQueueData {
  source_filepath: string;
  original_filename: string;
  uploaded: string;
  status: string;
  active: boolean;
  source_url: string;
}

interface InState {
  sessionkey: string;
  companyid: string;
}
class FileUploadPage extends React.Component<Props, State> {
  public editOptions: EditSettingsModel = { allowEditing: true, mode: 'Normal' };

  state: State = {
    data: false,
    raw_listqueue: [],
    filename: '',
    format_listqueue: []
  }

  componentDidMount() {
    this.setState({ data: false })
    this.listqueue()
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
    console.log("Upload OK");
    this.listqueue()
  };

  listqueue = async () => {
    let data = {
      session_key: this.props.sessionkey,
      customer_id: this.props.companyid,
      type: '1'
    }
    const listqueue = await $axios.post('/company/getImportQueue', data);
    console.log("List Queue Item");
    this.setState({ raw_listqueue: listqueue.data.data })
    console.log(this.state.raw_listqueue)

    this.state.format_listqueue = [];
    this.state.raw_listqueue.forEach(element => {
      let date = moment(element.uploaded).utc().format('YYYY-MM-DD');
      this.state.format_listqueue.push({ source_filepath: element.source_filepath, uploaded: date, status: this.getstatus(element.status), active: this.getactive(element.active), original_filename: element.original_filename,source_url: element.source_url })
    });
    this.setState({ data: true })
    console.log(this.state.format_listqueue)
    //this.listqueue()
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
      case 4:
        return 'Partial Success'  
    }
  }

  getactive = (id) => {
    switch (id) {
      case 0:
        return false
      case 1:
        return true
    }
  }

  public load() {
      refresh = (this as any).refreshing;
  }

  public commands: CommandModel[] = [
    {
      buttonOption: {
        content: 'Log', cssClass: 'e-primary e-outline'
      }
    }
  ];

  public commandClick(args: CommandClickEventArgs): void  {    
    const result = args.rowData as ListQueueData;
    console.log(args);
    console.log(result.source_filepath);
    
    history.push("/payrollupload/upload/log",result.source_filepath)

  }

  async actionBegin(args: any): Promise<void> {
    console.log(args);
    if (args.requestType === 'save') {
      let pactive = "0";
      if(args.data.active)
        pactive = "1";

      console.log("set active " + pactive + "-" + args.data.active);
      
      let data = {
        session_key: this.props.sessionkey,
        source_filepath: args.data.source_filepath,
        customer_id: this.props.companyid,
        type: '1',
        active: pactive
      }
      const setActive_result = await $axios.post('/company/setActiveData', data);
      this.setState({ data: false });
      this.listqueue();
    }
  }

  render() {
    const { classes } = this.props
    const that = this

    function fileurlLink(args: object) {      
      return (<a rel='nofollow' href={getValue('source_url', args)}>{getValue('original_filename', args)}</a>)
    }

    return (
      <main>
        <Paper className={classes.main}>
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

        {this.state.format_listqueue && <Grid container>
          <Paper className={classes.root}>
            <GridComponent dataSource={this.state.format_listqueue} editSettings={this.editOptions} allowSorting={true} allowTextWrap={true}
                    load={this.load} commandClick={this.commandClick.bind(this)} actionBegin={this.actionBegin.bind(this)}>
              <ColumnsDirective>
                <ColumnDirective field='uploaded' allowEditing={false} headerText='Date' textAlign='Left'></ColumnDirective>
                <ColumnDirective field='original_filename' allowEditing={false} headerText='File' textAlign='Left' template={fileurlLink}></ColumnDirective>
                <ColumnDirective field='status' allowEditing={false} headerText='Process' textAlign='Left'></ColumnDirective>
                <ColumnDirective field='active' displayAsCheckBox={true} editType='booleanedit' headerText='Active'></ColumnDirective>
                <ColumnDirective headerText='Manage Records' commands={this.commands}></ColumnDirective>
              </ColumnsDirective>
              <Inject services={[Sort, CommandColumn, Edit]} />
            </GridComponent>
            </Paper>
          </Grid>}
        </Paper>       
      </main>
    );
  }
}

(FileUploadPage as React.ComponentClass<Props>).propTypes = {
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
)(withStyles(styles)(FileUploadPage));
