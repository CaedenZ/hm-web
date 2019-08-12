import React from "react";
import PropTypes from "prop-types";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { SharedDispatchProps } from "../../interface/propsInterface";
import { Company, Division, Unit } from "../../interface/companyInterface";
import { RootState } from "../../reducer";
import { mapDispatchToProps } from "../../helper/dispachProps";
import { connect } from "react-redux";
import {
  IconButton,
  Menu,
  MenuItem,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Dialog,
  DialogContent
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { history } from "../../store";
import UpdateIcon from "@material-ui/icons/LibraryBooks";
import CompanyIcon from "@material-ui/icons/Business";
import AddIcon from "@material-ui/icons/Add";
import { isUserHR, isUserPowerOrHR } from "../../function/checkRole";
import CustomButton from "../../helper/components/CustomButton";
import FormPage from "./component/form";

const styles = (theme: Theme) => createStyles({});

export interface Props
  extends WithStyles<typeof styles>,
  SharedDispatchProps,
  InState { }

interface State {
  anchorEl: any;
  isModalOpen: boolean;
  isSubModalOpen: boolean;
  isSubSubModalOpen: boolean;
  isModalUpdateOpen: boolean;
}

interface InState {
  selectedUnit: Unit;
  selectedCompany: Company;
  divisionList: Division[];
  entityList: Company[];
  role: string;
  parentUnit: Unit;
}

class UnitPage extends React.Component<Props, State> {
  state = {
    anchorEl: null,
    isModalOpen: false,
    isSubModalOpen: false,
    isSubSubModalOpen: false,
    isModalUpdateOpen: false,
  };

  constructor(props) {
    super(props);
    this.handleViewButtonClick = this.handleViewButtonClick.bind(this);
    this.handleUpdateButtonClick = this.handleUpdateButtonClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    console.log("Unit Page Mount");
    if (this.props.selectedCompany.company_id === "") {
      let data = {
        type: "warning",
        object: "Please Select a Company first",
        id: "1"
      };
      this.props.showDialog(data);
    } else this.props.getDivisionList();
  }

  //Create Main
  handleModelCreateButtonClick = () => {
    this.setState({ isModalOpen: true });
    this.forceUpdate();
    console.log(this.state);
  };

  //Create Sub Unit
  handleAddButtonClick = div => {
    this.props.selectUnit(div);
    this.setState({ isSubModalOpen: true });
    //history.push("/unit/subunit/create");
  };

  //Create Sub/Sub Unit
  handleSubAddButtonClick = div => {
    this.props.selectUnit(div);
    this.setState({ isSubSubModalOpen: true });
    //history.push("/unit/subunit/create");
  };

  //Save Create Main
  handleCreateUnit = (e, data) => {
    e.preventDefault();
    this.props.createUnit(data);
    this.setState({ isModalOpen: false });
    //history.goBack();
  };

  //Save Create Sub Unit
  handleCreateSubUnit = (e, data) => {
    e.preventDefault();
    this.props.createSubUnit(data);
    this.setState({ isSubModalOpen: false });
    //history.goBack();
  };

  //Save Create Sub/Sub Unit
  handleCreateSubSubUnit = (e, data) => {
    e.preventDefault();
    this.props.createSubUnit(data);
    this.setState({ isSubSubModalOpen: false });
    //history.goBack();
  };

  //Handle Update
  handleUpdateButtonClick = unit => {
    this.props.selectUpdateUnit(unit);
    this.setState({ isModalUpdateOpen: true });
  };

  //Update Main
  handleUpdateUnit = (e, data) => {
    e.preventDefault();
    this.props.updateUnit(data);
    this.setState({ isModalUpdateOpen: false });
    //history.goBack();
  };  

  //General Handle Close
  handleModalClose = () => {
    this.setState({ isModalOpen: false });
    this.setState({ isSubModalOpen: false });
    this.setState({ isSubSubModalOpen: false });
    this.setState({ isModalUpdateOpen: false });
  };

  /*handleSubAddButtonClick = div => {
    this.props.selectSubUnit(div);
    history.push("/unit/subunit/childunit/create");
  };*/

  handleViewButtonClick = unit => {
    this.props.selectUnit(unit);
    history.push("/unit/subunit");
  };



  handleSubUpdateButtonClick = unit => {
    console.log("clicked");
    this.props.selectUpdateUnit(unit);
    history.push("/unit/subunit/update");
  };

  handleChildUpdateButtonClick = unit => {
    console.log("clicked");
    this.props.selectUpdateUnit(unit);
    history.push("/unit/subunit/childunit/update");
  };

  handleEntity = (row, event) => {
    switch (row.unit_type) {
      case "country":
        this.props.getCompanyByCountry(row.unit_data);
        break;
      case "region":
        const b = JSON.parse(row.unit_data);
        console.log(b.region_id);
        this.props.getCompanyByRegion(b.region_id);
        break;
    }
    this.setState({ anchorEl: event.currentTarget });
  };

  handleDelete = id => {
    const payload = {
      type: "delete",
      object: "unit",
      id: id
    };
    this.props.showDialog(payload);
    // this.props.deleteUnit(id)
  };

  handleSubDelete = id => {
    const payload = {
      type: "delete",
      object: "subunit",
      id: id
    };
    this.props.showDialog(payload);
    // this.props.deleteUnit(id)
  };

  handleChildDelete = id => {
    const payload = {
      type: "delete",
      object: "childunit",
      id: id
    };
    this.props.showDialog(payload);
    // this.props.deleteUnit(id)
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    let type = unit => {
      switch (unit.unit_type) {
        case "Division":
          return <Typography style={{ marginTop: "1rem" }} >{unit.unit_data}</Typography>;
        case "region":
          return (
            <Typography>
              {unit.unit_data !== '' ? JSON.parse(unit.unit_data).region_name : unit.unit_data}
              <IconButton onClick={e => this.handleEntity(unit, e)}>
                <CompanyIcon />
              </IconButton>
            </Typography>
          );
        case "country":
          return (
            <Typography>
              {unit.unit_data}
              <IconButton onClick={e => this.handleEntity(unit, e)}>
                <CompanyIcon />
              </IconButton>
            </Typography>
          );
        default:
          return null;
      }
    };

    return (
      <main>
        {!isUserHR(this.props.role) && (
          <CustomButton /*onClick={() => { history.push("/unit/create") }}*/ onClick={() => this.handleModelCreateButtonClick()}>
          New Division
          </CustomButton>
        )}
        {this.props.divisionList.length > 0 && (
          <Grid style={{ marginTop: "2rem" }} container spacing={24}>
            {this.props.divisionList.map(row => (
              <Grid key={row.unit_id} item xs={6}>
                <Paper style={{ height: "100%", backgroundColor:"#d9d9d9" }}>
                  <Grid container style={{ margin: "auto" }}>
                    <Grid item xs={8} style={{ margin: "auto" }}>
                      <Typography variant="h5" style={{ margin: "1rem" }}>
                        {row.unit_name}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} style={{ margin: "auto" }}>
                      <div style={{ textTransform: "capitalize" }}>
                      <Typography style={{ marginTop: "1rem" }} >
                        {row.unit_type}{type(row)}
                      </Typography>
                        
                        {/* {row.unit_type !== 'Division' && <IconButton onClick={(e) => this.handleEntity(row, e)}><CompanyIcon /></IconButton>} */}
                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={this.handleClose}
                        >
                          {this.props.entityList.length > 0 ? (
                            this.props.entityList.map(e => {
                              return (
                                <MenuItem
                                  key={e.company_id}
                                  onClick={this.handleClose}
                                >
                                  {e.company_name}
                                </MenuItem>
                              );
                            })
                          ) : (
                              <MenuItem onClick={this.handleClose}>
                                No exist entity
                            </MenuItem>
                            )}
                        </Menu>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid justify="flex-end" alignItems="flex-end" container>
                    <Grid item xs={1}>
                      {!isUserHR(this.props.role) && (
                        <IconButton
                          onClick={() => this.handleAddButtonClick(row)}
                        >
                          <AddIcon />
                        </IconButton>
                      )}
                    </Grid>
                    <Grid item xs={1}>
                      {!isUserHR(this.props.role) && (
                        <IconButton
                          onClick={() => this.handleUpdateButtonClick(row)}
                        >
                          <UpdateIcon />
                        </IconButton>
                      )}
                    </Grid>
                    <Grid item xs={1}>
                      {!isUserPowerOrHR(this.props.role) && (
                        <IconButton
                          onClick={() => this.handleDelete(row.unit_id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                  {row.sub_unit.length > 0 && (
                    <Grid container spacing={8} style={{ padding: "0.7rem" }}>
                      {row.sub_unit.map(subrow => (
                        <Grid key={subrow.unit_id} item xs={12}>
                          <Paper style={{ height: "100%", backgroundColor: "#F2F3F4" }} elevation={2}>
                            <Grid container style={{ margin: "auto" }}>
                              <Grid item xs={8} style={{ margin: "auto" }}>
                                <Typography
                                  variant="h6"
                                  style={{ margin: "1rem" }}
                                >
                                  {subrow.unit_name}
                                </Typography>
                              </Grid>
                              <Grid item xs={4} style={{ margin: "auto" }}>
                                <div style={{ marginTop: "1rem" }}>
                                  <div style={{ textTransform: "capitalize" }}>
                                    {subrow.unit_type}
                                  </div>
                                  {type(subrow)}
                                  {/* {subrow.unit_type !== 'Division' && <IconButton onClick={(e) => this.handleEntity(subrow, e)}><CompanyIcon /></IconButton>} */}
                                </div>
                              </Grid>
                            </Grid>
                            <Grid
                              direction="row"                             
                              justify="flex-end"
                              alignItems="flex-end"
                              container
                            >
                              <Grid item xs={1}>
                                {!isUserHR(this.props.role) && (
                                  <IconButton
                                    onClick={() =>
                                      this.handleSubAddButtonClick(subrow)
                                    }
                                  >
                                    <AddIcon />
                                  </IconButton>
                                )}
                              </Grid>
                              <Grid item xs={1}>
                                {!isUserHR(this.props.role) && (
                                  <IconButton
                                    onClick={() =>
                                      //this.handleSubUpdateButtonClick(subrow)
                                      this.handleUpdateButtonClick(subrow)
                                    }
                                  >
                                    <UpdateIcon />
                                  </IconButton>
                                )}
                              </Grid>
                              <Grid item xs={1}>
                                {!isUserPowerOrHR(this.props.role) && (
                                  <IconButton
                                    onClick={() =>
                                      this.handleSubDelete(subrow.unit_id)
                                    }
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                )}
                              </Grid>
                            </Grid>
                            <Divider />
                            <Divider />
                            {subrow.sub_sub_unit.length > 0 && (
                              <Paper
                                style={{ padding: "1rem", margin: "0.5rem", backgroundColor:"#FFF" }}
                                elevation={4}
                              >
                                <List dense={true}>
                                  {subrow.sub_sub_unit.map(childrow => [
                                    <ListItem key={childrow.unit_id}>
                                      <ListItemText
                                        primary={childrow.unit_name}
                                        secondary={childrow.unit_type}
                                      />
                                      {/* {childrow.unit_type !== 'Division' && <IconButton onClick={(e) => this.handleEntity(subrow, e)}><CompanyIcon /></IconButton>} */}
                                      {type(childrow)}
                                      {!isUserHR(this.props.role) && (
                                        <IconButton
                                          onClick={() =>
                                            //this.handleChildUpdateButtonClick(childrow)
                                            this.handleUpdateButtonClick(childrow)
                                          }
                                        >
                                          <UpdateIcon />
                                        </IconButton>
                                      )}
                                      {!isUserPowerOrHR(this.props.role) && (
                                        <IconButton
                                          onClick={() =>
                                            this.handleChildDelete(
                                              childrow.unit_id
                                            )
                                          }
                                        >
                                          <DeleteIcon />
                                        </IconButton>
                                      )}
                                    </ListItem>,
                                    <Divider key={childrow.unit_id + "d"} />
                                  ])}
                                </List>
                              </Paper>
                            )}
                            
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  )}

                </Paper>
              </Grid>
            ))}
          </Grid>

        )}
        <Dialog
          open={this.state.isModalOpen}
          onClose={this.handleModalClose}
          maxWidth={false}
        >
          <DialogContent>
            <Typography component="h1" variant="h5" style = {{margin:"1rem"}}>
            Create Main Unit
            </Typography>
            <FormPage
              create={true}
              updateData={{ company_id: this.props.selectedCompany.company_id }}
              onSubmit={(e, data) => this.handleCreateUnit(e, data)}
            />
          </DialogContent>
        </Dialog>
        <Dialog
          open={this.state.isSubModalOpen}
          onClose={this.handleModalClose}
          maxWidth={false}
        >
          <DialogContent>
            <Typography component="h1" variant="h5" style = {{margin:"1rem"}}>
            Create Sub Unit
            </Typography>
            {this.props.parentUnit ? <FormPage
              create={true}
              updateData={{
                parent_unit: this.props.parentUnit.unit_id,
                main_unit: this.props.parentUnit.main_unit,
                company_id: this.props.selectedCompany.company_id
              }}
              onSubmit={(e, data) => this.handleCreateSubUnit(e, data)}
            />:null}
          </DialogContent>
        </Dialog>
        <Dialog
          open={this.state.isSubSubModalOpen}
          onClose={this.handleModalClose}
          maxWidth={false}
        >
          <DialogContent>
            <Typography component="h1" variant="h5" style = {{margin:"1rem"}}>
            Create Sub/Sub Unit
            </Typography>
            {this.props.parentUnit ? <FormPage
              create={true}
              updateData={{
                parent_unit: this.props.parentUnit.unit_id,
                main_unit: this.props.parentUnit.main_unit,
                company_id: this.props.selectedCompany.company_id
              }}
              onSubmit={(e, data) => this.handleCreateSubSubUnit(e, data)}
            />: null}
          </DialogContent>
        </Dialog>
        {/*UPDATE*/}
        <Dialog
          open={this.state.isModalUpdateOpen}
          onClose={this.handleModalClose}
          maxWidth={false}
        >
          <DialogContent>
            <Typography component="h1" variant="h5" style = {{margin:"1rem"}}>
            Create Main Unit
            </Typography>
            <FormPage
              create={false}
              updateData={this.props.selectedUnit}
              onSubmit={(e, data) => this.handleCreateUnit(e, data)}
            />
          </DialogContent>
        </Dialog>
      </main>
    );
  }
}

(UnitPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    selectedCompany: state.companyReducer.selectedCompany,
    divisionList: state.companyReducer.divisionList,
    entityList: state.companyReducer.unitEntity,
    role: state.authenticationReducer.profile.info.role_name,
    parentUnit: state.companyReducer.selectedUnit,
    selectedUnit: state.companyReducer.selectUpdateUnit,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UnitPage));
