import React from "react";
import PropTypes from "prop-types";
import { Grid, Theme, createStyles, Paper, WithStyles, withStyles, Divider, TextField, Typography, IconButton, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Button, InputAdornment, NativeSelect, Input } from "@material-ui/core";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { OfferModel, NameValue, NameValueType } from "../../../interface/offerModelInterface";
import $axios from "../../../plugin/axios";
import { RootState } from "../../../reducer";
import { Company } from "../../../interface/companyInterface";
import { JobPosition } from "../../../interface/jobpositionInterface";
import { ShortIncentive } from "../../../interface/shortIncentiveInterface";
import { LongIncentive } from "../../../interface/longIncentiveInterface";
import { Signons } from "../../../interface/signonsInterface";
import { TargetBonus } from "../../../interface/targetBonusInterface";
import { Allowances } from "../../../interface/allowanceInterface";
import theme from "../../../assets/theme";
import "../../../css/hideicon.css"
import { Currency } from "../../../interface/countryInterface";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            fontSize: 13,
        },
        title: {
            fontSize: 20
        },
        subtitle: {
            fontWeight: 'bold'
        },
        paper: {
            height: '100%',
            padding: 10,
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        spacediv: {
            height: 20
        },
        container: {
            borderRadius: 4,
            borderWidth: 0.5,
            borderStyle: "solid"
        },
        colorcontainer: {
            background: '#e6d5c5',
        },
        verticaltext: {
            transform: 'rotate(0.5turn)'
        },
        textField: {
        },
    });

interface Props extends InState, WithStyles<typeof styles> { }

interface InState {
    selectedOffermodel: Number;
    currencyList: Currency[];
    session_key: string;
}

interface State {
    currency: string;
    currency1: string;
    currency2: string;
    jobposition_id: string;
    created_by: string;
    candidate_name: string;
    job_flag: string;
    model_type: string;
    year_of_birth: string;
    offer_reference: string;
    jobgrade_id: string;
    status: string;
    current_position_title: string,
    current_position_country: string,
    current_position_location: string,
    current_position_grade: string,
    current_position_datestart: string,
    current_position_jobfunction: string,
    current_position_sjobfunction: string,
    propose_position_datestart: string,
    current_data: any;
    propose_data: any;
}


class OfferModelPage extends React.Component<Props, State> {
    state = {
        jobposition_id: "",
        created_by: "user.master@mail.com",
        candidate_name: "",
        job_flag: "",
        model_type: "",
        year_of_birth: "",
        offer_reference: "",
        jobgrade_id: "",
        status: "Draft",
        currency: "USD",
        currency1: "",
        currency2: "",
        current_position_title: "",
        current_position_country: "",
        current_position_location: "",
        current_position_grade: "",
        current_position_datestart: "",
        current_position_jobfunction: "",
        current_position_sjobfunction: "",
        propose_position_datestart: "",
        current_data: {
            guaranteed_cash: {
                annual_base: '0',
                optional: [],
            },
            sti: {
                bonus_target_amount: '0',
                bonus_target: '0',
                optional: []
            },
            lti: {
                unvested_equity: '0',
                optional: []
            },
            sign_on: {
                optional: []
            },
        },
        propose_data: {
            guaranteed_cash: {
                annual_base: '0',
                optional: [],
            },
            sti: {
                bonus_target_amount: '0',
                bonus_target: '0',
                optional: []
            },
            lti: {
                optional: []
            },
            sign_on: {
                optional: []
            },
        },
    }

    componentDidMount = async () =>{

        const data = {
            session_key: this.props.session_key,
            offermodel_id: this.props.selectedOffermodel,
        }

        const response = await $axios.post('/job/viewOfferModel', data)
        this.setState(response.data.data)
    }


    getCurrencyByCountry = (country) => {
        let c = this.props.currencyList.find(e => { return e.country_name === country }
        )

        return c.code
    }

    getCurrencyRatio = (cu) => {

        if (cu === "")
            return '0'

        let c = this.props.currencyList.find(e => {
            return e.code === cu
        })

        return c.rate
    }

    getCurrency1 = (main) => {
        let mainratio = this.getCurrencyRatio(this.state.currency)
        let subratio = this.getCurrencyRatio(this.state.currency1)

        return (main / parseFloat(mainratio) * parseFloat(subratio)).toFixed(2)
    }

    handleAddGC = () => {
        const gc = { ...this.state.current_data }
        gc.guaranteed_cash.optional.push({ name: '', value: 0 })
        this.setState({ current_data: gc })
    }
    handleDeleteGC = (index) => {
        const gc = { ...this.state.current_data }
        gc.guaranteed_cash.optional.splice(index, 1)
        this.setState({ current_data: gc })
    }

    handleAddGP = () => {
        const gc = { ...this.state.propose_data }
        gc.guaranteed_cash.optional.push({ name: '', value: 0 })
        this.setState({ propose_data: gc })
    }
    handleDeleteGP = (index) => {
        const gc = { ...this.state.propose_data }
        gc.guaranteed_cash.optional.splice(index, 1)
        this.setState({ propose_data: gc })
    }

    //
    handleAddSC = () => {
        const gc = { ...this.state.current_data }
        gc.sti.optional.push({ name: '', value: 0, type: '' })
        this.setState({ current_data: gc })
    }
    handleDeleteSC = (index) => {
        const gc = { ...this.state.current_data }
        gc.sti.optional.splice(index, 1)
        this.setState({ current_data: gc })
    }

    handleAddSP = () => {
        const gc = { ...this.state.propose_data }
        gc.sti.optional.push({ name: '', value: 0, type: '' })
        this.setState({ propose_data: gc })
    }
    handleDeleteSP = (index) => {
        const gc = { ...this.state.propose_data }
        gc.sti.optional.splice(index, 1)
        this.setState({ propose_data: gc })
    }

    //

    handleAddLC = () => {
        const gc = { ...this.state.current_data }
        gc.lti.optional.push({ name: '', value: 0 })
        this.setState({ current_data: gc })
    }
    handleDeleteLC = (index) => {
        const gc = { ...this.state.current_data }
        gc.lti.optional.splice(index, 1)
        this.setState({ current_data: gc })
    }

    handleAddLP = () => {
        const gc = { ...this.state.propose_data }
        gc.lti.optional.push({ name: '', value: 0 })
        this.setState({ propose_data: gc })
    }
    handleDeleteLP = (index) => {
        const gc = { ...this.state.propose_data }
        gc.lti.optional.splice(index, 1)
        this.setState({ propose_data: gc })
    }

    //

    handleAddSOC = () => {
        const gc = { ...this.state.current_data }
        gc.sign_on.optional.push({ name: '', value: 0 })
        this.setState({ current_data: gc })
    }
    handleDeleteSOC = (index) => {
        const gc = { ...this.state.current_data }
        gc.sign_on.optional.splice(index, 1)
        this.setState({ current_data: gc })
    }

    handleAddSOP = () => {
        const gc = { ...this.state.propose_data }
        gc.sign_on.optional.push({ name: '', value: 0 })
        this.setState({ propose_data: gc })
    }
    handleDeleteSOP = (index) => {
        const gc = { ...this.state.propose_data }
        gc.sign_on.optional.splice(index, 1)
        this.setState({ propose_data: gc })
    }

    //


    handleChange = (statekay: keyof State) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        this.setState({ [statekay]: event.target.value } as any);
    };

    handleChangeSelect = (statekay: keyof State) => (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        this.setState({ [statekay]: event.target.value } as any);
    };


    getsubtotalGC = () => {
        let a = parseInt(this.state.current_data.guaranteed_cash.annual_base)
        this.state.current_data.guaranteed_cash.optional.forEach(element => {
            a += parseInt(element.value)
        });
        return a
    }

    getsubtotalGP = () => {
        let a = parseInt(this.state.propose_data.guaranteed_cash.annual_base)
        this.state.propose_data.guaranteed_cash.optional.forEach(element => {
            a += parseInt(element.value)
        });
        return a
    }

    getsubtotalSC = () => {
        let a = parseInt(this.state.current_data.sti.bonus_target_amount)
        this.state.current_data.sti.optional.forEach(element => {
            a += parseInt(element.value)
        });
        return a
    }

    getsubtotalSP = () => {
        let a = parseInt(this.state.propose_data.sti.bonus_target_amount)
        this.state.propose_data.sti.optional.forEach(element => {
            a += parseInt(element.value)
        });
        return a
    }

    getsubtotalLC = () => {
        let a = parseInt(this.state.current_data.lti.unvested_equity)
        this.state.current_data.lti.optional.forEach(element => {
            a += parseInt(element.value)
        });
        return a
    }

    getsubtotalLP = () => {
        let a = 0
        this.state.propose_data.lti.optional.forEach(element => {
            a += parseInt(element.value)
        });
        return a
    }

    getsubtotalSOC = () => {
        let a = 0
        this.state.current_data.sign_on.optional.forEach(element => {
            a += parseInt(element.value)
        });
        return a
    }

    getsubtotalSOP = () => {
        let a = 0
        this.state.propose_data.sign_on.optional.forEach(element => {
            a += parseInt(element.value)
        });
        return a
    }


    render() {
        const { classes } = this.props;
        const selectStyles = {
            input: base => ({
                ...base,
                color: theme.palette.text.primary,
                '& input': {
                    font: 'inherit',
                },
            }),
        };
        return (
            <Grid container alignItems="center" justify="space-evenly" direction="row" className={classes.root}>
                <Grid item xs={10}>

                    <Grid container justify="space-evenly" alignItems="center">
                        <Grid item xs={1} />
                        <Grid item xs={3}>
                            <p className={classes.subtitle}>Offer Modeller Type</p>
                        </Grid>
                        <Grid item xs={4}>
                            <p>{this.state.model_type}</p>
                        </Grid>
                        <Grid item xs={1}>
                            <p>Offer Ref No</p>
                        </Grid>
                        <Grid item xs={3}>
                            {this.state.offer_reference}
                        </Grid>
                    </Grid>

                    <Grid container justify="space-evenly" alignItems="center">
                        <Grid item xs={1}/>
                        <Grid item xs={3}>Name</Grid>
                        <Grid item xs={2}>{this.state.candidate_name}</Grid>
                        <Grid item xs={2}>Gender</Grid>
                        <Grid item xs={1}>Male</Grid>
                        <Grid item xs={2}>Year Of Birth</Grid>
                        <Grid item xs={1}>{this.state.year_of_birth}</Grid>
                    </Grid>

                    <Grid container justify="space-evenly" alignItems="center">
                        <Grid item xs={1} />

                        <Grid item xs={3}>Job Flag</Grid>
                        <Grid item xs={8}>{this.state.job_flag}</Grid>
                        </Grid>

                    <div className={classes.spacediv} />

                            <Grid style={{ width: '100%' }} alignItems="center" justify="space-evenly" direction="row">
                                <Grid container>
                                    <Grid item xs={4}><p className={classes.subtitle}>Status</p></Grid>
                                    <Grid item xs={4}><p className={classes.subtitle}>Current</p></Grid>
                                    <Grid item xs={4}><p className={classes.subtitle}>Propose</p></Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={4}><p className={classes.subtitle}>Title</p></Grid>
                                    <Grid item xs={4}>
                                        <Input
                                            inputProps={{ style: { textAlign: "center" } }}
                                            disableUnderline={true} 
                                            multiline
                                            value={this.state.current_position_title} onChange={this.handleChange('current_position_title')}/>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Input multiline disableUnderline={true}  disabled value={this.state.current_position_title} inputProps={{ style: { textAlign: "center" } }} /></Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={4}><p className={classes.subtitle}>Country</p></Grid>
                                    <Grid item xs={4}><TextField
                                        value={this.state.current_position_country} onChange={this.handleChange('current_position_country')}
                                        inputProps={{
                                            style: { textAlign: "center" }
                                        }} /></Grid>
                                    <Grid item xs={4}><TextField disabled value={this.state.current_position_country} inputProps={{ style: { textAlign: "center" } }} /></Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={4}><p className={classes.subtitle}>Location</p></Grid>
                                    <Grid item xs={4}><TextField
                                        value={this.state.current_position_location} onChange={this.handleChange('current_position_location')}
                                        inputProps={{
                                            style: { textAlign: "center" }
                                        }} /></Grid>
                                    <Grid item xs={4}><TextField disabled value={this.state.current_position_location} inputProps={{ style: { textAlign: "center" } }} /></Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={4}><p className={classes.subtitle}>Grade</p></Grid>
                                    <Grid item xs={4}><TextField
                                        value={this.state.current_position_grade} onChange={this.handleChange('current_position_grade')}
                                        inputProps={{
                                            style: { textAlign: "center" }
                                        }} /></Grid>
                                    <Grid item xs={4}><TextField disabled value={this.state.jobgrade_id} inputProps={{ style: { textAlign: "center" } }} /></Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={4}><p className={classes.subtitle}>Datestart</p></Grid>
                                    <Grid item xs={4}><TextField
                                        type="date"
                                        value={this.state.current_position_datestart} onChange={this.handleChange('current_position_datestart')}
                                        inputProps={{
                                            style: { textAlign: "center" }
                                        }} /></Grid>
                                    <Grid item xs={4}><TextField
                                        type="date"
                                        value={this.state.propose_position_datestart} onChange={this.handleChange('propose_position_datestart')}
                                        inputProps={{
                                            style: { textAlign: "center" }
                                        }} /></Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={4}><p className={classes.subtitle}>Jobfunction</p></Grid>
                                    <Grid item xs={4}><TextField
                                        value={this.state.current_position_jobfunction} onChange={this.handleChange('current_position_jobfunction')}
                                        inputProps={{
                                            style: { textAlign: "center" }
                                        }} /></Grid>
                                    <Grid item xs={4}><TextField disabled value={this.state.current_position_jobfunction} inputProps={{ style: { textAlign: "center" } }} /></Grid>
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid container alignItems="center">
                                <Grid item xs={6} style={{ height: "100%" }}>
                                    <Paper style={{ height: "100%", position: "relative" }}>
                                        <p className={classes.subtitle}>Current</p>
                                        <Grid container justify="space-evenly">
                                            <Grid item xs={3}>Currency</Grid>
                                            <Grid item xs={2}>{this.state.currency}</Grid>
                                            <Grid item xs={2}>{this.state.currency1}</Grid>
                                            {/* <Grid item xs={2}>{this.state.currency2}</Grid> */}
                                            <Grid item xs={1}/>
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Annual Base</Grid>
                                            <Grid item xs={2}>{this.state.current_data.guaranteed_cash.annual_base} </Grid>
                                            <Grid item xs={2}><TextField disabled value={this.getCurrency1(this.state.current_data.guaranteed_cash.annual_base)} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Compa Ratio</Grid>
                                            <Grid item xs={2}></Grid>
                                            <Grid item xs={2}></Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Market Ratio Grade</Grid>
                                            <Grid item xs={2}></Grid>
                                            <Grid item xs={2}></Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Market Ratio Function</Grid>
                                            <Grid item xs={2}></Grid>
                                            <Grid item xs={2}></Grid>
                                            <Grid item xs={1} />
                                        </Grid>

                                        {this.state.current_data.guaranteed_cash.optional.map((item: NameValue, index) =>
                                            <Grid key={'gc' + index} container justify="space-evenly" alignItems="center">
                                                <Grid item xs={3}></Grid>
                                                <Grid item xs={2}></Grid>
                                                <Grid item xs={2}><TextField disabled value={this.getCurrency1(this.state.current_data.guaranteed_cash.optional[index].value)} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            </Grid>)}

                                        <div className={classes.spacediv} />
                                        <Grid container style={{ position: "absolute", bottom: 10 }} justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Sub</Grid>
                                            <Grid item xs={2}>{this.getsubtotalGC()}</Grid>
                                            <Grid item xs={2}>{this.getCurrency1(this.getsubtotalGC())}</Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} style={{ height: "100%" }}>
                                    <Paper style={{ height: "100%", position: "relative" }}>
                                        <p className={classes.subtitle}>Propose</p>
                                        <Grid container justify="space-evenly">
                                            <Grid item xs={3}>Currency</Grid>
                                            <Grid item xs={2}>{this.state.currency}</Grid>
                                            <Grid item xs={2}>{this.state.currency1}</Grid>
                                            <Grid item xs={2}>Difference</Grid>
                                            <Grid item xs={1}/>
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Annual Base</Grid>
                                            <Grid item xs={2}>{this.state.propose_data.guaranteed_cash.annual_base}</Grid>
                                            <Grid item xs={2}><TextField disabled value={this.getCurrency1(this.state.propose_data.guaranteed_cash.annual_base)} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField value={(parseInt(this.state.propose_data.guaranteed_cash.annual_base) * 100 / parseInt(this.state.current_data.guaranteed_cash.annual_base)).toFixed(2) + "%"} disabled inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Compa Ratio</Grid>
                                            <Grid item xs={2}>%</Grid>
                                            <Grid item xs={2}></Grid>
                                            <Grid item xs={2}></Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Market Ratio Grade</Grid>
                                            <Grid item xs={2}>%</Grid>
                                            <Grid item xs={2}></Grid>
                                            <Grid item xs={2}></Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Market Ratio Function</Grid>
                                            <Grid item xs={2}>%</Grid>
                                            <Grid item xs={2}></Grid>
                                            <Grid item xs={2}></Grid>
                                            <Grid item xs={1} />
                                        </Grid>

                                        {this.state.propose_data.guaranteed_cash.optional.map((item: NameValue, index) =>
                                            <Grid key={"gp" + index} container justify="space-evenly" alignItems="center">
                                                <Grid item xs={3}>{this.state.propose_data.guaranteed_cash.optional[index].name}</Grid>
                                                <Grid item xs={2}>{this.state.propose_data.guaranteed_cash.optional[index].value}</Grid>
                                                <Grid item xs={2}><TextField disabled value={this.getCurrency1(this.state.propose_data.guaranteed_cash.optional[index].value)} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField disabled inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={1}/>
                                            </Grid>)}

                                        <div className={classes.spacediv} />

                                        <Grid container style={{ position: "absolute", bottom: 10 }} justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Sub</Grid>
                                            <Grid item xs={2}>{this.getsubtotalGP()}</Grid>
                                            <Grid item xs={2}>{this.getCurrency1(this.getsubtotalGP())}</Grid>
                                            <Grid item xs={2}>{(this.getsubtotalGP() * 100 / this.getsubtotalGC()).toFixed(2)}%</Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Grid>

                            <Divider />
                            <Grid container alignItems="center">
                                <Grid item xs={6} style={{ height: "100%" }}>
                                    <Paper style={{ height: "100%", position: "relative" }}>
                                        <p className={classes.subtitle}>Current</p>
                                        <Grid container justify="space-evenly">
                                            <Grid item xs={3}>Currency</Grid>
                                            <Grid item xs={2}>{this.state.currency}</Grid>
                                            <Grid item xs={2}>{this.state.currency1}</Grid>
                                            <Grid item xs={1}/>
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Bonus Target</Grid>
                                            <Grid item xs={2}>{this.state.current_data.sti.bonus_target}</Grid>
                                            <Grid item xs={2}><TextField disabled inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Bonus Target Amount</Grid>
                                            <Grid item xs={2}>{this.state.current_data.sti.bonus_target_amount}</Grid>
                                            <Grid item xs={2}><TextField disabled value={this.getCurrency1(this.state.current_data.sti.bonus_target_amount)} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>

                                        {this.state.current_data.sti.optional.map((item: NameValueType, index) =>
                                            <Grid key={'SC' + index} container justify="space-evenly" alignItems="center">
                                                <Grid item xs={3}>{this.state.current_data.sti.optional[index].name}</Grid>
                                                <Grid item xs={2}>{this.state.current_data.sti.optional[index].value}</Grid>
                                                <Grid item xs={2}><TextField disabled value={this.getCurrency1(this.state.current_data.sti.optional[index].value)} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={1} />
                                            </Grid>)}

                                        <div className={classes.spacediv} />
                                        <Grid container style={{ position: "absolute", bottom: 10 }} justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Sub</Grid>
                                            <Grid item xs={2}>{this.getsubtotalSC()}</Grid>
                                            <Grid item xs={2}>{this.getCurrency1(this.getsubtotalSC())}</Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} style={{ height: "100%" }}>
                                    <Paper style={{ height: "100%", position: "relative" }}>
                                        <p className={classes.subtitle}>Propose</p>
                                        <Grid container justify="space-evenly">
                                            <Grid item xs={3}>Currency</Grid>
                                            <Grid item xs={2}>{this.state.currency}</Grid>
                                            <Grid item xs={2}>{this.state.currency1}</Grid>
                                            <Grid item xs={2}>Difference</Grid>
                                            <Grid item xs={1}/>
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Bonus Target</Grid>
                                            <Grid item xs={2}>{this.state.propose_data.sti.bonus_target}</Grid>
                                            <Grid item xs={2}><TextField disabled inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField disabled inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Bonus Target Amount</Grid>
                                            <Grid item xs={2}>{this.state.propose_data.sti.bonus_target_amount}</Grid>
                                            <Grid item xs={2}><TextField disabled value={this.getCurrency1(this.state.propose_data.sti.bonus_target_amount)} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField disabled inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>

                                        {this.state.propose_data.sti.optional.map((item: NameValueType, index) =>
                                            <Grid key={"sp" + index} container justify="space-evenly" alignItems="center">

                                                <Grid item xs={3}>{this.state.propose_data.sti.optional[index].name}</Grid>
                                                <Grid item xs={2}>{this.state.propose_data.sti.optional[index].value}</Grid>
                                                <Grid item xs={2}><TextField disabled value={this.getCurrency1(this.state.propose_data.sti.optional[index].value)} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField disabled inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={1}/>
                                            </Grid>)}

                                        <div className={classes.spacediv} />

                                        <Grid container style={{ position: "absolute", bottom: 10 }} justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Sub</Grid>
                                            <Grid item xs={2}>{this.getsubtotalSP()}</Grid>
                                            <Grid item xs={2}>{this.getCurrency1(this.getsubtotalSP())}</Grid>
                                            <Grid item xs={2}>{(this.getsubtotalSP() * 100 / this.getsubtotalSC()).toFixed(2)}%</Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Grid>

                    <div className={classes.spacediv} />

                    <Paper className={classes.colorcontainer}>
                        <Grid container alignItems="center">
                            <Grid item xs={1} />
                            <Grid item xs={11}>
                                <Grid container justify="space-evenly" alignItems="center">
                                    <Grid item xs={3}>Target Total Cash</Grid>
                                    <Grid item xs={1}>{this.getsubtotalGC() + this.getsubtotalSC()}</Grid>
                                    <Grid item xs={1}>{this.getCurrency1(this.getsubtotalGC() + this.getsubtotalSC())}</Grid>
                                    <Grid item xs={1}>{this.getsubtotalGP() + this.getsubtotalSP()}</Grid>
                                    <Grid item xs={1}>{this.getCurrency1(this.getsubtotalGP() + this.getsubtotalSP())}</Grid>
                                    <Grid item xs={2}>{((this.getsubtotalGP() + this.getsubtotalSP()) * 100 / (this.getsubtotalGC() + this.getsubtotalSC())).toFixed(2)}%</Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>

                    <div className={classes.spacediv} />



                            <Divider />
                            <Grid container alignItems="center" justify="space-evenly">
                                <Grid item xs={6} style={{ height: "100%" }}>
                                    <Paper style={{ height: "100%", position: "relative" }}>
                                        <p className={classes.subtitle}>Current</p>
                                        <Grid container justify="space-evenly">
                                            <Grid item xs={3}>Currency</Grid>
                                            <Grid item xs={2}>{this.state.currency}</Grid>
                                            <Grid item xs={2}>{this.state.currency1}</Grid>
                                            <Grid item xs={1}/>
                                        </Grid>

                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Unvested Equity</Grid>
                                            <Grid item xs={2}>{this.state.current_data.lti.unvested_equity}</Grid>
                                            <Grid item xs={2}><TextField disabled value={this.getCurrency1(this.state.current_data.lti.unvested_equity)} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Annual LTI as %</Grid>
                                            <Grid item xs={2}>{(parseInt(this.state.current_data.lti.unvested_equity) * 100 / parseInt(this.state.current_data.guaranteed_cash.annual_base)).toFixed(2)}%</Grid>
                                            <Grid item xs={2}></Grid>
                                            <Grid item xs={1} />
                                        </Grid>

                                        {this.state.current_data.lti.optional.map((item: NameValue, index) =>
                                            <Grid container key={'lc' + index} justify="space-evenly" alignItems="center">
                                                <Grid item xs={3}>{this.state.current_data.lti.optional[index].name}</Grid>
                                                <Grid item xs={2}>{this.state.current_data.lti.optional[index].value}</Grid>
                                                <Grid item xs={2}><TextField disabled value={this.getCurrency1(this.state.current_data.lti.optional[index].value)} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={1}/>
                                            </Grid>)}

                                        <div className={classes.spacediv} />
                                        <Grid container style={{ position: "absolute", bottom: 10 }} justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Sub</Grid>
                                            <Grid item xs={2}>{this.getsubtotalLC()}</Grid>
                                            <Grid item xs={2}>{this.getCurrency1(this.getsubtotalLC())}</Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} style={{ height: "100%" }}>
                                    <Paper style={{ height: "100%", position: "relative" }}>
                                        <p className={classes.subtitle}>Propose</p>
                                        <Grid container justify="space-evenly">
                                            <Grid item xs={3}>Currency</Grid>
                                            <Grid item xs={2}>{this.state.currency}</Grid>
                                            <Grid item xs={2}>{this.state.currency1}</Grid>
                                            <Grid item xs={2}>Difference</Grid>
                                            <Grid item xs={1}/>
                                        </Grid>


                                        {this.state.propose_data.lti.optional.map((item: NameValue, index) =>
                                            <Grid container key={'lp' + index} justify="space-evenly" alignItems="center">
                                                <Grid item xs={3}>{this.state.propose_data.lti.optional[index].name}</Grid>
                                                <Grid item xs={2}>{this.state.propose_data.lti.optional[index].value}</Grid>
                                                <Grid item xs={2}><TextField disabled value={this.getCurrency1(this.state.propose_data.lti.optional[index].value)} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField disabled inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={1}/>
                                            </Grid>)}

                                        <div className={classes.spacediv} />

                                        <Grid container style={{ position: "absolute", bottom: 10 }} justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Sub</Grid>
                                            <Grid item xs={2}>{this.getsubtotalLP()}</Grid>
                                            <Grid item xs={2}>{this.getCurrency1(this.getsubtotalLP())}</Grid>
                                            <Grid item xs={2}>{(this.getsubtotalLP() * 100 / this.getsubtotalLC()).toFixed(2)}%</Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Grid>

                    <div className={classes.spacediv} />

                    <Paper className={classes.colorcontainer}>
                        <Grid container alignItems="center">
                            <Grid item xs={1} />
                            <Grid item xs={11}>
                                <Grid container justify="space-evenly" alignItems="center">
                                    <Grid item xs={3}>Total Direct Compensation</Grid>
                                    <Grid item xs={1}>{this.getsubtotalGC() + this.getsubtotalSC() + this.getsubtotalLC()}</Grid>
                                    <Grid item xs={1}>{this.getCurrency1(this.getsubtotalGC() + this.getsubtotalSC() + this.getsubtotalLC())}</Grid>
                                    <Grid item xs={1}>{this.getsubtotalGP() + this.getsubtotalSP() + this.getsubtotalLP()}</Grid>
                                    <Grid item xs={1}>{this.getCurrency1(this.getsubtotalGP() + this.getsubtotalSP() + this.getsubtotalLP())}</Grid>
                                    <Grid item xs={2}>{((this.getsubtotalGP() + this.getsubtotalSP() + this.getsubtotalLP()) * 100 / (this.getsubtotalGC() + this.getsubtotalSC() + this.getsubtotalLC()))}%</Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>

                    <div className={classes.spacediv} />

                            <Divider />
                            <Grid container alignItems="center">
                                <Grid item xs={6} style={{ height: "100%" }}>
                                    <Paper style={{ height: "100%", position: "relative" }}>
                                        <p className={classes.subtitle}>Current</p>
                                        <Grid container justify="space-evenly">
                                            <Grid item xs={3}>Currency</Grid>
                                            <Grid item xs={2}>{this.state.currency}</Grid>
                                            <Grid item xs={2}>{this.state.currency1}</Grid>
                                            <Grid item xs={1}/>
                                        </Grid>

                                        {this.state.current_data.sign_on.optional.map((item: NameValue, index) =>
                                            <Grid container key={'soc' + index} justify="space-evenly" alignItems="center">
                                                <Grid item xs={3}>{this.state.current_data.sign_on.optional[index].name}</Grid>
                                                <Grid item xs={2}>{this.state.current_data.sign_on.optional[index].value}</Grid>
                                                <Grid item xs={2}><TextField disabled value={this.getCurrency1(this.state.current_data.sign_on.optional[index].value)} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={1}/>
                                            </Grid>)}

                                        <div className={classes.spacediv} />
                                        <Grid container style={{ position: "absolute", bottom: 10 }} justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Sub</Grid>
                                            <Grid item xs={2}>{this.getsubtotalSOC()}</Grid>
                                            <Grid item xs={2}>{this.getCurrency1(this.getsubtotalSOC())}</Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} style={{ height: "100%" }}>
                                    <Paper style={{ height: "100%", position: "relative" }}>
                                        <p className={classes.subtitle}>Propose</p>
                                        <Grid container justify="space-evenly">
                                            <Grid item xs={3}>Currency</Grid>
                                            <Grid item xs={2}>{this.state.currency}</Grid>
                                            <Grid item xs={2}>{this.state.currency1}</Grid>
                                            <Grid item xs={2}>Difference</Grid>
                                            <Grid item xs={1}/>
                                        </Grid>

                                        {this.state.propose_data.sign_on.optional.map((item: NameValue, index) =>
                                            <Grid container key={'sop' + index} justify="space-evenly" alignItems="center">
                                                <Grid item xs={3}>{this.state.propose_data.sign_on.optional[index].name}</Grid>
                                                <Grid item xs={2}>{this.state.propose_data.sign_on.optional[index].value}</Grid>
                                                <Grid item xs={2}><TextField disabled value={this.getCurrency1(this.state.propose_data.sign_on.optional[index].value)} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField disabled inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={1}/>
                                            </Grid>)}

                                        <div className={classes.spacediv} />

                                        <Grid container style={{ position: "absolute", bottom: 10 }} justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Sub</Grid>
                                            <Grid item xs={2}>{this.getsubtotalSOP()}</Grid>
                                            <Grid item xs={2}>{this.getCurrency1(this.getsubtotalSOP())}</Grid>
                                            <Grid item xs={2}>{(this.getsubtotalSOP() * 100 / this.getsubtotalSOC()).toFixed(2)}%</Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Grid>

                    <div className={classes.spacediv} />

                    <Paper className={classes.colorcontainer}>
                        <Grid container alignItems="center">
                            <Grid item xs={1} />
                            <Grid item xs={11}>
                                <Grid container justify="space-evenly" alignItems="center">
                                    <Grid item xs={3}>Total Compensation Package</Grid>
                                    <Grid item xs={1}>{this.getsubtotalGC() + this.getsubtotalSC() + this.getsubtotalLC() + this.getsubtotalSOC()}</Grid>
                                    <Grid item xs={1}>{this.getCurrency1(this.getsubtotalGC() + this.getsubtotalSC() + this.getsubtotalLC() + this.getsubtotalSOC())}</Grid>
                                    <Grid item xs={1}>{this.getsubtotalGP() + this.getsubtotalSP() + this.getsubtotalLP() + this.getsubtotalSOP()}</Grid>
                                    <Grid item xs={1}>{this.getCurrency1(this.getsubtotalGP() + this.getsubtotalSP() + this.getsubtotalLP() + this.getsubtotalSOP())}</Grid>
                                    <Grid item xs={2}>{((this.getsubtotalGP() + this.getsubtotalSP() + this.getsubtotalLP() + this.getsubtotalSOP()) * 100 / (this.getsubtotalGC() + this.getsubtotalSC() + this.getsubtotalLC() + this.getsubtotalSOC())).toFixed(2)}%</Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>

                    <div className={classes.spacediv} />
                    <div className={classes.spacediv} />

                    <Divider />
                    <Divider />
                </Grid >

            </Grid >
        );
    }
}

(OfferModelPage as React.ComponentClass<Props>).propTypes = {
    classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
    return {
        selectedOffermodel: state.offerModelReducer.selectedOfferModel,
        currencyList: state.countryReducer.currencyList,
        session_key: state.authenticationReducer.token,
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(OfferModelPage));
