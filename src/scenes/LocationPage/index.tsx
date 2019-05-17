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
import CustomButton from "./component/CustomButton";
import { RootState } from "../../reducer";
import { mapDispatchToProps } from "../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../interface/propsInterface";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Location } from "../../interface/locationInterface";
import { history } from "../../store";
import UpdateIcon from "@material-ui/icons/PlaylistAddCheck";
import { Company } from "../../interface/companyInterface";
import { isUserHR, isUserPowerOrHR } from "../../function/checkRole";

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

export interface Props
  extends WithStyles<typeof styles>,
    SharedDispatchProps,
    InState {}

interface State {}

interface InState {
  selectedCompany: Company;
  locationList: Location[];
  role;
}
class LocationPage extends React.Component<Props, State> {
  componentDidMount() {
    console.log("Location Page Mounted");
    if (this.props.selectedCompany.company_id === "") {
      let data = {
        type: "warning",
        object: "Please Select a Company first",
        id: "1"
      };
      this.props.showDialog(data);
    } else this.props.getLocationList();
  }

  handleUpdateButtonClick = location => {
    this.props.selectLocation(location);
    history.push("/location/update");
  };

  handleDelete = id => {
    const payload = {
      type: "delete",
      object: "location",
      id: id
    };
    this.props.showDialog(payload);
  };

  render() {
    const { classes } = this.props;

    return (
      <main>
        {!isUserHR(this.props.role) && (
          <CustomButton link="/location/create">New Location</CustomButton>
        )}
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell align="left">Name</CustomTableCell>
                <CustomTableCell align="left">Address</CustomTableCell>
                <CustomTableCell align="left">Postal Code</CustomTableCell>
                <CustomTableCell align="right">Action</CustomTableCell>
              </TableRow>
            </TableHead>
            {this.props.locationList.length > 0 && (
              <TableBody>
                {this.props.locationList.map(row => (
                  <TableRow className={classes.row} key={row.location_id}>
                    <CustomTableCell component="th" scope="row">
                      {row.location_name}
                    </CustomTableCell>
                    <CustomTableCell component="th" scope="row">
                      {row.address}
                    </CustomTableCell>
                    <CustomTableCell component="th" scope="row">
                      {row.postal_code}
                    </CustomTableCell>
                    <CustomTableCell align="right">
                      {!isUserHR(this.props.role) && (
                        <IconButton
                          onClick={() => this.handleUpdateButtonClick(row)}
                        >
                          <UpdateIcon />
                        </IconButton>
                      )}
                      {/* <Button color="primary" variant="contained" onClick={() => this.handleUpdateButtonClick(row)}>view</Button> */}
                      {!isUserPowerOrHR(this.props.role) && (
                        <IconButton
                          onClick={() => this.handleDelete(row.location_id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </CustomTableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </Paper>
      </main>
    );
  }
}

(LocationPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    selectedCompany: state.companyReducer.selectedCompany,
    locationList: state.locationReducer.locationList,
    role: state.authenticationReducer.profile.info[0].roles[0].role
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LocationPage));
