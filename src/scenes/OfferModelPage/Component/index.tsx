import React from "react";
import PropTypes from "prop-types";
import { Grid, Theme, createStyles, Paper, WithStyles, withStyles, Divider, TextField, Typography, IconButton, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Button, InputAdornment, NativeSelect, Toolbar } from "@material-ui/core";
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
import { Currency, Country } from "../../../interface/countryInterface";
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import SaveModelButton from './sactionButton';
import { history } from "../../../store";
import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import AppBar from '@material-ui/core/AppBar';
import { Prompt } from "react-router";
import Select from '@material-ui/core/Select';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            fontSize: 13,
        },
        title: {
            fontSize: 24,
            color: '#f44336',
            fontWeight: 'bold'
        },
        bartitle: {
            fontSize: 24,
            color: '#ffffff',
            fontWeight: 'bold',
            alignSelf: 'right'
        },
        subtitle: {
            fontWeight: 'bold'
        },
        status: {
            fontSize: 12,
            fontWeight: 'bold',
            marginBottom: '0.3rem',
        },
        paper_header: {
            padding: 15,
            marginBottom: '1.5rem',
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
        enddiv: {
            height: 50
        },
        spaceline:{
            marginTop: "1.5rem",
            marginBottom: "1rem",
            backgroundColor: "#f44336",
            height: 1
        },
        container: {
            borderRadius: 4,
            borderWidth: 0.5,
            borderStyle: "solid"
        },
        colorcontainer: {
            background: '#696969',
            color: '#fff',
            padding: '0.5rem'
        },
        verticaltext: {
            transform: 'rotate(0.5turn)'
        },
        textField: {
        },
        field_label: {
            fontSize: 12,
        },
        field_data: {
            fontSize: 14,
            fontWeight: 'bold',
            marginBottom: '1rem',
            width: 200
        },
        field_data_full: {
            fontSize: 14,
            fontWeight: 'bold',
            marginBottom: '1rem',
            width: '100%'
        },
        field_data_view: {
            fontSize: 14,
            fontWeight: 'bold',
            marginTop: '0.4rem',
            marginBottom: '1rem',
            width: 200
        },
        field_section: {
            fontSize: 14,
            fontWeight: 'bold',
            color: '#f44336',
        },
        appBar: {
            top: 'auto',
            bottom: 0,
            backgroundColor:'#f5f5f5',
            alignContent:'right'
        }
    });

interface Props extends InState, WithStyles<typeof styles> { }

interface InState {
    create: boolean;
    updateData: any;
    onSubmit: Function;
    onGenerate: Function;
    onContract: Function;
    onClose: Function;
    session_key: string;
    selectedCompany: Company;
    selectedJobPosition: JobPosition;
    stiList: ShortIncentive[];
    ltiList: LongIncentive[];
    signonList: Signons[];
    allowancesList: Allowances[];
    currencyList: Currency[];
    countryList: Country[];
}

interface State {
    currency: string;
    currency1: string;
    currency2: string;
    jobposition_id: string;
    created_by: string;
    candidate_name: string;
    gender: string;
    business_unit: string;
    note: string;
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
    comparator_data: ComparatorData;
    unsaveData: Boolean;
}

interface ComparatorData {
    company_id: string,
    company_name: string,
    intSalaryRange: any,
    intPayrollSpread: any,
    extMarketData: any,
    equityRange: any[]
}

class OfferModelPage extends React.Component<Props, State> {
    state = {
        jobposition_id: "",
        created_by: "user.master@mail.com",
        candidate_name: "",
        gender: "",
        business_unit: "",
        note: "",
        job_flag: "",
        model_type: "",
        year_of_birth: "",
        offer_reference: "NEW",
        jobgrade_id: "",
        status: "Draft",
        currency: "USD",
        currency1: "",
        currency2: "",
        current_position_title: "",
        current_position_country: "",
        current_position_location: "",
        current_position_grade: "",
        current_position_datestart: "2015-01-01",
        current_position_jobfunction: "",
        current_position_sjobfunction: "",
        propose_position_datestart: "2019-01-01",
        unsaveData: false,
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
                    median: 57800,
                    data_points: 6
                },
                function: {
                    min: 46700,
                    max: 65000,
                    median: 52150,
                    data_points: 2
                }
            },
            extMarketData: {
                grade: {
                    p25: 65000,
                    p50: 69000,
                    p75: 71000,
                    data_points: 2
                },
                function: {
                    p25: null,
                    p50: null,
                    p75: null,
                    data_points: 0
                }
            },
            equityRange: [
                {
                    longterm_incentive_id: 22,
                    type: "Annual Grant",
                    min: "20000",
                    mid: "50000",
                    max: "100000"
                },
                {
                    longterm_incentive_id: 30,
                    type: "New Hire",
                    min: "80000",
                    mid: "90000",
                    max: " 100000"
                }
            ]
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
        let c = this.getCurrencyByCountry(this.props.selectedJobPosition.country)
        let c2 = this.getCurrencyByCountry(this.props.selectedJobPosition.country)
        console.log("set currency 2");
        console.log(c2);
        if (this.props.create) {
            this.setState({
                jobgrade_id: this.props.selectedJobPosition.jobgrade_name,
                jobposition_id: this.props.selectedJobPosition.jobposition_id,
                currency: c,
                currency2: c2
            })
        }
        else {
            this.setState(this.props.updateData)
        }
        const data = {
            country: this.props.selectedJobPosition.country,
            session_key: this.props.session_key,
            jobgrade_id: this.props.selectedJobPosition.jobgrade_id,
            jobfunction_id: this.props.selectedJobPosition.jobfunction,
            company_id: this.props.selectedCompany.company_id
        }

        const response = await $axios.post('/job/getComparatorData', data)
        console.dir("Get Comparator Data")
        console.dir(response)
        this.setState({ comparator_data: response.data.data })

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

    getCurrencyDiff = (main) => {
        let mainratio = this.getCurrencyRatio(this.state.currency2)
        let subratio = this.getCurrencyRatio(this.state.currency)
        console.log("Convert Currency");
        console.log(main);
        console.log(mainratio);
        console.log(subratio);

        let result = (main / parseFloat(mainratio) * parseFloat(subratio));
        console.log(result);
        return result
    }

    getCurrency1 = (main) => {
        let mainratio = this.getCurrencyRatio(this.state.currency)
        let subratio = this.getCurrencyRatio(this.state.currency1)

        return (main / parseFloat(mainratio) * parseFloat(subratio)).toLocaleString(navigator.language, { maximumFractionDigits: 0 })
    }

    getCurrency2 = (main) => {
        let mainratio = this.getCurrencyRatio(this.state.currency2)
        let subratio = this.getCurrencyRatio(this.state.currency1)

        return (main / parseFloat(mainratio) * parseFloat(subratio)).toLocaleString(navigator.language, { maximumFractionDigits: 0 })
    }

    checkNan = (main) =>{
        if((isNaN(main)) || (!isFinite(main)))
        {
            return 0;
        }
        else
        {
            return main;
        }
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

    handleChangeSelectPick = (statekay: keyof State) => (
        event: React.ChangeEvent<HTMLSelectElement>
      ) => {
        this.setState(({ [statekay]: event.target.value } as unknown) as Pick<
            State,
          keyof State
        >);
    };

    handleChange = (statekay: keyof State) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        this.state.unsaveData = true;
        this.setState({ [statekay]: event.target.value } as any);
    };

    handleChangeSelect = (statekay: keyof State) => (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        this.state.unsaveData = true;
        this.setState({ [statekay]: event.target.value } as any);
    };

    handleChangeAnnualBaseCurrent = (event) => {
        const gc = { ...this.state.current_data }
        gc.guaranteed_cash.annual_base = event.target.value
        gc.sti.bonus_target = (parseInt(this.state.current_data.sti.bonus_target_amount) / event.target.value * 100).toFixed(2).toString()
        this.state.unsaveData = true;
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
        gc.sti.bonus_target_amount = (event.target.value * parseInt(this.state.current_data.guaranteed_cash.annual_base) / 100).toFixed(0).toString()
        this.setState({ current_data: gc })
    }

    handleChangeBonusTargetAmountCurrent = (event) => {
        const gc = { ...this.state.current_data }
        gc.sti.bonus_target_amount = event.target.value
        gc.sti.bonus_target = (event.target.value / parseInt(this.state.current_data.guaranteed_cash.annual_base) * 100).toFixed(0).toString()
        this.setState({ current_data: gc })
    }

    handleChangeBonusTargetProposed = (event) => {
        const gc = { ...this.state.propose_data }
        gc.sti.bonus_target = event.target.value
        gc.sti.bonus_target_amount = (event.target.value * parseInt(this.state.propose_data.guaranteed_cash.annual_base) / 100).toFixed(0).toString()
        this.setState({ propose_data: gc })
    }

    handleChangeBonusTargetAmountProposed = (event) => {
        const gc = { ...this.state.propose_data }
        gc.sti.bonus_target_amount = event.target.value
        gc.sti.bonus_target = (event.target.value / parseInt(this.state.propose_data.guaranteed_cash.annual_base) * 100).toFixed(0).toString()
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

    handleSubmit = () => {
        // this.setState({ status: "Generated" })
        let send = {
            ...this.state,
            status: "Generated"
        }       
        this.props.onSubmit(send)
    }

    private fields: Object = { text: 'name', value: 'id' };

    gCashtypeTypes() {
        const type = []
        
        this.props.allowancesList.filter(al => (al.country === this.props.selectedJobPosition.country && al.jobgrade_name === this.props.selectedJobPosition.jobgrade_name)).forEach(element => {
            let newItem: { [key: string]: Object; } = {'name': element.type, 'id': element.allowance_id };
            type.push(newItem)
        });
        console.log(type);
        return type;

    };

    sTermtypeTypes() {
        const type = []
        
        this.props.stiList.filter(sti => (((sti.country === this.props.selectedJobPosition.country) || (sti.country === "Global")) && sti.jobgrade_name === this.props.selectedJobPosition.jobgrade_name)).forEach(element => {
            let newItem: { [key: string]: Object; } = {'name': element.type, 'id': element.shortterm_incentive_id };
            type.push(newItem)
        });
        console.log(type);
        return type;

    };

    
    lTermtypeTypes() {
        const type = []
        
        this.props.ltiList.filter(lti => (lti.country === this.props.selectedJobPosition.country && lti.job_grade === this.props.selectedJobPosition.jobgrade_name)).forEach(element => {
        //this.props.ltiList.forEach(element => {
            let newItem: { [key: string]: Object; } = {'name': element.type, 'id': element.longterm_incentive_id };
            type.push(newItem)
        });
        console.log(type);
        return type;

    };

    sOnstypeTypes() {
        const type = []
        
        this.props.signonList.forEach(element => {
            let newItem: { [key: string]: Object; } = {'name': element.type, 'id': element.signons_id };
            type.push(newItem)
        });
        console.log(type);
        return type;

    };

    handleChangeGCOptionalNameProposed = (index) => (event) => {
        try{
            console.log("handleChangeGCOptionalNameProposed");
            console.log(event.value);
            const gc = { ...this.state.propose_data }
            gc.guaranteed_cash.optional[index].name = event.value
            let result = this.props.allowancesList.find(e => {
                return e.allowance_id === event.value
            })
            if(result.value_type === "Fixed")
            {
                gc.guaranteed_cash.optional[index].value = result.value
            }
            else
            {
                gc.guaranteed_cash.optional[index].value = (parseInt(result.value) * parseInt(this.state.propose_data.guaranteed_cash.annual_base) / 100).toFixed(0)
            }
            this.setState({ propose_data: gc })
        }catch(e){
            console.log('error', e);        
        }
    }

    handleChangeSTIOptionalNameProposed = (index) => (event) => {
        try{
            const gc = { ...this.state.propose_data }
            gc.sti.optional[index].name = event.value
            let result = this.props.stiList.find(e => {
                return e.shortterm_incentive_id === event.value
            })
            if(result.value_type === "Fixed")
            {
                gc.sti.optional[index].value = result.value
            }
            else
            {
                gc.sti.optional[index].value = (parseInt(result.value) * parseInt(this.state.propose_data.guaranteed_cash.annual_base) / 100).toFixed(0)
            }
            this.setState({ propose_data: gc })
        }catch(e){
            console.log('error', e);        
        }
    }

    handleChangeLTIOptionalNameProposed = (index) => (event) => {
        try{
            const gc = { ...this.state.propose_data }
            gc.lti.optional[index].name = event.value
            let result = this.props.ltiList.find(e => {
                return e.longterm_incentive_id === event.value
            })
            //TO DO (UNKNOWN)
            //gc.lti.optional[index].value = result.value
            this.setState({ propose_data: gc })
        }catch(e){
            console.log('error', e);        
        }
    }

    handleChangeSignOnOptionalNameProposed = (index) => (event) => {
        try{
            const gc = { ...this.state.propose_data }
            gc.sign_on.optional[index].name = event.value
            let result = this.props.signonList.find(e => {
                return e.signons_id === event.value
            })
            gc.sign_on.optional[index].value = result.value
            this.setState({ propose_data: gc })
        }catch(e){
            console.log('error', e);        
        }
    }

    render() {
        const { classes } = this.props;
        const that = this;  

        const selectStyles = {
            input: base => ({
                ...base,
                color: theme.palette.text.primary,
                '& input': {
                    font: 'inherit',
                },
            }),
        };

        const saveFunction = (): any => {
            let saveFunction = (
                <Button
                        variant="contained"                       
                        color="primary"
                        style={{ marginRight:"0.5rem" }}
                        onClick={() => {
                            if(this.state.candidate_name != "") {
                                this.setState({
                                    unsaveData:false 
                                },() => {
                                    this.props.onSubmit(this.state);    
                                });                                                      
                            }
                        }}
                        >
                            Save
                </Button>
            );
      
            if ((this.state.status === 'Draft') || (this.state.status === 'In Progress')) {
                return saveFunction;
            } else return "";
        };

        const closeFunction = (): any => {
            let closebutton = (
                <Button
                        variant="contained"                       
                        color="secondary"
                        style={{ marginLeft:"0.5rem" }}
                        onClick={e =>
                            window.confirm("Are you sure you wish to close this offer?") &&
                            this.props.onClose(this.state)}
                        >
                            Close
                </Button>
            );
      
            if (this.state.status === 'In Progress') {
                return closebutton;
            } else return "";
        };

        const readonlyFunction = (): any => {     
            if ((this.state.status === 'Draft') || (this.state.status === 'In Progress')) {
                return false;
            } else return true;
        };


        let gCashtypeData: { [key: string]: Object }[] =that.gCashtypeTypes();
        let sTermtypeData: { [key: string]: Object }[] =that.sTermtypeTypes();
        let lTermtypeData: { [key: string]: Object }[] =that.lTermtypeTypes();
        let sOnstypeData: { [key: string]: Object }[] =that.sOnstypeTypes();

        return (
            <Grid container justify="flex-start" spacing={16}
            alignItems="flex-start" direction="row" className={classes.root}>  
                <Prompt
                when={this.state.unsaveData}
                message='You have unsaved changes, are you sure you want to leave?'
                />
                <Grid item xs={6}>
                    <Typography className={classes.status} color="textSecondary" gutterBottom>
                    {this.state.status} 
                    </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                    TOM Offer Modeler 
                    </Typography>
                </Grid>
                
                <Grid item xs={9}>
                    <Paper className={classes.paper_header} >
                    <Grid container>
                        <Grid item xs={4}>
                            <Typography className={classes.field_label}>
                            * Candidate Name
                            </Typography>
                            <TextField InputProps={{readOnly: readonlyFunction(),}} required className={classes.field_data} value={this.state.candidate_name} onChange={this.handleChange('candidate_name')}/>
                            <Typography className={classes.field_label}>
                            Modeller Type
                            </Typography>
                            <Select
                                className={classes.field_data} 
                                id="type"
                                value={this.state.model_type}
                                onChange={this.handleChangeSelect('model_type')}
                                inputProps={{
                                    name: "type",
                                    id: "type-simple",
                                    readOnly: readonlyFunction()
                                }}
                                >
                                <option value={undefined} />
                                <option value={'Promotion'} >Promotion</option>
                                <option value={'Transfer'} >Transfer</option>
                                <option value={'New'} >New</option>
                            </Select>
                            <Typography className={classes.field_label}>
                            Gender
                            </Typography>
                            <Select
                                className={classes.field_data} 
                                id="gender"
                                value={this.state.gender}
                                onChange={this.handleChangeSelect('gender')}
                                inputProps={{
                                    name: "gender",
                                    id: "gender-simple",
                                    readOnly: readonlyFunction()
                                }}
                            >
                                <option value={undefined} />
                                <option value={'Man'} >Man</option>
                                <option value={'Woman'} >Woman</option>
                                <option value={'Trans'} >Trans</option>
                            </Select>
                            <Typography className={classes.field_label}>
                            Compare Currency
                            </Typography>
                            <Select
                                className={classes.field_data} 
                                id="type"
                                value={this.state.currency1}
                                onChange={this.handleChangeSelect('currency1')}
                                inputProps={{
                                    name: "type",
                                    id: "type-simple",
                                    readOnly: readonlyFunction()
                                }}
                                >
                                <option value={undefined} />
                                {this.props.currencyList.map(currency => (
                                    <option value={currency.code}>{currency.country_name} ({currency.code})</option>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography className={classes.field_label}>
                            Job Flag
                            </Typography>
                            <Select
                                className={classes.field_data} 
                                id="flag"
                                value={this.state.job_flag}
                                onChange={this.handleChangeSelect('job_flag')}
                                inputProps={{
                                    name: "flag",
                                    id: "flag-simple",
                                    readOnly: readonlyFunction()
                                }}
                            >
                                <option value={undefined} />
                                <option value={'Critical'} >Critical</option>
                                <option value={'Business Driver'} >Business Driver</option>
                            </Select>
                            <Typography className={classes.field_label}>
                            Year of Birth
                            </Typography>
                            <TextField InputProps={{readOnly: readonlyFunction(),}} className={classes.field_data} type="date" value={this.state.year_of_birth} onChange={this.handleChange('year_of_birth')} /> 
                            <Typography className={classes.field_label}>
                            Business Unit
                            </Typography>
                            <TextField InputProps={{readOnly: readonlyFunction(),}} className={classes.field_data} value={this.state.business_unit} onChange={this.handleChange('business_unit')}/>                                                      
                        </Grid>
                        <Grid item xs={4}>
                        <Typography className={classes.field_label}>
                            Offer Reference
                            </Typography>
                            <Typography className={classes.field_data_view}>
                            {this.state.offer_reference}
                        </Typography>                           
                        <Typography className={classes.field_label}>
                                    Job Grade
                        </Typography>
                        <Typography className={classes.field_data_view}>
                            {this.state.jobgrade_id}
                        </Typography>
                        {/*<TextField className={classes.field_data} disabled value={this.state.jobgrade_id} onChange={this.handleChange('jobgrade_id')}/>*/}
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography className={classes.field_label}>
                            Note
                            </Typography>
                            <TextField InputProps={{readOnly: readonlyFunction(),}} className={classes.field_data_full} value={this.state.note} onChange={this.handleChange('note')}/>
                        </Grid>
                    </Grid>
                    </Paper>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.field_section}>
                            Position
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid style={{ width: '100%' }} direction="row">
                                <Grid container>
                                    <Grid item xs={2}><p className={classes.subtitle}>Status</p></Grid>
                                    <Grid item xs={5}><p className={classes.subtitle}>Current</p></Grid>
                                    <Grid item xs={5}><p className={classes.subtitle}>Propose</p></Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={2}><p className={classes.subtitle}>Title</p></Grid>
                                    <Grid item xs={5}>
                                        <TextField InputProps={{readOnly: readonlyFunction(),}} className={classes.field_data}
                                            value={this.state.current_position_title} onChange={this.handleChange('current_position_title')}/>
                                    </Grid>
                                    <Grid item xs={5}>
                                    <Typography className={classes.field_data_view}>
                                        {this.props.selectedJobPosition.business_title}
                                    </Typography>
                                    {/*<TextField disabled value={this.props.selectedJobPosition.business_title} inputProps={{ style: { textAlign: "center" } }} />*/}
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={2}><p className={classes.subtitle}>Country</p></Grid>
                                    <Grid item xs={5}>
                                        {this.props.countryList.length > 0 && (
                                                <Select
                                                className={classes.field_data}
                                                id="country"
                                                value={this.state.current_position_country}
                                                onChange={this.handleChangeSelectPick("current_position_country")}
                                                inputProps={{
                                                    name: "country",
                                                    id: "country-simple",
                                                    readOnly: readonlyFunction()
                                                }}
                                                >
                                                <option value="" />
                                                {this.props.countryList.map(country => (
                                                    <option
                                                    value={country.country_name}
                                                    key={country.country_name}
                                                    >
                                                    {country.country_name}
                                                    </option>
                                                ))}
                                                </Select>
                                        )}
                                        {/*<TextField className={classes.field_data}
                                        value={this.state.current_position_country} onChange={this.handleChange('current_position_country')}/>*/}
                                    </Grid>
                                    <Grid item xs={5}>
                                    <Typography className={classes.field_data_view}>
                                        {this.props.selectedJobPosition.country}
                                    </Typography> 
                                    {/*<TextField disabled value={this.props.selectedJobPosition.country} inputProps={{ style: { textAlign: "center" } }} />*/}
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={2}><p className={classes.subtitle}>Location</p></Grid>
                                    <Grid item xs={5}>
                                        <TextField InputProps={{readOnly: readonlyFunction(),}} className={classes.field_data}
                                        value={this.state.current_position_location} onChange={this.handleChange('current_position_location')}/>
                                    </Grid>
                                    <Grid item xs={5}>
                                    <Typography className={classes.field_data_view}>
                                        {this.props.selectedJobPosition.location}
                                    </Typography> 
                                    {/*<TextField disabled value={this.props.selectedJobPosition.location} inputProps={{ style: { textAlign: "center" } }} />*/}
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={2}><p className={classes.subtitle}>Grade</p></Grid>
                                    <Grid item xs={5}>
                                        <TextField InputProps={{readOnly: readonlyFunction(),}} className={classes.field_data}
                                        value={this.state.current_position_grade} onChange={this.handleChange('current_position_grade')}/>
                                        </Grid>
                                    <Grid item xs={5}>
                                    <Typography className={classes.field_data_view}>
                                        {this.props.selectedJobPosition.jobgrade_name}
                                    </Typography>    
                                    {/*<TextField disabled value={this.props.selectedJobPosition.jobgrade_name} inputProps={{ style: { textAlign: "center" } }} />*/}
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={2}><p className={classes.subtitle}>Jobfunction</p></Grid>
                                    <Grid item xs={5}>
                                        <TextField InputProps={{readOnly: readonlyFunction(),}} className={classes.field_data}
                                        value={this.state.current_position_jobfunction} onChange={this.handleChange('current_position_jobfunction')}/>
                                        </Grid>
                                    <Grid item xs={5}>
                                    <Typography className={classes.field_data_view}>
                                        {this.props.selectedJobPosition.job_name}
                                    </Typography>    
                                    {/*<TextField disabled value={this.props.selectedJobPosition.job_name} inputProps={{ style: { textAlign: "center" } }} />*/}
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={2}><p className={classes.subtitle}>Datestart</p></Grid>
                                    <Grid item xs={5}>
                                        <TextField InputProps={{readOnly: readonlyFunction(),}} className={classes.field_data}
                                        type="date"
                                        value={this.state.current_position_datestart} onChange={this.handleChange('current_position_datestart')}/>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <TextField InputProps={{readOnly: readonlyFunction(),}} className={classes.field_data}
                                        type="date"
                                        value={this.state.propose_position_datestart} onChange={this.handleChange('propose_position_datestart')}/>
                                        </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={2}><p className={classes.subtitle}>Currency</p></Grid>
                                    <Grid item xs={5}>
                                        {this.props.currencyList.length > 0 && (
                                            <Select
                                            className={classes.field_data}
                                            id="current_currency"
                                            value={this.state.currency2}
                                            onChange={this.handleChangeSelectPick("currency2")}
                                            inputProps={{
                                                name: "current_currency",
                                                id: "current_currency-simple",
                                                readOnly: readonlyFunction()
                                            }}
                                            >
                                            <option value="" />
                                            {this.props.currencyList.map(currency => (
                                                <option
                                                value={currency.code}
                                                key={currency.code}
                                                >
                                                {currency.country_name} ({currency.code})
                                                </option>
                                            ))}
                                            </Select>
                                        )}
                                    </Grid>
                                    <Grid item xs={5}>
                                        {this.props.currencyList.length > 0 && (
                                            <Select
                                            className={classes.field_data}
                                            id="propose_currency"
                                            value={this.state.currency}
                                            onChange={this.handleChangeSelectPick("currency")}
                                            inputProps={{
                                                name: "propose_currency",
                                                id: "propose_currency-simple",
                                                readOnly: readonlyFunction()
                                            }}
                                            >
                                            <option value="" />
                                            {this.props.currencyList.map(currency => (
                                                <option
                                                value={currency.code}
                                                key={currency.code}
                                                >
                                                {currency.country_name} ({currency.code})
                                                </option>
                                            ))}
                                            </Select>
                                        )}
                                    </Grid>
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
                            <Typography className={classes.field_section}>
                            Guaranteed Cash
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                        <Grid style={{ width: '100%' }} direction="row">
                            <Grid container>
                                <Grid item xs={5} style={{ height: "100%", padding:"0.5rem" }}>
                                    <Grid style={{ height: "100%", position: "relative" }}>
                                        <p className={classes.subtitle}>Current</p>
                                        <Grid container  spacing={8}>
                                            <Grid item xs={4}></Grid>
                                            <Grid item xs={3} style={{ width: "100%", textAlign: "right"}}>{this.state.currency2}</Grid>
                                            <Grid item xs={3} style={{ width: "100%", textAlign: "right"}}>{this.state.currency1}</Grid>
                                            {/* <Grid item xs={2}>{this.state.currency2}</Grid> */}
                                            <Grid item xs={1}></Grid>
                                        </Grid>
                                        <Grid container  spacing={8}>
                                            <Grid item xs={4}>Annual Base</Grid>
                                            <Grid item xs={3} style={{ width: "100%", textAlign: "right"}}><TextField InputProps={{readOnly: readonlyFunction(),}} type="number" value={this.state.current_data.guaranteed_cash.annual_base} onChange={this.handleChangeAnnualBaseCurrent} inputProps={{ style: { textAlign: "right", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={3} style={{ width: "100%", textAlign: "right"}}><TextField disabled value={this.getCurrency2(this.state.current_data.guaranteed_cash.annual_base)} inputProps={{ style: { textAlign: "right", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>

                                        <hr className={classes.spaceline}/>

                                        <Grid container  spacing={8}>
                                            <Grid item xs={10}></Grid>
                                            <Grid item xs={2}><IconButton disabled={readonlyFunction()} color="primary" onClick={this.handleAddGC}><AddIcon /></IconButton></Grid>
                                        </Grid>

                                        {this.state.current_data.guaranteed_cash.optional.map((item: NameValue, index) =>
                                            <Grid key={'gc' + index} container spacing={8}>
                                                <Grid item xs={4}><TextField InputProps={{readOnly: readonlyFunction(),}} value={this.state.current_data.guaranteed_cash.optional[index].name} onChange={this.handleChangeGCOptionalNameCurrent(index)} inputProps={{ style: { textAlign: "left", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={3}><TextField InputProps={{readOnly: readonlyFunction(),}} type="number" value={this.state.current_data.guaranteed_cash.optional[index].value} onChange={this.handleChangeGCOptionalValueCurrent(index)} inputProps={{ style: { textAlign: "right", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={3}><TextField disabled value={this.getCurrency2(this.state.current_data.guaranteed_cash.optional[index].value)} inputProps={{ style: { textAlign: "right", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={1}><IconButton disabled={readonlyFunction()} color="primary" onClick={() => this.handleDeleteGC(index)}><DeleteIcon /></IconButton></Grid>
                                            </Grid>)}

                                        <Grid container spacing={8}>
                                            <Grid item xs={4}>Sub</Grid>
                                            <Grid item xs={3} style={{ width: "100%", textAlign: "right"}}>{this.getsubtotalGC().toLocaleString(navigator.language, { maximumFractionDigits: 0 })}</Grid>
                                            <Grid item xs={3} style={{ width: "100%", textAlign: "right"}}>{this.getCurrency2(this.getsubtotalGC())}</Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={7} style={{ height: "100%", backgroundColor: "#f5f5f5", padding:"0.5rem"}}>
                                    <Grid style={{ height: "100%", position: "relative" }}>
                                        <p className={classes.subtitle}>Propose</p>
                                        <Grid container  spacing={8}>
                                            <Grid item xs={5}></Grid>
                                            <Grid item xs={2} style={{ width: "100%", textAlign: "right"}}>{this.state.currency}</Grid>
                                            <Grid item xs={2} style={{ width: "100%", textAlign: "right"}}>{this.state.currency1}</Grid>
                                            <Grid item xs={2} style={{ width: "100%", textAlign: "right"}}>Difference</Grid>
                                            <Grid item xs={1}></Grid>
                                        </Grid>
                                        <Grid container  spacing={8}>
                                            <Grid item xs={5}>Annual Base</Grid>
                                            <Grid item xs={2}><TextField InputProps={{readOnly: readonlyFunction(),}} type="number" value={this.state.propose_data.guaranteed_cash.annual_base} onChange={this.handleChangeAnnualBaseProposed} inputProps={{ style: { textAlign: "right", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField disabled value={this.getCurrency1(this.state.propose_data.guaranteed_cash.annual_base)} inputProps={{ style: { textAlign: "right", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField value={this.checkNan((parseInt(this.state.propose_data.guaranteed_cash.annual_base) * 100 / parseInt(this.getCurrencyDiff(this.state.current_data.guaranteed_cash.annual_base) as any)) - 100).toFixed(2) + "%"} disabled inputProps={{ style: { textAlign: "right", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>

                                        <hr className={classes.spaceline}/>

                                        <Grid container  spacing={8}>
                                            <Grid item xs={9}></Grid>
                                            <Grid item xs={3}><IconButton disabled={readonlyFunction()} color="primary" onClick={this.handleAddGP}><AddIcon /></IconButton></Grid>
                                        </Grid>

                                        {this.state.propose_data.guaranteed_cash.optional.map((item: NameValue, index) =>
                                            <Grid key={"gp" + index} container spacing={8}>
                                                <Grid item xs={5}>
                                                <ComboBoxComponent 
                                                    id="allowance" 
                                                    dataSource={gCashtypeData} 
                                                    change={this.handleChangeGCOptionalNameProposed(index)}
                                                    fields={this.fields}
                                                    readonly={readonlyFunction()}
                                                    value={this.state.propose_data.guaranteed_cash.optional[index].name}/>                                               
                                                </Grid>
                                                <Grid item xs={2}><TextField InputProps={{readOnly: readonlyFunction(),}} value={this.state.propose_data.guaranteed_cash.optional[index].value} onChange={this.handleChangeGCOptionalValueProposed(index)} inputProps={{ style: { textAlign: "right", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField disabled value={this.getCurrency1(this.state.propose_data.guaranteed_cash.optional[index].value)} inputProps={{ style: { textAlign: "right", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={3}><IconButton disabled={readonlyFunction()} color="primary" onClick={() => this.handleDeleteGP(index)}><DeleteIcon /></IconButton></Grid>
                                            </Grid>)}
                                        
                                        <Grid container spacing={8}>                                            
                                            <Grid item xs={5}>Sub</Grid>
                                            <Grid item xs={2} style={{ width: "100%", textAlign: "right"}}>{this.getsubtotalGP().toLocaleString(navigator.language, { maximumFractionDigits: 0 })}</Grid>
                                            <Grid item xs={2} style={{ width: "100%", textAlign: "right"}}>{this.getCurrency1(this.getsubtotalGP())}</Grid>
                                            <Grid item xs={2} style={{ width: "100%", textAlign: "right"}}>{this.checkNan((this.getsubtotalGP() * 100 / (this.getCurrencyDiff(this.getsubtotalGC()) as any)) - 100).toFixed(2)}%</Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                    </Grid>
                                </Grid>
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
                            <Typography className={classes.field_section}>
                            Short Term Incentive
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                        <Grid style={{ width: '100%' }} direction="row">
                            <Grid container>
                                <Grid item xs={5} style={{ height: "100%", padding:"0.5rem" }}>
                                        <p className={classes.subtitle}>Current</p>
                                        <Grid container  spacing={8}>
                                            <Grid item xs={4}></Grid>
                                            <Grid item xs={3} style={{ width: "100%", textAlign: "right"}}>{this.state.currency2}</Grid>
                                            <Grid item xs={3} style={{ width: "100%", textAlign: "right"}}>{this.state.currency1}</Grid>
                                            <Grid item xs={1}></Grid>
                                        </Grid>
                                        <Grid container  spacing={8}>
                                            <Grid item xs={4}>Bonus Target</Grid>
                                            <Grid item xs={3}><TextField value={this.checkNan(this.state.current_data.sti.bonus_target)} onChange={this.handleChangeBonusTargetCurrent} inputProps={{ style: { textAlign: "right", fontSize: 13 } }} InputProps={{ readOnly: readonlyFunction(), endAdornment: <InputAdornment position="end">%</InputAdornment> }} /></Grid>
                                            <Grid item xs={3}></Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                        <Grid container  spacing={8}>
                                            <Grid item xs={4}>Amount</Grid>
                                            <Grid item xs={3}><TextField InputProps={{readOnly: readonlyFunction(),}} value={this.state.current_data.sti.bonus_target_amount} onChange={this.handleChangeBonusTargetAmountCurrent} inputProps={{ style: { textAlign: "right", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={3}><TextField disabled value={this.getCurrency2(this.state.current_data.sti.bonus_target_amount)} inputProps={{ style: { textAlign: "right", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>

                                        <hr className={classes.spaceline}/>

                                        <Grid container  spacing={8}>
                                            <Grid item xs={10}></Grid>
                                            <Grid item xs={2}><IconButton disabled={readonlyFunction()} color="primary" onClick={this.handleAddSC}><AddIcon /></IconButton></Grid>
                                        </Grid>

                                        {this.state.current_data.sti.optional.map((item: NameValueType, index) =>
                                            <Grid key={'SC' + index} container spacing={8}>
                                                <Grid item xs={4}><TextField InputProps={{readOnly: readonlyFunction(),}} value={this.state.current_data.sti.optional[index].name} onChange={this.handleChangeSTIOptionalNameCurrent(index)} inputProps={{ style: { textAlign: "left", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={3}><TextField InputProps={{readOnly: readonlyFunction(),}} value={this.state.current_data.sti.optional[index].value} onChange={this.handleChangeSTIOptionalValueCurrent(index)} inputProps={{ style: { textAlign: "right", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={3}><TextField disabled value={this.getCurrency2(this.state.current_data.sti.optional[index].value)} inputProps={{ style: { textAlign: "right", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={1}><IconButton disabled={readonlyFunction()} color="primary" onClick={() => this.handleDeleteSC(index)}><DeleteIcon /></IconButton></Grid>
                                            </Grid>)}

                                        <Grid container spacing={8}>
                                            <Grid item xs={4}>Sub</Grid>
                                            <Grid item xs={3} style={{ width: "100%", textAlign: "right"}}>{this.getsubtotalSC().toLocaleString(navigator.language, { maximumFractionDigits: 0 })}</Grid>
                                            <Grid item xs={3} style={{ width: "100%", textAlign: "right"}}>{this.getCurrency2(this.getsubtotalSC())}</Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                </Grid>
                                <Grid item xs={7} style={{ height: "100%", backgroundColor: "#f5f5f5", padding:"0.5rem" }}>
                                        <p className={classes.subtitle}>Propose</p>
                                        <Grid container spacing={8}>
                                            <Grid item xs={5}></Grid>
                                            <Grid item xs={2} style={{ width: "100%", textAlign: "right"}}>{this.state.currency}</Grid>
                                            <Grid item xs={2} style={{ width: "100%", textAlign: "right"}}>{this.state.currency1}</Grid>
                                            <Grid item xs={2} style={{ width: "100%", textAlign: "right"}}>Difference</Grid>
                                            <Grid item xs={1}></Grid>
                                        </Grid>
                                        <Grid container spacing={8}>
                                            <Grid item xs={5}>Bonus Target</Grid>
                                            <Grid item xs={2}><TextField value={this.state.propose_data.sti.bonus_target} onChange={this.handleChangeBonusTargetProposed} inputProps={{ style: { textAlign: "right", fontSize: 13 } }} InputProps={{ readOnly: readonlyFunction(), endAdornment: <InputAdornment position="end">%</InputAdornment> }} /></Grid>
                                            <Grid item xs={2}></Grid>
                                            <Grid item xs={2}></Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                        <Grid container spacing={8}>
                                            <Grid item xs={5}>Amount</Grid>
                                            <Grid item xs={2}><TextField InputProps={{readOnly: readonlyFunction(),}} value={this.state.propose_data.sti.bonus_target_amount} onChange={this.handleChangeBonusTargetAmountProposed} inputProps={{ style: { textAlign: "right", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField disabled value={this.getCurrency1(this.state.propose_data.sti.bonus_target_amount)} inputProps={{ style: { textAlign: "right", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}></Grid>
                                            <Grid item xs={1} />
                                        </Grid>

                                        <hr className={classes.spaceline}/>

                                        <Grid container  spacing={8}>
                                            <Grid item xs={9}></Grid>
                                            <Grid item xs={3}><IconButton disabled={readonlyFunction()} color="primary" onClick={this.handleAddSP}><AddIcon /></IconButton></Grid>
                                        </Grid>

                                        {this.state.propose_data.sti.optional.map((item: NameValueType, index) =>
                                            <Grid key={"sp" + index} container spacing={8}>

                                                <Grid item xs={5}>
                                                    <ComboBoxComponent 
                                                    id="sti" 
                                                        dataSource={sTermtypeData} 
                                                        change={this.handleChangeSTIOptionalNameProposed(index)}
                                                        fields={this.fields}
                                                        readonly={readonlyFunction()}
                                                        value={this.state.propose_data.sti.optional[index].name}/>
                                                </Grid>
                                                <Grid item xs={2}><TextField InputProps={{readOnly: readonlyFunction(),}} value={this.state.propose_data.sti.optional[index].value} onChange={this.handleChangeSTIOptionalValueProposed(index)} inputProps={{ style: { textAlign: "right", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField disabled value={this.getCurrency1(this.state.propose_data.sti.optional[index].value)} inputProps={{ style: { textAlign: "right", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={3}><IconButton disabled={readonlyFunction()} color="primary" onClick={() => this.handleDeleteSP(index)}><DeleteIcon /></IconButton></Grid>
                                            </Grid>)}
                                        <Grid container spacing={8}>
                                            <Grid item xs={5}>Sub</Grid>
                                            <Grid item xs={2} style={{ width: "100%", textAlign: "right"}}>{this.getsubtotalSP().toLocaleString(navigator.language, { maximumFractionDigits: 0 })}</Grid>
                                            <Grid item xs={2} style={{ width: "100%", textAlign: "right"}}>{this.getCurrency1(this.getsubtotalSP())}</Grid>
                                            <Grid item xs={2} style={{ width: "100%", textAlign: "right"}}>{this.checkNan((this.getsubtotalSP() * 100 / (this.getCurrencyDiff(this.getsubtotalSC()) as any)) -100).toFixed(2)}%</Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <div className={classes.spacediv} />

                    <Paper className={classes.colorcontainer}>
                        <Grid container>
                            <Grid item xs={5} style={{ height: "100%" }}>
                            <Grid container spacing={8} style={{ marginLeft: "0.5rem" }}>
                                <Grid item xs={4} style={{ width: "100%", textAlign: "left", fontWeight: 'bold'}}>Current</Grid>
                                <Grid item xs={3} style={{ width: "100%", textAlign: "right", fontWeight: 'bold'}}>{this.state.currency2}</Grid>
                                <Grid item xs={3} style={{ width: "100%", textAlign: "right", fontWeight: 'bold'}}>{this.state.currency1}</Grid>
                            </Grid>
                            </Grid>
                            <Grid item xs={7} style={{ height: "100%" }}>
                            <Grid container spacing={8} style={{ marginLeft: "1.5rem" }}>
                                <Grid item xs={4} style={{ width: "100%", textAlign: "left", fontWeight: 'bold'}}>Propose</Grid>
                                <Grid item xs={2} style={{ width: "100%", textAlign: "right", fontWeight: 'bold'}}>{this.state.currency}</Grid>
                                <Grid item xs={2} style={{ width: "100%", textAlign: "right", fontWeight: 'bold'}}>{this.state.currency1}</Grid>
                                <Grid item xs={2} style={{ width: "100%", textAlign: "right", fontWeight: 'bold'}}>Difference</Grid>
                                <Grid item xs={1} />
                            </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                    <div className={classes.spacediv} />
                    <Paper className={classes.colorcontainer}>
                        <Grid container>
                            <Grid item xs={5} style={{ height: "100%" }}>
                            <Grid container spacing={8} style={{ marginLeft: "0.5rem" }}>
                                <Grid item xs={4} style={{ width: "100%", textAlign: "left"}}>Target Total Cash</Grid>
                                <Grid item xs={3} style={{ width: "100%", textAlign: "right"}}>{(this.getsubtotalGC() + this.getsubtotalSC()).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</Grid>
                                <Grid item xs={3} style={{ width: "100%", textAlign: "right"}}>{this.getCurrency2(this.getsubtotalGC() + this.getsubtotalSC())}</Grid>
                            </Grid>
                            </Grid>
                            <Grid item xs={7} style={{ height: "100%" }}>
                            <Grid container spacing={8} style={{ marginLeft: "1.5rem" }}>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={2} style={{ width: "100%", textAlign: "right"}}>{(this.getsubtotalGP() + this.getsubtotalSP()).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</Grid>
                                <Grid item xs={2} style={{ width: "100%", textAlign: "right"}}>{this.getCurrency1(this.getsubtotalGP() + this.getsubtotalSP())}</Grid>
                                <Grid item xs={2} style={{ width: "100%", textAlign: "right"}}>{this.checkNan(((this.getsubtotalGP() + this.getsubtotalSP()) * 100 / (this.getCurrencyDiff(this.getsubtotalGC() + this.getsubtotalSC()) as any)) -100).toFixed(2)}%</Grid>
                                <Grid item xs={1} />
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
                            <Typography className={classes.field_section}>
                            Long Term Incentive
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                        <Grid style={{ width: '100%' }} direction="row">
                            <Grid container>
                                <Grid item xs={5} style={{ height: "100%", padding:"0.5rem" }}>
                                        <p className={classes.subtitle}>Current</p>
                                        <Grid container  spacing={8}>
                                            <Grid item xs={4}></Grid>
                                            <Grid item xs={3} style={{ width: "100%", textAlign: "right"}}>{this.state.currency2}</Grid>
                                            <Grid item xs={3} style={{ width: "100%", textAlign: "right"}}>{this.state.currency1}</Grid>
                                            <Grid item xs={1}></Grid>
                                        </Grid>

                                        <Grid container  spacing={8}>
                                            <Grid item xs={4}>Unvested Equity</Grid>
                                            <Grid item xs={3}><TextField value={this.state.current_data.lti.unvested_equity} onChange={this.handleChangeUnvestedEquity} inputProps={{ readOnly: readonlyFunction(), style: { textAlign: "right", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={3}><TextField disabled value={this.getCurrency2(this.state.current_data.lti.unvested_equity)} inputProps={{ style: { textAlign: "right", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>

                                        <Grid container  spacing={8}>
                                            <Grid item xs={4}>Annual LTI as %</Grid>
                                            <Grid item xs={3} style={{ width: "100%", textAlign: "right"}}>{this.checkNan(parseInt(this.state.current_data.lti.unvested_equity) * 100 / parseInt(this.state.current_data.guaranteed_cash.annual_base)).toFixed(2)}%</Grid>
                                            <Grid item xs={3}></Grid>
                                            <Grid item xs={1} />
                                        </Grid>

                                        <hr className={classes.spaceline}/>

                                        <Grid container  spacing={8}>
                                            <Grid item xs={10}></Grid>
                                            <Grid item xs={2}><IconButton disabled={readonlyFunction()} color="primary" onClick={this.handleAddLC}><AddIcon /></IconButton></Grid>
                                        </Grid>

                                        {this.state.current_data.lti.optional.map((item: NameValue, index) =>
                                            <Grid container key={'lc' + index} spacing={8}>
                                                <Grid item xs={4}><TextField value={this.state.current_data.lti.optional[index].name} onChange={this.handleChangeLTIOptionalNameCurrent(index)} inputProps={{ readOnly: readonlyFunction(), style: { textAlign: "left", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={3}><TextField value={this.state.current_data.lti.optional[index].value} onChange={this.handleChangeLTIOptionalValueCurrent(index)} inputProps={{ readOnly: readonlyFunction(), style: { textAlign: "right", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={3}><TextField disabled value={this.getCurrency2(this.state.current_data.lti.optional[index].value)} inputProps={{ style: { textAlign: "right", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={1}><IconButton disabled={readonlyFunction()} color="primary" onClick={() => this.handleDeleteLC(index)}><DeleteIcon /></IconButton></Grid>
                                            </Grid>)}

                                        <Grid container spacing={8}>
                                            <Grid item xs={4}>Sub</Grid>
                                            <Grid item xs={3} style={{ width: "100%", textAlign: "right"}}>{this.getsubtotalLC().toLocaleString(navigator.language, { maximumFractionDigits: 0 })}</Grid>
                                            <Grid item xs={3} style={{ width: "100%", textAlign: "right"}}>{this.getCurrency2(this.getsubtotalLC())}</Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                </Grid>
                                <Grid item xs={7} style={{ height: "100%", backgroundColor: "#f5f5f5", padding:"0.5rem" }}>
                                        <p className={classes.subtitle}>Propose</p>
                                        <Grid container spacing={8}>
                                            <Grid item xs={5}></Grid>
                                            <Grid item xs={2} style={{ width: "100%", textAlign: "right"}}>{this.state.currency}</Grid>
                                            <Grid item xs={2} style={{ width: "100%", textAlign: "right"}}>{this.state.currency1}</Grid>
                                            <Grid item xs={2} style={{ width: "100%", textAlign: "right"}}>Difference</Grid>
                                            <Grid item xs={1}></Grid>
                                        </Grid>

                                        <Grid container  spacing={8} style={{ marginBottom: "4.3rem"}}>
                                            <Grid item xs={12}></Grid>
                                        </Grid>

                                        <hr className={classes.spaceline}/>

                                        <Grid container  spacing={8}>
                                            <Grid item xs={9}></Grid>
                                            <Grid item xs={3}><IconButton disabled={readonlyFunction()} color="primary" onClick={this.handleAddLP}><AddIcon /></IconButton></Grid>
                                        </Grid>


                                        {this.state.propose_data.lti.optional.map((item: NameValue, index) =>
                                            <Grid container spacing={8}>
                                                <Grid item xs={5}>
                                                    <ComboBoxComponent 
                                                        id="lti" 
                                                        dataSource={lTermtypeData} 
                                                        change={this.handleChangeLTIOptionalNameProposed(index)}
                                                        fields={this.fields}
                                                        readonly={readonlyFunction()}
                                                        value={this.state.propose_data.lti.optional[index].name}/>
                                                </Grid>
                                                <Grid item xs={2}><TextField value={this.state.propose_data.lti.optional[index].value} onChange={this.handleChangeLTIOptionalValueProposed(index)} inputProps={{ readOnly: readonlyFunction(), style: { textAlign: "right", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField disabled value={this.getCurrency1(this.state.propose_data.lti.optional[index].value)} inputProps={{ style: { textAlign: "right", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={3}><IconButton disabled={readonlyFunction()} color="primary" onClick={() => this.handleDeleteLP(index)}><DeleteIcon /></IconButton></Grid>
                                            </Grid>)}

                                        <Grid container spacing={8}>
                                            <Grid item xs={5}>Sub</Grid>
                                            <Grid item xs={2} style={{ width: "100%", textAlign: "right"}}>{this.getsubtotalLP().toLocaleString(navigator.language, { maximumFractionDigits: 0 })}</Grid>
                                            <Grid item xs={2} style={{ width: "100%", textAlign: "right"}}>{this.getCurrency1(this.getsubtotalLP())}</Grid>
                                            <Grid item xs={2} style={{ width: "100%", textAlign: "right"}}>{this.checkNan((this.getsubtotalLP() * 100 / (this.getCurrencyDiff(this.getsubtotalLC()) as any)) - 100).toFixed(2)}%</Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <div className={classes.spacediv} />

                    <Paper className={classes.colorcontainer}>
                        <Grid container>
                            <Grid item xs={5} style={{ height: "100%" }}>
                            <Grid container spacing={8} style={{ marginLeft: "0.5rem" }}>
                                <Grid item xs={4} style={{ width: "100%", textAlign: "left"}}>Total Direct Compensation</Grid>
                                <Grid item xs={3} style={{ width: "100%", textAlign: "right"}}>{(this.getsubtotalGC() + this.getsubtotalSC() + this.getsubtotalLC()).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</Grid>
                                <Grid item xs={3} style={{ width: "100%", textAlign: "right"}}>{this.getCurrency2(this.getsubtotalGC() + this.getsubtotalSC() + this.getsubtotalLC())}</Grid>
                            </Grid>
                            </Grid>
                            <Grid item xs={7} style={{ height: "100%" }}>
                            <Grid container spacing={8} style={{ marginLeft: "1.5rem" }}>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={2} style={{ width: "100%", textAlign: "right"}}>{(this.getsubtotalGP() + this.getsubtotalSP() + this.getsubtotalLP()).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</Grid>
                                <Grid item xs={2} style={{ width: "100%", textAlign: "right"}}>{this.getCurrency1(this.getsubtotalGP() + this.getsubtotalSP() + this.getsubtotalLP())}</Grid>
                                <Grid item xs={2} style={{ width: "100%", textAlign: "right"}}>{this.checkNan(((this.getsubtotalGP() + this.getsubtotalSP() + this.getsubtotalLP()) * 100 / (this.getCurrencyDiff(this.getsubtotalGC() + this.getsubtotalSC() + this.getsubtotalLC()) as any)) - 100).toFixed(2)}%</Grid>
                                <Grid item xs={1} />
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
                            <Typography className={classes.field_section}>
                            Sign Ons
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                        <Grid style={{ width: '100%' }} direction="row">
                            <Grid container>
                                <Grid item xs={5} style={{ height: "100%", padding: "0.5rem" }}>
                                        <p className={classes.subtitle}>Current</p>
                                        <Grid container spacing={8}>
                                            <Grid item xs={4}></Grid>
                                            <Grid item xs={3} style={{ width: "100%", textAlign: "right"}}>{this.state.currency2}</Grid>
                                            <Grid item xs={3} style={{ width: "100%", textAlign: "right"}}>{this.state.currency1}</Grid>
                                            <Grid item xs={1}></Grid>
                                        </Grid>

                                        <Grid container  spacing={8}>
                                            <Grid item xs={10}></Grid>
                                            <Grid item xs={2}><IconButton disabled={readonlyFunction()} color="primary" onClick={this.handleAddSOC}><AddIcon /></IconButton></Grid>
                                        </Grid>

                                        {this.state.current_data.sign_on.optional.map((item: NameValue, index) =>
                                            <Grid container key={'soc' + index} spacing={8}>
                                                <Grid item xs={4}><TextField value={this.state.current_data.sign_on.optional[index].name} onChange={this.handleChangeSignOnOptionalNameCurrent(index)} inputProps={{ readOnly: readonlyFunction(), style: { textAlign: "left", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={3}><TextField value={this.state.current_data.sign_on.optional[index].value} onChange={this.handleChangeSignOnOptionalValueCurrent(index)} inputProps={{ readOnly: readonlyFunction(), style: { textAlign: "right", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={3}><TextField disabled value={this.getCurrency2(this.state.current_data.sign_on.optional[index].value)} inputProps={{ style: { textAlign: "right", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={1}><IconButton disabled={readonlyFunction()} color="primary" onClick={() => this.handleDeleteSOC(index)}><DeleteIcon /></IconButton></Grid>
                                            </Grid>)}

                                        <Grid container spacing={8}>
                                            <Grid item xs={4}>Sub</Grid>
                                            <Grid item xs={3} style={{ width: "100%", textAlign: "right"}}>{this.getsubtotalSOC().toLocaleString(navigator.language, { maximumFractionDigits: 0 })}</Grid>
                                            <Grid item xs={3} style={{ width: "100%", textAlign: "right"}}>{this.getCurrency2(this.getsubtotalSOC())}</Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                </Grid>
                                <Grid item xs={7} style={{ height: "100%", backgroundColor: "#f5f5f5", padding:"0.5rem" }}>
                                        <p className={classes.subtitle}>Propose</p>
                                        <Grid container spacing={8}>
                                            <Grid item xs={5}></Grid>
                                            <Grid item xs={2} style={{ width: "100%", textAlign: "right"}}>{this.state.currency}</Grid>
                                            <Grid item xs={2} style={{ width: "100%", textAlign: "right"}}>{this.state.currency1}</Grid>
                                            <Grid item xs={2} style={{ width: "100%", textAlign: "right"}}>Difference</Grid>
                                            <Grid item xs={1}></Grid>
                                        </Grid>

                                        <Grid container  spacing={8}>
                                            <Grid item xs={9}></Grid>
                                            <Grid item xs={3}><IconButton disabled={readonlyFunction()} color="primary" onClick={this.handleAddSOP}><AddIcon /></IconButton></Grid>
                                        </Grid>

                                        {this.state.propose_data.sign_on.optional.map((item: NameValue, index) =>
                                            <Grid container key={'sop' + index} spacing={8}>
                                                <Grid item xs={5}>
                                                    <ComboBoxComponent 
                                                            id="signon" 
                                                            dataSource={sOnstypeData} 
                                                            change={this.handleChangeSignOnOptionalNameProposed(index)}
                                                            fields={this.fields}
                                                            readonly={readonlyFunction()}
                                                            value={this.state.propose_data.sign_on.optional[index].name}/>
                                                </Grid>
                                                <Grid item xs={2}><TextField value={this.state.propose_data.sign_on.optional[index].value} onChange={this.handleChangeSignOnOptionalValueProposed(index)} inputProps={{ readOnly: readonlyFunction(), style: { textAlign: "right", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField disabled value={this.getCurrency1(this.state.propose_data.sign_on.optional[index].value)} inputProps={{ style: { textAlign: "right", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={3}><IconButton disabled={readonlyFunction()} color="primary" onClick={() => this.handleDeleteSOP(index)}><DeleteIcon /></IconButton></Grid>
                                            </Grid>)}
                                        
                                        <Grid container spacing={8}>
                                            <Grid item xs={5}>Sub</Grid>
                                            <Grid item xs={2} style={{ width: "100%", textAlign: "right"}}>{this.getsubtotalSOP().toLocaleString(navigator.language, { maximumFractionDigits: 0 })}</Grid>
                                            <Grid item xs={2} style={{ width: "100%", textAlign: "right"}}>{this.getCurrency1(this.getsubtotalSOP())}</Grid>
                                            <Grid item xs={2} style={{ width: "100%", textAlign: "right"}}>{this.checkNan((this.getsubtotalSOP() * 100 / (this.getCurrencyDiff(this.getsubtotalSOC()) as any)) - 100).toFixed(2)}%</Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <div className={classes.spacediv} />

                    <Paper className={classes.colorcontainer}>
                        <Grid container>
                            <Grid item xs={5} style={{ height: "100%" }}>
                            <Grid container spacing={8} style={{ marginLeft: "0.5rem" }}>
                                <Grid item xs={4} style={{ width: "100%", textAlign: "left"}}>Total Compensation Package</Grid>
                                <Grid item xs={3} style={{ width: "100%", textAlign: "right"}}>{(this.getsubtotalGC() + this.getsubtotalSC() + this.getsubtotalLC() + this.getsubtotalSOC()).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</Grid>
                                <Grid item xs={3} style={{ width: "100%", textAlign: "right"}}>{this.getCurrency2(this.getsubtotalGC() + this.getsubtotalSC() + this.getsubtotalLC() + this.getsubtotalSOC())}</Grid>
                            </Grid>
                            </Grid>
                            <Grid item xs={7} style={{ height: "100%" }}>
                            <Grid container spacing={8} style={{ marginLeft: "1.5rem" }}>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={2} style={{ width: "100%", textAlign: "right"}}>{(this.getsubtotalGP() + this.getsubtotalSP() + this.getsubtotalLP() + this.getsubtotalSOP()).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</Grid>
                                <Grid item xs={2} style={{ width: "100%", textAlign: "right"}}>{(this.getCurrency1(this.getsubtotalGP() + this.getsubtotalSP() + this.getsubtotalLP() + this.getsubtotalSOP()))}</Grid>
                                <Grid item xs={2} style={{ width: "100%", textAlign: "right"}}>{this.checkNan(((this.getsubtotalGP() + this.getsubtotalSP() + this.getsubtotalLP() + this.getsubtotalSOP()) * 100 / (this.getCurrencyDiff(this.getsubtotalGC() + this.getsubtotalSC() + this.getsubtotalLC() + this.getsubtotalSOC()) as any)) - 100).toFixed(2)}%</Grid>
                                <Grid item xs={1} />
                            </Grid>
                            </Grid>
                        </Grid>
                    </Paper>

                    <div className={classes.spacediv} />
                    <div className={classes.spacediv} />

                    <Paper className={classes.paper}>

                        <Grid container alignItems="center">
                            <Grid item xs={1}>
                                <p style={{ transform: 'rotate(0.75turn)', width: "100%", fontWeight: 'bold', color: '#f44336' }}>Internal</p>
                            </Grid>
                            <Grid item xs={11}>
                                <Grid container justify="space-evenly" alignItems="center">
                                    <Grid item xs={3}> </Grid>
                                    <Grid item xs={2} style={{ fontWeight: 'bold'}}>Min</Grid>
                                    <Grid item xs={2} style={{ fontWeight: 'bold'}}>Medium</Grid>
                                    <Grid item xs={2} style={{ fontWeight: 'bold'}}>Max</Grid>
                                    <Grid item xs={2} style={{ fontWeight: 'bold'}}>Datapoint</Grid>
                                </Grid>
                                <Grid container justify="space-evenly" alignItems="center">
                                    <Grid item xs={3} style={{ fontWeight: 'bold'}}>Salary Range</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.intSalaryRange.min}</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.intSalaryRange.mid}</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.intSalaryRange.max}</Grid>
                                    <Grid item xs={2}> </Grid>
                                </Grid>
                                <Grid container justify="space-evenly" alignItems="center">
                                    <Grid item xs={3} style={{ fontWeight: 'bold'}}>Payroll Spread Grade</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.intPayrollSpread.grade.min}</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.intPayrollSpread.grade.median}</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.intPayrollSpread.grade.max}</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.intPayrollSpread.grade.data_points}</Grid>
                                </Grid>
                                <Grid container justify="space-evenly" alignItems="center">
                                    <Grid item xs={3} style={{ fontWeight: 'bold'}}>Payroll Spread Functional</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.intPayrollSpread.function.min}</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.intPayrollSpread.function.median}</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.intPayrollSpread.function.max}</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.intPayrollSpread.function.data_points}</Grid>
                                </Grid>
                            </Grid>
                        </Grid>


                        <div className={classes.spacediv} />

                        <Grid container alignItems="center">
                            <Grid item xs={1}>
                                <p style={{ transform: 'rotate(0.75turn)', width: "100%", fontWeight: 'bold', color: '#f44336' }}>External</p>
                            </Grid>
                            <Grid item xs={11}>
                                <Grid container justify="space-evenly" alignItems="center">
                                    <Grid item xs={3}> </Grid>
                                    <Grid item xs={2} style={{ fontWeight: 'bold'}}>P 25</Grid>
                                    <Grid item xs={2} style={{ fontWeight: 'bold'}}>P 50</Grid>
                                    <Grid item xs={2} style={{ fontWeight: 'bold'}}>P 75</Grid>
                                    <Grid item xs={2} style={{ fontWeight: 'bold'}}>Datapoint</Grid>
                                    <Grid item xs={2}> </Grid>
                                </Grid>
                                <Grid container justify="space-evenly" alignItems="center">
                                    <Grid item xs={3} style={{ fontWeight: 'bold'}}>Market Grade</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.extMarketData.grade.p25}</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.extMarketData.grade.p50}</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.extMarketData.grade.p75}</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.extMarketData.grade.data_points}</Grid>
                                </Grid>
                                <Grid container justify="space-evenly" alignItems="center">
                                    <Grid item xs={3} style={{ fontWeight: 'bold'}}>Market Functional</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.extMarketData.function.p25}</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.extMarketData.function.p50}</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.extMarketData.function.p75}</Grid>
                                    <Grid item xs={2}>{this.state.comparator_data.extMarketData.function.data_points}</Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <div className={classes.spacediv} />

                        <Grid container alignItems="center">
                            <Grid item xs={1}>
                            </Grid>
                            <Grid item xs={11}>
                                <Grid container justify="space-evenly" alignItems="center">
                                    <Grid item xs={3} style={{ fontWeight: 'bold'}}>Equity Range</Grid>
                                    <Grid item xs={2} style={{ fontWeight: 'bold'}}>Min</Grid>
                                    <Grid item xs={2} style={{ fontWeight: 'bold'}}>Median</Grid>
                                    <Grid item xs={2} style={{ fontWeight: 'bold'}}>Max</Grid>
                                    <Grid item xs={2} style={{ fontWeight: 'bold'}}>Share Price</Grid>
                                </Grid>
                                {this.state.comparator_data.equityRange.map((item: any, index) =>
                                    <Grid container justify="space-evenly" alignItems="center">
                                        <Grid item xs={3}>{item.type} ({item.currency})</Grid>
                                        <Grid item xs={2}>{item.min}</Grid>
                                        <Grid item xs={2}>{item.mid}</Grid>
                                        <Grid item xs={2}>{item.max}</Grid>
                                        <Grid item xs={2}>{item.share_price}</Grid>
                                    </Grid>)}
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

                    </div>
                    <div className={classes.enddiv} />
                </Grid >
                <Grid item xs={3} spacing={16}>
                    <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={16}
                    style={{ marginBottom: '1rem', marginTop:'0.1rem' }}
                    >
                        <Paper style={{ width: "100%", padding: "1rem" }}>
                            <Typography className={classes.field_section}>
                            Annual Base
                            </Typography>
                            <Grid container  spacing={8}>
                                <Grid item xs={6}>Compa Ratio</Grid>
                                <Grid item xs={6}>{this.checkNan(parseInt(this.state.propose_data.guaranteed_cash.annual_base) * 100 / this.state.comparator_data.intSalaryRange.mid).toFixed(2)} %</Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={16}
                    style={{ marginBottom: '1rem', marginTop:'0.1rem' }}
                    >
                        <Paper style={{ width: "100%", padding: "1rem" }}>
                            <Typography className={classes.field_section}>
                            Guaranteed Cash
                            </Typography>
                            <Grid container  spacing={8}>
                                <Grid item xs={6}>Market Ratio Grade</Grid>
                                <Grid item xs={6}>{this.checkNan(parseInt(this.state.propose_data.guaranteed_cash.annual_base) * 100 / this.state.comparator_data.extMarketData.grade.p50).toFixed(2)} %</Grid>
                            </Grid>
                            <Grid container  spacing={8}>
                                <Grid item xs={6}>Market Ratio Function</Grid>
                                <Grid item xs={6}>{this.checkNan(parseInt(this.state.propose_data.guaranteed_cash.annual_base) * 100 / this.state.comparator_data.intPayrollSpread.function.median).toFixed(2)} %</Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={16}
                    style={{ marginBottom: '1rem', marginTop:'0.1rem' }}
                    >
                        <Paper style={{ width: "100%", padding: "1rem" }}>
                            <Typography className={classes.field_section}>
                            Target Total Cash
                            </Typography>
                            <Grid container  spacing={8}>
                                <Grid item xs={6}>Market Ratio Grade</Grid>
                                <Grid item xs={6}>{this.checkNan((this.getsubtotalGP() + this.getsubtotalSP()) * 100 / this.state.comparator_data.extMarketData.grade.p50).toFixed(2)} %</Grid>
                            </Grid>
                            <Grid container  spacing={8}>
                                <Grid item xs={6}>Market Ratio Function</Grid>
                                <Grid item xs={6}>{this.checkNan((this.getsubtotalGP() + this.getsubtotalSP()) * 100 / this.state.comparator_data.intPayrollSpread.function.median).toFixed(2)} %</Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={16}
                    style={{ marginBottom: '1rem', marginTop:'0.1rem' }}
                    >
                        <Paper style={{ width: "100%", padding: "1rem" }}>
                            <Typography className={classes.field_section}>
                            TOM Bubble ™
                            </Typography>
                            <Grid container  spacing={8}>
                                <Grid item xs={6}>Annual Base</Grid>
                                <Grid item xs={6}>0</Grid>
                            </Grid>
                            <Grid container  spacing={8}>
                                <Grid item xs={6}>Guaranteed Cash</Grid>
                                <Grid item xs={6}>0</Grid>
                            </Grid>
                            <Grid container  spacing={8}>
                                <Grid item xs={6}>Target Total Cash</Grid>
                                <Grid item xs={6}>0</Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={16}
                    style={{ marginBottom: '1rem' }}
                    >
                        <Paper style={{ width: "100%", padding: "1rem" }}>
                            <Typography className={classes.field_section}>
                            Total Target Cash ({this.state.currency})
                            </Typography>
                            <Grid container  spacing={8}>
                                <Grid item xs={6}>Current</Grid>
                                <Grid item xs={6}>{(this.getCurrencyDiff(this.getsubtotalGC() + this.getsubtotalSC()) as any).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</Grid>
                            </Grid>
                            <Grid container  spacing={8}>
                                <Grid item xs={6}>Propose</Grid>
                                <Grid item xs={6}>{(this.getsubtotalGP() + this.getsubtotalSP()).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</Grid>
                            </Grid>
                            <Grid container  spacing={8}>
                                <Grid item xs={6}>Difference</Grid>
                                <Grid item xs={6}>{this.checkNan(((this.getsubtotalGP() + this.getsubtotalSP()) * 100 / (this.getCurrencyDiff(this.getsubtotalGC() + this.getsubtotalSC()) as any)) - 100).toFixed(2)} %</Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={16}
                    style={{ marginBottom: '1rem' }}
                    >
                        <Paper style={{ width: "100%", padding: "1rem" }}>
                            <Typography className={classes.field_section}>
                            Total Direct Compensation ({this.state.currency})
                            </Typography>
                            <Grid container  spacing={8}>
                                <Grid item xs={6}>Current</Grid>
                                <Grid item xs={6}>{(this.getCurrencyDiff(this.getsubtotalGC() + this.getsubtotalSC() + this.getsubtotalLC()) as any).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</Grid>
                            </Grid>
                            <Grid container  spacing={8}>
                                <Grid item xs={6}>Propose</Grid>
                                <Grid item xs={6}>{(this.getsubtotalGP() + this.getsubtotalSP() + this.getsubtotalLP()).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</Grid>
                            </Grid>
                            <Grid container  spacing={8}>
                                <Grid item xs={6}>Difference</Grid>
                                <Grid item xs={6}>{this.checkNan(((this.getsubtotalGP() + this.getsubtotalSP() + this.getsubtotalLP()) * 100 / (this.getCurrencyDiff(this.getsubtotalGC() + this.getsubtotalSC() + this.getsubtotalLC()) as any)) - 100).toFixed(2)} %</Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={16}
                    style={{ marginBottom: '1rem' }}
                    >
                        <Paper style={{ width: "100%", padding: "1rem" }}>
                            <Typography className={classes.field_section}>
                            Total Compensation Package ({this.state.currency})
                            </Typography>
                            <Grid container  spacing={8}>
                                <Grid item xs={6}>Current</Grid>
                                <Grid item xs={6}>{(this.getCurrencyDiff(this.getsubtotalGC() + this.getsubtotalSC() + this.getsubtotalLC() + this.getsubtotalSOC()) as any).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</Grid>
                            </Grid>
                            <Grid container  spacing={8}>
                                <Grid item xs={6}>Propose</Grid>
                                <Grid item xs={6}>{(this.getsubtotalGP() + this.getsubtotalSP() + this.getsubtotalLP() + this.getsubtotalSOP()).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</Grid>
                            </Grid>
                            <Grid container  spacing={8}>
                                <Grid item xs={6}>Difference</Grid>
                                <Grid item xs={6}>{this.checkNan(((this.getsubtotalGP() + this.getsubtotalSP() + this.getsubtotalLP() + this.getsubtotalSOP()) * 100 / (this.getCurrencyDiff(this.getsubtotalGC() + this.getsubtotalSC() + this.getsubtotalLC() + this.getsubtotalSOC()) as any)) - 100).toFixed(2)} %</Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                  
                        {/*<Button
                                        variant="contained"
                                        color="primary"
                                        style={{ marginRight: "1rem" }}
                                        onClick={() => this.props.onSubmit(this.state)}
                                    >
                                        Save
                        </Button>
                        {//this button goes to the report
                        }
                        <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ marginRight: "1rem" }}
                                        onClick={() => this.handleSubmit()}
                                    >
                                        Generate
                        </Button>
                        {//this button goes to the contract
                        }
                        <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => this.handleSubmit()}
                                    >
                                        Contract
                    </Button>*/}
                        
                </Grid>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                    <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="flex-end"
                    spacing={16}
                    >
                        
                        {saveFunction()}
                        <Button
                        variant="contained"                       
                        color="primary"
                        style={{ marginRight:"0.5rem" }}
                        onClick={() => {if(this.state.candidate_name != "") this.props.onGenerate(this.state)}}
                        >
                            Generate
                        </Button>
                        <Button
                        variant="contained"                       
                        color="primary"
                        onClick={() => {if(this.state.candidate_name != "") this.props.onContract(this.state)}}
                        >
                            Contract
                        </Button>
                        {closeFunction()}
                        {/*<SaveModelButton btype={"save"} onClick={() => this.props.onSubmit(this.state)}/>
                        <SaveModelButton btype={"generate"} onClick={()=> this.props.onGenerate(this.state)}/>
                        <SaveModelButton btype={"contract"} onClick={()=> this.props.onContract(this.state)}/>
                        {closeFunction()}*/}
                    </Grid>
                    </Toolbar>
                </AppBar> 
            </Grid >
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
        stiList: state.shortIncentiveReducer.shortincentiveList,
        ltiList: state.longIncentiveReducer.longincentiveList,
        signonList: state.signonsReducer.signonsList,
        allowancesList: state.allowancesReducer.allowancesList,
        currencyList: state.countryReducer.currencyList,
        countryList: state.countryReducer.countryList,
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(OfferModelPage));
