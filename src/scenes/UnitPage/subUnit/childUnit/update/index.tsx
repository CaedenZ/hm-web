import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Grid,
  Paper,
  TextField,
  Divider,
  FormControl,
  Checkbox,
  FormControlLabel,
  Button
} from "@material-ui/core";
import { mapDispatchToProps } from "../../../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../../../interface/propsInterface";
import { RootState } from "../../../../../reducer";
import { Unit } from "../../../../../interface/companyInterface";
import { history } from "../../../../../store";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    grid: {
      margin: 20
    },
    textField: {
      width: 200,
      margin: 20,
    },
    // formControl: {
    //   margin: theme.spacing.unit * 3,
    // },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: "center",
      color: theme.palette.text.secondary,
      flexDirection: "column"
    },
    preview: {
    },
    divAvatar: {
      margin: theme.spacing.unit * 3,
      alignSelf: "baseline",
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
    bigAvatar: {
      width: "auto",
      height: "auto"
    },
    profilebutton: {
      alignContent: "center",
      alignSelf: "center",
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    }
  });

export interface UpdateUnitState {
  unit_id: string,
  unit_name: string,
  unit_type: string,
  unit_data: string,
  parent_unit: string,
  main_unit: string,
  company_id: string,
}
export interface Props extends WithStyles<typeof styles>, SharedDispatchProps, InState { }

interface InState {
  selectedUnit: Unit;
}

class UpdateUnitPage extends Component<Props, UpdateUnitState> {


  constructor(props) {
    super(props)
    this.handleUpdateUnit = this.handleUpdateUnit.bind(this)
  }


  state: UpdateUnitState = {
    unit_id: '',
    unit_name: '',
    unit_type: '',
    unit_data: '',
    parent_unit: '',
    main_unit: '',
    company_id: '',
  }

  handleChange = (statekay: keyof UpdateUnitState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [statekay]: event.target.value } as Pick<UpdateUnitState, keyof UpdateUnitState>);
  };

  handleUpdateUnit = () => {
    this.props.updateChildUnit(this.state)
    history.goBack()
  }

  componentDidMount = () => {
    this.setState(this.props.selectedUnit)
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          New Unit
      </Typography>
        <Paper>
          <Grid container className={classes.grid} spacing={16}>
            <Grid item justify="center" container xs>
              <div style={{ margin: 20 }}>
                <TextField
                  id="unit_name"
                  label="unit_name"
                  className={classes.textField}
                  value={this.state.unit_name}
                  onChange={this.handleChange('unit_name')}
                  margin="normal"
                />
                <TextField
                  id="unit_type"
                  label="unit_type"
                  className={classes.textField}
                  value={this.state.unit_type}
                  onChange={this.handleChange('unit_type')}
                  margin="normal"
                />
                <TextField
                  id="unit_data"
                  label="unit_data"
                  className={classes.textField}
                  value={this.state.unit_data}
                  onChange={this.handleChange('unit_data')}
                  margin="normal"
                />
              </div>
            </Grid>
            <Grid item justify="center" container xs>
              <div style={{ margin: 20 }}>
                <TextField
                  disabled
                  id="parent_unit"
                  label="parent_unit"
                  className={classes.textField}
                  value={this.state.parent_unit}
                  onChange={this.handleChange('parent_unit')}
                  margin="normal"
                />
                <TextField
                  disabled
                  id="main_unit"
                  label="main_unit"
                  className={classes.textField}
                  value={this.state.main_unit}
                  onChange={this.handleChange('main_unit')}
                  margin="normal"
                />
              </div>
            </Grid>
          </Grid>
          <Divider />
          <Divider />
          <div style={{
            width: '100%', flex: 1,
            flexDirection: 'row',
            justifyContent: 'center', alignItems: 'flex-end'
          }}>
            <Button onClick={this.handleUpdateUnit}>Submmit</Button>
          </div>

        </Paper>
      </div>
    );
  }
}

(UpdateUnitPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    selectedUnit: state.companyReducer.selectedUnit,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UpdateUnitPage));
