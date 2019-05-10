import React, { Component } from "react";
import PropTypes from "prop-types";
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
import CustomButton from "./CustomButton";
import Avatar from 'react-avatar-edit'
import { mapDispatchToProps } from "../../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../../interface/propsInterface";
import { history } from "../../../../store"
import { RootState } from "../../../../reducer";
import { Country } from "../../../../interface/countryInterface";
import { User } from "../../../../interface/userInterface";
import { JobGrade } from "../../../../interface/jobgradeInterface";
import { Company } from "../../../../interface/companyInterface";

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
            margin: 20,
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
        preview: {
        },
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
            minWidth: 120,
        },
    });

interface FormState {
    type: string;
    value: string;
    isBonus: boolean;
    isOptional: boolean;
    year: string;
    investing_type: string,
    investing_breakdown: string,
    share_symbol: string,
    share_exchange: string,
    currency: string,
}
interface Props extends InState, WithStyles<typeof styles>, SharedDispatchProps { }

interface InState {
    countryList: Country[],
    jobgradeList: JobGrade[],
    selectedCompany: Company,
    create: boolean,
    updateData: any,
    onSubmit: any,
}

class FormPage extends Component<Props, FormState> {


    constructor(props) {
        super(props)
    }


    state: FormState = {
        year: '',
        type: '',
        value: '',
        isBonus: false,
        isOptional: false,
        investing_type: '',
        investing_breakdown: '',
        share_symbol: '',
        share_exchange: '',
        currency: '',
    }
    componentDidMount() {
        if (!this.props.create) {
            this.setState(this.props.updateData)
            console.log(this.props.updateData)
        }
    }


    handleChange = (statekay: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [statekay]: event.target.value } as any);
    };

    handleChangeSelect = (statekay: keyof FormState) => (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ [statekay]: event.target.value } as unknown as Pick<FormState, keyof FormState>);
    };

    handleChangeCheckisBonus = () => {
        this.setState({ isBonus: !this.state.isBonus } as any);
    };

    handleChangeCheckisOptional = () => {
        this.setState({ isOptional: !this.state.isOptional } as any);
    };

    render() {
        const { classes } = this.props;
        return (
            <Paper>
                <form onSubmit={(e) => this.props.onSubmit(e, this.state)}>
                    <Typography component="h1" variant="h6">Grade Infomation</Typography>
                    <Grid justify="center" container>
                        <Grid justify={"center"} container item>
                            <TextField
                                id="year"
                                label="year"
                                className={classes.textField}
                                value={this.state.year}
                                onChange={this.handleChange('year')}
                                margin="normal"
                            />
                        </Grid>
                        <Grid justify={"center"} container item>
                            <TextField
                                id="type"
                                label="type"
                                className={classes.textField}
                                value={this.state.type}
                                onChange={this.handleChange('type')}
                                margin="normal"
                            />
                        </Grid>
                        <Grid justify={"center"} container item>
                            <TextField
                                id="value"
                                label="value"
                                className={classes.textField}
                                value={this.state.value}
                                onChange={this.handleChange('value')}
                                margin="normal"
                            />
                        </Grid>
                        <Grid justify={"center"} container item>
                            <TextField
                                id="investing_type"
                                label="investing_type"
                                className={classes.textField}
                                value={this.state.investing_type}
                                onChange={this.handleChange('investing_type')}
                                margin="normal"
                            />
                        </Grid>
                        <Grid justify={"center"} container item>
                            <TextField
                                id="investing_breakdown"
                                label="investing_breakdown"
                                className={classes.textField}
                                value={this.state.investing_breakdown}
                                onChange={this.handleChange('investing_breakdown')}
                                margin="normal"
                            />
                        </Grid>
                        <Grid justify={"center"} container item>
                            <TextField
                                id="share_symbol"
                                label="share_symbol"
                                className={classes.textField}
                                value={this.state.share_symbol}
                                onChange={this.handleChange('share_symbol')}
                                margin="normal"
                            />
                        </Grid>
                        <Grid justify={"center"} container item>
                            <TextField
                                id="share_exchange"
                                label="share_exchange"
                                className={classes.textField}
                                value={this.state.share_exchange}
                                onChange={this.handleChange('share_exchange')}
                                margin="normal"
                            />
                        </Grid>
                        <Grid justify={"center"} container item>
                            <TextField
                                id="currency"
                                label="currency"
                                className={classes.textField}
                                value={this.state.currency}
                                onChange={this.handleChange('currency')}
                                margin="normal"
                            />
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
                    <div style={{
                        width: '100%', flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center', alignItems: 'flex-end'
                    }}>
                        <Button variant="contained" color="primary" type="submit">Submit</Button>
                    </div>
                </form>
            </Paper >
        );
    }
}


function mapStateToProps(state: RootState) {
    return {
        selectedCompany: state.companyReducer.selectedCompany,
        countryList: state.countryReducer.countryList,
        jobgradeList: state.jobgradeReducer.jobgradeList,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FormPage));