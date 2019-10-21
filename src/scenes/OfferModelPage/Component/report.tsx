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
import html2canvas from "html2canvas";
import { renderToString } from "react-dom/server";
import { history } from "../../../store";


const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            fontSize: 13,
        },
        title: {
            fontSize: 16,
            fontWeight: 'bold'
        },
        subtitle: {
            fontSize: 14,
            color: '#f44336',
            fontWeight: 'bold',
            marginBottom: '1rem'
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
            textAlign: 'left',
            fontSize: 12
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
            borderStyle: "solid",
            padding: '0.3rem',
            marginTop: '1rem'
        },
        verticaltext: {
            transform: 'rotate(0.5turn)'
        },
        textField: {
        },
        gridMargin: {
            marginTop: 10,
        }
    });

interface Props extends InState, WithStyles<typeof styles> { }

interface InState {
    selectedJobPosition: JobPosition;
    selectedOfferModel: OfferModel;
    currencyList: Currency[];
    session_key: string;
    selectedCompany: Company;
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
            offermodel_id: this.props.selectedOfferModel.offermodel_id,
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

            //const pdfstring = renderToString(<ToPDF />);
            const input = document.getElementById('divToPrint');
            //const pdfdata = html2canvas(input);
            //const pdf = new jsPDF("p", "mm", "a4");
            //console.log(pdfstring);
            //pdf.fromHTML(pdfstring);
            //pdf.save("pdf");
            html2canvas(input,  {
                scale: 2
                })
            .then((canvas) => {
              const imgData = canvas.toDataURL('image/png');
              const pdf = new jsPDF("p", "mm", "a4");
              var width = pdf.internal.pageSize.getWidth();
              var height = pdf.internal.pageSize.getHeight();
              pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
              // pdf.output('dataurlnewwindow');
              pdf.save("download.pdf");
            })
          ;
        };

        const ToPDF = () => (           
            <Grid container style={{ width: '100%', height:'100%' }} >               
                <Grid item xs={12}>
                    <Paper className={classes.main_paper}>
                        {this.props.selectedCompany.logo_small !== "" && (
                        <img
                            alt="company small logo"
                            style={{ width: "40px", marginRight: "1rem" }}
                            src={this.props.selectedCompany.logo_small}
                        />)}

                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Offer Sheet
                        </Typography>

                    <Grid className={classes.gridMargin} container justify="space-evenly" alignItems="center">
                        <Grid item xs={2}>Name:</Grid>
                        <Grid item xs={4}>{this.state.candidate_name}</Grid>
                        <Grid item xs={2}>Reference No:</Grid>
                        <Grid item xs={4}>{this.state.offer_reference}</Grid>
                    </Grid>

                    <Grid className={classes.gridMargin} container justify="space-evenly" alignItems="center">
                        <Grid item xs={2}>Business Title:</Grid>
                        <Grid item xs={4}>{this.state.current_position_title}</Grid>
                        <Grid item xs={2}>Division</Grid>
                        <Grid item xs={4}>{this.state.current_position_jobfunction}</Grid>
                    </Grid>

                    <Grid className={classes.gridMargin} container justify="space-evenly" alignItems="center">
                        <Grid item xs={2}>Grade:</Grid>
                        <Grid item xs={4}>{this.state.current_position_grade}</Grid>
                        <Grid item xs={2}>Region:</Grid>
                        <Grid item xs={4}>{this.state.current_position_location}</Grid>
                    </Grid>

                    <Grid className={classes.gridMargin} container justify="space-evenly" alignItems="center">
                        <Grid item xs={2}>Hire Date:</Grid>
                        <Grid item xs={4}>{this.state.propose_position_datestart}</Grid>
                        <Grid item xs={2}>Legal Entity:</Grid>
                        <Grid item xs={4}>{}</Grid>
                    </Grid>

                    <Grid className={classes.gridMargin} container justify="space-evenly" alignItems="center">
                        <Grid item xs={2}>Function:</Grid>
                        <Grid item xs={4}>{this.state.current_position_jobfunction}</Grid>
                        <Grid item xs={2}>Country:</Grid>
                        <Grid item xs={4}>{this.state.current_position_country}</Grid>
                    </Grid>

                    <div className={classes.spacediv} />

                    <Typography className={classes.subtitle}>Cash Compensation</Typography>


                    <Grid style={{ width: '100%' }} alignItems="center" justify="space-evenly" direction="row">
                        <Grid container>
                            <Grid item xs={4}>Annual Base Salary</Grid>
                            <Grid item xs={8}>{parseInt(this.state.propose_data.guaranteed_cash.annual_base).toLocaleString(navigator.language, { maximumFractionDigits: 0 })}</Grid>
                        </Grid>
                        {this.state.propose_data.guaranteed_cash.optional.map((item: NameValue, index) =>
                            <Grid key={'gc' + index} container>
                                <Grid item xs={4}>{item.name}</Grid>
                                <Grid item xs={8}>{parseInt(item.value).toLocaleString(navigator.language, { maximumFractionDigits: 0 })}</Grid>
                            </Grid>
                        )}
                        <Grid container className={classes.colorcontainer}>
                            <Grid item xs={4}>Guaranteed Cash</Grid>
                            <Grid item xs={8}>{this.getsubtotalGP().toLocaleString(navigator.language, { maximumFractionDigits: 0 })}</Grid>
                        </Grid>
                    </Grid>

                    <div className={classes.spacediv} />

                    <Typography className={classes.subtitle}>Short Term Incentive</Typography>


                    <Grid style={{ width: '100%' }} alignItems="center" justify="space-evenly" direction="row">
                        <Grid container>
                            <Grid item xs={4}>Bonus Target %</Grid>
                            <Grid item xs={8}>{this.state.propose_data.sti.bonus_target}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4}>Bonus Target Amount</Grid>
                            <Grid item xs={8}>{parseInt(this.state.propose_data.sti.bonus_target_amount).toLocaleString(navigator.language, { maximumFractionDigits: 0 })}</Grid>
                        </Grid>
                        {this.state.propose_data.sti.optional.map((item: NameValue, index) =>
                            <Grid key={'gc' + index} container>
                                <Grid item xs={4}>{item.name}</Grid>
                                <Grid item xs={8}>{parseInt(item.value).toLocaleString(navigator.language, { maximumFractionDigits: 0 })}</Grid>
                            </Grid>
                        )}
                        <Grid container className={classes.colorcontainer}>
                            <Grid item xs={4}>Total Target Cash</Grid>
                            <Grid item xs={8}>{(this.getsubtotalGP() + this.getsubtotalSP()).toLocaleString(navigator.language, { maximumFractionDigits: 0 })}</Grid>
                        </Grid>
                    </Grid>

                    <div className={classes.spacediv} />

                    <Typography className={classes.subtitle}>Long Term Incentive</Typography>


                    <Grid style={{ width: '100%' }} alignItems="center" justify="space-evenly" direction="row">
                        {this.state.propose_data.lti.optional.map((item: NameValue, index) =>
                            <Grid key={'gc' + index} container>
                                <Grid item xs={4}>{item.name}</Grid>
                                <Grid item xs={8}>{parseInt(item.value).toLocaleString(navigator.language, { maximumFractionDigits: 0 })}</Grid>
                            </Grid>
                        )}
                    </Grid>

                    <div className={classes.spacediv} />

                    <Typography className={classes.subtitle}>Sign On</Typography>


                    <Grid style={{ width: '100%' }} alignItems="center" justify="space-evenly" direction="row">
                        {this.state.propose_data.sign_on.optional.map((item: NameValue, index) =>
                            <Grid key={'gc' + index} container>
                                <Grid item xs={4}>{item.name}</Grid>
                                <Grid item xs={8}>{parseInt(item.value).toLocaleString(navigator.language, { maximumFractionDigits: 0 })}</Grid>
                            </Grid>
                        )}
                        <Grid container className={classes.colorcontainer}>
                            <Grid item xs={4}>Total Compensation Offer</Grid>
                            <Grid item xs={8}>{(this.getsubtotalGP() + this.getsubtotalSP() + this.getsubtotalLP() + this.getsubtotalSOP()).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</Grid>
                        </Grid>
                    </Grid>
                    </Paper>
                </Grid>                
            </Grid>
        )
        return (
            <Grid container direction="row" spacing={16} className={classes.root}>
                <Grid container>
                <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="flex-end"
                    spacing={16}
                    >
                        <Grid item xs={12}>
                        <Button
                        variant="contained"                       
                        color="primary"
                        style={{ marginBottom: "1rem", marginRight:"1rem" }}
                        onClick={() => history.push("/jobposition/offermodel/update")}
                        >
                            Back to Offer
                        </Button>
                        <Button
                        variant="contained"                       
                        color="primary"
                        style={{ marginBottom: "1rem", marginRight:"1rem" }}
                        onClick={() => handleCreatePDF()}
                        >
                            Generate PDF
                        </Button>
                        </Grid>
                </Grid>                   
                </Grid>
                <div id="divToPrint" style={{
                    backgroundColor: '#f5f5f5',
                    width: '160mm',
                    minHeight: '200mm'
                }}>
                <ToPDF/>
                </div>
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
        selectedOfferModel: state.offerModelReducer.selectedOfferModel,
        selectedJobPosition: state.jobPositionReducer.selectedJobPosition,
        selectedCompany: state.companyReducer.selectedCompany
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(OfferModelPage));
