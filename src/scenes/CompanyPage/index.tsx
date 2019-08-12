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
import { SharedDispatchProps } from "../../interface/propsInterface";
import { Company } from "../../interface/companyInterface";
import { mapDispatchToProps } from "../../helper/dispachProps";
import { connect } from "react-redux";
import {
  IconButton,
  InputBase,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { history } from "../../store";
import UpdateIcon from "@material-ui/icons/LibraryBooks";
import ViewIcon from "@material-ui/icons/Input";
import DetailIcon from "@material-ui/icons/Assignment";
import { isTechnical, isMaster } from "../../function/checkRole";
import Detail from "./component/Detail";
import { User } from "../../interface/userInterface";
import $axios from "../../plugin/axios";
import SearchIcon from "@material-ui/icons/Search";
import { fade } from "@material-ui/core/styles/colorManipulator";
import CustomButton from "../../helper/components/CustomButton";

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
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      color: "#FFF",
      backgroundColor: fade("#f56000", 0.9),
      "&:hover": {
        backgroundColor: fade("#f56000", 1)
      },
      marginRight: theme.spacing.unit * 2,
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing.unit * 3
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
      paddingTop: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: 200
      }
    }
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
  searchedVal: string;
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
    searchedVal: ""
  };

  componentDidMount() {
    console.log("CompanyPage Mount");
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
    console.log(this.props.companyList);
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

  handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchedVal: event.target.value });
  };

  filteredList = () => {
    return this.props.companyList.filter(e => {
      if (
        e.company_name
          .toString()
          .toLowerCase()
          .indexOf(this.state.searchedVal.toLowerCase()) >= 0 ||
        this.checkcountry(e.country, this.state.searchedVal)
      ) {
        return e;
      } else {
        return null;
      }
    });
  };

  checkcountry(countryList, search) {
    if (countryList === "" || countryList.length === 0) {
      return false;
    } else {
      let hasCountry = false;
      for (const country of countryList) {
        const charIndex = country
          .toString()
          .toLowerCase()
          .indexOf(search.toLowerCase());
        if (charIndex >= 0) {
          hasCountry = true;
          break;
        } else {
          hasCountry = false;
        }
      }
      return hasCountry;
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <main>
        <Grid container>
          {!isTechnical(this.props.role) && (
            <Grid container item xs={2}>
              <CustomButton onClick={() => history.push("/company/create")}>New Company</CustomButton>
            </Grid>
          )}
          <Grid container item xs={6}>
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
                onChange={this.handleSearch}
              />
            </div>
          </Grid>
        </Grid>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>Company Name</CustomTableCell>
                <CustomTableCell align="left">Action</CustomTableCell>
              </TableRow>
            </TableHead>
            {this.filteredList().length > 0 && (
              <TableBody>
                {this.filteredList()
                  .sort(this.sortCompanyListcompare)
                  .map((row: Company) => (
                    <TableRow className={classes.row} key={row.company_id}>
                      <CustomTableCell component="th" scope="row">
                        {row.company_name}
                      </CustomTableCell>
                      <CustomTableCell align="left">
                      <IconButton
                          onClick={() => this.handleViewButtonClick(row)}
                        >
                          <ViewIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => this.handleDetailButtonClick(row)}
                        >
                          <DetailIcon />
                        </IconButton>                        
                        {!isTechnical(this.props.role) && (
                          <IconButton
                            onClick={() => this.handleUpdateButtonClick(row)}
                          >
                            <UpdateIcon />
                          </IconButton>
                        )}

                        {row.company_id !== "5ZwOXIkeKuPhpFriTsmD" &&
                          isMaster(this.props.role) && (
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

        <Dialog
          open={this.state.detail}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth={false}
        >
          <DialogTitle id="form-dialog-title">Detail</DialogTitle>
          <DialogContent>
            <Detail
              userData={this.state.userdata}
              locationData={this.state.locationdata}
              companyData={this.state.viewCompany}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
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
    role: state.authenticationReducer.profile.info.role_name,
    sessionkey: state.authenticationReducer.token
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CustomizedTable));
