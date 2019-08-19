import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Group, Sort, Inject, Edit, Toolbar, Filter, IEditCell, Freeze, Selection, RowSelectEventArgs } from '@syncfusion/ej2-react-grids';
import PropTypes from "prop-types";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { SharedDispatchProps } from "../../../../interface/propsInterface";
import { Company } from "../../../../interface/companyInterface";
import { JobGrade } from "../../../../interface/jobgradeInterface";
import { LongIncentive } from "../../../../interface/longIncentiveInterface";
import { EquityRange } from "../../../../interface/equityRangeInterface";
import { RootState } from "../../../../reducer";
import { mapDispatchToProps } from "../../../../helper/dispachProps";
import { connect } from "react-redux";
import { enableRipple, getValue } from '@syncfusion/ej2-base';
import { Query } from '@syncfusion/ej2-data';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { arrayUnique } from "../../../../helper/uniqeArray";
import { Typography } from '@material-ui/core';

enableRipple(true);
let refresh: Boolean;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "100%",
      marginTop: theme.spacing.unit * 3,
      overflowX: "auto",
      textAlign:"left"
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
    }
  });

export interface Props
  extends WithStyles<typeof styles>,
  SharedDispatchProps,
  InState { }

interface State { }

interface InState {
    selectedCompany: Company;
    longincentiveList: LongIncentive[];
    onUpdate: Function;
    onEquityRange: Function;
}

export class CustomizedTable_v2 extends React.Component<Props, State>  {
    public toolbarOptions: any =  ['Add', 'Delete', 'Update', 'Cancel'];
    public filterSettings: any = { type: 'CheckBox' }
    public requiredRules: object = { required: true };
    public numbersRules: object = { number: true };
    public detailGrid: GridComponent;
    public detail: Object = [];

    public editSettings: any = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Top' };
    state = {
        country: '',
        global: false,
        anchorEl: null,
        filters: {},
    }

      rendereComplete() {
        /**custom render complete function */
    }

      componentDidMount() {
        setTimeout(() => {
            this.rendereComplete();
        });
        console.log("LongIncentivePage MOunt");
        if (this.props.selectedCompany.company_id === "") {
          let data = {
            type: "warning",
            object: "Please Select a Company first",
            id: "1"
          };
          this.props.showDialog(data);
        } 
        else 
        {
            this.props.getLongIncentiveList();
        }
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

      countryTypes() {
        const type = []
        this.props.selectedCompany.country.forEach(element => {
          type.push({ id: element, value: element })
        });
        return type
      };
   
      actionBegin(args: any): void {
        if (args.requestType === 'save') {
          if(args.index === 0)
          {
            console.log(args.data);
            //TO DO
          }
          else
          {
            this.props.onUpdate(args.data);
          }                   
        }
        if (args.requestType === 'delete') {
          const obj: Object[] = this.gridInstance.getSelectedRecords();
          console.log(obj);
          //const rowIndexes : string[]=[];
          //obj.forEach((dat: any,index) => {
          //    rowIndexes.push(dat.signons_id); 
          //});
          //this.props.deleteSignons(rowIndexes[0]);
          //console.log(rowIndexes[0]);
        }
        if (args.requestType === 'add') {
          
        }
      }

      public rowselect(args: RowSelectEventArgs): void {
        console.log("Row Selected");
        console.log(args.data);
        this.props.onEquityRange(args.data);
      }

    render() {
      const { classes } = this.props;
      const that = this;      
     
      function editNumberTemplateValue(args: object) {      
        return (<NumericTextBoxComponent id='value' format='N' value={getValue('value', args)} showSpinButton={false} readonly={true}/>)
      }

      return (
        <Paper className={classes.root}>
            <GridComponent dataSource={this.props.longincentiveList} frozenColumns={6} allowTextWrap={true} toolbar={this.toolbarOptions} editSettings={this.editSettings} ref={ grid => this.gridInstance = grid} allowSorting={true}
                    dataBound={this.dataBound.bind(this)} load={this.load} allowFiltering={true} filterSettings={this.filterSettings} actionBegin={this.actionBegin.bind(this)} rowSelected={this.rowselect.bind(this)}>
              <ColumnsDirective>
                <ColumnDirective field='type' headerText='Type' width='150' textAlign='Left'></ColumnDirective>
                <ColumnDirective field='value' headerText='Value' width='150' validationRules={this.numbersRules} template={editNumberTemplateValue} textAlign='Left'></ColumnDirective>
                <ColumnDirective field='investing_type' headerText='Investing Type' width='150' textAlign='Left'></ColumnDirective>
                <ColumnDirective field='share_symbol' headerText='Share Symbol' width='150' textAlign='Left'></ColumnDirective>
                <ColumnDirective field='share_exchange' headerText='Share Exchange' width='150' textAlign='Left'></ColumnDirective>
                <ColumnDirective field='currency' headerText='Currency' width='150' textAlign='Left'></ColumnDirective>
                <ColumnDirective columns={[{ field:'year1', headerText:'Year 1', width:'150', validationRules:this.numbersRules, textAlign:'Left'},{ field:'year2', headerText:'Year 2', width:'150', validationRules:this.numbersRules, textAlign:'Left'},{ field:'year3', headerText:'Year 3', width:'150', validationRules:this.numbersRules, textAlign:'Left'},{ field:'year4', headerText:'Year 4', width:'150', validationRules:this.numbersRules, textAlign:'Left'},{ field:'year5', headerText:'Year 5', width:'150', validationRules:this.numbersRules, textAlign:'Left'}]} headerText='Allocation Percentage' textAlign='Center'></ColumnDirective>
              </ColumnsDirective>
              <Inject services={[Selection, Freeze, Page, Group, Sort, Edit, Toolbar, Filter]} />
            </GridComponent>
        </Paper>
      )
    }
  }

  (CustomizedTable_v2 as React.ComponentClass<Props>).propTypes = {
    classes: PropTypes.object.isRequired
  } as any;

  function mapStateToProps(state: RootState) {
    return {
        selectedCompany: state.companyReducer.selectedCompany,
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(CustomizedTable_v2));