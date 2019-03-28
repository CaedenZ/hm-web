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
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";

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
        }
    });

export interface Props extends WithStyles<typeof styles>, SharedDispatchProps, InState { }

interface State { }

interface InState {
    subUnitList: Unit[]
}

class SubUnitPage extends React.Component<Props, State> {

    constructor(props) {
        super(props)
        this.handleViewButtonClick = this.handleViewButtonClick.bind(this)
    }

    state = {
        redirect: false
    }
    componentDidMount() {
        this.props.getChildUnitList()

    }

    handleViewButtonClick = (unit) => {
        this.props.selectUnit(unit)
        this.setState({
            redirect: true
        })
    }

    render() {
        const { classes } = this.props;
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/unit/childunit' />;
        }
        else {
            return (
                <main>
                    <CustomButton link="/unit/create">New unit</CustomButton>
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
                            <TableBody>
                                {this.props.subUnitList.map(row => (
                                    <TableRow className={classes.row} key={row.unit_id}>
                                        <CustomTableCell component="th" scope="row">
                                            {row.unit_id}
                                        </CustomTableCell>
                                        <CustomTableCell align="right">
                                            {row.unit_name}
                                        </CustomTableCell>
                                        <CustomTableCell align="right">{row.unit_type}</CustomTableCell>
                                        <CustomTableCell align="right"><Button onClick={() => this.handleViewButtonClick(row)}>view</Button></CustomTableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </main>
            );
        }
    }
}

(SubUnitPage as React.ComponentClass<Props>).propTypes = {
    classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
    return {
        subUnitList: state.companyReducer.subUnitList
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SubUnitPage));
