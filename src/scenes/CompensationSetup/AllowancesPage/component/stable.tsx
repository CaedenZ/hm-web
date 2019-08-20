import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Group, Sort, Inject, Edit, Toolbar, Filter, IEditCell } from '@syncfusion/ej2-react-grids';
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
import { Allowances } from "../../../../interface/allowanceInterface";
import { RootState } from "../../../../reducer";
import { mapDispatchToProps } from "../../../../helper/dispachProps";
import { connect } from "react-redux";
import { enableRipple, getValue } from '@syncfusion/ej2-base';
import { Query } from '@syncfusion/ej2-data';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { arrayUnique } from "../../../../helper/uniqeArray";

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
    selectedCompany: Company,
    allowancesList: Allowances[],
    onUpdate: Function,
    jobgradeList: JobGrade[]
}

export class CustomizedTable_v2 extends React.Component<Props, State>  {
    public toolbarOptions: any =  ['Add', 'Delete', 'Update', 'Cancel'];
    public filterSettings: any = { type: 'CheckBox' }
    public requiredRules: object = { required: true };
    public numbersRules: object = { number: true };

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
        console.log('AllowancesPage MOunt')
        if (this.props.selectedCompany.company_id === '') {
            let data = {
                type: 'warning',
                object: 'Please Select a Company first',
                id: '1'
            }
            this.props.showDialog(data)
        }
        else this.props.getAllowancesList()
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

      jobgradeTypes() {
        const type = []
        this.props.jobgradeList.forEach(element => {
          type.push(element.jobgrade_name)
        });
        console.log(type);
        return arrayUnique(type)
      };

      valueTypes() {
        const type = []
        type.push('Fixed');
        type.push('Percent');
        console.log(type);
        return type
      };

      percentTypes() {
        const type = []
        type.push('Annual Base');
        console.log(type);
        return type
      };

      typeTypes() {
        const type = []
        this.props.allowancesList.forEach(element => {
          type.push(element.type)
        });
        console.log(type);
        return arrayUnique(type)
      };

      public countryParams : IEditCell = {
        params:   {
          actionComplete: () => false,
          allowFiltering: true,
          dataSource: this.countryTypes(),
          fields: { text: "value", value: "value"},
          query: new Query()
        }
      };

      public jobgradeParams : IEditCell = {
        params:   {
          actionComplete: () => false,
          allowFiltering: true,
          dataSource: this.jobgradeTypes(),
          fields: { text: "value", value: "value"},
          query: new Query()
        }
      };

      public valuetypeParams : IEditCell = {
        params:   {
          actionComplete: () => false,
          allowFiltering: true,
          dataSource: this.valueTypes(),
          fields: { text: "value", value: "value"},
          query: new Query()
        }
      };

      public percenttypeParams : IEditCell = {
        params:   {
          actionComplete: () => false,
          allowFiltering: true,
          dataSource: this.percentTypes(),
          fields: { text: "value", value: "value"},
          query: new Query()
        }
      };
    
      actionBegin(args: any): void {
        if (args.requestType === 'save') {
          if(args.index === 0)
          {
            console.log(args.data);
            const data = {
                country: args.data.country,
                isBonus: "N",
                isOptional: "N",
                jobgrade_country: "",
                jobgrade_global: "",
                jobgrade_id: "",
                jobgrade_name: args.data.jobgrade_name,
                type: args.data.type,
                value: args.data.value,
                value_type: args.data.value_type,
                percent_type: args.data.percent_type
              }
              this.props.createAllowances(data)
          }
          else
          {
            this.props.onUpdate(args.data);
          }                   
        }
        if (args.requestType === 'delete') {
          const obj: Object[] = this.gridInstance.getSelectedRecords();
          console.log(obj);
          const rowIndexes : string[]=[];
          obj.forEach((dat: any,index) => {
              rowIndexes.push(dat.allowance_id); 
          });
          this.props.deleteAllowances(rowIndexes[0]);
          console.log(rowIndexes[0]);
        }
        if (args.requestType === 'add') {
          
        }
      }

    render() {
      const { classes } = this.props;
      const that = this;      

      function editTemplate(args: object) {      
        let typeData: { [key: string]: Object }[] =that.typeTypes();
        return (<ComboBoxComponent id='type' dataSource={typeData} value={getValue('type', args)} />)
      }
      
      function editNumberTemplateValue(args: object) {      
        return (<NumericTextBoxComponent id='value' format='N' value={getValue('value', args)} showSpinButton={false} readonly={true}/>)
      }

      return (
        <Paper className={classes.root}>
            <GridComponent dataSource={this.props.allowancesList} toolbar={this.toolbarOptions} editSettings={this.editSettings} ref={ grid => this.gridInstance = grid} allowGrouping={true} groupSettings={this.groupOptions} allowSorting={true}
                    dataBound={this.dataBound.bind(this)} load={this.load} allowFiltering={true} filterSettings={this.filterSettings} actionBegin={this.actionBegin.bind(this)}>
              <ColumnsDirective>
                <ColumnDirective field='country' headerText='Country' width='120' validationRules={this.requiredRules} edit={this.countryParams} editType='dropdownedit' textAlign='Left'></ColumnDirective>
                <ColumnDirective field='jobgrade_name' headerText='Jobgrade' validationRules={this.requiredRules} width='130' edit={this.jobgradeParams} editType='dropdownedit' textAlign='Left' />
                <ColumnDirective field='type' headerText='Type' width='150' defaultValue="" editTemplate={editTemplate} textAlign='Left'></ColumnDirective>
                <ColumnDirective field='value_type' headerText='Value Type' width='150' validationRules={this.requiredRules} edit={this.valuetypeParams} editType='dropdownedit' textAlign='Left'></ColumnDirective>
                <ColumnDirective field='value' headerText='Value' width='150' defaultValue="0" validationRules={this.numbersRules} template={editNumberTemplateValue} textAlign='Left'></ColumnDirective>
                <ColumnDirective field='percent_type' headerText='Percent Type' width='150' validationRules={this.requiredRules} edit={this.percenttypeParams} editType='dropdownedit' textAlign='Left'></ColumnDirective>
              </ColumnsDirective>
              <Inject services={[Page, Group, Sort, Edit, Toolbar, Filter]} />
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
        jobgradeList: state.jobgradeReducer.jobgradeList,
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(CustomizedTable_v2));