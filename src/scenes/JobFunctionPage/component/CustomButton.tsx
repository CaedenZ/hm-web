import React from "react";
import PropTypes from "prop-types";
import {
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

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
  link: string;
}

interface State {}

class CustomButton extends React.Component<Props, State> {
  state: State = {};

  render() {
    const { classes, children, link } = this.props;

    return (
      <Link to={link} style={{ textDecoration: "none" }}>
        <Button className={classes.button}>{children || "New Button"}</Button>
      </Link>
    );
  }
}

(CustomButton as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(CustomButton);
