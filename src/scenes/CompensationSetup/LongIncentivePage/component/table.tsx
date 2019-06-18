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
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { history } from "../../../../store";
import UpdateIcon from "@material-ui/icons/PlaylistAddCheck";
import EquityRangeIcon from "@material-ui/icons/AssignmentInd";
import { SharedDispatchProps } from "../../../../interface/propsInterface";
import { Company } from "../../../../interface/companyInterface";
import { LongIncentive } from "../../../../interface/longIncentiveInterface";
import { RootState } from "../../../../reducer";
import { mapDispatchToProps } from "../../../../helper/dispachProps";
import { connect } from "react-redux";
import ReactDataGrid from "react-data-grid";
import { Editors, Toolbar, Filters, Data } from "react-data-grid-addons";

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
  longincentiveList: LongIncentive[];
  onUpdate: Function;
}
class CustomizedTable extends React.Component<Props, State> {
  state = {
    country: "",
    global: false,
    anchorEl: null,
    filters: {}
  };

  componentDidMount() {
    console.log("LongIncentivePage MOunt");
    if (this.props.selectedCompany.company_id === "") {
      let data = {
        type: "warning",
        object: "Please Select a Company first",
        id: "1"
      };
      this.props.showDialog(data);
    } else this.props.getLongIncentiveList();
  }

  handleUpdateButtonClick = longincentive => {
    this.props.selectLongIncentive(longincentive);
    history.push("/longincentive/update");
    console.log("clicked");
  };

  handleDelete = (id) => {
    const payload = {
      type: "delete",
      object: "longincentive",
      id: id
    };
    this.props.showDialog(payload);
  };

  handleListButtonClick = (event, row) => {
    this.setState({ anchorEl: event.currentTarget });
    this.props.selectLongIncentive(row);
  };

  handleEquityRangeButtonClick = row => {
    this.props.selectLongIncentive(row);
    history.push("/longincentive/equityrange");
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleRedirect = path => {
    history.push("/longincentive/" + path);
  };

  typeEditor = <DropDownEditor options={[...this.props.selectedCompany.country, '']} />;
  globalEditor = <DropDownEditor options={['Y', 'N']} />;
  currencyEditor = <DropDownEditor options={[this.props.selectedCompany.base_currency_id]} />;
  investingEditor = <DropDownEditor options={['Cliff', 'Fixed']} />;


  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    const row = this.props.longincentiveList.slice();
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

    const filteredRows = getRows(this.props.longincentiveList, this.state.filters);

    const defaultColumnProperties = {
      filterable: true,
    };

    const columns: any = [
      { key: 'value', name: "value", filterRenderer: AutoCompleteFilter, editable: true },
      { key: 'type', name: "type", filterRenderer: AutoCompleteFilter, editable: true },
      { key: 'investing_type', name: "investing_type", filterRenderer: AutoCompleteFilter, editor: this.investingEditor },
      { key: 'share_symbol', name: "share_symbol", filterRenderer: AutoCompleteFilter, editable: true },
      { key: 'share_exchange', name: "share_exchange", filterRenderer: AutoCompleteFilter, editor: this.typeEditor },
      { key: 'currency', name: "currency", filterRenderer: AutoCompleteFilter, editor: this.currencyEditor },
      { key: 'isOptional', name: "isOptional", filterRenderer: AutoCompleteFilter, editor: this.globalEditor },
      { key: 'year1', name: "year1", filterRenderer: NumericFilter, editable: true },
      { key: 'year2', name: "year2", filterRenderer: NumericFilter, editable: true },
      { key: 'year3', name: "year3", filterRenderer: NumericFilter, editable: true },
      { key: 'year4', name: "year4", filterRenderer: NumericFilter, editable: true },
      { key: 'year5', name: "year5", filterRenderer: NumericFilter, editable: true },
      { key: 'year6', name: "year6", filterRenderer: NumericFilter, editable: true },
      { key: 'action', name: "action" },
    ].map(c => ({ ...c, ...defaultColumnProperties }));

    function actions(row) {
      return [
        {
          icon: <DeleteIcon />,
          callback: () => {
            that.handleDelete(row.longterm_incentive_id);
          }
        },
        {
          icon: <EquityRangeIcon />,
          callback: () => {
            that.handleEquityRangeButtonClick(row.longterm_incentive_id);
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
          getValidFilterValues={columnKey => getValidFilterValues(this.props.longincentiveList, columnKey)}
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
    selectedCompany: state.companyReducer.selectedCompany
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CustomizedTable));
