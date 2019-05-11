import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  createStyles,
  WithStyles,
  withStyles
} from "@material-ui/core";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { Company, Entity } from "../../../interface/companyInterface";
import { CountryState } from "../../../interface/countryInterface";
import { history } from "../../../store";
import FormPage from "../component/form";

const styles = () =>
  createStyles({
    root: {
      flexGrow: 1
    }
  });

export interface Props
  extends InState,
    WithStyles<typeof styles>,
    SharedDispatchProps {}

interface InState {
  updatingEntity: Entity;
  paremeterList: CountryState;
  selectedCompany: Company;
}
class UpdateCompanyPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.handleUpdateCompany = this.handleUpdateCompany.bind(this);
  }

  handleUpdateCompany = (e, data) => {
    e.preventDefault();

    this.props.updateEntity(data);
    history.goBack();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          Update Entity
        </Typography>
        <FormPage
          create={false}
          updateData={this.props.updatingEntity}
          onSubmit={(e, data) => this.handleUpdateCompany(e, data)}
        />
      </div>
    );
  }
}

(UpdateCompanyPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: any) {
  return {
    updatingEntity: state.companyReducer.selectedUpdateEntity,
    paremeterList: state.countryReducer,
    selectedCompany: state.companyReducer.selectedCompany
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UpdateCompanyPage));
