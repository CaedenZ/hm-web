import React, { Component } from "react";
import { Grid, WithStyles, Theme, createStyles, withStyles, Input, Typography, Paper, Button, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { RootState } from "../../../reducer";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import PropTypes from "prop-types";
import { Company } from "../../../interface/companyInterface";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { history } from "../../../store";
import { OfferModel } from "../../../interface/offerModelInterface";
import { JobPosition } from "../../../interface/jobpositionInterface";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            padding: 0,
            flex: 1
            // fontSize: 13,
        },
        border: {
            flex: 1,
            border: '1px solid black',
        },
        borderBottom: {
            flex: 1,
            height: "100%",
            padding: '0.3rem',
            fontSize: "14",
            borderBottom: '1px solid black',
        },
        borderBottomless: {
            flex: 1,
            height: "100%",
            padding: '0.3rem',
            fontSize: "14",
        },
        borderRight: {
            flex: 1,
            height: "100%",
            padding: '0.3rem',
            //borderRight: '1px solid black',
        },
        spacediv: {
            height: 20
        },
        main_paper: {
            height: '100%',
            padding: 30,
            textAlign: 'left',
            fontSize: 12
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
        field_data: {
            fontSize: 14,
            fontWeight: 'bold',
            marginBottom: '1rem',
            width: '100%'
        }
    });

export interface Props
    extends WithStyles<typeof styles>,
    SharedDispatchProps,
    InState { }

interface State {

 }

interface InState {
    selectedJobPosition: JobPosition;
    selectedOfferModel: OfferModel;
    selectedCompany: Company;
}

class ContractPage extends React.Component<Props, State>  {
    
    state = {
        
    }

    componentDidMount() {
        console.log("Contract Page Mounted");
        if (this.props.selectedCompany.company_id === "") {
          let data = {
            type: "warning",
            object: "Please Select a Company first",
            id: "1"
          };
        } else 
        {

        }
    }

    render() {
        const { classes } = this.props;

        const ToPDF = () => (   
            <Grid container style={{ width: '100%', height:'100%' }} >               
                <Grid item xs={12} md={12} lg={10}>
                    <Paper className={classes.main_paper}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Details Of Employment
                        </Typography>
                    

                    <Grid className={classes.border} style={{ width: '100%' }} alignItems="center" justify="space-evenly" direction="row">
                        <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                            <Grid className={classes.borderRight} xs={2}><p>Company Name</p></Grid>
                            <Grid style={{ height: '100%', flex: 1 }} xs={10}><p>{this.props.selectedCompany.company_name}</p></Grid>
                        </Grid>
                        <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                            <Grid className={classes.borderRight} xs={2}><p>Employee Name</p></Grid>
                            <Grid className={classes.borderRight} xs={6}><p>{this.props.selectedOfferModel.candidate_name}</p></Grid>
                            <Grid className={classes.borderRight} xs={2}><p>Employee NRIC/FIN</p></Grid>
                            <Grid xs={2}><TextField className={classes.field_data}/></Grid>
                        </Grid>
                        <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                            <Grid className={classes.borderRight} xs={2}><p>Job Title</p></Grid>
                            <Grid className={classes.borderRight} xs={6}><p>{this.props.selectedJobPosition.business_title}</p></Grid>
                            <Grid className={classes.borderRight} xs={2}><p>Employment Start Date</p></Grid>
                            <Grid xs={2}><TextField className={classes.field_data}/></Grid>
                        </Grid>
                        <Grid className={classes.borderBottomless} container justify="space-evenly" alignItems="center">
                            <Grid className={classes.borderRight} xs={2}><p>Main duties and responsibilities</p></Grid>
                            <Grid xs={10}><TextField className={classes.field_data}/></Grid>
                        </Grid>
                    </Grid>
                <div className={classes.spacediv} />
                    <Typography className={classes.subtitle} color="textSecondary" gutterBottom>
                        Working Hours and Rest Days
                    </Typography>
                <Grid className={classes.border} style={{ width: '100%' }} alignItems="center" justify="space-evenly" direction="row">
                    
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}><p>Duration of Employment</p></Grid>
                        <Grid className={classes.borderRight} xs={5}><p><TextField className={classes.field_data}/></p></Grid>
                        <Grid className={classes.borderRight} xs={2}><p>Place of Work</p></Grid>
                        <Grid xs={3}><TextField className={classes.field_data}/></Grid>
                    </Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} style={{ height: '100%', position: "relative" }} xs={2}><p>Working Hours and Rest Days</p></Grid>
                        <Grid className={classes.borderRight} style={{ height: '100%', position: "relative" }} xs={4}><p><TextField className={classes.field_data}/></p></Grid>
                        <Grid className={classes.borderRight} style={{ height: '100%', position: "relative" }} xs={1}><p>Working Days Per Week</p></Grid>
                        <Grid className={classes.borderRight} style={{ height: '100%', position: "relative" }} xs={2}><p><TextField className={classes.field_data}/></p></Grid>
                        <Grid className={classes.borderRight} style={{ height: '100%', position: "relative" }} xs={1}><p>Rest Day Per Week</p></Grid>
                        <Grid xs={2}><TextField className={classes.field_data}/></Grid>
                    </Grid>
                    <Grid container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} style={{ height: '100%', position: "relative" }} xs={2}><p>Salary  Period</p></Grid>
                        <Grid className={classes.borderRight} style={{ height: '100%', position: "relative" }} xs={4}><p><TextField className={classes.field_data}/></p></Grid>
                        <Grid className={classes.borderRight} style={{ height: '100%', position: "relative" }} xs={1}><p>Overtime payment period</p></Grid>
                        <Grid className={classes.borderRight} style={{ height: '100%', position: "relative" }} xs={2}><p><TextField className={classes.field_data}/></p></Grid>
                        <Grid className={classes.borderRight} style={{ height: '100%', position: "relative" }} xs={1}><p>Date of Salary Payment</p></Grid>
                        <Grid xs={2}><TextField className={classes.field_data}/></Grid>
                    </Grid>
                </Grid>
                <div className={classes.spacediv} />
                    <Typography className={classes.subtitle} color="textSecondary" gutterBottom>
                        Salary
                    </Typography>
                <Grid className={classes.border} style={{ width: '100%' }} alignItems="center" justify="space-evenly" direction="row">
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}><p>Basic Salary</p></Grid>
                        <Grid className={classes.borderRight} xs={3}><p><TextField className={classes.field_data}/></p></Grid>
                        <Grid className={classes.borderRight} xs={3}><p></p></Grid>
                        <Grid className={classes.borderRight} xs={2}><p>Overtime rate of pay</p></Grid>
                        <Grid className={classes.borderRight} xs={1}><p><TextField className={classes.field_data}/></p></Grid>
                        <Grid xs={1}></Grid>
                    </Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}><p>Fixed Allowances</p></Grid>
                        <Grid className={classes.borderRight} xs={3}><p><TextField className={classes.field_data}/></p></Grid>
                        <Grid className={classes.borderRight} xs={3}><p></p></Grid>
                        <Grid className={classes.borderRight} xs={2}><p>Other salary-related components</p></Grid>
                        <Grid xs={2}><TextField className={classes.field_data}/></Grid>
                    </Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}><p>Allowances....</p></Grid>
                        <Grid className={classes.borderRight} xs={3}><p><TextField className={classes.field_data}/></p></Grid>
                        <Grid className={classes.borderRight} xs={3}><p></p></Grid>
                        <Grid xs={4}></Grid>
                    </Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}><p>Fixed Deductions</p></Grid>
                        <Grid className={classes.borderRight} xs={3}><p><TextField className={classes.field_data}/></p></Grid>
                        <Grid className={classes.borderRight} xs={3}><p></p></Grid>
                        <Grid xs={4}></Grid>
                    </Grid>
                    <Grid className={classes.borderBottomless} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}><p>CDAC</p></Grid>
                        <Grid className={classes.borderRight} xs={3}><p><TextField className={classes.field_data}/></p></Grid>
                        <Grid className={classes.borderRight} xs={3}><p></p></Grid>
                        <Grid xs={4}></Grid>
                    </Grid>
                </Grid>
                <div className={classes.spacediv} />
                    <Typography className={classes.subtitle} color="textSecondary" gutterBottom>
                    Leave and Medical Benefits
                    </Typography>
                <Grid className={classes.border} style={{ width: '100%' }} alignItems="center" justify="space-evenly" direction="row">
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}><p>Pay Annual Leave</p></Grid>
                        <Grid className={classes.borderRight} xs={5}><p><TextField className={classes.field_data}/></p></Grid>
                        <Grid className={classes.borderRight} xs={2}><p>Other Type of Leave</p></Grid>
                        <Grid xs={3}><TextField className={classes.field_data}/></Grid>
                    </Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}><p>Pay Annual LeavePay Outpatient Sice Leave</p></Grid>
                        <Grid className={classes.borderRight} xs={5}><p><TextField className={classes.field_data}/></p></Grid>
                        <Grid className={classes.borderRight} xs={2}><p>Birthday Leave</p></Grid>
                        <Grid xs={3}><TextField className={classes.field_data}/></Grid>
                    </Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}><p>Paid Hospitalisation Leave</p></Grid>
                        <Grid className={classes.borderRight} xs={5}><p><TextField className={classes.field_data}/></p></Grid>
                        <Grid xs={6}></Grid>
                    </Grid>
                    <Grid container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}><p>Medical Benefits</p></Grid>
                        <Grid className={classes.borderRight} xs={5}><p><TextField className={classes.field_data}/></p></Grid>
                        <Grid xs={6}></Grid>
                    </Grid>
                </Grid>
                <div className={classes.spacediv} />
                    <Typography className={classes.subtitle} color="textSecondary" gutterBottom>
                    Others
                    </Typography>
                <Grid className={classes.border} style={{ width: '100%' }} alignItems="center" justify="space-evenly" direction="row">
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}><p>Notice Period</p></Grid>
                        <Grid className={classes.borderRight} xs={5}><p><TextField className={classes.field_data}/></p></Grid>
                        <Grid className={classes.borderRight} xs={2}><p>Probation Start Date</p></Grid>
                        <Grid xs={3}><TextField className={classes.field_data}/></Grid>
                    </Grid>
                    <Grid container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}><p>Length of Probation</p></Grid>
                        <Grid className={classes.borderRight} xs={5}><p><TextField className={classes.field_data}/></p></Grid>
                        <Grid className={classes.borderRight} xs={2}><p>Probation End Date</p></Grid>
                        <Grid xs={3}><p><TextField className={classes.field_data}/></p></Grid>
                    </Grid>
                </Grid>
                <div className={classes.spacediv} />
                </Paper>
                </Grid>
                
            </Grid>
        );
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
                        //onClick={() => handleCreatePDF()}
                        >
                            Generate PDF
                        </Button>
                        </Grid>
                </Grid>                   
                </Grid>
                <ToPDF/>
            </Grid >
        );
    }
}

(ContractPage as React.ComponentClass<Props>).propTypes = {
    classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
    return {
        currencyList: state.countryReducer.currencyList,
        session_key: state.authenticationReducer.token,
        selectedCompany: state.companyReducer.selectedCompany,
        selectedOfferModel: state.offerModelReducer.selectedOfferModel,
        selectedJobPosition: state.jobPositionReducer.selectedJobPosition,
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(ContractPage));
