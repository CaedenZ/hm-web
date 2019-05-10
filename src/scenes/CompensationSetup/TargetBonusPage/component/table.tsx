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
import { history } from "../../../../store";
import UpdateIcon from '@material-ui/icons/PlaylistAddCheck';
import ListIcon from '@material-ui/icons/List';
import { SharedDispatchProps } from "../../../../interface/propsInterface";
import { Country } from "../../../../interface/countryInterface";
import { Company } from "../../../../interface/companyInterface";
import { TargetBonus } from "../../../../interface/targetbonusInterface";
import { RootState } from "../../../../reducer";
import { mapDispatchToProps } from "../../../../helper/dispachProps";
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
    targetbonusList: TargetBonus[],
}
class CustomizedTable extends React.Component<Props, State> {

    state = {
        country: '',
        global: false,
        anchorEl: null,
    }

    componentDidMount() {
        console.log('TargetBonusPage MOunt')
        if (this.props.selectedCompany.company_id === '') {
            let data = {
                type: 'warning',
                object: 'Please Select a Company first',
                id: '1'
            }
            this.props.showDialog(data)
        }
        else this.props.getTargetBonusList()
    }

    handleUpdateButtonClick = (targetbonus) => {
        this.props.selectTargetBonus(targetbonus)
        history.push('/targetbonus/update')
        console.log('clicked')
    }

    handleDelete = (id, index) => {

        const payload = {
            type: 'delete',
            object: 'targetbonus',
            id: id,
        }
        this.props.showDialog(payload)
    }

    handleListButtonClick = (event, row) => {
        this.setState({ anchorEl: event.currentTarget });
        this.props.selectTargetBonus(row)
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleRedirect = (path) => {
        history.push('/targetbonus/' + path)
    }


    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {/* <CustomTableCell align="left">JobGrade Name</CustomTableCell> */}
                            {/* <CustomTableCell align="left">Country</CustomTableCell> */}
                            <CustomTableCell align="left">Grade</CustomTableCell>
                            <CustomTableCell align="left">Type</CustomTableCell>
                            <CustomTableCell align="left">Action</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    {this.props.targetbonusList.length > 0 && <TableBody>
                        {this.props.targetbonusList.map((row, index) => (
                            <TableRow className={classes.row} key={row.target_bonus_id}>
                                <CustomTableCell component="th" scope="row">{row.target_bonus_id}</CustomTableCell>
                                <CustomTableCell align="left">{row.max}</CustomTableCell>
                                <CustomTableCell align="left">
                                    <IconButton onClick={() => this.handleUpdateButtonClick(row)}><UpdateIcon /></IconButton>
                                    <IconButton onClick={() => this.handleDelete(row.target_bonus_id, index)}><DeleteIcon /></IconButton>
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
