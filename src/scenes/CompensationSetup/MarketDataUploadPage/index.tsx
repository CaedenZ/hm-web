import React from "react";
import PropTypes from "prop-types";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import { RootState } from "../../../reducer";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { Signons } from "../../../interface/signonsInterface";
import { Button, Paper, Grid } from "@material-ui/core";
import { Company } from "../../../interface/companyInterface";

import $axios from "../../../plugin/axios";

import axios from "axios";

const styles = (theme: Theme) => createStyles({});

export interface Props
  extends WithStyles<typeof styles>,
    SharedDispatchProps,
    InState {}

interface State {}

interface InState {
  sessionkey: string;
}
class MarketDataUploadPage extends React.Component<Props, State> {
  readFile = async (e: any) => {
    // this.setState({ data: e.target.files[0] });
    console.dir(e.target.files[0]);
    // Set the file to be uploaded
    const fileToBeUploaded = e.target.files[0];
    // Get the presigned URL
    const retURLData = await $axios.post("/company/getPresignedUrl", {
      session_key: this.props.sessionkey
    });
    const presignedURLData = retURLData.data;
    console.log(presignedURLData);
    if (presignedURLData.error) {
      // Error occured
      this.props.showSnackBar();
      return;
    }
    // Continue if no error
    const presignedURL = presignedURLData.data.presigned_url;
    // Create the formdata to be sent
    const formData = new FormData();
    formData.append(fileToBeUploaded.name, fileToBeUploaded);
    // Send to S3
    const retUploadData = await $axios.put(presignedURL, formData);
    console.log(retUploadData);
  };

  render() {
    return (
      <main>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ height: "90vh" }}
        >
          <Paper style={{ padding: "4rem" }}>
            <input
              accept="*"
              id="contained-button-file"
              type="file"
              onChange={this.readFile}
              name="file"
              style={{ display: "none" }}
            />
            <label htmlFor="contained-button-file" style={{ margin: "auto" }}>
              <Button color="primary" variant="contained" component="span">
                Upload
              </Button>
            </label>
          </Paper>
        </Grid>
      </main>
    );
  }
}

(MarketDataUploadPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    sessionkey: state.authenticationReducer.token
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MarketDataUploadPage));
