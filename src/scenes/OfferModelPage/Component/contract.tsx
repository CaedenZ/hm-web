import React, { Component } from "react";
import { Grid, WithStyles, Theme, createStyles, withStyles, Input, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { RootState } from "../../../reducer";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import PropTypes from "prop-types";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            padding:0,
            // fontSize: 13,
        },
        border:{
            border: '1px solid black',
        },
        borderBottom:{
            height:"100%",
            borderBottom: '1px solid black',
        },
        borderRight:{
            height:"100%",
            borderRight: '1px solid black',
        },
        spacediv: {
            height: 20
        },
    });

interface Props extends WithStyles<typeof styles> { }
interface State { }

class ContractPage extends React.Component<Props, State>  {
    render() {
        const { classes } = this.props;
        return (
            <main className={classes.root}>
                <Grid className={classes.border} style={{ width: '100%' }} alignItems="center" justify="space-evenly" direction="row">
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">Details Of Employment</Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} style={{ height: '100%' }} xs={2}>Company Name</Grid>
                        <Grid style={{ height: '100%' }} xs={10}>tt</Grid>
                    </Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} style={{ height: '100%' }} xs={2}>Company Name</Grid>
                        <Grid className={classes.borderRight} style={{ height: '100%' }} xs={6}>ttt</Grid>
                        <Grid className={classes.borderRight} style={{ height: '100%' }} xs={2}>Employee NRIC/FIN</Grid>
                        <Grid xs={2}>tt</Grid>
                    </Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} style={{ height: '100%' }} xs={2}>Job Title</Grid>
                        <Grid className={classes.borderRight} style={{ height: '100%' }} xs={6}>ttt</Grid>
                        <Grid className={classes.borderRight} style={{ height: '100%' }} xs={2}>Employment Start Date</Grid>
                        <Grid xs={2}>tt</Grid>
                    </Grid>
                    <Grid container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} style={{ height: '100%' }} xs={2}>Main duties and responsibilities</Grid>
                        <Grid style={{ height: '100%' }} xs={10}>tt</Grid>
                    </Grid>
                </Grid>
                <div className={classes.spacediv} />

                <Grid className={classes.border} style={{ width: '100%' }} alignItems="center" justify="space-evenly" direction="row">
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">Working HOurs and Rest Days</Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} style={{ height: '100%' }} xs={2}>Duration of Employment</Grid>
                        <Grid className={classes.borderRight} style={{ height: '100%' }} xs={6}>ttt</Grid>
                        <Grid className={classes.borderRight} style={{ height: '100%' }} xs={1}>Place of Work</Grid>
                        <Grid style={{ height: '100%' }} xs={3}>tt</Grid>
                    </Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} style={{ height: '100%',position: "relative" }} xs={2}>Working Hours and Rest Days</Grid>
                        <Grid className={classes.borderRight} style={{ height: '100%',position: "relative" }} xs={6}>ttt</Grid>
                        <Grid className={classes.borderRight} style={{ height: '100%',position: "relative" }} xs={1}>Working Days Per Week</Grid>
                        <Grid className={classes.borderRight} style={{ height: '100%',position: "relative" }} xs={1}>tt</Grid>
                        <Grid className={classes.borderRight} style={{ height: '100%',position: "relative" }} xs={1}>Rest Day Per Week</Grid>
                        <Grid style={{ height: '100%' }} xs={1}>tt</Grid>
                    </Grid>
                    <Grid container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} style={{ height: '100%',position: "relative" }} xs={2}>Salary  Period</Grid>
                        <Grid className={classes.borderRight} style={{ height: '100%',position: "relative" }} xs={6}>ttt</Grid>
                        <Grid className={classes.borderRight} style={{ height: '100%',position: "relative" }} xs={1}>Overtime payment period</Grid>
                        <Grid className={classes.borderRight} style={{ height: '100%',position: "relative" }} xs={1}>tt</Grid>
                        <Grid className={classes.borderRight} style={{ height: '100%',position: "relative" }} xs={1}>Date of Salary Payment</Grid>
                        <Grid style={{ height: '100%' }} xs={1}>tt</Grid>
                    </Grid>
                </Grid>
                <div className={classes.spacediv} />

                <Grid className={classes.border} style={{ width: '100%' }} alignItems="center" justify="space-evenly" direction="row">
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">Salary</Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}>Basic Salary</Grid>
                        <Grid className={classes.borderRight} xs={3}>ttt</Grid>
                        <Grid className={classes.borderRight} xs={3}>ttt</Grid>
                        <Grid className={classes.borderRight} xs={2}>Overtime rate of pay</Grid>
                        <Grid className={classes.borderRight} xs={1}>tt</Grid>
                        <Grid xs={1}>tt</Grid>
                    </Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} style={{ height: '100%',position: "relative" }}  xs={2}><Typography style={{ height: '100%',position: "relative" }} >Fixed Allowances</Typography></Grid>
                        <Grid className={classes.borderRight} xs={3}>ttt</Grid>
                        <Grid className={classes.borderRight} xs={3}>ttt</Grid>
                        <Grid className={classes.borderRight} xs={2}>Other salary-related components</Grid>
                        <Grid xs={2}>tt</Grid>
                    </Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}>Mobile Phone Allowances</Grid>
                        <Grid className={classes.borderRight} xs={3}>ttt</Grid>
                        <Grid className={classes.borderRight} xs={3}>ttt</Grid>
                        <Grid xs={4}></Grid>
                    </Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}>Transport Claim</Grid>
                        <Grid className={classes.borderRight} xs={3}>ttt</Grid>
                        <Grid className={classes.borderRight} xs={3}>ttt</Grid>
                        <Grid xs={4}></Grid>
                    </Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}>Food</Grid>
                        <Grid className={classes.borderRight} xs={3}>ttt</Grid>
                        <Grid className={classes.borderRight} xs={3}>ttt</Grid>
                        <Grid xs={4}></Grid>
                    </Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={5}>Fixed Deductions</Grid>
                        <Grid className={classes.borderRight} xs={3}>ttt</Grid>
                        <Grid xs={4}></Grid>
                    </Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}>CDAC</Grid>
                        <Grid className={classes.borderRight} xs={3}>ttt</Grid>
                        <Grid className={classes.borderRight} xs={3}>ttt</Grid>
                        <Grid xs={4}></Grid>
                    </Grid>
                    <Grid container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}>CPF</Grid>
                        <Grid className={classes.borderRight} xs={6}>ttt</Grid>
                        <Grid xs={4}></Grid>
                    </Grid>
                </Grid>
                <div className={classes.spacediv} />

                <Grid className={classes.border} style={{ width: '100%' }} alignItems="center" justify="space-evenly" direction="row">
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">Leave and Medical Benefits</Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}>Pay Annual Leave</Grid>
                        <Grid className={classes.borderRight} xs={6}>ttt</Grid>
                        <Grid className={classes.borderRight} xs={2}>Other Type of Leave</Grid>
                        <Grid xs={2}>tt</Grid>
                    </Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}>Pay Annual LeavePay Outpatient Sice Leave</Grid>
                        <Grid className={classes.borderRight} xs={6}>ttt</Grid>
                        <Grid className={classes.borderRight} xs={2}>Birthday Leave</Grid>
                        <Grid xs={2}>tt</Grid>
                    </Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}>Paid Hospitalisation Leave</Grid>
                        <Grid className={classes.borderRight} xs={6}>ttt</Grid>
                        <Grid xs={4}></Grid>
                    </Grid>
                    <Grid container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}>Medical Benefits</Grid>
                        <Grid xs={4}>ttt</Grid>
                    </Grid>
                </Grid>
                <div className={classes.spacediv} />

                <Grid className={classes.border} style={{ width: '100%' }} alignItems="center" justify="space-evenly" direction="row">
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">Others</Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}>Notice Period</Grid>
                        <Grid className={classes.borderRight} xs={6}>ttt</Grid>
                        <Grid className={classes.borderRight} xs={2}>Probation Start Date</Grid>
                        <Grid xs={2}>tt</Grid>
                    </Grid>
                    <Grid container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}>Length of Probation</Grid>
                        <Grid className={classes.borderRight} xs={6}>ttt</Grid>
                        <Grid className={classes.borderRight} xs={2}>Probation End Date</Grid>
                        <Grid xs={2}>tt</Grid>
                    </Grid>
                </Grid>
                <div className={classes.spacediv} />
            </main>
        );
    }
}

(ContractPage as React.ComponentClass<Props>).propTypes = {
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
    null,
    mapDispatchToProps
)(withStyles(styles)(ContractPage));
