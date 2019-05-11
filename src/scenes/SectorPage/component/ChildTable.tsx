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
import TableRow from "@material-ui/core/TableRow";
import { SubJobFunction } from "../../../interface/jobfunctionInterface";

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

export interface Props extends WithStyles<typeof styles>, InState {}

interface State {}

interface InState {
  subjobFunctionList: SubJobFunction[];
}
class ChildTable extends React.Component<Props, State> {
  render() {
    const { classes } = this.props;

    return (
      <Table className={classes.table}>
        {this.props.subjobFunctionList.length > 0 && (
          <TableBody>
            {this.props.subjobFunctionList.map(row => (
              <TableRow className={classes.row} key={row.sjobfunction_id}>
                <CustomTableCell component="th" scope="row">
                  {row.sjobfunction_id}
                </CustomTableCell>
                <CustomTableCell align="right">
                  {row.subjob_name}
                </CustomTableCell>
                <CustomTableCell align="right">
                  {row.description}
                </CustomTableCell>
                <CustomTableCell align="right">action</CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    );
  }
}

(ChildTable as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(ChildTable);
