import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { history } from "../../../../../store";
import UpdateIcon from "@material-ui/icons/PlaylistAddCheck";
import { SharedDispatchProps } from "../../../../../interface/propsInterface";
import { Company } from "../../../../../interface/companyInterface";
import { JobGrade } from "../../../../../interface/jobgradeInterface";
import { RootState } from "../../../../../reducer";
import { mapDispatchToProps } from "../../../../../helper/dispachProps";
import { connect } from "react-redux";
import ReactDataGrid from "react-data-grid";
import { Editors, Toolbar, Data, Filters } from "react-data-grid-addons";
import { EquityRange } from "../../../../../interface/equityRangeInterface";
import { arrayUnique } from "../../../../../helper/uniqeArray";




const { DropDownEditor } = Editors;


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
    }
  });

export interface Props
  extends WithStyles<typeof styles>,
  SharedDispatchProps,
  InState { }

interface State { }

interface InState {
  selectedCompany: Company;
  equityrangeList: EquityRange[];
  onUpdate: Function;
  onDelete: Function;
  jobgradeList: JobGrade[]
}
class CustomizedTable extends React.Component<Props, State> {
  state = {
    country: "",
    global: false,
    anchorEl: null,
    row: [],
    filters: {},
  };

  countryTypes() {
    const type = []
    this.props.selectedCompany.country.forEach(element => {
      type.push({ id: element, value: element })
    });
    return type
  };

  componentDidMount() {
    console.log("EquityRangePage MOunt");
    if (this.props.selectedCompany.company_id === "") {
      let data = {
        type: "warning",
        object: "Please Select a Company first",
        id: "1"
      };
      this.props.showDialog(data);
    } else {
      this.props.getEquityRangeList();
      // this.setState({row:this.props.equityrangeList})
    }
  }

  handleDelete = (id) => {
    const payload = {
      type: "delete",
      object: "equityrange",
      id: id
    };
    this.props.onDelete(payload);
  };

  typeEditor = <DropDownEditor options={[...this.props.selectedCompany.country, 'Global']} />;
  jobgradeEditor = <DropDownEditor options={[...arrayUnique(this.props.jobgradeList.map(a => a.jobgrade_name))]} />;
  globalEditor = <DropDownEditor options={['Y', 'N']} />;
  valuetypeEditor = <DropDownEditor options={['Cliff', 'Fixed']} />;



  render() {
    const { classes } = this.props;
    const that = this;

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

    const filteredRows = getRows(this.props.equityrangeList, this.state.filters);

    function onGridRowsUpdated({ fromRow, toRow, updated }) {
      const row = filteredRows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        row[i] = { ...row[i], ...updated };
        that.props.onUpdate(row[i])
      }
      return { row };
    };

    const defaultColumnProperties = {
      filterable: true,
    };

    const columns: any = [
      { key: 'country', name: "Country", filterRenderer: AutoCompleteFilter, editor: this.typeEditor },
      { key: 'type', name: "Type", filterRenderer: AutoCompleteFilter, editable: true },
      { key: 'jobgrade_name', name: "Job Grade", filterRenderer: AutoCompleteFilter, editor: this.jobgradeEditor },
      { key: 'min', name: "Min", filterRenderer: NumericFilter, editable: true },
      { key: 'mid', name: "Mid", filterRenderer: NumericFilter, editable: true },
      { key: 'max', name: "Max", filterRenderer: NumericFilter, editable: true },
      { key: 'value_type', name: "value_type", filterRenderer: AutoCompleteFilter, editor: this.valuetypeEditor },
      // { key: 'global', name: "global", editor: this.globalEditor },
      { key: 'action', name: "Action" },
    ].map(c => ({ ...c, ...defaultColumnProperties }));

    function actions(row) {
      return [
        {
          icon: <DeleteIcon />,
          callback: () => {
            that.handleDelete(row.equity_range_id);
          }
        },

      ];
    }

    function getCellActions(column, row) {
      const cellActions = {
        action: actions(row)
      };
      return cellActions[column.key];
    }


    return (

      <ReactDataGrid
        columns={columns}
        rowGetter={i => filteredRows[i]}
        rowsCount={filteredRows.length}
        toolbar={<Toolbar enableFilter={true} />}
        onAddFilter={filter => handleFilterChange(filter)}
        onClearFilters={() => this.setState({ filters: {} })}
        getValidFilterValues={columnKey => getValidFilterValues(this.props.equityrangeList, columnKey)}
        getCellActions={getCellActions}
        onGridRowsUpdated={onGridRowsUpdated}
        enableCellSelect={true} />
    );
  }
}

(CustomizedTable as React.ComponentClass<Props>).propTypes = {
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
)(withStyles(styles)(CustomizedTable));
