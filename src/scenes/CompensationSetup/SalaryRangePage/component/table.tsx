import React from "react";
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
import { IconButton, MenuItem, Menu } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { history } from "../../../../store";
import UpdateIcon from "@material-ui/icons/PlaylistAddCheck";
import { SharedDispatchProps } from "../../../../interface/propsInterface";
import { Company } from "../../../../interface/companyInterface";
import { SalaryRange } from "../../../../interface/salaryRangeInterface";
import { RootState } from "../../../../reducer";
import { mapDispatchToProps } from "../../../../helper/dispachProps";
import { connect } from "react-redux";
import ReactDataGrid from "react-data-grid";
import { Editors, Filters, Data, Toolbar } from "react-data-grid-addons";
import { JobGrade } from "../../../../interface/jobgradeInterface";

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
  salaryrangeList: SalaryRange[];
  jobgradeList: JobGrade[];
  onUpdate: Function;
}
class CustomizedTable extends React.Component<Props, State> {
  state = {
    country: "",
    global: false,
    anchorEl: null,
    filters: {},
  };

  componentDidMount() {
    console.log("SalaryRangePage MOunt");
    if (this.props.selectedCompany.company_id === "") {
      let data = {
        type: "warning",
        object: "Please Select a Company first",
        id: "1"
      };
      this.props.showDialog(data);
    } else this.props.getSalaryRangeList();
  }


  handleDelete = (id) => {
    const payload = {
      type: "delete",
      object: "salaryrange",
      id: id
    };
    this.props.showDialog(payload);
  };


  typeEditor = <DropDownEditor options={[...this.props.selectedCompany.country, '']} />;
  globalEditor = <DropDownEditor options={['Y', 'N']} />;
  jobgradeEditor = <DropDownEditor options={[...this.props.jobgradeList.map(a => a.jobgrade_name)]} />;


  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    const row = this.props.salaryrangeList.slice();
    for (let i = fromRow; i <= toRow; i++) {
      row[i] = { ...row[i], ...updated };
      console.log(row[i])
      this.props.onUpdate(row[i])
    }
    return { row };
  };

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

    const filteredRows = getRows(this.props.salaryrangeList, this.state.filters);

    const defaultColumnProperties = {
      filterable: true,
    };

    const columns: any = [
      { key: 'country', name: "Country", filterRenderer: AutoCompleteFilter, editor: this.typeEditor },
      { key: 'type', name: "Name", filterRenderer: AutoCompleteFilter, editable: true },
      { key: 'jobgrade_name', name: "Job Grade", filterRenderer: AutoCompleteFilter, editor: this.jobgradeEditor },
      { key: 'min', name: "Min", filterRenderer: NumericFilter, editable: true },
      { key: 'mid', name: "Mid", filterRenderer: NumericFilter, editable: true },
      { key: 'max', name: "Max", filterRenderer: NumericFilter, editable: true },
      { key: 'action', name: "Action" },
    ].map(c => ({ ...c, ...defaultColumnProperties }));

    function actions(row) {
      return [
        {
          icon: <DeleteIcon />,
          callback: () => {
            that.handleDelete(row.salary_range_id);
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
      <Paper className={classes.root}>
        <ReactDataGrid
          columns={columns}
          rowGetter={i => filteredRows[i]}
          rowsCount={filteredRows.length}
          toolbar={<Toolbar enableFilter={true} />}
          onAddFilter={filter => handleFilterChange(filter)}
          onClearFilters={() => this.setState({ filters: {} })}
          getValidFilterValues={columnKey => getValidFilterValues(this.props.salaryrangeList, columnKey)}
          getCellActions={getCellActions}
          onGridRowsUpdated={this.onGridRowsUpdated}
          enableCellSelect={true} />
      </Paper>
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
