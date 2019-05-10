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
import { Button, IconButton, FormControl, InputLabel, Select, MenuItem, Grid, FormControlLabel, Checkbox, Menu } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import { history } from "../../../../../store";
import UpdateIcon from '@material-ui/icons/PlaylistAddCheck';
import ListIcon from '@material-ui/icons/List';
import { SharedDispatchProps } from "../../../../../interface/propsInterface";
import { Country } from "../../../../../interface/countryInterface";
import { Company } from "../../../../../interface/companyInterface";
import { EquityRange } from "../../../../../interface/equityRangeInterface";
import { RootState } from "../../../../../reducer";
import { mapDispatchToProps } from "../../../../../helper/dispachProps";
import { connect } from "react-redux";


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
    equityrangeList: EquityRange[],
}
class CustomizedTable extends React.Component<Props, State> {

    state = {
        country: '',
        global: false,
        anchorEl: null,
    }

    componentDidMount() {
        console.log('EquityRangePage MOunt')
        if (this.props.selectedCompany.company_id === '') {
            let data = {
                type: 'warning',
                object: 'Please Select a Company first',
                id: '1'
            }
            this.props.showDialog(data)
        }
        else this.props.getEquityRangeList()
    }

    handleUpdateButtonClick = (equityrange) => {
        this.props.selectEquityRange(equityrange)
        history.push('/longincentive/equityrange/update')
        console.log('clicked')
    }

    handleDelete = (id, index) => {

        const payload = {
            type: 'delete',
            object: 'equityrange',
            id: id,
        }
        this.props.showDialog(payload)
    }

    handleListButtonClick = (event, row) => {
        this.setState({ anchorEl: event.currentTarget });
        this.props.selectEquityRange(row)
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleRedirect = (path) => {
        history.push('/equityrange/' + path)
    }


    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell align="left">Type</CustomTableCell>
                            <CustomTableCell align="left">Min</CustomTableCell>
                            <CustomTableCell align="left">Mid</CustomTableCell>
                            <CustomTableCell align="left">Max</CustomTableCell>
                            <CustomTableCell align="left">Action</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    {this.props.equityrangeList.length > 0 && <TableBody>
                        {this.props.equityrangeList.map((row, index) => (
                            <TableRow className={classes.row} key={row.equity_range_id}>
                                <CustomTableCell component="th" scope="row">{row.type}</CustomTableCell>
                                <CustomTableCell align="left">{row.min}</CustomTableCell>
                                <CustomTableCell align="left">{row.mid}</CustomTableCell>
                                <CustomTableCell align="left">{row.max}</CustomTableCell>
                                <CustomTableCell align="left">
                                    <IconButton onClick={() => this.handleUpdateButtonClick(row)}><UpdateIcon /></IconButton>
                                    <IconButton onClick={() => this.handleDelete(row.equity_range_id, index)}><DeleteIcon /></IconButton>
                                </CustomTableCell>
                            </TableRow>
                        ))}
                    </TableBody>}
                </Table>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CustomizedTable));
