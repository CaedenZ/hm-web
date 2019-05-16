import React from "react";
import PropTypes from "prop-types";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import { RootState } from "../../../reducer";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { Button, Paper, Grid } from "@material-ui/core";

import $axios from "../../../plugin/axios";

const styles = () => createStyles({});

export interface Props
  extends WithStyles<typeof styles>,
  SharedDispatchProps,
  InState { }

interface State { }

interface InState {
  sessionkey: string;
}
class PayrollUploadPage extends React.Component<Props, State> {
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
    const key = presignedURLData.data.key
    // Create the formdata to be sent

    // Send to S3
    const retUploadData = await $axios.put(presignedURL, fileToBeUploaded, {
      headers: {
        'Content-Type': fileToBeUploaded.type,
        'key': key,
      }
    });
    console.log(retUploadData);
    if (retUploadData.data.error) {
      // Error occured
      this.props.showSnackBar();
      return;
    }
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

(PayrollUploadPage as React.ComponentClass<Props>).propTypes = {
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
)(withStyles(styles)(PayrollUploadPage));
