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
import { Company } from "../../interface/companyInterface";
import { RootState } from "../../reducer";
import { mapDispatchToProps } from "../../helper/dispachProps";
import { connect } from "react-redux";
import { Button, IconButton } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

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
  companyList: Company[]
}

class CustomizedTable extends React.Component<Props, State> {


  componentDidMount() {
    this.props.getChildCompanyList()
  }

  handleUpdateButtonClick = (unit) => {
    console.log('clicked')
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
        <CustomButton link="/subcompany/create">New Sub Company</CustomButton>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>company_name</CustomTableCell>
                <CustomTableCell align="right">contact_email</CustomTableCell>
                <CustomTableCell align="right">contact_number</CustomTableCell>
                <CustomTableCell align="right">contact_person</CustomTableCell>
                <CustomTableCell align="right">Action</CustomTableCell>
              </TableRow>
            </TableHead>
            {this.props.companyList.length > 0 && <TableBody>
              {this.props.companyList.map(row => (
                <TableRow className={classes.row} key={row.company_id}>
                  <CustomTableCell component="th" scope="row">
                    {row.company_name}
                  </CustomTableCell>
                  <CustomTableCell align="right">{row.contact_email}</CustomTableCell>
                  <CustomTableCell align="right">{row.contact_number}</CustomTableCell>
                  <CustomTableCell align="right">{row.contact_person}</CustomTableCell>
                  <CustomTableCell align="right">
                    <Button color="primary" variant="contained" onClick={() => this.handleUpdateButtonClick(row)}>view</Button>
                    <IconButton onClick={() => this.handleDelete(row.company_id)}><DeleteIcon /></IconButton>
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

(CustomizedTable as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: any) {
  return {
    companyList: state.companyReducer.childCompanyList
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CustomizedTable));
