import React from "react";
import PropTypes from "prop-types";
import { Grid, Theme, createStyles, Paper, WithStyles, withStyles, Divider, TextField, Typography, IconButton, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Button, InputAdornment } from "@material-ui/core";
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
        }
    });

interface Props extends InState, WithStyles<typeof styles> { }

interface InState {
    create: boolean;
    updateData: any;
    onSubmit: Function;
    session_key: string;
    selectedCompany: Company;
    selectedJobPosition: JobPosition;
}

interface State {
    currency: string;
    currency1: string;
    currency2: string;
    jobposition_id: number;
    created_by: string;
    candidate_name: string;
    job_flag: string;
    model_type: string;
    year_of_birth: string;
    offer_reference: string;
    jobgrade_id: string;
    status: string;
    current_data: any;
    propose_data: any;
    comparator_data: any;
}

class OfferModelPage extends React.Component<Props, State> {
    state = {
        jobposition_id: 1,
        created_by: "user.master@mail.com",
        candidate_name: "",
        job_flag: "",
        model_type: "",
        year_of_birth: "",
        offer_reference: "",
        jobgrade_id: "",
        status: "Draft",
        currency: "",
        currency1: "",
        currency2: "",
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
        comparator_data: {
            company_id: "gHw8BU1y7BiUQi7OOMNW",
            company_name: "Samurai Business Code Inc",
            intSalaryRange: {
                min: 30000,
                mid: 40000,
                max: 65000
            },
            intPayrollSpread: {
                grade: {
                    min: 46700,
                    max: 65000,
                    median: 57800
                },
                function: {
                    min: 46700,
                    max: 65000,
                    median: 52150
                }
            },
            extMarketData: {
                grade: {
                    p25: 65000,
                    p50: 69000,
                    p75: 71000
                },
                function: {
                    p25: null,
                    p50: null,
                    p75: null
                }
            },
            equityRange: {
                annualGrant: {
                    min: 20000,
                    mid: 50000,
                    max: 100000
                },
                newHire: {
                    min: 80000,
                    mid: 90000,
                    max: 100000
                }
            }
        },
    }

    async componentDidMount() {
        // const data = {
        //     session_key: "o8c7l7KIhnpsrBG3Z14p",
        //     jobgrade_id: "OzNFgoIPgfwQFzui7MTT",
        //     jobfunction_id: "0vOiuB3sbLm3cOGG2TVn",
        //     ccompany_id: "gHw8BU1y7BiUQi7OOMNW"
        // }

        console.dir(this.props.updateData)
        // this.setState(this.props.updateData)

        this.setState({ jobgrade_id: this.props.selectedJobPosition.jobgrade_name })
        const data = {
            session_key: this.props.session_key,
            jobgrade_id: this.props.selectedJobPosition.jobgrade_id,
            jobfunction_id: this.props.selectedJobPosition.jobfunction,
            ccompany_id: this.props.selectedCompany.company_id
        }

        const response = await $axios.post('/job/getComparatorData', data)

        // this.setState({comparator_data:response.data.data})

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

    handleChangeAnnualBaseCurrent = (event) => {
        const gc = { ...this.state.current_data }
        gc.guaranteed_cash.annual_base = event.target.value
        gc.sti.bonus_target = (parseInt(this.state.current_data.sti.bonus_target_amount) / event.target.value * 100).toFixed(2).toString()

        this.setState({ current_data: gc })
    }

    handleChangeAnnualBaseProposed = (event) => {
        const gc = { ...this.state.propose_data }
        gc.guaranteed_cash.annual_base = event.target.value
        gc.sti.bonus_target = (parseInt(this.state.propose_data.sti.bonus_target_amount) / event.target.value * 100).toFixed(2).toString()
        this.setState({ propose_data: gc })
    }

    handleChangeBonusTargetCurrent = (event) => {
        const gc = { ...this.state.current_data }
        gc.sti.bonus_target = event.target.value
        gc.sti.bonus_target_amount = (event.target.value * parseInt(this.state.current_data.guaranteed_cash.annual_base) / 100).toFixed(2).toString()
        this.setState({ current_data: gc })
    }

    handleChangeBonusTargetAmountCurrent = (event) => {
        const gc = { ...this.state.current_data }
        gc.sti.bonus_target_amount = event.target.value
        gc.sti.bonus_target = (event.target.value / parseInt(this.state.current_data.guaranteed_cash.annual_base) * 100).toFixed(2).toString()
        this.setState({ current_data: gc })
    }

    handleChangeBonusTargetProposed = (event) => {
        const gc = { ...this.state.propose_data }
        gc.sti.bonus_target = event.target.value
        gc.sti.bonus_target_amount = (event.target.value * parseInt(this.state.propose_data.guaranteed_cash.annual_base) / 100).toFixed(2).toString()
        this.setState({ propose_data: gc })
    }

    handleChangeBonusTargetAmountProposed = (event) => {
        const gc = { ...this.state.propose_data }
        gc.sti.bonus_target_amount = event.target.value
        gc.sti.bonus_target = (event.target.value / parseInt(this.state.propose_data.guaranteed_cash.annual_base) * 100).toFixed(2).toString()
        this.setState({ propose_data: gc })
    }

    handleChangeUnvestedEquity = (event) => {
        const gc = { ...this.state.current_data }
        gc.lti.unvested_equity = event.target.value
        this.setState({ current_data: gc })
    }

    handleChangeGCOptionalValueCurrent = (index) => (event) => {
        const gc = { ...this.state.current_data }
        gc.guaranteed_cash.optional[index].value = event.target.value
        this.setState({ current_data: gc })
    }

    handleChangeGCOptionalNameCurrent = (index) => (event) => {
        const gc = { ...this.state.current_data }
        gc.guaranteed_cash.optional[index].name = event.target.value
        this.setState({ current_data: gc })
    }

    handleChangeGCOptionalValueProposed = (index) => (event) => {
        const gc = { ...this.state.propose_data }
        gc.guaranteed_cash.optional[index].value = event.target.value
        this.setState({ propose_data: gc })
    }

    handleChangeGCOptionalNameProposed = (index) => (event) => {
        const gc = { ...this.state.propose_data }
        gc.guaranteed_cash.optional[index].name = event.target.value
        this.setState({ propose_data: gc })
    }

    handleChangeSTIOptionalValueCurrent = (index) => (event) => {
        const gc = { ...this.state.current_data }
        gc.sti.optional[index].value = event.target.value
        this.setState({ current_data: gc })
    }

    handleChangeSTIOptionalNameCurrent = (index) => (event) => {
        const gc = { ...this.state.current_data }
        gc.sti.optional[index].name = event.target.value
        this.setState({ current_data: gc })
    }

    handleChangeSTIOptionalValueProposed = (index) => (event) => {
        const gc = { ...this.state.propose_data }
        gc.sti.optional[index].value = event.target.value
        this.setState({ propose_data: gc })
    }

    handleChangeSTIOptionalNameProposed = (index) => (event) => {
        const gc = { ...this.state.propose_data }
        gc.sti.optional[index].name = event.target.value
        this.setState({ propose_data: gc })
    }

    handleChangeLTIOptionalValueCurrent = (index) => (event) => {
        const gc = { ...this.state.current_data }
        gc.lti.optional[index].value = event.target.value
        this.setState({ current_data: gc })
    }

    handleChangeLTIOptionalNameCurrent = (index) => (event) => {
        const gc = { ...this.state.current_data }
        gc.lti.optional[index].name = event.target.value
        this.setState({ current_data: gc })
    }

    handleChangeLTIOptionalValueProposed = (index) => (event) => {
        const gc = { ...this.state.propose_data }
        gc.lti.optional[index].value = event.target.value
        this.setState({ propose_data: gc })
    }

    handleChangeLTIOptionalNameProposed = (index) => (event) => {
        const gc = { ...this.state.propose_data }
        gc.lti.optional[index].name = event.target.value
        this.setState({ propose_data: gc })
    }

    handleChangeSignOnOptionalValueCurrent = (index) => (event) => {
        const gc = { ...this.state.current_data }
        gc.sign_on.optional[index].value = event.target.value
        this.setState({ current_data: gc })
    }

    handleChangeSignOnOptionalNameCurrent = (index) => (event) => {
        const gc = { ...this.state.current_data }
        gc.sign_on.optional[index].name = event.target.value
        this.setState({ current_data: gc })
    }

    handleChangeSignOnOptionalValueProposed = (index) => (event) => {
        const gc = { ...this.state.propose_data }
        gc.sign_on.optional[index].value = event.target.value
        this.setState({ propose_data: gc })
    }

    handleChangeSignOnOptionalNameProposed = (index) => (event) => {
        const gc = { ...this.state.propose_data }
        gc.sign_on.optional[index].name = event.target.value
        this.setState({ propose_data: gc })
    }


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
        this.state.current_data.sti.optional.forEach(element => {
            a += parseInt(element.value)
        });
        return a
    }

    getsubtotalLP = () => {
        let a = 0
        this.state.propose_data.sti.optional.forEach(element => {
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
    // handleDeleteGC = (index) => { this.setState(state => { const guaranteedcash_current = state.guaranteedcash_current.filter((item, j) => index !== j); return { guaranteedcash_current, }; }); }
    // handleAddGC = () => { this.setState(state => { const guaranteedcash_current = state.guaranteedcash_current.concat({ name: '', value: '' }); return { guaranteedcash_current }; }); };
    // handleDeleteGP = (index) => { this.setState(state => { const guaranteedcash_propose = state.guaranteedcash_propose.filter((item, j) => index !== j); return { guaranteedcash_propose, }; }); }
    // handleAddGP = () => { this.setState(state => { const guaranteedcash_propose = state.guaranteedcash_propose.concat({ name: '', value: '' }); return { guaranteedcash_propose }; }); };

    // handleDeleteSC = (index) => { this.setState(state => { const shortterm_current = state.shortterm_current.filter((item, j) => index !== j); return { shortterm_current, }; }); }
    // handleAddSC = () => { this.setState(state => { const shortterm_current = state.shortterm_current.concat({ name: '', value: '', type: '' }); return { shortterm_current }; }); };
    // handleDeleteSP = (index) => { this.setState(state => { const shortterm_propose = state.shortterm_propose.filter((item, j) => index !== j); return { shortterm_propose, }; }); }
    // handleAddSP = () => { this.setState(state => { const shortterm_propose = state.shortterm_propose.concat({ name: '', value: '', type: '' }); return { shortterm_propose }; }); };

    // handleDeleteLC = (index) => { this.setState(state => { const longterm_current = state.longterm_current.filter((item, j) => index !== j); return { longterm_current, }; }); }
    // handleAddLC = () => { this.setState(state => { const longterm_current = state.longterm_current.concat({ name: '', value: '' }); return { longterm_current }; }); };
    // handleDeleteLP = (index) => { this.setState(state => { const longterm_propose = state.longterm_propose.filter((item, j) => index !== j); return { longterm_propose, }; }); }
    // handleAddLP = () => { this.setState(state => { const longterm_propose = state.longterm_propose.concat({ name: '', value: '' }); return { longterm_propose }; }); };

    // handleDeleteSOC = (index) => { this.setState(state => { const signons_current = state.signons_current.filter((item, j) => index !== j); return { signons_current, }; }); }
    // handleAddSOC = () => { this.setState(state => { const signons_current = state.signons_current.concat({ name: '', value: '' }); return { signons_current }; }); };
    // handleDeleteSOP = (index) => { this.setState(state => { const signons_propose = state.signons_propose.filter((item, j) => index !== j); return { signons_propose, }; }); }
    // handleAddSOP = () => { this.setState(state => { const signons_propose = state.signons_propose.concat({ name: '', value: '' }); return { signons_propose }; }); };

    render() {
        const { classes } = this.props;
        return (
            <Grid container alignItems="center" justify="space-evenly" direction="row" className={classes.root}>
                <Grid item xs={10}>

                    <p className={classes.subtitle}>TOM Modeller</p>

                    <Grid container justify="space-evenly" alignItems="center">
                        <Grid item xs={1}>Candidate</Grid>
                        <Grid item xs={3}><TextField value={this.state.candidate_name} onChange={this.handleChange('candidate_name')} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                        <Grid item xs={1}>Offer Modeller Type</Grid>
                        <Grid item xs={3}><TextField value={this.state.model_type} onChange={this.handleChange('model_type')} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                        <Grid item xs={1}>Offer Reference</Grid>
                        <Grid item xs={3}><TextField value={this.state.offer_reference} onChange={this.handleChange('offer_reference')} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                    </Grid>
                    <Grid container justify="space-evenly" alignItems="center">
                        <Grid item xs={1}>Job Flag</Grid>
                        <Grid item xs={3}><TextField value={this.state.job_flag} onChange={this.handleChange('job_flag')} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                        <Grid item xs={1}>Year of Birth</Grid>
                        <Grid item xs={3}><TextField value={this.state.year_of_birth} onChange={this.handleChange('year_of_birth')} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                        <Grid item xs={1}>Job Grade</Grid>
                        <Grid item xs={3}><TextField disabled value={this.state.jobgrade_id} onChange={this.handleChange('jobgrade_id')} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                    </Grid>

                    <div className={classes.spacediv} />

                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <p className={classes.subtitle}>Position</p>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Divider />
                            <Grid style={{ width: '100%' }} alignItems="center" justify="space-evenly" direction="row">
                                <Grid container>
                                    <Grid item xs={4}><p className={classes.subtitle}>Status</p></Grid>
                                    <Grid item xs={4}><p className={classes.subtitle}>Current</p></Grid>
                                    <Grid item xs={4}><p className={classes.subtitle}>Propose</p></Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={4}><p className={classes.subtitle}>Title</p></Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            inputProps={{
                                                style: { textAlign: "center" }
                                            }} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField disabled value={this.props.selectedJobPosition.business_title} inputProps={{ style: { textAlign: "center" } }} /></Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={4}><p className={classes.subtitle}>Country</p></Grid>
                                    <Grid item xs={4}><TextField
                                        inputProps={{
                                            style: { textAlign: "center" }
                                        }} /></Grid>
                                    <Grid item xs={4}><TextField disabled value={this.props.selectedJobPosition.country} inputProps={{ style: { textAlign: "center" } }} /></Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={4}><p className={classes.subtitle}>Location</p></Grid>
                                    <Grid item xs={4}><TextField
                                        inputProps={{
                                            style: { textAlign: "center" }
                                        }} /></Grid>
                                    <Grid item xs={4}><TextField disabled value={this.props.selectedJobPosition.location} inputProps={{ style: { textAlign: "center" } }} /></Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={4}><p className={classes.subtitle}>Grade</p></Grid>
                                    <Grid item xs={4}><TextField
                                        inputProps={{
                                            style: { textAlign: "center" }
                                        }} /></Grid>
                                    <Grid item xs={4}><TextField disabled value={this.props.selectedJobPosition.jobgrade_name} inputProps={{ style: { textAlign: "center" } }} /></Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={4}><p className={classes.subtitle}>Datestart</p></Grid>
                                    <Grid item xs={4}><TextField
                                        inputProps={{
                                            style: { textAlign: "center" }
                                        }} /></Grid>
                                    <Grid item xs={4}><TextField
                                        inputProps={{
                                            style: { textAlign: "center" }
                                        }} /></Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={4}><p className={classes.subtitle}>Jobfunction</p></Grid>
                                    <Grid item xs={4}><TextField
                                        inputProps={{
                                            style: { textAlign: "center" }
                                        }} /></Grid>
                                    <Grid item xs={4}><TextField disabled value={this.props.selectedJobPosition.job_name} inputProps={{ style: { textAlign: "center" } }} /></Grid>
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>


                    <div className={classes.spacediv} />
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <p className={classes.subtitle}>Guaranteed Cash</p>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Divider />
                            <Grid container alignItems="center">
                                <Grid item xs={6} style={{ height: "100%" }}>
                                    <Paper style={{ height: "100%", position: "relative" }}>
                                        <p className={classes.subtitle}>Current</p>
                                        <Grid container justify="space-evenly">
                                            <Grid item xs={3}>Currency</Grid>
                                            <Grid item xs={2}>USD</Grid>
                                            <Grid item xs={2}>{this.state.currency}</Grid>
                                            <Grid item xs={1}><IconButton onClick={this.handleAddGC}><AddIcon /></IconButton></Grid>
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Annual Base</Grid>
                                            <Grid item xs={2}><TextField type="number" value={this.state.current_data.guaranteed_cash.annual_base} onChange={this.handleChangeAnnualBaseCurrent} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField disabled inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
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
                                                <Grid item xs={3}><TextField value={this.state.current_data.guaranteed_cash.optional[index].name} onChange={this.handleChangeGCOptionalNameCurrent(index)} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField type="number" value={this.state.current_data.guaranteed_cash.optional[index].value} onChange={this.handleChangeGCOptionalValueCurrent(index)} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField disabled inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={1}><IconButton onClick={() => this.handleDeleteGC(index)}><DeleteIcon /></IconButton></Grid>
                                            </Grid>)}

                                        <div className={classes.spacediv} />
                                        <Grid container style={{ position: "absolute", bottom: 10 }} justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Sub</Grid>
                                            <Grid item xs={2}>{this.getsubtotalGC()}</Grid>
                                            <Grid item xs={2}>101,850</Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} style={{ height: "100%" }}>
                                    <Paper style={{ height: "100%", position: "relative" }}>
                                        <p className={classes.subtitle}>Propose</p>
                                        <Grid container justify="space-evenly">
                                            <Grid item xs={3}>Currency</Grid>
                                            <Grid item xs={2}>USD</Grid>
                                            <Grid item xs={2}>{this.state.currency}</Grid>
                                            <Grid item xs={2}>Difference</Grid>
                                            <Grid item xs={1}><IconButton onClick={this.handleAddGP}><AddIcon /></IconButton></Grid>
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Annual Base</Grid>
                                            <Grid item xs={2}><TextField type="number" value={this.state.propose_data.guaranteed_cash.annual_base} onChange={this.handleChangeAnnualBaseProposed} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField disabled inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField disabled inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Compa Ratio</Grid>
                                            <Grid item xs={2}>{(parseInt(this.state.propose_data.guaranteed_cash.annual_base) * 100 / this.state.comparator_data.intSalaryRange.mid).toFixed(2)} %</Grid>
                                            <Grid item xs={2}></Grid>
                                            <Grid item xs={2}></Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Market Ratio Grade</Grid>
                                            <Grid item xs={2}>{(parseInt(this.state.propose_data.guaranteed_cash.annual_base) * 100 / this.state.comparator_data.extMarketData.grade.p50).toFixed(2)} %</Grid>
                                            <Grid item xs={2}></Grid>
                                            <Grid item xs={2}></Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Market Ratio Function</Grid>
                                            <Grid item xs={2}>{(parseInt(this.state.propose_data.guaranteed_cash.annual_base) * 100 / this.state.comparator_data.intPayrollSpread.function.median).toFixed(2)} %</Grid>
                                            <Grid item xs={2}></Grid>
                                            <Grid item xs={2}></Grid>
                                            <Grid item xs={1} />
                                        </Grid>

                                        {this.state.propose_data.guaranteed_cash.optional.map((item: NameValue, index) =>
                                            <Grid key={"gp" + index} container justify="space-evenly" alignItems="center">
                                                <Grid item xs={3}><TextField value={this.state.propose_data.guaranteed_cash.optional[index].name} onChange={this.handleChangeGCOptionalNameProposed(index)} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField value={this.state.propose_data.guaranteed_cash.optional[index].value} onChange={this.handleChangeGCOptionalValueProposed(index)} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField disabled inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField disabled inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={1}><IconButton onClick={() => this.handleDeleteGP(index)}><DeleteIcon /></IconButton></Grid>
                                            </Grid>)}

                                        <div className={classes.spacediv} />

                                        <Grid container style={{ position: "absolute", bottom: 10 }} justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Sub</Grid>
                                            <Grid item xs={2}>{this.getsubtotalGP()}</Grid>
                                            <Grid item xs={2}>101,850</Grid>
                                            <Grid item xs={2}>133%</Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <div className={classes.spacediv} />

                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <p className={classes.subtitle}>Short Term</p>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Divider />
                            <Grid container alignItems="center">
                                <Grid item xs={6} style={{ height: "100%" }}>
                                    <Paper style={{ height: "100%", position: "relative" }}>
                                        <p className={classes.subtitle}>Current</p>
                                        <Grid container justify="space-evenly">
                                            <Grid item xs={3}>Currency</Grid>
                                            <Grid item xs={2}>USD</Grid>
                                            <Grid item xs={2}>{this.state.currency}</Grid>
                                            <Grid item xs={1}><IconButton onClick={this.handleAddSC}><AddIcon /></IconButton></Grid>
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Bonus Target</Grid>
                                            <Grid item xs={2}><TextField value={this.state.current_data.sti.bonus_target} onChange={this.handleChangeBonusTargetCurrent} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }} /></Grid>
                                            <Grid item xs={2}><TextField disabled inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Bonus Target Amount</Grid>
                                            <Grid item xs={2}><TextField value={this.state.current_data.sti.bonus_target_amount} onChange={this.handleChangeBonusTargetAmountCurrent} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField disabled inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>

                                        {this.state.current_data.sti.optional.map((item: NameValueType, index) =>
                                            <Grid key={'SC' + index} container justify="space-evenly" alignItems="center">
                                                <Grid item xs={3}><TextField value={this.state.current_data.sti.optional[index].name} onChange={this.handleChangeSTIOptionalNameCurrent(index)} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField value={this.state.current_data.sti.optional[index].value} onChange={this.handleChangeSTIOptionalValueCurrent(index)} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField disabled inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={1}><IconButton onClick={() => this.handleDeleteSC(index)}><DeleteIcon /></IconButton></Grid>
                                            </Grid>)}

                                        <div className={classes.spacediv} />
                                        <Grid container style={{ position: "absolute", bottom: 10 }} justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Sub</Grid>
                                            <Grid item xs={2}>{this.getsubtotalSC()}</Grid>
                                            <Grid item xs={2}>101,850</Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} style={{ height: "100%" }}>
                                    <Paper style={{ height: "100%", position: "relative" }}>
                                        <p className={classes.subtitle}>Propose</p>
                                        <Grid container justify="space-evenly">
                                            <Grid item xs={3}>Currency</Grid>
                                            <Grid item xs={2}>USD</Grid>
                                            <Grid item xs={2}>{this.state.currency}</Grid>
                                            <Grid item xs={2}>Difference</Grid>
                                            <Grid item xs={1}><IconButton onClick={this.handleAddSP}><AddIcon /></IconButton></Grid>
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Bonus Target</Grid>
                                            <Grid item xs={2}><TextField value={this.state.propose_data.sti.bonus_target} onChange={this.handleChangeBonusTargetProposed} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }} /></Grid>
                                            <Grid item xs={2}><TextField disabled inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField disabled inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Bonus Target Amount</Grid>
                                            <Grid item xs={2}><TextField value={this.state.propose_data.sti.bonus_target_amount} onChange={this.handleChangeBonusTargetAmountProposed} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField disabled inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField disabled inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>

                                        {this.state.propose_data.sti.optional.map((item: NameValueType, index) =>
                                            <Grid key={"sp" + index} container justify="space-evenly" alignItems="center">
                                                <Grid item xs={3}><TextField value={this.state.propose_data.sti.optional[index].name} onChange={this.handleChangeSTIOptionalNameProposed(index)} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField value={this.state.propose_data.sti.optional[index].value} onChange={this.handleChangeSTIOptionalValueProposed(index)} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField disabled inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField disabled inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={1}><IconButton onClick={() => this.handleDeleteSP(index)}><DeleteIcon /></IconButton></Grid>
                                            </Grid>)}

                                        <div className={classes.spacediv} />

                                        <Grid container style={{ position: "absolute", bottom: 10 }} justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Sub</Grid>
                                            <Grid item xs={2}>{this.getsubtotalSP()}</Grid>
                                            <Grid item xs={2}>101,850</Grid>
                                            <Grid item xs={2}>133%</Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <div className={classes.spacediv} />

                    <Paper className={classes.colorcontainer}>
                        <Grid container alignItems="center">
                            <Grid item xs={1} />
                            <Grid item xs={11}>
                                <Grid container justify="space-evenly" alignItems="center">
                                    <Grid item xs={3}>Cash Total</Grid>
                                    <Grid item xs={1}>{this.getsubtotalGC() + this.getsubtotalSC()}</Grid>
                                    <Grid item xs={1}>118,850</Grid>
                                    <Grid item xs={1}>{this.getsubtotalGP() + this.getsubtotalSP()}</Grid>
                                    <Grid item xs={1}>159,000</Grid>
                                    <Grid item xs={2}>135%</Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>

                    <div className={classes.spacediv} />


                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <p className={classes.subtitle}>Long Term</p>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>

                            <Divider />
                            <Grid container alignItems="center" justify="space-evenly">
                                <Grid item xs={6} style={{ height: "100%" }}>
                                    <Paper style={{ height: "100%", position: "relative" }}>
                                        <p className={classes.subtitle}>Current</p>
                                        <Grid container justify="space-evenly">
                                            <Grid item xs={3}>Currency</Grid>
                                            <Grid item xs={2}>USD</Grid>
                                            <Grid item xs={2}>{this.state.currency}</Grid>
                                            <Grid item xs={1}><IconButton onClick={this.handleAddLC}><AddIcon /></IconButton></Grid>
                                        </Grid>

                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Unvested Equity</Grid>
                                            <Grid item xs={2}><TextField value={this.state.current_data.lti.unvested_equity} onChange={this.handleChangeUnvestedEquity} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField disabled inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Annual LTI as %</Grid>
                                            <Grid item xs={2}>{(parseInt(this.state.current_data.lti.unvested_equity) * 100 / parseInt(this.state.current_data.guaranteed_cash.annual_base)).toFixed(2)}%</Grid>
                                            <Grid item xs={2}></Grid>
                                            <Grid item xs={1} />
                                        </Grid>

                                        {this.state.current_data.lti.optional.map((item: NameValue, index) =>
                                            <Grid container justify="space-evenly" alignItems="center">
                                                <Grid item xs={3}><TextField value={this.state.current_data.lti.optional[index].name} onChange={this.handleChangeLTIOptionalNameCurrent(index)} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField value={this.state.current_data.lti.optional[index].value} onChange={this.handleChangeLTIOptionalValueCurrent(index)} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField disabled inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={1}><IconButton onClick={() => this.handleDeleteLC(index)}><DeleteIcon /></IconButton></Grid>
                                            </Grid>)}

                                        <div className={classes.spacediv} />
                                        <Grid container style={{ position: "absolute", bottom: 10 }} justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Sub</Grid>
                                            <Grid item xs={2}>{this.getsubtotalLC()}</Grid>
                                            <Grid item xs={2}>101,850</Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} style={{ height: "100%" }}>
                                    <Paper style={{ height: "100%", position: "relative" }}>
                                        <p className={classes.subtitle}>Propose</p>
                                        <Grid container justify="space-evenly">
                                            <Grid item xs={3}>Currency</Grid>
                                            <Grid item xs={2}>USD</Grid>
                                            <Grid item xs={2}>{this.state.currency}</Grid>
                                            <Grid item xs={2}>Difference</Grid>
                                            <Grid item xs={1}><IconButton onClick={this.handleAddLP}><AddIcon /></IconButton></Grid>
                                        </Grid>


                                        {this.state.propose_data.lti.optional.map((item: NameValue, index) =>
                                            <Grid container justify="space-evenly" alignItems="center">
                                                <Grid item xs={3}><TextField value={this.state.propose_data.lti.optional[index].name} onChange={this.handleChangeLTIOptionalNameProposed(index)} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField value={this.state.propose_data.lti.optional[index].value} onChange={this.handleChangeLTIOptionalValueProposed(index)} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField disabled inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField disabled inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={1}><IconButton onClick={() => this.handleDeleteLP(index)}><DeleteIcon /></IconButton></Grid>
                                            </Grid>)}

                                        <div className={classes.spacediv} />

                                        <Grid container style={{ position: "absolute", bottom: 10 }} justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Sub</Grid>
                                            <Grid item xs={2}>{this.getsubtotalLP()}</Grid>
                                            <Grid item xs={2}>101,850</Grid>
                                            <Grid item xs={2}>133%</Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <div className={classes.spacediv} />

                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <p className={classes.subtitle}>Sign Ons</p>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>

                            <Divider />
                            <Grid container alignItems="center">
                                <Grid item xs={6} style={{ height: "100%" }}>
                                    <Paper style={{ height: "100%", position: "relative" }}>
                                        <p className={classes.subtitle}>Current</p>
                                        <Grid container justify="space-evenly">
                                            <Grid item xs={3}>Currency</Grid>
                                            <Grid item xs={2}>USD</Grid>
                                            <Grid item xs={2}>{this.state.currency}</Grid>
                                            <Grid item xs={1}><IconButton onClick={this.handleAddSOC}><AddIcon /></IconButton></Grid>
                                        </Grid>

                                        {this.state.current_data.sign_on.optional.map((item: NameValue, index) =>
                                            <Grid container justify="space-evenly" alignItems="center">
                                                <Grid item xs={3}><TextField value={this.state.current_data.sign_on.optional[index].name} onChange={this.handleChangeSignOnOptionalNameCurrent(index)} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField value={this.state.current_data.sign_on.optional[index].value} onChange={this.handleChangeSignOnOptionalValueCurrent(index)} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField disabled inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={1}><IconButton onClick={() => this.handleDeleteSOC(index)}><DeleteIcon /></IconButton></Grid>
                                            </Grid>)}

                                        <div className={classes.spacediv} />
                                        <Grid container style={{ position: "absolute", bottom: 10 }} justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Sub</Grid>
                                            <Grid item xs={2}>{this.getsubtotalSOC()}</Grid>
                                            <Grid item xs={2}>101,850</Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} style={{ height: "100%" }}>
                                    <Paper style={{ height: "100%", position: "relative" }}>
                                        <p className={classes.subtitle}>Propose</p>
                                        <Grid container justify="space-evenly">
                                            <Grid item xs={3}>Currency</Grid>
                                            <Grid item xs={2}>USD</Grid>
                                            <Grid item xs={2}>{this.state.currency}</Grid>
                                            <Grid item xs={2}>Difference</Grid>
                                            <Grid item xs={1}><IconButton onClick={this.handleAddSOP}><AddIcon /></IconButton></Grid>
                                        </Grid>

                                        {this.state.propose_data.sign_on.optional.map((item: NameValue, index) =>
                                            <Grid container justify="space-evenly" alignItems="center">
                                                <Grid item xs={3}><TextField value={this.state.propose_data.sign_on.optional[index].name} onChange={this.handleChangeSignOnOptionalNameProposed(index)} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField value={this.state.propose_data.sign_on.optional[index].value} onChange={this.handleChangeSignOnOptionalValueProposed(index)} inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField disabled inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField disabled inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={1}><IconButton onClick={() => this.handleDeleteSOP(index)}><DeleteIcon /></IconButton></Grid>
                                            </Grid>)}

                                        <div className={classes.spacediv} />

                                        <Grid container style={{ position: "absolute", bottom: 10 }} justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Sub</Grid>
                                            <Grid item xs={2}>{this.getsubtotalSOP}</Grid>
                                            <Grid item xs={2}>101,850</Grid>
                                            <Grid item xs={2}>133%</Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <div className={classes.spacediv} />

                    <Paper className={classes.colorcontainer}>
                        <Grid container alignItems="center">
                            <Grid item xs={1} />
                            <Grid item xs={11}>
                                <Grid container justify="space-evenly" alignItems="center">
                                    <Grid item xs={3}>Cash Total</Grid>
                                    <Grid item xs={1}>{this.getsubtotalGC() + this.getsubtotalSC() + this.getsubtotalLC() + this.getsubtotalSOC()}</Grid>
                                    <Grid item xs={1}>118,850</Grid>
                                    <Grid item xs={1}>{this.getsubtotalGP() + this.getsubtotalSP() + this.getsubtotalLP() + this.getsubtotalSOP()}</Grid>
                                    <Grid item xs={1}>159,000</Grid>
                                    <Grid item xs={2}>135%</Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>

                    <div className={classes.spacediv} />
                    <div className={classes.spacediv} />

                    <Paper className={classes.paper}>
                        <Grid container alignItems="center" justify="center">
                            <Grid item xs={4}>Internal Promotion</Grid>
                            <Grid item xs={2}>Buy {this.state.currency}</Grid>
                            <Grid item xs={2}>0.15</Grid>
                        </Grid>
                        <Grid container alignItems="center" justify="center">
                            <Grid item xs={4}>Comparator Data</Grid>
                            <Grid item xs={2}>27</Grid>
                        </Grid>
                        <Divider />
                        <div className={classes.spacediv} />

                        <Grid container alignItems="center">
                            <Grid item xs={1}>
                                <p style={{ transform: 'rotate(0.75turn)', width: "100%" }}>Internal</p>
                            </Grid>
                            <Grid item xs={11}>
                                <Grid container justify="space-evenly" alignItems="center">
                                    <Grid item xs={3}> </Grid>
                                    <Grid item xs={2}>Min</Grid>
                                    <Grid item xs={2}>Medium</Grid>
                                    <Grid item xs={2}>Max</Grid>
                                    <Grid item xs={2}>Datapoint</Grid>
                                </Grid>
                                <Grid container justify="space-evenly" alignItems="center">
                                    <Grid item xs={3}>Salary Range</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.intSalaryRange.min}</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.intSalaryRange.mid}</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.intSalaryRange.max}</Grid>
                                    <Grid item xs={2}> </Grid>
                                </Grid>
                                <Grid container justify="space-evenly" alignItems="center">
                                    <Grid item xs={3}>Payroll Spread Grade</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.intPayrollSpread.grade.min}</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.intPayrollSpread.grade.median}</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.intPayrollSpread.grade.max}</Grid>
                                    <Grid item xs={2}>32</Grid>
                                </Grid>
                                <Grid container justify="space-evenly" alignItems="center">
                                    <Grid item xs={3}>Payroll Spread Functional</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.intPayrollSpread.function.min}</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.intPayrollSpread.function.median}</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.intPayrollSpread.function.max}</Grid>
                                    <Grid item xs={2}> </Grid>
                                </Grid>
                            </Grid>
                        </Grid>


                        <div className={classes.spacediv} />

                        <Grid container alignItems="center">
                            <Grid item xs={1}>
                                <p style={{ transform: 'rotate(0.75turn)', width: "100%" }}>External</p>
                            </Grid>
                            <Grid item xs={11}>
                                <Grid container justify="space-evenly" alignItems="center">
                                    <Grid item xs={3}> </Grid>
                                    <Grid item xs={2}>P 25</Grid>
                                    <Grid item xs={2}>P 50</Grid>
                                    <Grid item xs={2}>P 75</Grid>
                                    <Grid item xs={2}> </Grid>
                                </Grid>
                                <Grid container justify="space-evenly" alignItems="center">
                                    <Grid item xs={3}>Market Grade</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.extMarketData.grade.p25}</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.extMarketData.grade.p50}</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.extMarketData.grade.p75}</Grid>
                                    <Grid item xs={2}> </Grid>
                                </Grid>
                                <Grid container justify="space-evenly" alignItems="center">
                                    <Grid item xs={3}>Market Functional</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.extMarketData.function.p25}</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.extMarketData.function.p50}</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.extMarketData.function.p75}</Grid>
                                    <Grid item xs={2}>32</Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <div className={classes.spacediv} />

                        <Grid container alignItems="center">
                            <Grid item xs={1}>
                            </Grid>
                            <Grid item xs={11}>
                                <Grid container justify="space-evenly" alignItems="center">
                                    <Grid item xs={3}>Equity Range</Grid>
                                    <Grid item xs={2}>Min</Grid>
                                    <Grid item xs={2}>Median</Grid>
                                    <Grid item xs={2}>Max</Grid>
                                </Grid>
                                <Grid container justify="space-evenly" alignItems="center">
                                    <Grid item xs={3}>Annual</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.equityRange.annualGrant.min}</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.equityRange.annualGrant.mid}</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.equityRange.annualGrant.max}</Grid>
                                </Grid>
                                <Grid container justify="space-evenly" alignItems="center">
                                    <Grid item xs={3}>New Hire</Grid>
                                    <Grid item xs={2}>36,000</Grid>
                                    <Grid item xs={2}>70,000</Grid>
                                    <Grid item xs={2}>105,000</Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Paper>
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
                            style={{ marginLeft: "auto" }}
                        >
                            Save
            </Button>
                        <Button
                            variant="contained"
                            color="primary"
                        >
                            Submit
            </Button>
                    </div>

                </Grid>

            </Grid>
        );
    }
}

(OfferModelPage as React.ComponentClass<Props>).propTypes = {
    classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
    return {
        selectedCompany: state.companyReducer.selectedCompany,
        selectedJobPosition: state.jobPositionReducer.selectedJobPosition,
        session_key: state.authenticationReducer.token,
        stiList:state.shortIncentiveReducer.shortincentiveList,
        ltiList:state.longIncentiveReducer.longincentiveList,
        signonList:state.signonsReducer.signonsList,
        targetbonusList:state.targetBonusReducer.targetbonusList,
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(OfferModelPage));
