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
  Typography
} from "@material-ui/core";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { RootState } from "../../../reducer";

const styles = (theme: Theme) =>
  createStyles({
    card: {
        display: 'flex',
        minWidth: 275,
        height: 160
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold'
      },
      stats: {
        fontSize: 60,
        color: '#f44336',
        marginTop: '0.5rem',
        marginBottom: '0.5rem'
      },
      action:{
        marginLeft: '0.1rem'
      },
      details: {
        display: 'flex',
        minWidth: 150,
        flexDirection: 'column',
      },
      cover: {
        height: 120,
        width: "100%",
        margin: '1rem'
      }

  });

  export interface Props extends WithStyles<typeof styles>, SharedDispatchProps, InState { }
  
  interface State {
  }
  
  interface InState {
    statstype: string
    statsvalue: string
  }

  class StatsBox extends React.Component<Props, State> {
    
    state = {

        
    }

    componentDidMount() {

    }



    render() {
        const { classes } = this.props;
        const bull = <span className={classes.bullet}>•</span>;

        const searchBarProps = {
            statstype: this.props.statstype,
            statsvalue: this.props.statsvalue
        }

        const titlefunctin = (): any => {
            let newtitle = (
              "New Offers"
            );
            let closedtitle = (
              "Closed Offers"
             );
            let totaltitle = (
              "Total Offers"
            );
      
            if (this.props.statstype == 'new') {
                return newtitle;
            } else if (this.props.statstype == 'close') {
                return closedtitle;
            } else return totaltitle;
        };

        const imagefunctin = (): any => {
            let newtitle = (
                <CardMedia
                    className={classes.cover}
                    image="/img/tom_newoffermodel.png"
                    title="New Offers"
                />
            );
            let closedtitle = (
                <CardMedia
                    className={classes.cover}
                    image="/img/tom_closedoffer.png"
                    title="Closed Offers"
                />
             );
            let totaltitle = (
                <CardMedia
                    className={classes.cover}
                    image="/img/tom_totaloffer.png"
                    title="Total Offers"
                />
            );
      
            if (this.props.statstype == 'new') {
                return newtitle;
            } else if (this.props.statstype == 'close') {
                return closedtitle;
            } else return totaltitle;
        };

        return (
            <Card className={classes.card}>
                <div className={classes.details}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {titlefunctin()}
                    </Typography>
                    <Typography className={classes.stats} variant="h1" component="h1">
                    {this.props.statsvalue}
                    </Typography>      
                    {/*<Button size="small">View Offers</Button>*/}
                </CardContent>
                </div>
                {imagefunctin()}
            </Card>
        );
    }
}

(StatsBox as React.ComponentClass<Props>).propTypes = {
    classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
    return {
        selectedCompany: state.companyReducer.selectedCompany,
        jobgradeList: state.jobgradeReducer.jobgradeList,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StatsBox));
    