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
    jobgrade_name: string;
    type: string;
    global: boolean;
    jobgrade_id: string;
    country: string;
}
interface Props extends InState, WithStyles<typeof styles>, SharedDispatchProps { }

interface InState {
    countryList: Country[],
    create: boolean,
    updateData: any,
    onSubmit: any,
}

class FormPage extends Component<Props, FormState> {


    constructor(props) {
        super(props)
    }


    state: FormState = {
        jobgrade_name: '',
        type: '',
        global: false,
        jobgrade_id: '',
        country: '',
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

    handleChangeCheck = () => {
        this.setState({ global: !this.state.global } as any);
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
                                id="jobgrade_name"
                                label="jobgrade_name"
                                className={classes.textField}
                                value={this.state.jobgrade_name}
                                onChange={this.handleChange('jobgrade_name')}
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
                            {this.props.countryList.length > 0 && <FormControl>
                                <InputLabel required>Country</InputLabel>
                                <Select
                                    id="country"
                                    className={classes.textField}
                                    value={this.state.country}
                                    onChange={this.handleChangeSelect('country')}
                                    inputProps={{
                                        name: 'country',
                                        id: 'country-simple',
                                    }}>
                                    {this.props.countryList.map((country) =>
                                        <MenuItem key={country.country_name} value={country.country_name}>{country.country_name}</MenuItem>
                                    )}
                                </Select></FormControl>}
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
        countryList: state.countryReducer.countryList,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FormPage));
