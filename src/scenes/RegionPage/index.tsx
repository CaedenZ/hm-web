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
import { RootState } from "../../reducer";
import { mapDispatchToProps } from "../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../interface/propsInterface";
import { User } from "../../interface/userInterface";
import { Button, IconButton } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import { Region } from "../../interface/regionInterface";

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

let id = 0;
function createData(
  name: any,
  calories: any,
  fat: any,
  carbs: any,
  protein: any
) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}


export interface Props extends WithStyles<typeof styles>, SharedDispatchProps, InState { }

interface State { }

interface InState {
  regionList: Region[]
}
class RegionPage extends React.Component<Props, State> {


  componentDidMount() {
    this.props.getRegionList()
  }

  handleUpdateButtonClick = (unit) => {
    console.log(this.props.regionList)
    // this.props.selectUnit(unit)
    // this.setState({
    //   redirect: true
    // })
  }

  handleDelete = (id) => {
    console.log('clicked')
  }

  render() {
    const { classes } = this.props;

    return (
      <main>
        <CustomButton link="/region/create">New Region</CustomButton>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>Name</CustomTableCell>
                <CustomTableCell align="right">Countrys</CustomTableCell>
                <CustomTableCell align="right">Action</CustomTableCell>
              </TableRow>
            </TableHead>
            {this.props.regionList.length > 0 && <TableBody>
              {this.props.regionList.map(row => (
                <TableRow className={classes.row} key={row.region_id}>
                  <CustomTableCell component="th" scope="row">{row.region_name}</CustomTableCell>
                  <CustomTableCell align="right">{row.country_list.map(country => (
                    country.country_name + "  "
                  ))}</CustomTableCell>
                  <CustomTableCell align="right">
                    <Button color="primary" variant="contained" onClick={() => this.handleUpdateButtonClick(row)}>view</Button>
                    <IconButton onClick={() => this.handleDelete(row.region_id)}><DeleteIcon /></IconButton>
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

(RegionPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    regionList: state.regionReducer.regionList
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RegionPage));
