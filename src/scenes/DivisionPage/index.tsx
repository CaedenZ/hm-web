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
import { Company, Unit, Division } from "../../interface/companyInterface";
import { RootState } from "../../reducer";
import { mapDispatchToProps } from "../../helper/dispachProps";
import { connect } from "react-redux";
import { Button, IconButton, Menu, MenuItem, Grid, Typography, List, ListItem, ListItemText, Divider } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import { history } from "../../store";
import UpdateIcon from '@material-ui/icons/PlaylistAddCheck';
import ViewIcon from '@material-ui/icons/ZoomIn';
import CompanyIcon from "@material-ui/icons/Business";
import AddIcon from '@material-ui/icons/Add';


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
  anchorEl: any,
}

interface InState {
  selectedCompany: Company,
  divisionList: Division[],
  entityList: Company[]
}

class UnitPage extends React.Component<Props, State> {

  state = {
    anchorEl: null,
  };

  constructor(props) {
    super(props)
    this.handleViewButtonClick = this.handleViewButtonClick.bind(this)
    this.handleUpdateButtonClick = this.handleUpdateButtonClick.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }


  componentDidMount() {
    console.log('Unit Page Mount')
    if (this.props.selectedCompany.company_id === '') {
      let data = {
        type: 'warning',
        object: 'Please Select a Company first',
        id: '1'
      }
      this.props.showDialog(data)
    }
    else this.props.getDivisionList()
  }

  handleAddButtonClick = (div) => {
    this.props.selectUnit(div)
    history.push('/unit/subunit/create')
  }

  handleSubAddButtonClick = (div) => {
    this.props.selectSubUnit(div)
    history.push('/unit/subunit/childunit/create')
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

  handleSubUpdateButtonClick = (unit) => {
    console.log('clicked')
    this.props.selectUpdateUnit(unit)
    history.push('/unit/subunit/update')
  }

  handleChildUpdateButtonClick = (unit) => {
    console.log('clicked')
    this.props.selectUpdateUnit(unit)
    history.push('/unit/subunit/childunit/update')
  }

  handleEntity = (row, event) => {
    switch (row.unit_type) {
      case 'country':
        const a = JSON.parse(row.unit_data)
        console.log(a.country_name)
        this.props.getCompanyByCountry(a.country_name)
        break
      case 'region':
        const b = JSON.parse(row.unit_data)
        console.log(b.region_id)
        this.props.getCompanyByRegion(b.region_id)
        break
    }
    this.setState({ anchorEl: event.currentTarget });
  }

  handleDelete = (id) => {
    const payload = {
      type: 'delete',
      object: 'unit',
      id: id,
    }
    this.props.showDialog(payload)
    // this.props.deleteUnit(id)
  }

  handleSubDelete = (id) => {
    const payload = {
      type: 'delete',
      object: 'subunit',
      id: id,
    }
    this.props.showDialog(payload)
    // this.props.deleteUnit(id)
  }

  handleChildDelete = (id) => {
    const payload = {
      type: 'delete',
      object: 'childunit',
      id: id,
    }
    this.props.showDialog(payload)
    // this.props.deleteUnit(id)
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };



  render() {
    const { anchorEl } = this.state;

    let type = (unit) => {
      switch (unit.unit_type) {
        case 'Division':
          return <Typography>{unit.unit_data}</Typography>;
        case 'region':
          return <Typography>{JSON.parse(unit.unit_data).region_name}<IconButton onClick={(e) => this.handleEntity(unit, e)}><CompanyIcon /></IconButton></Typography>;
        case 'country':
          return <Typography>{JSON.parse(unit.unit_data).country_name}<IconButton onClick={(e) => this.handleEntity(unit, e)}><CompanyIcon /></IconButton></Typography>;
        default:
          return null;
      }
    }
    return (
      <main>
        <CustomButton link="/unit/create">New Division</CustomButton>
        {this.props.divisionList.length > 0 && <Grid container spacing={24}>
          {this.props.divisionList.map(row => <Grid key={row.unit_id} item xs={6} spacing={24} >
            <Paper style={{ height: '100%' }}>
              <Grid container style={{ margin: 'auto' }}>
                <Grid item xs={8} style={{ margin: 'auto' }}>
                  <Typography variant="h5" component="p" style={{ margin: 20, display: 'flex' }}>{row.unit_name}</Typography>
                </Grid>
                <Grid item xs={4} style={{ margin: 'auto' }}>
                  <Typography component="p" >{row.unit_type}
                    {type(row)}
                    {/* {row.unit_type !== 'Division' && <IconButton onClick={(e) => this.handleEntity(row, e)}><CompanyIcon /></IconButton>} */}
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={this.handleClose}
                    >
                      {this.props.entityList.length > 0 ? this.props.entityList.map(e => {
                        return (<MenuItem key={e.company_id} onClick={this.handleClose}>{e.company_name}</MenuItem>)
                      }) : <MenuItem onClick={this.handleClose}>No exist entity</MenuItem>}
                    </Menu>
                  </Typography>
                </Grid>
              </Grid>
              {row.sub_unit.length > 0 && <Grid container spacing={8} style={{ padding: 10 }}>
                {row.sub_unit.map(subrow => <Grid key={subrow.unit_id} item xs={12}>
                  <Paper style={{ height: '100%' }}>
                    <Grid container style={{ margin: 'auto' }}>
                      <Grid item xs={8} style={{ margin: 'auto' }}>
                        <Typography variant="h6" component='p' style={{ margin: 10 }} >{subrow.unit_name}</Typography>
                      </Grid>
                      <Grid item xs={4} style={{ margin: 'auto' }}>
                        <Typography component="p" >{subrow.unit_type}
                          {/* {subrow.unit_type !== 'Division' && <IconButton onClick={(e) => this.handleEntity(subrow, e)}><CompanyIcon /></IconButton>} */}
                          {type(subrow)}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider />
                    <Divider />
                    {(subrow.sub_sub_unit.length > 0) && <List dense={true}>
                      {subrow.sub_sub_unit.map(childrow => [<ListItem key={childrow.unit_id}>
                        <ListItemText
                          primary={childrow.unit_name}
                          secondary={childrow.unit_type}
                        />
                        {/* {childrow.unit_type !== 'Division' && <IconButton onClick={(e) => this.handleEntity(subrow, e)}><CompanyIcon /></IconButton>} */}
                        {type(childrow)}
                        <IconButton onClick={() => this.handleChildUpdateButtonClick(childrow)}><UpdateIcon /></IconButton>
                        <IconButton onClick={() => this.handleChildDelete(childrow.unit_id)}><DeleteIcon /></IconButton>
                      </ListItem>,
                      <Divider key={childrow.unit_id + 'd'} />]
                      )}
                    </List>}
                    <Grid container >
                      <Grid xs={8} />
                      <Grid item xs={1}>
                        <IconButton onClick={() => this.handleSubAddButtonClick(subrow)}><AddIcon /></IconButton>
                      </Grid>
                      <Grid item xs={1}>
                        <IconButton onClick={() => this.handleSubUpdateButtonClick(subrow)}><UpdateIcon /></IconButton>
                      </Grid>
                      <Grid item xs={1}>
                        <IconButton onClick={() => this.handleSubDelete(subrow.unit_id)}><DeleteIcon /></IconButton>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>)}
              </Grid>}
              <Grid container>
                <Grid xs={9} />
                <Grid item xs={1}>
                  <IconButton onClick={() => this.handleAddButtonClick(row)}><AddIcon /></IconButton>
                </Grid>
                <Grid item xs={1}>
                  <IconButton onClick={() => this.handleUpdateButtonClick(row)}><UpdateIcon /></IconButton>
                </Grid>
                <Grid item xs={1}>
                  <IconButton onClick={() => this.handleDelete(row.unit_id)}><DeleteIcon /></IconButton>
                </Grid>
              </Grid>
            </Paper>
          </Grid>)}
        </Grid>}
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UnitPage));