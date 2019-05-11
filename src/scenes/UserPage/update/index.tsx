import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Theme,
  createStyles,
  WithStyles,
  withStyles
} from "@material-ui/core";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { history } from "../../../store";
import { RootState } from "../../../reducer";
import { User } from "../../../interface/userInterface";
import { Country } from "../../../interface/countryInterface";
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

export interface UpdateUserState {
  email: string;
  firstname: string;
  lastname: string;
  country: string;
  address: string;
  postal_code: string;
  image: string;
  remarks: string;
  status: string;
  business_title: string;
  contact: string;
  alias: string;
  employee_id: string;
}
export interface Props
  extends InState,
    WithStyles<typeof styles>,
    SharedDispatchProps {}
interface InState {
  user: User;
  countryList: Country[];
}

class UpdateUserPage extends Component<Props, UpdateUserState> {
  constructor(props) {
    super(props);
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
  }

  state: UpdateUserState = {
    image: "",
    email: "",
    firstname: "",
    lastname: "",
    employee_id: "",
    alias: "",
    country: "",
    address: "",
    postal_code: "",
    remarks: "",
    status: "",
    business_title: "",
    contact: ""
  };

  componentDidMount() {
    this.setState(this.props.user);
  }

  onClose() {
    this.setState({ image: "" });
  }

  onCrop(image) {
    this.setState({ image });
    console.log(this.state);
  }

  handleChange = (statekay: keyof UpdateUserState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ [statekay]: event.target.value } as Pick<
      UpdateUserState,
      keyof UpdateUserState
    >);
  };

  handleChangeSelect = (statekay: keyof UpdateUserState) => (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    this.setState({ [statekay]: event.target.value } as Pick<
      UpdateUserState,
      keyof UpdateUserState
    >);
  };

  handleUpdateUser = (e, data) => {
    e.preventDefault();
    this.props.updateUser(data);
    history.goBack();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          Update User
        </Typography>
        <FormPage
          create={false}
          updateData={this.props.user}
          onSubmit={(e, data) => this.handleUpdateUser(e, data)}
        />
      </div>
    );
  }
}

(UpdateUserPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    user: state.userReducer.user,
    countryList: state.countryReducer.countryList
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UpdateUserPage));
