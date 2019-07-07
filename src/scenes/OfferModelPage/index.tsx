import React from "react";
import PropTypes from "prop-types";
import { Grid, Theme, createStyles, Paper, WithStyles, withStyles, Divider, TextField, Typography, IconButton, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from "@material-ui/core";
import { mapDispatchToProps } from "../../helper/dispachProps";
import { connect } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

interface Props extends WithStyles<typeof styles> { }
interface Bonus {
    name: string,
    CNY: string
}
interface State {
    guaranteedcash_current: Bonus[];
    guaranteedcash_propose: Bonus[];
    shortterm_current: Bonus[];
    shortterm_propose: Bonus[];
    longterm_current: Bonus[];
    longterm_propose: Bonus[];
    signons_current: Bonus[];
    signons_propose: Bonus[];
}

class OfferModelPage extends React.Component<Props, State> {
    state = {
        guaranteedcash_current: [],
        guaranteedcash_propose: [],
        shortterm_current: [],
        shortterm_propose: [],
        longterm_current: [],
        longterm_propose: [],
        signons_current: [],
        signons_propose: [],
    }

    handleDeleteGC = (index) => { this.setState(state => { const guaranteedcash_current = state.guaranteedcash_current.filter((item, j) => index !== j); return { guaranteedcash_current, }; }); }
    handleAddGC = () => { this.setState(state => { const guaranteedcash_current = state.guaranteedcash_current.concat({ name: '', CNY: '' }); return { guaranteedcash_current }; }); };
    handleDeleteGP = (index) => { this.setState(state => { const guaranteedcash_propose = state.guaranteedcash_propose.filter((item, j) => index !== j); return { guaranteedcash_propose, }; }); }
    handleAddGP = () => { this.setState(state => { const guaranteedcash_propose = state.guaranteedcash_propose.concat({ name: '', CNY: '' }); return { guaranteedcash_propose }; }); };

    handleDeleteSC = (index) => { this.setState(state => { const shortterm_current = state.shortterm_current.filter((item, j) => index !== j); return { shortterm_current, }; }); }
    handleAddSC = () => { this.setState(state => { const shortterm_current = state.shortterm_current.concat({ name: '', CNY: '' }); return { shortterm_current }; }); };
    handleDeleteSP = (index) => { this.setState(state => { const shortterm_propose = state.shortterm_propose.filter((item, j) => index !== j); return { shortterm_propose, }; }); }
    handleAddSP = () => { this.setState(state => { const shortterm_propose = state.shortterm_propose.concat({ name: '', CNY: '' }); return { shortterm_propose }; }); };

    handleDeleteLC = (index) => { this.setState(state => { const longterm_current = state.longterm_current.filter((item, j) => index !== j); return { longterm_current, }; }); }
    handleAddLC = () => { this.setState(state => { const longterm_current = state.longterm_current.concat({ name: '', CNY: '' }); return { longterm_current }; }); };
    handleDeleteLP = (index) => { this.setState(state => { const longterm_propose = state.longterm_propose.filter((item, j) => index !== j); return { longterm_propose, }; }); }
    handleAddLP = () => { this.setState(state => { const longterm_propose = state.longterm_propose.concat({ name: '', CNY: '' }); return { longterm_propose }; }); };

    handleDeleteSOC = (index) => { this.setState(state => { const signons_current = state.signons_current.filter((item, j) => index !== j); return { signons_current, }; }); }
    handleAddSOC = () => { this.setState(state => { const signons_current = state.signons_current.concat({ name: '', CNY: '' }); return { signons_current }; }); };
    handleDeleteSOP = (index) => { this.setState(state => { const signons_propose = state.signons_propose.filter((item, j) => index !== j); return { signons_propose, }; }); }
    handleAddSOP = () => { this.setState(state => { const signons_propose = state.signons_propose.concat({ name: '', CNY: '' }); return { signons_propose }; }); };

    render() {
        const { classes } = this.props;
        let a = [{
            name: '',
            CNY: ''
        }];
        return (
            <Grid container alignItems="center" justify="space-evenly" direction="row" className={classes.root}>
                <Grid item xs={8}>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Grid container>
                                <Grid item xs={4}><p className={classes.subtitle}>Name</p></Grid>
                                <Grid item xs={4}><TextField
                                    inputProps={{
                                        style: { textAlign: "center" }
                                    }} /></Grid>
                            </Grid>
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
                                        <TextField
                                            inputProps={{
                                                style: { textAlign: "center" }
                                            }} />
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={4}><p className={classes.subtitle}>Country</p></Grid>
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
                                    <Grid item xs={4}><p className={classes.subtitle}>Location</p></Grid>
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
                                    <Grid item xs={4}><p className={classes.subtitle}>Grade</p></Grid>
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
                                    <Grid item xs={4}><TextField
                                        inputProps={{
                                            style: { textAlign: "center" }
                                        }} /></Grid>
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
                                            <Grid item xs={2}>CNY</Grid>
                                            <Grid item xs={2}>USD</Grid>
                                            <Grid item xs={1}><IconButton onClick={this.handleAddGC}><AddIcon /></IconButton></Grid>
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Annual Base</Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Compa Ratio</Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Market Ratio</Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>

                                        {this.state.guaranteedcash_current.map((item: Bonus, index) =>
                                            <Grid container justify="space-evenly" alignItems="center">
                                                <Grid item xs={3}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={1}><IconButton onClick={() => this.handleDeleteGC(index)}><DeleteIcon /></IconButton></Grid>
                                            </Grid>)}

                                        <div className={classes.spacediv} />
                                        <Grid container style={{ position: "absolute", bottom: 10 }} justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Sub</Grid>
                                            <Grid item xs={2}>679,000</Grid>
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
                                            <Grid item xs={2}>CNY</Grid>
                                            <Grid item xs={2}>USD</Grid>
                                            <Grid item xs={2}>Difference</Grid>
                                            <Grid item xs={1}><IconButton onClick={this.handleAddGP}><AddIcon /></IconButton></Grid>
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Annual Base</Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Compa Ratio</Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Market Ratio</Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>

                                        {this.state.guaranteedcash_propose.map((item: Bonus, index) =>
                                            <Grid container justify="space-evenly" alignItems="center">
                                                <Grid item xs={3}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={1}><IconButton onClick={() => this.handleDeleteGP(index)}><DeleteIcon /></IconButton></Grid>
                                            </Grid>)}

                                        <div className={classes.spacediv} />

                                        <Grid container style={{ position: "absolute", bottom: 10 }} justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Sub</Grid>
                                            <Grid item xs={2}>679,000</Grid>
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
                                            <Grid item xs={2}>CNY</Grid>
                                            <Grid item xs={2}>USD</Grid>
                                            <Grid item xs={1}><IconButton onClick={this.handleAddSC}><AddIcon /></IconButton></Grid>
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Annual Base</Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Compa Ratio</Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Market Ratio</Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>

                                        {this.state.shortterm_current.map((item: Bonus, index) =>
                                            <Grid container justify="space-evenly" alignItems="center">
                                                <Grid item xs={3}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={1}><IconButton onClick={() => this.handleDeleteSC(index)}><DeleteIcon /></IconButton></Grid>
                                            </Grid>)}

                                        <div className={classes.spacediv} />
                                        <Grid container style={{ position: "absolute", bottom: 10 }} justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Sub</Grid>
                                            <Grid item xs={2}>679,000</Grid>
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
                                            <Grid item xs={2}>CNY</Grid>
                                            <Grid item xs={2}>USD</Grid>
                                            <Grid item xs={2}>Difference</Grid>
                                            <Grid item xs={1}><IconButton onClick={this.handleAddSP}><AddIcon /></IconButton></Grid>
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Annual Base</Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Compa Ratio</Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Market Ratio</Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>

                                        {this.state.shortterm_propose.map((item: Bonus, index) =>
                                            <Grid container justify="space-evenly" alignItems="center">
                                                <Grid item xs={3}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={1}><IconButton onClick={() => this.handleDeleteSP(index)}><DeleteIcon /></IconButton></Grid>
                                            </Grid>)}

                                        <div className={classes.spacediv} />

                                        <Grid container style={{ position: "absolute", bottom: 10 }} justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Sub</Grid>
                                            <Grid item xs={2}>679,000</Grid>
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
                                    <Grid item xs={1}>787,000</Grid>
                                    <Grid item xs={1}>118,850</Grid>
                                    <Grid item xs={1}>1,060,000</Grid>
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
                                            <Grid item xs={2}>CNY</Grid>
                                            <Grid item xs={2}>USD</Grid>
                                            <Grid item xs={1}><IconButton onClick={this.handleAddLC}><AddIcon /></IconButton></Grid>
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Annual Base</Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Compa Ratio</Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Market Ratio</Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>

                                        {this.state.longterm_current.map((item: Bonus, index) =>
                                            <Grid container justify="space-evenly" alignItems="center">
                                                <Grid item xs={3}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={1}><IconButton onClick={() => this.handleDeleteLC(index)}><DeleteIcon /></IconButton></Grid>
                                            </Grid>)}

                                        <div className={classes.spacediv} />
                                        <Grid container style={{ position: "absolute", bottom: 10 }} justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Sub</Grid>
                                            <Grid item xs={2}>679,000</Grid>
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
                                            <Grid item xs={2}>CNY</Grid>
                                            <Grid item xs={2}>USD</Grid>
                                            <Grid item xs={2}>Difference</Grid>
                                            <Grid item xs={1}><IconButton onClick={this.handleAddLP}><AddIcon /></IconButton></Grid>
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Annual Base</Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Compa Ratio</Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Market Ratio</Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>

                                        {this.state.longterm_propose.map((item: Bonus, index) =>
                                            <Grid container justify="space-evenly" alignItems="center">
                                                <Grid item xs={3}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={1}><IconButton onClick={() => this.handleDeleteLP(index)}><DeleteIcon /></IconButton></Grid>
                                            </Grid>)}

                                        <div className={classes.spacediv} />

                                        <Grid container style={{ position: "absolute", bottom: 10 }} justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Sub</Grid>
                                            <Grid item xs={2}>679,000</Grid>
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
                                            <Grid item xs={2}>CNY</Grid>
                                            <Grid item xs={2}>USD</Grid>
                                            <Grid item xs={1}><IconButton onClick={this.handleAddSOC}><AddIcon /></IconButton></Grid>
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Annual Base</Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Compa Ratio</Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Market Ratio</Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>

                                        {this.state.signons_current.map((item: Bonus, index) =>
                                            <Grid container justify="space-evenly" alignItems="center">
                                                <Grid item xs={3}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={1}><IconButton onClick={() => this.handleDeleteSOC(index)}><DeleteIcon /></IconButton></Grid>
                                            </Grid>)}

                                        <div className={classes.spacediv} />
                                        <Grid container style={{ position: "absolute", bottom: 10 }} justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Sub</Grid>
                                            <Grid item xs={2}>679,000</Grid>
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
                                            <Grid item xs={2}>CNY</Grid>
                                            <Grid item xs={2}>USD</Grid>
                                            <Grid item xs={2}>Difference</Grid>
                                            <Grid item xs={1}><IconButton onClick={this.handleAddSOP}><AddIcon /></IconButton></Grid>
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Annual Base</Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Compa Ratio</Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Market Ratio</Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                            <Grid item xs={1} />
                                        </Grid>

                                        {this.state.signons_propose.map((item: Bonus, index) =>
                                            <Grid container justify="space-evenly" alignItems="center">
                                                <Grid item xs={3}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={2}><TextField inputProps={{ style: { textAlign: "center", fontSize: 13 } }} /></Grid>
                                                <Grid item xs={1}><IconButton onClick={() => this.handleDeleteSOP(index)}><DeleteIcon /></IconButton></Grid>
                                            </Grid>)}

                                        <div className={classes.spacediv} />

                                        <Grid container style={{ position: "absolute", bottom: 10 }} justify="space-evenly" alignItems="center">
                                            <Grid item xs={3}>Sub</Grid>
                                            <Grid item xs={2}>679,000</Grid>
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
                                    <Grid item xs={1}>787,000</Grid>
                                    <Grid item xs={1}>118,850</Grid>
                                    <Grid item xs={1}>1,060,000</Grid>
                                    <Grid item xs={1}>159,000</Grid>
                                    <Grid item xs={2}>135%</Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Grid container alignItems="center" justify="center">
                            <Grid item xs={4}>Internal Promotion</Grid>
                            <Grid item xs={2}>Buy USD</Grid>
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
                                    <Grid item xs={3}>Grade</Grid>
                                    <Grid item xs={2}>600,000</Grid>
                                    <Grid item xs={2}>700,000</Grid>
                                    <Grid item xs={2}>900,000</Grid>
                                    <Grid item xs={2}> </Grid>
                                </Grid>
                                <Grid container justify="space-evenly" alignItems="center">
                                    <Grid item xs={3}>Payroll Spread</Grid>
                                    <Grid item xs={2}>650,000</Grid>
                                    <Grid item xs={2}>890,000</Grid>
                                    <Grid item xs={2}>1,100,000</Grid>
                                    <Grid item xs={2}>32</Grid>
                                </Grid>
                                <Grid container justify="space-evenly" alignItems="center">
                                    <Grid item xs={3}>Functional</Grid>
                                    <Grid item xs={2}>720,000</Grid>
                                    <Grid item xs={2}>769,000</Grid>
                                    <Grid item xs={2}>980,000</Grid>
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
                                    <Grid item xs={2}>600,000</Grid>
                                    <Grid item xs={2}>700,000</Grid>
                                    <Grid item xs={2}>900,000</Grid>
                                    <Grid item xs={2}> </Grid>
                                </Grid>
                                <Grid container justify="space-evenly" alignItems="center">
                                    <Grid item xs={3}>Market Functional</Grid>
                                    <Grid item xs={2}>650,000</Grid>
                                    <Grid item xs={2}>890,000</Grid>
                                    <Grid item xs={2}>1,100,000</Grid>
                                    <Grid item xs={2}>32</Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <div className={classes.spacediv} />
                        <div className={classes.spacediv} />
                        <div className={classes.spacediv} />
                        <div className={classes.spacediv} />
                        <div className={classes.spacediv} />
                        <div className={classes.spacediv} />
                        <div className={classes.spacediv} />
                        <div className={classes.spacediv} />
                        <div className={classes.spacediv} />
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
                                    <Grid item xs={2}>25,000</Grid>
                                    <Grid item xs={2}>45,000</Grid>
                                    <Grid item xs={2}>70,000</Grid>
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
                </Grid>

            </Grid>
        );
    }
}

(OfferModelPage as React.ComponentClass<Props>).propTypes = {
    classes: PropTypes.object.isRequired
} as any;

export default connect(
    null,
    mapDispatchToProps
)(withStyles(styles)(OfferModelPage));
