import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  createStyles,
  WithStyles,
  withStyles,
  Grid,
  Paper,
  TextField,
  Divider,
  Button,
  Typography
} from "@material-ui/core";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { history } from "../../../store";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import CustomButton from "../../../helper/components/CustomButton";

const styles = () =>
  createStyles({
    textField: {
      width: "20rem",
      margin: "1rem"
    }
  });

interface FormState {
  filename: any;
  filedisplay: string;
  type: string;
  company_apply: string;
}

export interface Props
  extends InState,
    WithStyles<typeof styles>,
    SharedDispatchProps {}

interface InState {
  onSubmit: any;
}

class UploadDocForm extends Component<Props, FormState> {
  constructor(props) {
    super(props);
  }

  state: FormState = {
    filename: "",
    filedisplay: "Select File",
    type: "",
    company_apply: ""
  };

  componentDidMount() {
  }

  readFile = async (e: any) => {
    console.log(e.target.files[0]);
    this.state.filename = e.target.files[0];
    console.log(this.state.filename.name);

    this.setState({ filedisplay: this.state.filename.name })
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper style={{ marginTop: "2rem", maxWidth:"50rem" }}>
        <ValidatorForm
          ref="form"
          onSubmit={e => this.props.onSubmit(e, this.state)}
          style={{ padding: "2rem" }}
        >
          <Grid item justify="center" container xs>
            <TextField
              required
              id="type"
              label="Contract Type"
              className={classes.textField}
              value={this.state.type}
              onChange={e => this.setState({ type: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item container xs justify="flex-end">
            <Typography component="h2" style={{ marginTop: "0.3rem", marginRight: "1.5rem" }}>
            {this.state.filedisplay}
            </Typography>
            <input
            required
            accept="application/doc, .docx"
            id="contained-button-file"
            type="file"
            onChange={this.readFile}
            name="file"
            style={{ display: "none" }}
            />
            <label htmlFor="contained-button-file" >
            <Button component="span" color="primary">
            Browse
            </Button>
            </label>
            
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
        </ValidatorForm>
      </Paper>
    );
  }
}

(UploadDocForm as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(UploadDocForm));
