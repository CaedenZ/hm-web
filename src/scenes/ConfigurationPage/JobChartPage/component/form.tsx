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
import { Company } from "../../../../interface/companyInterface";

const styles = (theme: Theme) =>
  createStyles({
    textField: {
      width: "20rem",
      margin: "1rem"
    }
  });

interface FormState {
  jobchart_name: string;
  type: string;
  global: boolean;
  jobchart_id: string;
  country: string;
}
interface Props
  extends InState,
    WithStyles<typeof styles>,
    SharedDispatchProps {}

interface InState {
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
    jobchart_name: "",
    type: "",
    global: false,
    jobchart_id: "",
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

  handleChangeCheck = () => {
    this.setState({ global: !this.state.global } as any);
    this.setState({ country: "" });
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
                id="jobchart_name"
                label="jobchart_name"
                className={classes.textField}
                value={this.state.jobchart_name}
                onChange={this.handleChange("jobchart_name")}
                margin="normal"
              />
            </Grid>
            <Grid justify={"center"} container item>
              <FormControl>
                <InputLabel style={{ marginLeft: "20px" }} required>
                  Type
                </InputLabel>
                <Select
                  id="type"
                  className={classes.textField}
                  value={this.state.type}
                  onChange={this.handleChangeSelect("type")}
                  inputProps={{
                    name: "type",
                    id: "type-simple"
                  }}
                >
                  <MenuItem value="Technical">Technical</MenuItem>
                  <MenuItem value="Non-Technical">Non-Technical</MenuItem>
                  <MenuItem value="Executive">Executive</MenuItem>
                  <MenuItem value="Non-Executive">Non-Executive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid justify={"center"} container item>
              {this.props.selectedCompany.country.length > 0 && (
                <FormControl>
                  <InputLabel style={{ marginLeft: "20px" }} required>
                    Country
                  </InputLabel>
                  <Select
                    disabled={this.state.global}
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
                      <MenuItem key={country} value={country}>
                        {country}
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
                    checked={this.state.global}
                    onChange={this.handleChangeCheck}
                    color="primary"
                  />
                }
                label="Global"
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
    selectedCompany: state.companyReducer.selectedCompany
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FormPage));
