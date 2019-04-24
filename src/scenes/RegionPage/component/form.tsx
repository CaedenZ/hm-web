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
    Chip,
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
import { Country } from "../../../interface/countryInterface";
import { history } from "../../../store";
import { Company } from "../../../interface/companyInterface";
import { CREATEREGIONCRED } from "../../../interface/regionInterface";

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
        chip: {
            margin: theme.spacing.unit / 2,
        },
    });

interface FormState {
    region_name: string;
    country_list: string[];
}
export interface Props extends InState, WithStyles<typeof styles>, SharedDispatchProps { }

interface InState {
    countryList: Country[],
    selectedCompany: Company,
    onSubmit: any,
    create: boolean,
    updateData: any,
}


class CreateRegionPage extends Component<Props, FormState> {


    constructor(props) {
        super(props)
        this.handleCreateRegion = this.handleCreateRegion.bind(this)
    }


    state: FormState = {
        region_name: "",
        country_list: [],
    }

    componentDidMount() {
        if (!this.props.create) {
            this.setState(this.props.updateData)
        }
    }

    handleCreateRegion = (e) => {
        e.preventDefault()
        const a: CREATEREGIONCRED = {
            ...this.state,
            country_list: [],
        }

        this.state.country_list.forEach(element => {
            a.country_list.push({ country_name: element })
        });

        this.props.createRegion(a)
        history.goBack()
    }

    handleChangeSelect = (statekay: keyof FormState) => (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ [statekay]: event.target.value } as unknown as Pick<FormState, keyof FormState>);
    };


    render() {
        const { classes } = this.props;
        return (
            <Paper>
                <form onSubmit={(e) => this.props.onSubmit(e, this.state)}>
                    <Grid justify="center" container xs>
                        <div style={{ margin: 20 }}>
                            <TextField
                                id="region_name"
                                label="region_name"
                                className={classes.textField}
                                value={this.state.region_name}
                                onChange={(e) => this.setState({ region_name: e.target.value })}
                                margin="normal"
                            />
                        </div>
                    </Grid>
                    <Grid justify="center" container xs>
                        {this.props.selectedCompany.country.length > 0 && <FormControl>
                            <InputLabel>Country</InputLabel>
                            <Select
                                id="country"
                                multiple
                                className={classes.textField}
                                value={this.state.country_list}
                                onChange={this.handleChangeSelect('country_list')}
                                inputProps={{
                                    name: 'country',
                                    id: 'country-simple',
                                }}>
                                {this.props.selectedCompany.country.map((country) =>
                                    <MenuItem key={JSON.parse(country).country_name} value={country}>{JSON.parse(country).country_name}</MenuItem>
                                )}
                            </Select></FormControl>}
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
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateRegionPage));
