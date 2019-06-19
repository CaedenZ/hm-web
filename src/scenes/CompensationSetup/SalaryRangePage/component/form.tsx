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
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"

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
  min: string;
  mid: string;
  max: string;
  country: string;
}
interface Props
  extends InState,
  WithStyles<typeof styles>,
  SharedDispatchProps { }

interface InState {
  countryList: Country[];
  jobgradeList: JobGrade[];
  selectedCompany: Company;
  create: boolean;
  updateData: any;
  onSubmit: any;
}

class FormPage extends Component<Props, FormState> {
  state: FormState = {
    jobgrade_id: "",
    type: "",
    min: "",
    mid: "",
    max: "",
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


    let selectedjg = this.props.jobgradeList.find(jg => {
      return jg.jobgrade_id === this.state.jobgrade_id
    })

    if (selectedjg !== undefined) {
      if (selectedjg.global === 0) {
        this.setState({ country: selectedjg.country })
      }
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper style={{ marginTop: "2rem" }}>
        <ValidatorForm
          // tslint:disable-next-line:jsx-no-string-ref
          ref="form"
          onSubmit={e => this.props.onSubmit(e, this.state)}
          style={{ padding: "2rem" }}
        >
          <Typography component="h1" variant="h6">
            Salary Range Infomation
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
              <TextValidator
                required
                id="min"
                name="min"
                label="min"
                type="number"
                className={classes.textField}
                value={this.state.min}
                onChange={this.handleChange("min")}
                validators={["required", "isNumber"]}
                errorMessages={[
                  "this field is required",
                  "input is not valid"
                ]} />
            </Grid>
            <Grid justify={"center"} container item>
              <TextValidator
                required
                id="mid"
                label="mid"
                type="number"
                className={classes.textField}
                value={this.state.mid}
                onChange={this.handleChange("mid")}
                margin="normal"
                validators={["required", "isNumber"]}
                errorMessages={[
                  "this field is required",
                  "input is not valid"
                ]}
              />
            </Grid>
            <Grid justify={"center"} container item>
              <TextValidator
                required
                id="max"
                label="max"
                type="number"
                className={classes.textField}
                value={this.state.max}
                onChange={this.handleChange("max")}
                margin="normal"
                validators={["required", "isNumber"]}
                errorMessages={[
                  "this field is required",
                  "input is not valid"
                ]}
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
                        key={(country)}
                        value={(country)}
                      >
                        {(country)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
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
        </ValidatorForm>
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
