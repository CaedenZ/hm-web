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
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Group, Sort, Filter, VirtualScroll, ColumnChooser, CommandModel, CommandClickEventArgs, CommandColumn, Edit, EditSettingsModel } from "@syncfusion/ej2-react-grids";
import { enableRipple, getValue } from '@syncfusion/ej2-base';
import moment from "moment";
import { history } from "../../../store";
import { OfferModel } from "../../../interface/offerModelInterface";
import { Company } from "../../../interface/companyInterface";
import { JobPosition } from "../../../interface/jobpositionInterface";

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

export interface Props
  extends WithStyles<typeof styles>,
  SharedDispatchProps,
  InState { }

interface State {
  data: boolean;
  raw_list: ListContract[];
  filename: string;
}

interface ListContract {
  doc_key: string;
  type: string;
  filename: string;
  did: string;
}

interface InState {
  sessionkey: string;
  companyid: string;
  selectedOfferModel: OfferModel;
  selectedCompany: Company;
  selectedJobPosition: JobPosition;
}

class OfferContractPage extends React.Component<Props, State> {
  public editOptions: EditSettingsModel = { allowEditing: true, mode: 'Normal' };

  state: State = {
    data: false,
    raw_list: [],
    filename: '',
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
      customer_id: this.props.companyid,
      offer_id: this.props.selectedOfferModel.offermodel_id
    }
    const result_list = await $axios.post('/job/listoffercontract', data);
    console.log("List Contract Item");
    this.setState({ raw_list: result_list.data.data })
    console.log(this.state.raw_list)

    this.setState({ data: true })
  }

  public load() {
      refresh = (this as any).refreshing;
  }

  async commandClick(args: CommandClickEventArgs): Promise<void> {    
    const result = args.rowData as ListContract;
    console.log(result);
    let gen_data = {
        company: this.props.selectedCompany.company_name,
        name: this.props.selectedOfferModel.candidate_name,
        jobtitle: this.props.selectedJobPosition.business_title
    }

    let data = {
        session_key: this.props.sessionkey,
        template_id: result.did,
        offermodel_id: this.props.selectedOfferModel.offermodel_id,
        data: gen_data
      }
    const result_list = await $axios.post('/job/gencontractdoc', data);
    console.log("Gen OK");
    this.listcontract()
    //console.log(result.source_filepath);
    
    //history.push("/payrollupload/upload/log",result.source_filepath)

  }

  async actionBegin(args: any): Promise<void> {
    console.log(args);

  }

  public commands: CommandModel[] = [
    {
      buttonOption: {
        content: 'Generate', cssClass: 'e-primary e-outline'
      }
    }
  ];

  render() {
    const { classes } = this.props
    const that = this

    function fileurlLink(args: object) {      
      return (<a rel='nofollow' href={getValue('doc_key', args)}>{getValue('filename', args)}</a>)
    }

    return (
      <main>
        <Paper className={classes.main}>
        {/*<input
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
        </label>*/}

        <Button
            variant="contained"                       
            color="primary"
            style={{ marginBottom: "1rem", marginRight:"1rem" }}
            onClick={() => history.push("/jobposition/offermodel/update")}
        >
            Back to Offer
        </Button>

        {this.state.data && <Grid container>
          <Paper className={classes.root}>
            <GridComponent dataSource={this.state.raw_list} commandClick={this.commandClick.bind(this)}>
              <ColumnsDirective>
                <ColumnDirective field='type' headerText='Contract Type' textAlign='Left'></ColumnDirective>
                <ColumnDirective field='filename' headerText='File' textAlign='Left' template={fileurlLink}></ColumnDirective>
                <ColumnDirective headerText='Manage Records' commands={this.commands}></ColumnDirective>
              </ColumnsDirective>
              <Inject services={[Edit, CommandColumn]} />
            </GridComponent>
            </Paper>
          </Grid>}
        </Paper>      
      </main>
    );
  }
}

(OfferContractPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    sessionkey: state.authenticationReducer.token,
    companyid: state.companyReducer.selectedCompany.company_id,
    selectedOfferModel: state.offerModelReducer.selectedOfferModel,
    selectedCompany: state.companyReducer.selectedCompany,
    selectedJobPosition: state.jobPositionReducer.selectedJobPosition,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(OfferContractPage));
