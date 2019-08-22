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
import jsPDF from "jspdf";
import { renderToString } from "react-dom/server";

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
        main_paper: {
            height: '100%',
            padding: 30,
            textAlign: 'left'
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
        gridMargin: {
            marginTop: 20,
        }
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

    componentDidMount = async () => {

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

        const handleCreatePDF = () => {

            const pdfstring = renderToString(<ToPDF />);
            const pdf = new jsPDF("p", "mm", "a4");
            pdf.fromHTML(pdfstring);
            pdf.save("pdf");
        };

        const ToPDF = () => (
            <Grid container>
                <Grid item xs={8}>
                    <Paper className={classes.main_paper}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Offer Sheet
                        </Typography>

                    <Grid className={classes.gridMargin} container justify="space-evenly" alignItems="center">
                        <Grid item xs={2}>Name</Grid>
                        <Grid item xs={4}>{this.state.candidate_name}</Grid>
                        <Grid item xs={2}>Country</Grid>
                        <Grid item xs={4}>{this.state.current_position_country}</Grid>
                    </Grid>

                    <Grid className={classes.gridMargin} container justify="space-evenly" alignItems="center">
                        <Grid item xs={2}>Title</Grid>
                        <Grid item xs={4}>{this.state.current_position_title}</Grid>
                        <Grid item xs={2}>Divition</Grid>
                        <Grid item xs={4}>{this.state.current_position_jobfunction}</Grid>
                    </Grid>

                    <Grid className={classes.gridMargin} container justify="space-evenly" alignItems="center">
                        <Grid item xs={2}>Grade</Grid>
                        <Grid item xs={4}>{this.state.current_position_grade}</Grid>
                        <Grid item xs={2}>Region</Grid>
                        <Grid item xs={4}>{this.state.current_position_location}</Grid>
                    </Grid>

                    <Grid className={classes.gridMargin} container justify="space-evenly" alignItems="center">
                        <Grid item xs={2}>Hire Date</Grid>
                        <Grid item xs={4}>{this.state.propose_position_datestart}</Grid>
                        <Grid item xs={2}>Legal Entity</Grid>
                        <Grid item xs={4}>{}</Grid>
                    </Grid>

                    <Grid className={classes.gridMargin} container justify="space-evenly" alignItems="center">
                        <Grid item xs={2}>Function</Grid>
                        <Grid item xs={4}>{this.state.current_position_jobfunction}</Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={4}>{}</Grid>
                    </Grid>

                    <div className={classes.spacediv} />

                    <Typography>Cash Compensation</Typography>


                    <Grid style={{ width: '100%' }} alignItems="center" justify="space-evenly" direction="row">
                        <Grid container>
                            <Grid item xs={4}>Annual Base Salary</Grid>
                            <Grid item xs={8}>{this.state.propose_data.guaranteed_cash.annual_base}</Grid>
                        </Grid>
                        {this.state.propose_data.guaranteed_cash.optional.map((item: NameValue, index) =>
                            <Grid key={'gc' + index} container>
                                <Grid item xs={4}>{item.name}</Grid>
                                <Grid item xs={8}>{item.value}</Grid>
                            </Grid>
                        )}
                        <Grid container>
                            <Grid item xs={4}>Guaranteed Cash</Grid>
                            <Grid item xs={8}>{this.getsubtotalGP()}</Grid>
                        </Grid>
                    </Grid>

                    <div className={classes.spacediv} />

                    <Typography>Short Term Incentive</Typography>


                    <Grid style={{ width: '100%' }} alignItems="center" justify="space-evenly" direction="row">
                        <Grid container>
                            <Grid item xs={4}>Bonus Target %</Grid>
                            <Grid item xs={8}>{this.state.propose_data.sti.bonus_target}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4}>Bonus Target Amount</Grid>
                            <Grid item xs={8}>{this.state.propose_data.sti.bonus_target_amount}</Grid>
                        </Grid>
                        {this.state.propose_data.sti.optional.map((item: NameValue, index) =>
                            <Grid key={'gc' + index} container>
                                <Grid item xs={4}>{item.name}</Grid>
                                <Grid item xs={8}>{item.value}</Grid>
                            </Grid>
                        )}
                        <Grid container>
                            <Grid item xs={4}>Total Target Cash</Grid>
                            <Grid item xs={8}>{this.getsubtotalSP()}</Grid>
                        </Grid>
                    </Grid>

                    <div className={classes.spacediv} />

                    <Typography>Long Term Incentive</Typography>


                    <Grid style={{ width: '100%' }} alignItems="center" justify="space-evenly" direction="row">
                        {this.state.propose_data.lti.optional.map((item: NameValue, index) =>
                            <Grid key={'gc' + index} container>
                                <Grid item xs={4}>{item.name}</Grid>
                                <Grid item xs={8}>{item.value}</Grid>
                            </Grid>
                        )}
                    </Grid>

                    <div className={classes.spacediv} />

                    <Typography>Sign On</Typography>


                    <Grid style={{ width: '100%' }} alignItems="center" justify="space-evenly" direction="row">
                        {this.state.propose_data.sti.optional.map((item: NameValue, index) =>
                            <Grid key={'gc' + index} container>
                                <Grid item xs={4}>{item.name}</Grid>
                                <Grid item xs={8}>{item.value}</Grid>
                            </Grid>
                        )}
                        <Grid container>
                            <Grid item xs={4}>Total Compensation Offer</Grid>
                            <Grid item xs={8}>{this.getsubtotalSP()}</Grid>
                        </Grid>
                    </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={4}>

                </Grid>
            </Grid>
        )
        return (
            <Grid container direction="row" spacing={16} className={classes.root}>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginLeft: "auto" }}
                        onClick={() => handleCreatePDF()}
                    >
                        Generate PDF
                    </Button>
                </Grid>
                <ToPDF/>
                <div
                    style={{
                        display: "flex",
                        paddingTop: "1rem"
                    }}
                >

                </div>

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
