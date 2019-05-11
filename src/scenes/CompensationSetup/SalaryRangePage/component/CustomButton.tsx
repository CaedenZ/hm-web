import React from "react";
import PropTypes from "prop-types";
import {
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const styles = () =>
  createStyles({
    root: {},
    button: {
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      borderRadius: 3,
      border: 0,
      color: "white",
      height: 48,
      padding: "0 30px",
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
    }
  });

export interface Props extends WithStyles<typeof styles> {
  onClick: any;
}

interface State {}

class CustomButton extends React.Component<Props, State> {
  state: State = {};

  render() {
    const { classes, children } = this.props;

    return (
      <Button className={classes.button} onClick={this.props.onClick}>
        {children || "New Button"}
      </Button>
    );
  }
}

(CustomButton as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(CustomButton);
