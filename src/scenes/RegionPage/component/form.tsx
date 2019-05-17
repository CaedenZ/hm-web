import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Grid,
  Paper,
  TextField,
  Divider,
  FormControl,
  Button,
  Select,
  MenuItem,
  InputLabel
} from "@material-ui/core";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { Country } from "../../../interface/countryInterface";
import { history } from "../../../store";
import { Company } from "../../../interface/companyInterface";
import { CREATEREGIONCRED } from "../../../interface/regionInterface";

const styles = (theme: Theme) =>
  createStyles({
    textField: {
      width: "20rem",
      margin: "1rem"
    }
  });

interface FormState {
  region_name: string;
  country_list: string[];
}
export interface Props
  extends InState,
    WithStyles<typeof styles>,
    SharedDispatchProps {}

interface InState {
  countryList: Country[];
  selectedCompany: Company;
  onSubmit: any;
  create: boolean;
  updateData: any;
}

class CreateRegionPage extends Component<Props, FormState> {
  constructor(props) {
    super(props);
    this.handleCreateRegion = this.handleCreateRegion.bind(this);
  }

  state: FormState = {
    region_name: "",
    country_list: []
  };

  componentDidMount() {
    if (!this.props.create) {
      this.setState(this.props.updateData);
    }
  }

  handleCreateRegion = e => {
    e.preventDefault();
    const a: CREATEREGIONCRED = {
      ...this.state,
      country_list: []
    };

    this.state.country_list.forEach(element => {
      a.country_list.push({ country_name: element });
    });

    this.props.createRegion(a);
    history.goBack();
  };

  handleChangeSelect = (statekay: keyof FormState) => (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    this.setState(({ [statekay]: event.target.value } as unknown) as Pick<
      FormState,
      keyof FormState
    >);
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper style={{ marginTop: "2rem" }}>
        <form
          onSubmit={e => this.props.onSubmit(e, this.state)}
          style={{ padding: "2rem" }}
        >
          <Grid item justify="center" container xs>
            <TextField
              id="region_name"
              label="region_name"
              className={classes.textField}
              value={this.state.region_name}
              onChange={e => this.setState({ region_name: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item justify="center" container xs>
            {this.props.selectedCompany.country.length > 0 && (
              <FormControl>
                <InputLabel style={{ marginLeft: "20px" }}>Country</InputLabel>
                <Select
                  id="country"
                  multiple
                  className={classes.textField}
                  value={this.state.country_list}
                  onChange={this.handleChangeSelect("country_list")}
                  inputProps={{
                    name: "country",
                    id: "country-simple"
                  }}
                >
                  {this.props.selectedCompany.country.map(country => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
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
    );
  }
}

(CreateRegionPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: any) {
  return {
    countryList: state.countryReducer.countryList,
    selectedCompany: state.companyReducer.selectedCompany
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreateRegionPage));
