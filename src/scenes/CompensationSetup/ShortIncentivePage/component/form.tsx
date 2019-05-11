import React, { Component } from "react";
import {
  Typography,
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Grid,
  Paper,
  TextField,
  Divider,
  FormControl,
  Checkbox,
  FormControlLabel,
  Button,
  MenuItem,
  InputLabel,
  Select
} from "@material-ui/core";
import { mapDispatchToProps } from "../../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../../interface/propsInterface";
import { RootState } from "../../../../reducer";
import { Country } from "../../../../interface/countryInterface";
import { JobGrade } from "../../../../interface/jobgradeInterface";
import { Company } from "../../../../interface/companyInterface";

const styles = (theme: Theme) =>
  createStyles({
    textField: {
      width: "20rem",
      margin: "1rem"
    }
  });

interface FormState {
  jobgrade_id: string;
  type: string;
  value: string;
  isOptional: boolean;
  country: string;
}
interface Props
  extends InState,
    WithStyles<typeof styles>,
    SharedDispatchProps {}

interface InState {
  countryList: Country[];
  jobgradeList: JobGrade[];
  selectedCompany: Company;
  create: boolean;
  updateData: any;
  onSubmit: any;
}

class FormPage extends Component<Props, FormState> {
  constructor(props) {
    super(props);
  }

  state: FormState = {
    jobgrade_id: "",
    type: "",
    value: "",
    isOptional: false,
    country: ""
  };
  componentDidMount() {
    if (!this.props.create) {
      this.setState(this.props.updateData);
      console.log(this.props.updateData);
    }
  }

  handleChange = (statekay: keyof FormState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ [statekay]: event.target.value } as any);
  };

  handleChangeSelect = (statekay: keyof FormState) => (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    this.setState(({ [statekay]: event.target.value } as unknown) as Pick<
      FormState,
      keyof FormState
    >);
  };

  handleChangeCheckisOptional = () => {
    this.setState({ isOptional: !this.state.isOptional } as any);
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper style={{ marginTop: "2rem" }}>
        <form
          onSubmit={e => this.props.onSubmit(e, this.state)}
          style={{ padding: "2rem" }}
        >
          <Typography component="h1" variant="h6">
            Grade Infomation
          </Typography>
          <Grid justify="center" container>
            <Grid justify={"center"} container item>
              <TextField
                id="type"
                label="type"
                className={classes.textField}
                value={this.state.type}
                onChange={this.handleChange("type")}
                margin="normal"
              />
            </Grid>
            <Grid justify={"center"} container item>
              <TextField
                id="value"
                label="value"
                className={classes.textField}
                value={this.state.value}
                onChange={this.handleChange("value")}
                margin="normal"
              />
            </Grid>
            <Grid justify={"center"} container item>
              {this.props.jobgradeList.length > 0 && (
                <FormControl>
                  <InputLabel style={{ marginLeft: "20px" }} required>
                    Job Grade
                  </InputLabel>
                  <Select
                    id="jobgrade_id"
                    className={classes.textField}
                    value={this.state.jobgrade_id}
                    onChange={this.handleChangeSelect("jobgrade_id")}
                    inputProps={{
                      name: "jobgrade_id",
                      id: "country-simple"
                    }}
                  >
                    {this.props.jobgradeList.map(jobgrade => (
                      <MenuItem
                        key={jobgrade.jobgrade_name}
                        value={jobgrade.jobgrade_id}
                      >
                        {jobgrade.jobgrade_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Grid>
            <Grid justify={"center"} container item>
              {this.props.selectedCompany.country.length > 0 && (
                <FormControl>
                  <InputLabel style={{ marginLeft: "20px" }} required>
                    Country
                  </InputLabel>
                  <Select
                    id="country"
                    className={classes.textField}
                    value={this.state.country}
                    onChange={this.handleChangeSelect("country")}
                    inputProps={{
                      name: "country",
                      id: "country-simple"
                    }}
                  >
                    {this.props.selectedCompany.country.map(country => (
                      <MenuItem
                        key={JSON.parse(country).country_name}
                        value={JSON.parse(country).country_name}
                      >
                        {JSON.parse(country).country_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Grid>
            <Grid justify={"center"} container item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.isOptional}
                    onChange={this.handleChangeCheckisOptional}
                    color="primary"
                  />
                }
                label="isOptional"
              />
            </Grid>
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

function mapStateToProps(state: RootState) {
  return {
    selectedCompany: state.companyReducer.selectedCompany,
    countryList: state.countryReducer.countryList,
    jobgradeList: state.jobgradeReducer.jobgradeList
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FormPage));
