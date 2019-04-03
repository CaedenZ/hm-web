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
import { render } from "react-dom";
import CustomButton from "../component/CustomButton";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { Company, Unit } from "../../../interface/companyInterface";
import { RootState } from "../../../reducer";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { Button, IconButton, Typography } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import { history } from "../../../store";
import UpdateIcon from '@material-ui/icons/PlaylistAddCheck';
import ViewIcon from '@material-ui/icons/ZoomIn';

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
        parentrow: {
            "&:nth-of-type(odd)": {
                backgroundColor: theme.palette.background.default
            },
            height: 20
        },
        parentTable: {
            width: 300
        },
    });

export interface Props extends WithStyles<typeof styles>, SharedDispatchProps, InState { }

interface State { }

interface InState {
    subUnitList: Unit[],
    parentUnit: Unit,
}

class SubUnitPage extends React.Component<Props, State> {

    constructor(props) {
        super(props)
        this.handleViewButtonClick = this.handleViewButtonClick.bind(this)
    }
    componentDidMount() {
        this.props.getSubUnitList()

    }

    handleViewButtonClick = (unit) => {
        this.props.selectSubUnit(unit)
        history.push('/unit/subunit/childunit')
    }

    handleUpdateButtonClick = (unit) => {
        console.log('clicked')
        this.props.selectUpdateUnit(unit)
        history.push('/unit/subunit/update')
    }

    handleDelete = (id) => {
        const payload = {
            type: 'delete',
            object: 'subunit',
            id: id,
          }
          this.props.showDialog(payload)
        // this.props.deleteSubUnit(id)
    }

    render() {
        const { classes } = this.props;
        return (
            <main>
                <div>
                    <Typography>Parent</Typography>
                    <Table className={classes.parentTable}>
                        <TableHead>
                            <TableRow className={classes.parentrow}>
                                <CustomTableCell>unit_name</CustomTableCell>
                                <CustomTableCell align="right">unit_type</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableRow className={classes.parentrow}>
                            <CustomTableCell component="th" scope="row">{this.props.parentUnit.unit_name}</CustomTableCell>
                            <CustomTableCell align="right">{this.props.parentUnit.unit_type}</CustomTableCell>
                        </TableRow>
                    </Table>
                </div>
                <CustomButton link="/unit/subunit/create">New unit</CustomButton>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell>unit_id</CustomTableCell>
                                <CustomTableCell align="right">unit_name</CustomTableCell>
                                <CustomTableCell align="right">unit_type</CustomTableCell>
                                <CustomTableCell align="right">Action</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        {this.props.subUnitList.length > 0 && <TableBody>
                            {this.props.subUnitList.map(row => (
                                <TableRow className={classes.row} key={row.unit_id}>
                                    <CustomTableCell component="th" scope="row">
                                        {row.unit_id}
                                    </CustomTableCell>
                                    <CustomTableCell align="right">
                                        {row.unit_name}
                                    </CustomTableCell>
                                    <CustomTableCell align="right">{row.unit_type}</CustomTableCell>
                                    <CustomTableCell align="right">
                                    <IconButton onClick={() => this.handleViewButtonClick(row)}><ViewIcon /></IconButton>
                                        <IconButton onClick={() => this.handleUpdateButtonClick(row)}><UpdateIcon /></IconButton>
                                        <IconButton onClick={() => this.handleDelete(row.unit_id)}><DeleteIcon /></IconButton>
                                    </CustomTableCell>
                                </TableRow>
                            ))}
                        </TableBody>}
                    </Table>
                </Paper>
            </main>
        );
    }
}

(SubUnitPage as React.ComponentClass<Props>).propTypes = {
    classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
    return {
        subUnitList: state.companyReducer.subUnitList,
        parentUnit: state.companyReducer.selectedUnit,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SubUnitPage));
