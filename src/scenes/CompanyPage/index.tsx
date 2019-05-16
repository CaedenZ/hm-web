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
import { SharedDispatchProps } from "../../interface/propsInterface";
import { Company } from "../../interface/companyInterface";
import { mapDispatchToProps } from "../../helper/dispachProps";
import { connect } from "react-redux";
import { IconButton, InputBase } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { history } from "../../store";
import UpdateIcon from "@material-ui/icons/PlaylistAddCheck";
import ViewIcon from "@material-ui/icons/ZoomIn";
import DetailIcon from "@material-ui/icons/Face";
import { isTechnical, isSuperAdmin } from "../../function/checkRole";
import Detail from "./component/Detail";
import { User } from "../../interface/userInterface";
import $axios from "../../plugin/axios";
import SearchIcon from "@material-ui/icons/Search";
import { fade } from "@material-ui/core/styles/colorManipulator";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  },
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
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginRight: theme.spacing.unit * 2,
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing.unit * 3,
        width: "auto"
      }
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit",
      width: "100%"
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: 200
      }
    },
  });

export interface Props
  extends WithStyles<typeof styles>,
  SharedDispatchProps,
  InState { }

interface State {
  detail: boolean;
  companyid: string;
  locationdata: Location[];
  userdata: User[];
  viewCompany: Company | null;
  displayarr: Company[];
}

interface InState {
  companyList: Company[];
  role: string;
  sessionkey: string;
}

class CustomizedTable extends React.Component<Props, State> {
  state = {
    detail: false,
    companyid: "",
    locationdata: [],
    userdata: [],
    viewCompany: null,
    displayarr: [],
  };
  componentDidMount() {
    this.props.getCompanyList();
    console.log("CompangPage Mount");
    this.setState({displayarr:this.props.companyList})
  }

  sortCompanyListcompare(
    a: { company_name: string },
    b: { company_name: string }
  ) {
    return a.company_name.localeCompare(b.company_name);
  }

  handleUpdateButtonClick = company => {
    console.log(company);
    this.props.selectUpdateCompany(company);
    history.push("/company/update");
  };

  handleDelete = id => {
    const payload = {
      type: "delete",
      object: "company",
      id: id
    };
    this.props.showDialog(payload);
  };

  handleViewButtonClick = company => {
    this.props.selectCompany(company);
  };

  handleDetailButtonClick = async company => {
    // this.props.selectUser(company);
    const companyID = company.company_id;
    let ldata = { session_key: this.props.sessionkey, company_id: companyID };
    const lresponse = await $axios.post("/company/getLocation", ldata);
    this.setState({ locationdata: lresponse.data.data });

    let udata = { session_key: this.props.sessionkey, company_id: companyID };
    const uresponse = await $axios.post("/user/", udata);
    this.setState({ userdata: uresponse.data.data });

    this.setState({ viewCompany: company });

    this.setState({ detail: true });
  };

  handleClose = () => {
    this.setState({ detail: false });
  };

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let arr = this.props.companyList.filter(e => {
      if ((e.company_name.toString()
        .toLowerCase()
        .indexOf(event.target.value.toLowerCase()) >= 0) || (this.checkcountry(e.country, event.target.value))) {
        return e
      }
    })

    this.setState({ displayarr: arr })
    // console.log(arr)
  };

  checkcountry(country, search) {
    if (country === '') {
      return false
    } else {
      if (country.length === 0) {
        return false
      }
      else {
        let e: any[] = [...country]
        e.forEach(e => {
          if (e.toString()
            .toLowerCase()
            .indexOf(search.toLowerCase()) >= 0) {
            return true
          }
          else { return false }
        })
      }
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <main>
        {!isTechnical(this.props.role) && (
          <CustomButton link="/company/create">New Company</CustomButton>
        )}
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            onChange={this.handleChange}
          />
        </div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>Company Name</CustomTableCell>
                <CustomTableCell align="left">Action</CustomTableCell>
              </TableRow>
            </TableHead>
            {this.state.displayarr.length > 0 && (
              <TableBody>
                {this.state.displayarr
                  .sort(this.sortCompanyListcompare)
                  .map((row: Company) => (
                    <TableRow className={classes.row} key={row.company_id}>
                      <CustomTableCell component="th" scope="row">
                        {row.company_name}
                      </CustomTableCell>
                      <CustomTableCell align="left">
                        <IconButton
                          onClick={() => this.handleDetailButtonClick(row)}
                        >
                          <DetailIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => this.handleViewButtonClick(row)}
                        >
                          <ViewIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => this.handleUpdateButtonClick(row)}
                        >
                          <UpdateIcon />
                        </IconButton>
                        {/* <Button color="primary" variant="contained" onClick={() => this.handleUpdateButtonClick(row)}>view</Button> */}
                        {row.company_id !== "5ZwOXIkeKuPhpFriTsmD" &&
                          isSuperAdmin(this.props.role) && (
                            <IconButton
                              onClick={() => this.handleDelete(row.company_id)}
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
        <Detail
          open={this.state.detail}
          handleClose={this.handleClose}
          userData={this.state.userdata}
          locationData={this.state.locationdata}
          companyData={this.state.viewCompany}
        />
      </main>
    );
  }
}

(CustomizedTable as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: any) {
  return {
    companyList: state.companyReducer.companyList,
    role: state.authenticationReducer.profile.info[0].roles[0].role,
    sessionkey: state.authenticationReducer.token
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CustomizedTable));
