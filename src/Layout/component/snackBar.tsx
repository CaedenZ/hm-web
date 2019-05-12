import React from "react";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { RootState } from "../../reducer";
import { mapDispatchToProps } from "../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../interface/propsInterface";

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
});

export interface Props
  extends InState,
    SharedDispatchProps,
    WithStyles<typeof styles>,
    InState {}

interface State {}

interface InState {
  open: boolean;
  message: string;
}
class CustomSnackBar extends React.Component<Props, State> {
  state = {
    open: false,
    message: ""
  };
  componentDidMount() {
    console.log("SnackBar Loaded");
    this.setState({ open: this.props.open, message: this.props.message });
  }
  handleClose = () => {
    console.log("close");
    this.props.closeSnackBar();
  };

  render() {
    const { classes } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={this.props.open}
        autoHideDuration={6000}
        onClose={this.handleClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{this.props.message}</span>}
        action={
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    open: state.snackBarReducer.open,
    message: state.snackBarReducer.message
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CustomSnackBar));
