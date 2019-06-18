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
    employee_id: string,
    gender: string,
    jobfunction: string,
    jobfunctionJSON: string,
    sjobfunctionList: SubJobFunction[],
    sjobfunction: string,
    annual_base_pay: string,
    annual_fixed_pay: string,
    annual_cash_allowance: string,
    business_title: string,
    grade: string,
    department: string,
    currency: string,
    uploaded_dt: string
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
        type: 0,
        year: "2019",
        country: "Singapore",
        employee_id: "",
        gender: "",
        jobfunction: "",
        jobfunctionJSON: "",
        sjobfunctionList: [],
        sjobfunction: "",
        annual_base_pay: "",
        annual_fixed_pay: "",
        annual_cash_allowance: "",
        business_title: "",
        grade: "",
        department: "",
        currency: "SGD",
        uploaded_dt: ""
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
                                id="gender"
                                label="gender"
                                className={classes.textField}
                                value={this.state.gender}
                                onChange={this.handleChange("gender")}
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
                                id="business_title"
                                label="business_title"
                                className={classes.textField}
                                value={this.state.business_title}
                                onChange={this.handleChange("business_title")}
                                margin="normal"
                            />
                        </Grid>
                        <Grid justify={"center"} container item>
                            <TextField
                                id="grade"
                                label="grade"
                                className={classes.textField}
                                value={this.state.grade}
                                onChange={this.handleChange("grade")}
                                margin="normal"
                            />
                        </Grid>
                        <Grid justify={"center"} container item>
                            <TextField
                                id="department"
                                label="department"
                                className={classes.textField}
                                value={this.state.department}
                                onChange={this.handleChange("department")}
                                margin="normal"
                            />
                        </Grid>
                        <Grid justify={"center"} container item>
                            <TextField
                                id="uploaded_dt"
                                label="uploaded_dt"
                                className={classes.textField}
                                value={this.state.uploaded_dt}
                                onChange={this.handleChange("uploaded_dt")}
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
