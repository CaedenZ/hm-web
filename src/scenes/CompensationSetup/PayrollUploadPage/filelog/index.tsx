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
  listqueuelog: ListQueueLog[];
}

interface ListQueueLog {
  record: string;
  status: string;
  message: string;
}

interface InState {
  sessionkey: string;
  companyid: string;
}

class FileLogPage extends React.Component<Props, State> {
  state: State = {
    data: false,
    listqueuelog: [],
  }

  componentDidMount() {
    this.setState({ data: false })
    //this.listqueuelog(this.props.filename)

  }

  listqueuelog = async (filename) => {
    let data = {
        session_key: this.props.sessionkey,
        source_filepath: filename,
      }
      console.log("listqueuelog-" + filename);
      const listqueuelog = await $axios.post('/company/getDataLog', data);
      // console.log(listqueuelog.data.data)
      this.setState({ listqueuelog: listqueuelog.data.data })
      this.setState({ data: true })
  }

  public load() {
      refresh = (this as any).refreshing;
  }

  render() {
    const { classes } = this.props
    const that = this

    return (
      <main>
        <Paper className={classes.main}>
        {this.state.data && <Grid container>
          <Paper className={classes.root}>
            <GridComponent dataSource={this.state.listqueuelog} allowSorting={true} allowTextWrap={true}
                    load={this.load} >
              <ColumnsDirective>
                <ColumnDirective field='record_no' headerText='Line' textAlign='Left'></ColumnDirective>
                <ColumnDirective field='status' headerText='Status' textAlign='Left'></ColumnDirective>
                <ColumnDirective field='message' headerText='Message' textAlign='Left'></ColumnDirective>
              </ColumnsDirective>
              <Inject services={[Sort]} />
            </GridComponent>
            </Paper>
          </Grid>}
        </Paper>       
      </main>
    );
  }
}

(FileLogPage as React.ComponentClass<Props>).propTypes = {
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
)(withStyles(styles)(FileLogPage));
