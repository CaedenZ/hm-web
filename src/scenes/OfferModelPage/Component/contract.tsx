import React, { Component } from "react";
import { Grid, WithStyles, Theme, createStyles, withStyles, Input, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { RootState } from "../../../reducer";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import PropTypes from "prop-types";

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
            borderBottom: '1px solid black',
        },
        borderRight: {
            flex: 1,
            height: "100%",
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
                        <Grid className={classes.borderRight} xs={2}><p>Company Name</p></Grid>
                        <Grid style={{ height: '100%', flex: 1 }} xs={10}><p>tt</p></Grid>
                    </Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}><p>Company Name</p></Grid>
                        <Grid className={classes.borderRight} xs={6}><p>ttt</p></Grid>
                        <Grid className={classes.borderRight} xs={2}><p>Employee NRIC/FIN</p></Grid>
                        <Grid xs={2}>tt</Grid>
                    </Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}><p>Job Title</p></Grid>
                        <Grid className={classes.borderRight} xs={6}><p>ttt</p></Grid>
                        <Grid className={classes.borderRight} xs={2}><p>Employment Start Date</p></Grid>
                        <Grid xs={2}>tt</Grid>
                    </Grid>
                    <Grid container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}><p>Main duties and responsibilities</p></Grid>
                        <Grid xs={10}>tt</Grid>
                    </Grid>
                </Grid>
                <div className={classes.spacediv} />

                <Grid className={classes.border} style={{ width: '100%' }} alignItems="center" justify="space-evenly" direction="row">
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center"><p>Working HOurs and Rest Days</p></Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}><p>Duration of Employment</p></Grid>
                        <Grid className={classes.borderRight} xs={6}><p>ttt</p></Grid>
                        <Grid className={classes.borderRight} xs={1}><p>Place of Work</p></Grid>
                        <Grid xs={3}>tt</Grid>
                    </Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} style={{ height: '100%', position: "relative" }} xs={2}><p>Working Hours and Rest Days</p></Grid>
                        <Grid className={classes.borderRight} style={{ height: '100%', position: "relative" }} xs={6}><p>ttt</p></Grid>
                        <Grid className={classes.borderRight} style={{ height: '100%', position: "relative" }} xs={1}><p>Working Days Per Week</p></Grid>
                        <Grid className={classes.borderRight} style={{ height: '100%', position: "relative" }} xs={1}><p>tt</p></Grid>
                        <Grid className={classes.borderRight} style={{ height: '100%', position: "relative" }} xs={1}><p>Rest Day Per Week</p></Grid>
                        <Grid xs={1}>tt</Grid>
                    </Grid>
                    <Grid container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} style={{ height: '100%', position: "relative" }} xs={2}><p>Salary  Period</p></Grid>
                        <Grid className={classes.borderRight} style={{ height: '100%', position: "relative" }} xs={6}><p>ttt</p></Grid>
                        <Grid className={classes.borderRight} style={{ height: '100%', position: "relative" }} xs={1}><p>Overtime payment period</p></Grid>
                        <Grid className={classes.borderRight} style={{ height: '100%', position: "relative" }} xs={1}><p>tt</p></Grid>
                        <Grid className={classes.borderRight} style={{ height: '100%', position: "relative" }} xs={1}><p>Date of Salary Payment</p></Grid>
                        <Grid xs={1}>tt</Grid>
                    </Grid>
                </Grid>
                <div className={classes.spacediv} />

                <Grid className={classes.border} style={{ width: '100%' }} alignItems="center" justify="space-evenly" direction="row">
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center"><p>Salary</p></Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}><p>Basic Salary</p></Grid>
                        <Grid className={classes.borderRight} xs={3}><p>ttt</p></Grid>
                        <Grid className={classes.borderRight} xs={3}><p>ttt</p></Grid>
                        <Grid className={classes.borderRight} xs={2}><p>Overtime rate of pay</p></Grid>
                        <Grid className={classes.borderRight} xs={1}><p>tt</p></Grid>
                        <Grid xs={1}>tt</Grid>
                    </Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} style={{ height: '100%', position: "relative" }} xs={2}><p>Fixed Allowances</p></Grid>
                        <Grid className={classes.borderRight} xs={3}><p>ttt</p></Grid>
                        <Grid className={classes.borderRight} xs={2}><p>Other salary-related components</p></Grid>
                        <Grid xs={2}>tt</Grid>
                    </Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}><p>Mobile Phone Allowances</p></Grid>
                        <Grid className={classes.borderRight} xs={3}><p>ttt</p></Grid>
                        <Grid className={classes.borderRight} xs={3}><p>ttt</p></Grid>
                        <Grid xs={4}></Grid>
                    </Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}><p>Transport Claim</p></Grid>
                        <Grid className={classes.borderRight} xs={3}><p>ttt</p></Grid>
                        <Grid className={classes.borderRight} xs={3}><p>ttt</p></Grid>
                        <Grid xs={4}></Grid>
                    </Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}><p>Food</p></Grid>
                        <Grid className={classes.borderRight} xs={3}><p>ttt</p></Grid>
                        <Grid className={classes.borderRight} xs={3}><p>ttt</p></Grid>
                        <Grid xs={4}></Grid>
                    </Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={5}><p>Fixed Deductions</p></Grid>
                        <Grid className={classes.borderRight} xs={3}><p>ttt</p></Grid>
                        <Grid xs={4}></Grid>
                    </Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}><p>CDAC</p></Grid>
                        <Grid className={classes.borderRight} xs={3}><p>ttt</p></Grid>
                        <Grid className={classes.borderRight} xs={3}><p>ttt</p></Grid>
                        <Grid xs={4}></Grid>
                    </Grid>
                    <Grid container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}><p>CPF</p></Grid>
                        <Grid className={classes.borderRight} xs={6}><p>ttt</p></Grid>
                        <Grid xs={4}></Grid>
                    </Grid>
                </Grid>
                <div className={classes.spacediv} />

                <Grid className={classes.border} style={{ width: '100%' }} alignItems="center" justify="space-evenly" direction="row">
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center"><p>Leave and Medical Benefits</p></Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}><p>Pay Annual Leave</p></Grid>
                        <Grid className={classes.borderRight} xs={6}><p>ttt</p></Grid>
                        <Grid className={classes.borderRight} xs={2}><p>Other Type of Leave</p></Grid>
                        <Grid xs={2}>tt</Grid>
                    </Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}><p>Pay Annual LeavePay Outpatient Sice Leave</p></Grid>
                        <Grid className={classes.borderRight} xs={6}><p>ttt</p></Grid>
                        <Grid className={classes.borderRight} xs={2}><p>Birthday Leave</p></Grid>
                        <Grid xs={2}>tt</Grid>
                    </Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}><p>Paid Hospitalisation Leave</p></Grid>
                        <Grid className={classes.borderRight} xs={6}><p>ttt</p></Grid>
                        <Grid xs={4}></Grid>
                    </Grid>
                    <Grid container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}><p>Medical Benefits</p></Grid>
                        <Grid xs={4}>ttt</Grid>
                    </Grid>
                </Grid>
                <div className={classes.spacediv} />

                <Grid className={classes.border} style={{ width: '100%' }} alignItems="center" justify="space-evenly" direction="row">
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center"><p>Others</p></Grid>
                    <Grid className={classes.borderBottom} container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}><p>Notice Period</p></Grid>
                        <Grid className={classes.borderRight} xs={6}><p>ttt</p></Grid>
                        <Grid className={classes.borderRight} xs={2}><p>Probation Start Date</p></Grid>
                        <Grid xs={2}>tt</Grid>
                    </Grid>
                    <Grid container justify="space-evenly" alignItems="center">
                        <Grid className={classes.borderRight} xs={2}><p>Length of Probation</p></Grid>
                        <Grid className={classes.borderRight} xs={6}><p>ttt</p></Grid>
                        <Grid className={classes.borderRight} xs={2}><p>Probation End Date</p></Grid>
                        <Grid xs={2}><p>tt</p></Grid>
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
