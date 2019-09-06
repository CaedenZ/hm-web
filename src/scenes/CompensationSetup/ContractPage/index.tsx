import React from "react";
import PropTypes from "prop-types";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import { RootState } from "../../../reducer";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { Button, Paper, Grid, Divider, Typography, TableCell, Theme, Table, TableHead, TableRow, TableBody, IconButton, Modal, Dialog, DialogContent } from "@material-ui/core";
import $axios from "../../../plugin/axios";
import DeleteIcon from '@material-ui/icons/Delete';
import CustomButton from "../../../helper/components/CustomButton";
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Group, Sort, Filter, VirtualScroll, ColumnChooser, CommandModel, CommandClickEventArgs, CommandColumn, Edit, EditSettingsModel, Toolbar } from "@syncfusion/ej2-react-grids";
import { enableRipple, getValue } from '@syncfusion/ej2-base';
import moment from "moment";
import { history } from "../../../store";
import FormPage from "./form";
import { isUserMaster, isMaster } from "../../../function/checkRole";

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
    },
    buttonPad: {
      marginRight: '1rem',
      color: "primary"
    }
  });

export interface Props
  extends WithStyles<typeof styles>,
  SharedDispatchProps,
  InState { }

interface State {
  data: boolean;
  raw_list: ListContract[];
  filename: string;
  isModalOpen: boolean;
  isDefaultModalOpen: boolean;
}

interface ListContract {
  id: string;
  type: string;
  filename: string;
  url: string;
  company_id: string;
}

interface UpdateFormData {
  filename: any;
  filedisplay: string;
  type: string;
  company_apply: string;
}

interface InState {
  sessionkey: string;
  companyid: string;
  role: string;
}
class ContractSetupPage extends React.Component<Props, State> {
  public toolbarOptions: any =  ['Delete'];
  public editSettings: any = { allowDeleting: true};

  state: State = {
    data: false,
    raw_list: [],
    filename: '',
    isModalOpen: false,
    isDefaultModalOpen: false
  }

  componentDidMount() {
    this.setState({ data: false })
    this.listcontract()
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
    this.listcontract()
  };

  listcontract = async () => {
    let data = {
      session_key: this.props.sessionkey,
      customer_id: this.props.companyid
    }
    const result_list = await $axios.post('/job/listcontracttemplate', data);
    console.log("List Contract Item");
    result_list.data.data.forEach(element => {
      if(element.company_id != "ALL")
      {
        element.company_id = "Internal";
      }
    });
    this.setState({ raw_list: result_list.data.data })
    console.log(this.state.raw_list)

    this.setState({ data: true })
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

  private gridInstance: GridComponent;

  public commandClick(args: CommandClickEventArgs): void  {    
    //const result = args.rowData as ListQueueData;
    //console.log(args);
    //console.log(result.source_filepath);
    
    //history.push("/payrollupload/upload/log",result.source_filepath)

  }

  async actionBegin(args: any): Promise<void> {
    console.log(args);
    if (args.requestType === 'delete') {
      const obj: Object[] = this.gridInstance.getSelectedRecords();
      let pdata = obj[0] as ListContract;
      console.log(pdata.company_id);
      if((pdata.company_id != "ALL") || (isMaster(this.props.role)))
      {
        console.log("deleting");
        let data = {
          session_key: this.props.sessionkey,
          template_id: pdata.id
        }
    
        await $axios.post("/job/delcontracttemplate", data);
      }
      this.listcontract();
      this.forceUpdate();
    }
  }

  //General Handle Close
  handleModalClose = () => {
    this.setState({ isModalOpen: false });
    this.setState({ isDefaultModalOpen: false });
  };
  
  async handleCreateContract(e: any, data: any) {
    console.log("Create Contract"); 
    console.log(data);
    let fdata = data as UpdateFormData;

    const retURLData = await $axios.post("/job/getdocuploadurl", {
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
    console.log(key);
    // Create the formdata to be sent

    // Send to S3
    const retUploadData = await $axios.put(presignedURL, fdata.filename, {
      headers: {
        'Content-Type': fdata.filename.type,
        'key': key,
      }
    });
    console.log(retUploadData);
    if (retUploadData.data.error) {
      // Error occured
      console.log("Upload Error");
      console.log(retUploadData.data.error);
      //this.props.showSnackBar();
      return;
    }
    console.log(retUploadData);

    let companydata = this.props.companyid;
    if(fdata.company_apply == "1")
    {
      companydata = "ALL";
    }

    let udata = {
      session_key: this.props.sessionkey,
      company_id: companydata,
      type: fdata.type,
      file_name: key,
      original_file_name: fdata.filename.name,
    }

    await $axios.post("/job/uploaddocxdata", udata);
    this.setState({ filename: fdata.filename.name })
    console.log("Upload OK");
    this.setState({ isModalOpen: false });
    this.setState({ isDefaultModalOpen: false });
    this.listcontract()

  }

  //Create Main
  handleModelCreateButtonClick = () => {
    this.setState({ isModalOpen: true });
    this.forceUpdate();
    console.log(this.state);
  };

   //Create Main
  handleDefaultModelCreateButtonClick = () => {
      this.setState({ isDefaultModalOpen: true });
      this.forceUpdate();
      console.log(this.state);
  };


  render() {
    const { classes } = this.props
    const that = this

    function fileurlLink(args: object) {      
      return (<a rel='nofollow' href={getValue('url', args)}>{getValue('filename', args)}</a>)
    }

    return (
      <main>
        <Paper className={classes.main}>
          <Button variant="contained" color="primary" className={classes.buttonPad} onClick={() => this.handleModelCreateButtonClick()}>
          Upload Contract
          </Button>
        
        {isMaster(this.props.role) && (
          <Button variant="contained" color="primary" className={classes.buttonPad} onClick={() => this.handleDefaultModelCreateButtonClick()}>
          Upload Default
          </Button>
        )}

        {this.state.data && <Grid container>
          <Paper className={classes.root}>
            <GridComponent dataSource={this.state.raw_list} ref={ grid => this.gridInstance = grid} toolbar={this.toolbarOptions} editSettings={this.editSettings} actionBegin={this.actionBegin.bind(this)}>
              <ColumnsDirective>
                <ColumnDirective field='type' headerText='Contract Type' textAlign='Left'></ColumnDirective>
                <ColumnDirective field='filename' headerText='File' textAlign='Left' template={fileurlLink}></ColumnDirective>
                <ColumnDirective field='company_id' headerText='Type' textAlign='Left'></ColumnDirective>
              </ColumnsDirective>
              <Inject services={[Edit, Toolbar]} />
            </GridComponent>
            </Paper>
          </Grid>}
        </Paper>

        <Dialog
          open={this.state.isModalOpen}
          onClose={this.handleModalClose}
          maxWidth={false}
        >
          <DialogContent>
            <Typography component="h1" variant="h5" style = {{margin:"1rem"}}>
            Upload Contract Template
            </Typography>
            <FormPage
              onSubmit={(e, data) => this.handleCreateContract(e, data)}
              uploadtype="0"
            />
          </DialogContent>
        </Dialog>  

        <Dialog
          open={this.state.isDefaultModalOpen}
          onClose={this.handleModalClose}
          maxWidth={false}
        >
          <DialogContent>
            <Typography component="h1" variant="h5" style = {{margin:"1rem"}}>
            Upload Default Template
            </Typography>
            <FormPage
              onSubmit={(e, data) => this.handleCreateContract(e, data)}
              uploadtype="1"
            />
          </DialogContent>
        </Dialog>      
      </main>
    );
  }
}

(ContractSetupPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    sessionkey: state.authenticationReducer.token,
    companyid: state.companyReducer.selectedCompany.company_id,
    role: state.authenticationReducer.profile.info.role_name,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ContractSetupPage));
