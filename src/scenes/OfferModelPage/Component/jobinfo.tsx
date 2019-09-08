import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  createStyles,
  WithStyles,
  withStyles,
  Theme,
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
  Grid,
  CardActions
} from "@material-ui/core";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { RootState } from "../../../reducer";
import { JobPosition } from "../../../interface/jobpositionInterface";
import { history } from "../../../store";

const styles = (theme: Theme) =>
  createStyles({
    card: {
        height: 160
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 20,
        color: '#f44336',
        fontWeight: 'bold'
      },
      field_label: {
        fontSize: 12,
      },
      field_data: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: '0.3rem'
      },
      action:{
        marginLeft: '0.1rem'
      }

  });

  export interface Props extends WithStyles<typeof styles>, SharedDispatchProps, InState { }
  
  interface State {
   
  }
  
  interface InState {
    selectedJobPosition: JobPosition;
  }

  class JobPanel extends React.Component<Props, State> {
    

    componentDidMount() {

    }



    render() {
        const { classes } = this.props;
        const bull = <span className={classes.bullet}>•</span>;


        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Job Position
                    </Typography>
                    <Grid container spacing={16} style={{ marginBottom:"0.3rem" }}>
                        <Grid item xs={3}>
                        <Typography className={classes.field_label}>
                        Country
                        </Typography> 
                        <Typography className={classes.field_data}>
                        {this.props.selectedJobPosition.country}
                        </Typography> 
                        <Typography className={classes.field_label}>
                        Location
                        </Typography> 
                        <Typography className={classes.field_data}>
                        {this.props.selectedJobPosition.location}
                        </Typography>
                        </Grid>

                        <Grid item xs={3}>
                        <Typography className={classes.field_label}>
                        Business Title
                        </Typography> 
                        <Typography className={classes.field_data}>
                        {this.props.selectedJobPosition.business_title}
                        </Typography> 
                        <Typography className={classes.field_label}>
                        Job Grade
                        </Typography> 
                        <Typography className={classes.field_data}>
                        {this.props.selectedJobPosition.jobgrade_name}
                        </Typography>
                        </Grid>

                        <Grid item xs={6}>
                        <Typography className={classes.field_label}>
                        Job Name
                        </Typography> 
                        <Typography className={classes.field_data}>
                        {this.props.selectedJobPosition.job_name}
                        </Typography>
                        </Grid>
                    </Grid>                         
                </CardContent>
            </Card>
        );
    }
}

(JobPanel as React.ComponentClass<Props>).propTypes = {
    classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
    return {
        selectedCompany: state.companyReducer.selectedCompany,
        selectedJobPosition: state.jobPositionReducer.selectedJobPosition,
        jobgradeList: state.jobgradeReducer.jobgradeList,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(JobPanel));
    