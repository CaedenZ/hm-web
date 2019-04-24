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
  Button
} from "@material-ui/core";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { history } from "../../../store";

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

export interface CreateIndustryState {
  name: string;
  sector_id: string;
}
export interface Props extends WithStyles<typeof styles>, SharedDispatchProps, InState { }

interface InState {
  parentSector: string;
}
class CreateIndustryPage extends Component<Props, CreateIndustryState> {


  constructor(props) {
    super(props)
    this.handleCreateIndustry = this.handleCreateIndustry.bind(this)
  }


  state: CreateIndustryState = {
    name: "",
    sector_id: "",
  }

  handleChange = (statekay: keyof CreateIndustryState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [statekay]: event.target.value } as Pick<CreateIndustryState, keyof CreateIndustryState>);
  };

  handleCreateIndustry = (e) => {
    e.preventDefault()
    this.props.createIndustry(this.state)
    history.goBack()
  }

  componentDidMount = () => {
    this.setState({ sector_id: this.props.parentSector })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          New Industry
      </Typography>
        <Paper>
          <form onSubmit={this.handleCreateIndustry}>
            <Grid container className={classes.grid} spacing={16}>
              <Grid item justify="center" container xs>
                <div style={{ margin: 20 }}>
                  <TextField
                    id="name"
                    label="name"
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleChange('name')}
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
              <Button variant="contained" color="primary" type="submit">Submit</Button>
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

(CreateIndustryPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: any) {
  return {
    parentSector: state.sectorReducer.selectedSector,
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateIndustryPage));
