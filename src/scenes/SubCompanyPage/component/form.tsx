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
    Select,
    MenuItem,
    InputLabel
} from "@material-ui/core";
import CustomButton from "../component/CustomButton";
import Avatar from 'react-avatar-edit'
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { RootState } from "../../../reducer";
import { Country, CountryState, Currency } from "../../../interface/countryInterface";
import { history } from "../../../store";
import { Company, CREATECOMPANYCRED, CREATEENTITYCRED } from "../../../interface/companyInterface";

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
        }
    });

interface FormState {
    company_name: string;
    country: string;
    address: string;
    postal_code: string;
    logo_small: string;
    contact_person: string;
    contact_number: string;
    contact_email: string;
    hq_name: string;
    financialyr_dt: string;
    base_currency_id: string;
    logo_main: string;
    parentcompany_id: string;
    webpage_url: string;
    entity_name: string;
    registration_number: string;
}
interface Props extends WithStyles<typeof styles>, SharedDispatchProps, InState { }

interface InState {
    paremeterList: CountryState,
    selectedCompany: Company,
    create: boolean,
    updateData: any,
    onSubmit: any,
}

class CreateSubCompanyPage extends Component<Props, FormState> {


    constructor(props) {
        super(props)
        this.onCrop = this.onCrop.bind(this)
        this.onClose = this.onClose.bind(this)
        this.onMainCrop = this.onMainCrop.bind(this)
        this.onMainClose = this.onMainClose.bind(this)
    }


    state: FormState = {
        company_name: '',
        country: '',
        address: '',
        postal_code: '',
        logo_small: '',
        contact_person: '',
        contact_number: '',
        contact_email: '',
        hq_name: '',
        financialyr_dt: '',
        base_currency_id: '',
        logo_main: '',
        parentcompany_id: '',
        webpage_url: '',
        entity_name: '',
        registration_number: '',
    }

    componentDidMount() {

        console.log(this.props.selectedCompany.country)
        if (!this.props.create) {
            this.setState({
                ...this.props.updateData,
                financialyr_dt: this.props.updateData.financialyr_dt.substr(0, 10)
            })
        } else {
            this.setState({ parentcompany_id: this.props.selectedCompany.company_id })
        }
    }

    onClose() {
        this.setState({ logo_small: '' })
    }

    onCrop(image) {
        this.setState({ logo_small: image })
        console.log(this.state)
    }

    onMainClose() {
        this.setState({ logo_main: '' })
    }

    onMainCrop(logoMain) {
        this.setState({ logo_main: logoMain })
        console.log(this.state)
    }

    handleChange = (statekay: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [statekay]: event.target.value } as unknown as Pick<FormState, keyof FormState>);
    };

    handleChangeSelect = (statekay: keyof FormState) => (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ [statekay]: event.target.value } as unknown as Pick<FormState, keyof FormState>);
        const a: any = this.props.paremeterList.currencyList.find((e: Currency) => {
            return e.country_name === JSON.parse(event.target.value).country_name
        })
        console.log(a)
        this.setState({ base_currency_id: a.code })
    };

    render() {
        const { classes } = this.props;
        return (
            <Paper>
                <form onSubmit={(e) => this.props.onSubmit(e, this.state)}>
                    <Typography component="h1" variant="h6">Company Infomation</Typography>
                    <Grid justify="center" container>
                        <Grid item xs={3}>
                            <div style={{ margin: 20, justifyContent: 'center' }}>
                                <Avatar
                                    width={200}
                                    height={150}
                                    onCrop={this.onMainCrop}
                                    onClose={this.onMainClose}
                                />
                                <Typography variant="h6">Main Logo</Typography>
                            </div>
                        </Grid>
                        <Grid container item xs>
                            <Grid container>
                                <Grid container item xs={6}>
                                    <TextField
                                        required
                                        id="company_name"
                                        label="Company Name​"
                                        className={classes.textField}
                                        value={this.state.company_name}
                                        onChange={this.handleChange('company_name')}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid container item xs={6}>
                                    <TextField
                                        id="webpage_url"
                                        label="Company Webpage URL​"
                                        className={classes.textField}
                                        value={this.state.webpage_url}
                                        onChange={this.handleChange('webpage_url')}
                                        margin="normal"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid container item xs>
                                    <TextField
                                        required
                                        id="entity_name"
                                        label="Legal Entity Name​"
                                        className={classes.textField}
                                        value={this.state.entity_name}
                                        onChange={this.handleChange('entity_name')}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid container item xs>
                                    <TextField
                                        id="registration_number"
                                        label="Registration Number​"
                                        className={classes.textField}
                                        value={this.state.registration_number}
                                        onChange={this.handleChange('registration_number')}
                                        margin="normal"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid justify="center" container>
                        <Grid item xs={3}>
                            <div style={{ margin: 20, justifyContent: 'center' }}>
                                <Avatar
                                    width={200}
                                    height={150}
                                    onCrop={this.onCrop}
                                    onClose={this.onClose}
                                />
                                <Typography variant="h6">Company Icon</Typography>
                            </div>
                        </Grid>
                        <Grid container item xs>
                            <Grid container>
                                <Grid container item xs={6}>
                                    {this.props.selectedCompany.country.length > 0 && <FormControl>
                                        <InputLabel required>Country of Registration​</InputLabel>
                                        <Select
                                            id="country"
                                            className={classes.textField}
                                            value={this.state.country}
                                            onChange={this.handleChangeSelect('country')}
                                            inputProps={{
                                                name: 'country',
                                                id: 'country-simple',
                                            }}>
                                            {this.props.selectedCompany.country.map((country) =>
                                                <MenuItem key={JSON.parse(country).country_name} value={country}>{JSON.parse(country).country_name}</MenuItem>
                                            )}
                                        </Select></FormControl>}
                                </Grid>
                                <Grid container item xs={6}>
                                    <TextField
                                        multiline
                                        id="address"
                                        label="Registered Address​"
                                        className={classes.textField}
                                        value={this.state.address}
                                        onChange={this.handleChange('address')}
                                        margin="normal"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid container item xs>
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
                        </Grid>
                    </Grid>
                    <Divider />
                    <Typography component="h1" variant="h6">Contact Infomation</Typography>
                    <Grid justify="center" container>
                        <Grid item xs={3} />
                        <Grid container item xs>
                            <Grid container>
                                <Grid container item xs={6}>
                                    <TextField
                                        id="contact_person"
                                        label="Contact Person Name​"
                                        className={classes.textField}
                                        value={this.state.contact_person}
                                        onChange={this.handleChange('contact_person')}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid container item xs={6}>
                                    <TextField
                                        id="contact_number"
                                        label="Contact Person Number​"
                                        className={classes.textField}
                                        value={this.state.contact_number}
                                        onChange={this.handleChange('contact_number')}
                                        margin="normal"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid container item xs>
                                    <TextField
                                        id="contact_email"
                                        label="Contact Person Email​"
                                        className={classes.textField}
                                        value={this.state.contact_email}
                                        onChange={this.handleChange('contact_email')}
                                        margin="normal"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Typography component="h1" variant="h6">Other Infomation</Typography>
                    <Grid justify="center" container>
                        <Grid item xs={3} />
                        <Grid container item xs>
                            <Grid container>
                                <Grid container item xs={6}>
                                    <TextField
                                        disabled
                                        id="base_currency_id"
                                        label="Base Currency​"
                                        className={classes.textField}
                                        value={this.state.base_currency_id}
                                        onChange={this.handleChange('base_currency_id')}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid container item xs={6}>
                                    <TextField
                                        id="financialyr_dt"
                                        type="date"
                                        label="Financial Year​"
                                        className={classes.textField}
                                        value={this.state.financialyr_dt}
                                        onChange={this.handleChange('financialyr_dt')}
                                        margin="normal"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                            </Grid>
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

(CreateSubCompanyPage as React.ComponentClass<Props>).propTypes = {
    classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
    return {
        paremeterList: state.countryReducer,
        selectedCompany: state.companyReducer.selectedCompany
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateSubCompanyPage));
