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
import { RootState } from "../../../reducer";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { Country } from "../../../interface/countryInterface";
import { JobGrade } from "../../../interface/jobgradeInterface";
import { Company } from "../../../interface/companyInterface";
import { JobFunction, SubJobFunction } from "../../../interface/jobfunctionInterface";

const styles = (theme: Theme) =>
    createStyles({
        textField: {
            width: "20rem",
            margin: "1rem"
        },
        textFieldValue: {
            width: "16rem",
        },
        textFieldSign: {
            width: "3rem",
            margin: "8px",
        }
    });

interface FormState {
    type: number,
    year: string,
    country: string,
    survey_company: string,
    employee_id: string,
    company_grade: string,
    survey_grade: string,
    jobfunction: string,
    jobfunctionJSON: string,
    sjobfunctionList: SubJobFunction[],
    sjobfunction: string,
    currency: string,
    annual_base_pay: string,
    annual_fixed_pay: string,
    annual_cash_allowance: string,
    target_total: string,
    target_direct_comp: string,
    target_total_rem: string
}
interface Props
    extends InState,
    WithStyles<typeof styles>,
    SharedDispatchProps { }

interface InState {
    jobfunctionList: JobFunction[];
    countryList: Country[];
    selectedCompany: Company;
}

class FormPage extends Component<Props, FormState> {
    state: FormState = {
        type: 1,
        year: "2019",
        country: "Singapore",
        survey_company: "HRBS RANK",
        employee_id: "",
        company_grade: "",
        survey_grade: "",
        jobfunction: "",
        jobfunctionJSON: "",
        sjobfunctionList: [],
        sjobfunction: "",
        currency: "SGD",
        annual_base_pay: "",
        annual_fixed_pay: "",
        annual_cash_allowance: "",
        target_total: "",
        target_direct_comp: "",
        target_total_rem: ""
    };

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

    handleChangeJobFunction = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ sjobfunctionList: JSON.parse(event.target.value).sjobfunction })
        this.setState({ jobfunctionJSON: event.target.value })
        this.setState({ jobfunction: JSON.parse(event.target.value).job_name })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.insertData(this.state);
    }

    render() {
        const { classes } = this.props;
        return (
                <form
                    onSubmit={e => this.handleSubmit(e)}
                    style={{ padding: "2rem" }}
                >
                    <Grid justify="center" container>
                        <Grid justify={"center"} container item>
                            <TextField
                                id="year"
                                label="year"
                                className={classes.textField}
                                value={this.state.year}
                                onChange={this.handleChange("year")}
                                margin="normal"
                            />
                        </Grid>
                        <Grid justify={"center"} container item>
                            {this.props.jobfunctionList.length > 0 && (
                                <FormControl>
                                    <InputLabel style={{ marginLeft: "20px" }} required>
                                        Job Function
                  </InputLabel>
                                    <Select
                                        id="jobfunction"
                                        className={classes.textField}
                                        value={this.state.jobfunctionJSON}
                                        onChange={e => this.handleChangeJobFunction(e)}
                                        inputProps={{
                                            name: "jobfunction",
                                            id: "country-simple"
                                        }}
                                    >
                                        {this.props.jobfunctionList.map(jobfunction => (
                                            <MenuItem
                                                key={jobfunction.jobfunction_id}
                                                value={JSON.stringify(jobfunction)}
                                            >
                                                {jobfunction.job_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        </Grid>
                        <Grid justify={"center"} container item>
                            {this.state.sjobfunctionList.length > 0 && (
                                <FormControl>
                                    <InputLabel style={{ marginLeft: "20px" }} required>
                                        Sub Job Function
                  </InputLabel>
                                    <Select
                                        id="sjobfunction"
                                        className={classes.textField}
                                        value={this.state.sjobfunction}
                                        onChange={this.handleChangeSelect("sjobfunction")}
                                        inputProps={{
                                            name: "sjobfunction",
                                            id: "scountry-simple"
                                        }}
                                    >
                                        {this.state.sjobfunctionList.map(sjobfunction => (
                                            <MenuItem
                                                key={sjobfunction.sjobfunction_id}
                                                value={sjobfunction.subjob_name}
                                            >
                                                {sjobfunction.subjob_name}
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
                                                key={country}
                                                value={country}
                                            >
                                                {country}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        </Grid>
                        <Grid justify={"center"} container item>
                            <TextField
                                id="survey_company"
                                label="survey_company"
                                className={classes.textField}
                                value={this.state.survey_company}
                                onChange={this.handleChange("survey_company")}
                                margin="normal"
                            />
                        </Grid>
                        <Grid justify={"center"} container item>
                            <TextField
                                id="employee_id"
                                label="employee_id"
                                className={classes.textField}
                                value={this.state.employee_id}
                                onChange={this.handleChange("employee_id")}
                                margin="normal"
                            />
                        </Grid>
                        <Grid justify={"center"} container item>
                            <TextField
                                id="company_grade"
                                label="company_grade"
                                className={classes.textField}
                                value={this.state.company_grade}
                                onChange={this.handleChange("company_grade")}
                                margin="normal"
                            />
                        </Grid>
                        <Grid justify={"center"} container item>
                            <TextField
                                id="survey_grade"
                                label="survey_grade"
                                className={classes.textField}
                                value={this.state.survey_grade}
                                onChange={this.handleChange("survey_grade")}
                                margin="normal"
                            />
                        </Grid>
                        <Grid justify={"center"} container item>
                            <TextField
                                id="currency"
                                label="currency"
                                className={classes.textField}
                                value={this.state.currency}
                                onChange={this.handleChange("currency")}
                                margin="normal"
                            />
                        </Grid>
                        <Grid justify={"center"} container item>
                            <TextField
                                id="annual_base_pay"
                                label="annual_base_pay"
                                className={classes.textField}
                                value={this.state.annual_base_pay}
                                onChange={this.handleChange("annual_base_pay")}
                                margin="normal"
                            />
                        </Grid>
                        <Grid justify={"center"} container item>
                            <TextField
                                id="annual_fixed_pay"
                                label="annual_fixed_pay"
                                className={classes.textField}
                                value={this.state.annual_fixed_pay}
                                onChange={this.handleChange("annual_fixed_pay")}
                                margin="normal"
                            />
                        </Grid>
                        <Grid justify={"center"} container item>
                            <TextField
                                id="annual_cash_allowance"
                                label="annual_cash_allowance"
                                className={classes.textField}
                                value={this.state.annual_cash_allowance}
                                onChange={this.handleChange("annual_cash_allowance")}
                                margin="normal"
                            />
                        </Grid>
                        <Grid justify={"center"} container item>
                            <TextField
                                id="target_total"
                                label="target_total"
                                className={classes.textField}
                                value={this.state.target_total}
                                onChange={this.handleChange("target_total")}
                                margin="normal"
                            />
                        </Grid>
                        <Grid justify={"center"} container item>
                            <TextField
                                id="target_direct_comp"
                                label="target_direct_comp"
                                className={classes.textField}
                                value={this.state.target_direct_comp}
                                onChange={this.handleChange("target_direct_comp")}
                                margin="normal"
                            />
                        </Grid>
                        <Grid justify={"center"} container item>
                            <TextField
                                id="target_total_rem"
                                label="target_total_rem"
                                className={classes.textField}
                                value={this.state.target_total_rem}
                                onChange={this.handleChange("target_total_rem")}
                                margin="normal"
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
        );
    }
}

function mapStateToProps(state: RootState) {
    return {
        selectedCompany: state.companyReducer.selectedCompany,
        countryList: state.countryReducer.countryList,
        jobfunctionList: state.jobFunctionReducer.jobFunctionList
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(FormPage));
