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
import CustomButton from "../component/CustomButton";
import Avatar from 'react-avatar-edit'
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { history } from "../../../store"
import { RootState } from "../../../reducer";
import { Country } from "../../../interface/countryInterface";
import { User } from "../../../interface/userInterface";

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
    email: string;
    password: string;
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
        this.onCrop = this.onCrop.bind(this)
        this.onClose = this.onClose.bind(this)
    }


    state: FormState = {
        image: '',
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        employee_id: '',
        alias: '',
        country: '',
        address: '',
        postal_code: '',
        remarks: '',
        status: 'Active',
        business_title: '',
        contact: '',
    }
    componentDidMount() {
        if (!this.props.create) {
            this.setState(this.props.updateData)
        }
    }

    onClose() {
        this.setState({ image: '' })
    }

    onCrop(image) {
        this.setState({ image })
        console.log(this.state)
    }

    handleChange = (statekay: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [statekay]: event.target.value } as Pick<FormState, keyof FormState>);
    };

    handleChangeSelect = (statekay: keyof FormState) => (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ [statekay]: event.target.value } as Pick<FormState, keyof FormState>);
    };

    render() {
        const { classes } = this.props;
        return (
            <Paper>
                <form onSubmit={(e) => this.props.onSubmit(e, this.state)}>
                    <Typography component="h1" variant="h6">User Infomation</Typography>
                    <Grid justify="center" container>
                        <Grid item xs={3}>
                            <div style={{ margin: 20, justifyContent: 'center' }}>
                                <Avatar
                                    width={200}
                                    height={150}
                                    onCrop={this.onCrop}
                                    onClose={this.onClose}
                                />
                                <Typography variant="h6">Profile Picture</Typography>
                            </div>
                        </Grid>
                        <Grid container item xs>
                            <Grid container>
                                <Grid container item xs={6}>
                                    <TextField
                                        required
                                        type="email"
                                        id="email"
                                        label="Email"
                                        className={classes.textField}
                                        value={this.state.email}
                                        onChange={this.handleChange('email')}
                                        margin="normal"
                                    />
                                </Grid>
                                {this.props.create && <Grid container item xs={6}>
                                    <TextField
                                        required
                                        id="standard-password-input"
                                        label="Password"
                                        className={classes.textField}
                                        autoComplete="current-password"
                                        margin="normal"
                                        value={this.state.password}
                                        onChange={this.handleChange('password')}
                                    />
                                </Grid>}
                            </Grid>
                            <Grid container>
                                <Grid container item xs>
                                    <TextField
                                        required
                                        id="firstname"
                                        label="Firstname"
                                        className={classes.textField}
                                        value={this.state.firstname}
                                        onChange={this.handleChange('firstname')}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid container item xs>
                                    <TextField
                                        id="lastname"
                                        label="Lastname"
                                        className={classes.textField}
                                        value={this.state.lastname}
                                        onChange={this.handleChange('lastname')}
                                        margin="normal"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid justify="center" container>
                        <Grid item direction="column" xs={3} >
                            <div style={{ margin: 20, justifyContent: 'center' }}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel required>status</InputLabel>
                                    <Select
                                        value={this.state.status}
                                        onChange={this.handleChangeSelect('status')}
                                        inputProps={{
                                            name: 'status',
                                            id: 'status',
                                        }}
                                    >
                                        <MenuItem value={'Active'}>Active</MenuItem>
                                        <MenuItem value={'Inactive'}>Inactive</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </Grid>
                        <Grid container item xs>
                            <Grid container item xs={6}>
                                <TextField
                                    id="alias"
                                    label="alias"
                                    className={classes.textField}
                                    value={this.state.alias}
                                    onChange={this.handleChange('alias')}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid container item xs={6}>
                                <TextField
                                    id="employee_id"
                                    label="employee_id"
                                    className={classes.textField}
                                    value={this.state.employee_id}
                                    onChange={this.handleChange('employee_id')}
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Divider />
                    <Divider />

                    <Typography component="h1" variant="h6">Job Infomation</Typography>
                    <Grid justify="center" container>
                        <Grid item direction="column" xs={3} />
                        <Grid container item xs>
                            <Grid container>
                                <Grid container item xs={6}>
                                    <TextField
                                        id="address"
                                        multiline
                                        label="Address"
                                        className={classes.textField}
                                        value={this.state.address}
                                        onChange={this.handleChange('address')}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid container item xs={6}>
                                    <TextField
                                        id="postal_code"
                                        label="Postal Code"
                                        className={classes.textField}
                                        value={this.state.postal_code}
                                        onChange={this.handleChange('postal_code')}
                                        margin="normal"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs>
                                    <div style={{ margin: 20 }}>
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
                                    </div>
                                </Grid>
                                <Grid item xs>
                                    <TextField
                                        required
                                        id="contact"
                                        label="contact"
                                        className={classes.textField}
                                        value={this.state.contact}
                                        onChange={this.handleChange('contact')}
                                        margin="normal"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container item xs={6}>
                                <TextField
                                    id="business_title"
                                    label="business_title"
                                    className={classes.textField}
                                    value={this.state.business_title}
                                    onChange={this.handleChange('business_title')}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid container item xs={6}>
                                <TextField
                                    id="remarks"
                                    label="remarks"
                                    className={classes.textField}
                                    value={this.state.remarks}
                                    onChange={this.handleChange('remarks')}
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* <Grid item justify="center" container xs>
                        
                    </Grid>
                    <Grid item justify="center" container xs>
                        <div style={{ margin: 20 }}>
                            
                            

                        </div>
                    </Grid>
                    <Grid item justify="center" container xs>
                        <div style={{ margin: 20 }}>
                            
                            

                        </div>
                    </Grid> */}

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
