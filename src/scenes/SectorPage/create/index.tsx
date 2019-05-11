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

export interface CreateSectorState {
  name: string;
}
export interface Props extends WithStyles<typeof styles>, SharedDispatchProps {}

class CreateSectorPage extends Component<Props, CreateSectorState> {
  constructor(props) {
    super(props);
    this.handleCreateSector = this.handleCreateSector.bind(this);
  }

  state: CreateSectorState = {
    name: ""
  };

  handleChange = (statekay: keyof CreateSectorState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ [statekay]: event.target.value } as Pick<
      CreateSectorState,
      keyof CreateSectorState
    >);
  };

  handleCreateSector = e => {
    e.preventDefault();
    this.props.createSector(this.state);
    history.goBack();
  };

  // componentDidMount = () => {
  // }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          New Sector
        </Typography>
        <Paper style={{ marginTop: "2rem" }}>
          <form onSubmit={this.handleCreateSector} style={{ padding: "2rem" }}>
            <Grid container spacing={16}>
              <Grid item justify="center" container xs>
                <TextField
                  id="name"
                  label="name"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange("name")}
                  margin="normal"
                />
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

(CreateSectorPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(CreateSectorPage));
