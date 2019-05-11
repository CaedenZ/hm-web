import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Theme,
  createStyles,
  WithStyles,
  withStyles
} from "@material-ui/core";
import { mapDispatchToProps } from "../../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../../interface/propsInterface";
import { history } from "../../../../store";
import { RootState } from "../../../../reducer";
import { TargetBonus } from "../../../../interface/targetBonusInterface";
import { Country } from "../../../../interface/countryInterface";
import FormPage from "../component/form";

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
      margin: 20
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
    preview: {},
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
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120
    }
  });

export interface Props
  extends InState,
    WithStyles<typeof styles>,
    SharedDispatchProps {}
interface InState {
  targetbonus: TargetBonus;
  countryList: Country[];
}

class UpdateTargetBonusPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.handleUpdateTargetBonus = this.handleUpdateTargetBonus.bind(this);
  }

  handleUpdateTargetBonus = (e, data) => {
    e.preventDefault();
    this.props.updateTargetBonus(data);
    history.goBack();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          Update TargetBonus
        </Typography>
        <FormPage
          create={false}
          updateData={this.props.targetbonus}
          onSubmit={(e, data) => this.handleUpdateTargetBonus(e, data)}
        />
      </div>
    );
  }
}

(UpdateTargetBonusPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    targetbonus: state.targetBonusReducer.selectTargetBonus,
    countryList: state.countryReducer.countryList
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UpdateTargetBonusPage));
