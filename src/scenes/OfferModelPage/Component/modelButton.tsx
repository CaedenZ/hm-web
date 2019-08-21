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
  CardActionArea
} from "@material-ui/core";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { RootState } from "../../../reducer";
import CustomButton from "../../../helper/components/CustomButton";
import { fade } from "@material-ui/core/styles/colorManipulator";

const styles = (theme: Theme) =>
  createStyles({
    card: {
        display: 'flex',
        minWidth: 275,
        height: 160,
        background: "linear-gradient(45deg, #FF8E53 30%, #f44336 90%)",
      },
      title: {
        fontSize: 12,
        color: '#fff'
      },
      stats: {
        fontSize: 30,
        color: '#fff',
        marginTop: '0.8rem',
        marginBottom: '0.8rem'
      },
      action:{
        marginLeft: '0.1rem'
      },
      details: {
        display: 'flex',
        Width: 250,
        flexDirection: 'column',
      },
      cover: {
        height: 100,
        minWidth: 100,
        marginLeft: 20,
        marginTop: 30
      }

  });

  export interface Props extends WithStyles<typeof styles> {
    onClick?: Function;
    component?: any;
  }
  
  interface State {
  }
  
  interface InState {

  }

  class modelButton extends React.Component<Props, State> {
    
    state = {

        
    }

    componentDidMount() {

    }



    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cover}
                    image="/img/model.png"
                    title="Create Offer"
                />
                <CardActionArea onClick={this.props.onClick && (() => this.props.onClick())} component={this.props.component && (this.props.component)}>
                <div className={classes.details}>
                <CardContent>
                    <Typography className={classes.stats} variant="h1" component="h1">
                    New Offer Model
                    </Typography> 
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Right pay for the right job
                    </Typography>                         
                </CardContent>
                </div>
                </CardActionArea>
            </Card>
        );
    }
}

(modelButton as React.ComponentClass<Props>).propTypes = {
    classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
    return {
        selectedCompany: state.companyReducer.selectedCompany,
        jobgradeList: state.jobgradeReducer.jobgradeList,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(modelButton));
    