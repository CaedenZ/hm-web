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
import CustomButton from "./component/CustomButton";
import { SharedDispatchProps } from "../../interface/propsInterface";
import { Company, Unit } from "../../interface/companyInterface";
import { RootState } from "../../reducer";
import { mapDispatchToProps } from "../../helper/dispachProps";
import { connect } from "react-redux";
import { Button, IconButton } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import { history } from "../../store";

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

interface State {
  redirect: boolean
}

interface InState {
  unitList: Unit[]
}

class UnitPage extends React.Component<Props, State> {

  constructor(props) {
    super(props)
    this.handleViewButtonClick = this.handleViewButtonClick.bind(this)
    this.handleUpdateButtonClick = this.handleUpdateButtonClick.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }


  componentDidMount() {
    console.log('Unit Page Mount')
  }

  handleViewButtonClick = (unit) => {
    this.props.selectUnit(unit)
    history.push('/unit/subunit')
  }

  handleUpdateButtonClick = (unit) => {
    console.log('clicked')
    this.props.selectUpdateUnit(unit)
    history.push('/unit/update')
  }

  handleDelete = (id) => {
    this.props.deleteUnit(id)
  }

  render() {
    const { classes } = this.props;
    return (
      <main>
        <CustomButton link="/unit/create">New unit</CustomButton>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>unit_name</CustomTableCell>
                <CustomTableCell align="right">unit_type</CustomTableCell>
                <CustomTableCell align="right">Action</CustomTableCell>
              </TableRow>
            </TableHead>
            {this.props.unitList.length > 0 && <TableBody>
              {this.props.unitList.map(row => (
                <TableRow className={classes.row} key={row.unit_id}>
                  <CustomTableCell component="th" scope="row">
                    {row.unit_name}
                  </CustomTableCell>
                  <CustomTableCell align="right">{row.unit_type}</CustomTableCell>
                  <CustomTableCell align="right">
                    <Button color="primary" variant="contained" onClick={() => this.handleViewButtonClick(row)}>view</Button>
                    <Button color="primary" variant="contained" onClick={() => this.handleUpdateButtonClick(row)}>update</Button>
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

(UnitPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    unitList: state.companyReducer.unitList
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UnitPage));
