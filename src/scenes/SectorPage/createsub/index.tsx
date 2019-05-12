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
    textField: {
      width: "20rem",
      margin: "1rem"
    }
  });

export interface CreateIndustryState {
  name: string;
  sector_id: string;
}
export interface Props
  extends WithStyles<typeof styles>,
    SharedDispatchProps,
    InState {}

interface InState {
  parentSector: string;
}
class CreateIndustryPage extends Component<Props, CreateIndustryState> {
  constructor(props) {
    super(props);
    this.handleCreateIndustry = this.handleCreateIndustry.bind(this);
  }

  state: CreateIndustryState = {
    name: "",
    sector_id: ""
  };

  handleChange = (statekay: keyof CreateIndustryState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ [statekay]: event.target.value } as Pick<
      CreateIndustryState,
      keyof CreateIndustryState
    >);
  };

  handleCreateIndustry = e => {
    e.preventDefault();
    this.props.createIndustry(this.state);
    history.goBack();
  };

  componentDidMount = () => {
    this.setState({ sector_id: this.props.parentSector });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          New Industry
        </Typography>
        <Paper style={{ marginTop: "2rem" }}>
          <form
            onSubmit={this.handleCreateIndustry}
            style={{ padding: "2rem" }}
          >
            <Grid container spacing={16}>
              <Grid item justify="center" container xs>
                <div style={{ margin: 20 }}>
                  <TextField
                    id="name"
                    label="Industry"
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleChange("name")}
                    margin="normal"
                  />
                </div>
              </Grid>
            </Grid>
            <Divider />
            <Divider />
            <div
              style={{
                display: "flex",
                paddingTop: "1rem"
              }}
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginLeft: "auto" }}
              >
                Submit
              </Button>
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
    parentSector: state.sectorReducer.selectedSector
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreateIndustryPage));
