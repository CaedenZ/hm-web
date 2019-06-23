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
import { SharedDispatchProps } from "../../../../interface/propsInterface";
import { Company } from "../../../../interface/companyInterface";
import { Signons } from "../../../../interface/signonsInterface";
import { RootState } from "../../../../reducer";
import { mapDispatchToProps } from "../../../../helper/dispachProps";
import { connect } from "react-redux";
import CheckIcon from "@material-ui/icons/Check"
import ReactDataGrid from "react-data-grid";
import { Editors, Data, Filters, Toolbar } from "react-data-grid-addons";
import CustomButton from "../../../../helper/components/CustomButton";

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
  breakdownList: any[];
  onCreate: Function;
  onUpdate: Function;
  onDelete: Function;
}
class Breakdown extends React.Component<Props, State> {
  state = {
    country: "",
    global: false,
    anchorEl: null,
    filters: {}
  };

  handleDelete = (id) => {
    this.props.onDelete(id);
  };


  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleRedirect = path => {
    history.push("/signons/" + path);
  };

  typeEditor = <DropDownEditor options={[...this.props.selectedCompany.country, 'Global']} />;
  globalEditor = <DropDownEditor options={['Y', 'N']} />;






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

    const filteredRows = getRows(this.props.breakdownList, this.state.filters);

    function onGridRowsUpdated({ fromRow, toRow, updated }) {
      const row = filteredRows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        row[i] = { ...row[i], ...updated };
        console.log(row[i])
        that.props.onUpdate(row[i])
      }
      return { row };
    };

    const defaultColumnProperties = {
      filterable: true,
    };

    const columns: any = [
      { key: 'Month', name: "Month", filterRenderer: NumericFilter, editable: true },
      { key: 'value', name: "Value", filterRenderer: AutoCompleteFilter, editable: true },
      { key: 'action', name: "action" },
    ].map(c => ({ ...c, ...defaultColumnProperties }));

    function actions(row) {
      return [
        {
          icon: <DeleteIcon />,
          callback: () => {
            that.handleDelete(row.breakdown_id);
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
        <CustomButton onClick={this.props.onCreate} />
        <ReactDataGrid
          columns={columns}
          rowGetter={i => filteredRows[i]}
          rowsCount={filteredRows.length}
          toolbar={<Toolbar enableFilter={true} />}
          onAddFilter={filter => handleFilterChange(filter)}
          onClearFilters={() => this.setState({ filters: {} })}
          getValidFilterValues={columnKey => getValidFilterValues(this.props.breakdownList, columnKey)}
          getCellActions={getCellActions}
          onGridRowsUpdated={onGridRowsUpdated}
          enableCellSelect={true} />
      </Paper>
    );
  }
}

(Breakdown as React.ComponentClass<Props>).propTypes = {
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
)(withStyles(styles)(Breakdown));
