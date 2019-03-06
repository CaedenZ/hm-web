import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Table, TableBody, TableRow, TableCell, TableFooter, TablePagination } from '@material-ui/core';

const styles = (theme:any) => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: "70%",
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  title:{
    marginTop: theme.spacing.unit * 10,
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    display: 'flex',
    // flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
});

function UserPage(props:any) {
  const { classes } = props;
//   const { rows, rowsPerPage, page } = this.state;
const rows = [
    {
        att1:'att1',
        att2:'att2',
        att3:'att3'
    },
    {
        att1:'att1',
        att2:'att2',
        att3:'att3'
    },
]
  return (
    <main className={classes.main}>
      <CssBaseline />
      <Typography className={classes.title} component="h1" variant="h5">
          User
        </Typography>
      <Paper className={classes.paper}>
      <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.att1}>
                  <TableCell component="th" scope="row">
                    {row.att2}
                  </TableCell>
                  <TableCell align="right">{row.att3}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                {/* <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={}
                  onChangeRowsPerPage={}
                  ActionsComponent={}
                /> */}
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    </main>
  );
}

UserPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserPage);