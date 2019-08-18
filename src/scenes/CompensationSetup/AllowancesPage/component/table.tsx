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
import DeleteIcon from '@material-ui/icons/Delete';
import { history } from "../../../../store";
import UpdateIcon from '@material-ui/icons/PlaylistAddCheck';
import { SharedDispatchProps } from "../../../../interface/propsInterface";
import { Company } from "../../../../interface/companyInterface";
import { Allowances } from "../../../../interface/allowanceInterface";
import { RootState } from "../../../../reducer";
import { mapDispatchToProps } from "../../../../helper/dispachProps";
import { connect } from "react-redux";
import CheckIcon from "@material-ui/icons/Check";
import ReactDataGrid from "react-data-grid";
import { Editors, Filters, Data, Toolbar } from "react-data-grid-addons";
import { JobGrade } from "../../../../interface/jobgradeInterface";
import { arrayUnique } from "../../../../helper/uniqeArray";

const { DropDownEditor } = Editors;

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    body: {
        fontSize: 14
    }
}))(TableCell);

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
        },
    });



export interface Props extends WithStyles<typeof styles>, SharedDispatchProps, InState { }

interface State {
}

interface InState {
    selectedCompany: Company,
    allowancesList: Allowances[],
    onUpdate: Function,
    jobgradeList: JobGrade[]
}


class CustomizedTable extends React.Component<Props, State> {

    state = {
        country: '',
        global: false,
        anchorEl: null,
        filters: {},
    }

    componentDidMount() {
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

    handleUpdateButtonClick = (allowances) => {
        this.props.selectAllowances(allowances)
        history.push('/allowances/update')
        console.log('clicked')
    }

    handleDelete = (id) => {
        console.log(id)
        const payload = {
            type: 'delete',
            object: 'allowances',
            id: id,
        }
        this.props.showDialog(payload)
    }

    handleListButtonClick = (event, row) => {
        this.setState({ anchorEl: event.currentTarget });
        this.props.selectAllowances(row)
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleRedirect = (path) => {
        history.push('/allowances/' + path)
    }


    typeEditor = <DropDownEditor options={[...this.props.selectedCompany.country, 'Global']} />;
    globalEditor = <DropDownEditor options={['Y', 'N']} />;
    valueEditor = <DropDownEditor options={['Percent', 'Fixed']} />;
    jobgradeEditor = <DropDownEditor options={[...arrayUnique(this.props.jobgradeList.map(a => a.jobgrade_name))]} />;
    percentEditor = <DropDownEditor options={['Annual Base']} />;




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

        const filteredRows = getRows(this.props.allowancesList, this.state.filters);

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
            { key: 'country', name: "Country", filterRenderer: AutoCompleteFilter, editor: this.typeEditor },           
            { key: 'jobgrade_name', name: "Job Grade", filterRenderer: AutoCompleteFilter, editor: this.jobgradeEditor },
            { key: 'type', name: "Name", filterRenderer: AutoCompleteFilter, editable: true },
            { key: 'value_type', name: "Value Type", filterRenderer: AutoCompleteFilter, editor: this.valueEditor },
            { key: 'value', name: "Value", filterRenderer: AutoCompleteFilter, editable: true },
            { key: 'percent_type', name: "Percent Type", filterRenderer: AutoCompleteFilter, editor: this.percentEditor },
            { key: 'isBonus', name: "isBonus", filterRenderer: AutoCompleteFilter, editor: this.globalEditor },
            { key: 'isOptional', name: "isOptional", filterRenderer: AutoCompleteFilter, editor: this.globalEditor },
            { key: 'action', name: "Action" },
        ].map(c => ({ ...c, ...defaultColumnProperties }));

        function actions(row) {
            return [
                {
                    icon: <DeleteIcon />,
                    callback: () => {
                        that.handleDelete(row.allowance_id);
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
                    getValidFilterValues={columnKey => getValidFilterValues(this.props.allowancesList, columnKey)}
                    getCellActions={getCellActions}
                    onGridRowsUpdated={onGridRowsUpdated}
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CustomizedTable));
