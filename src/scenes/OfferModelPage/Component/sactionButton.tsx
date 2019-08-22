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
        height: 50,
        width: 120,
        background: "linear-gradient(45deg, #FF8E53 30%, #f44336 90%)",
        marginLeft: '1rem'
      },
      title: {
        fontSize: 12,
        color: '#fff'
      },
      stats: {
        fontSize: 16,
        color: '#fff',
        marginTop: '0.2rem'
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
        height: 50,
        minWidth: 50,
        marginLeft: '1rem',
        marginTop: '0.5rem'
      }

  });

  export interface Props extends WithStyles<typeof styles>, InState {
    onClick?: Function;
    component?: any;
  }
  
  interface State {
  }
  
  interface InState {
        btype: string
  }

  class sActionButton extends React.Component<Props, State> {
    
    state = {

        
    }

    componentDidMount() {

    }



    render() {
        const { classes } = this.props;

        const btype = this.props.btype;

        const titlefunctin = (): any => {
            let newtitle = (
              "Save"
            );
            let closedtitle = (
              "Generate"
             );
            let totaltitle = (
              "Contract"
            );
            let finishtitle = (
              "Close Offer"
            );
      
            if (this.props.btype == 'save') {
                return newtitle;
            } else if (this.props.btype == 'generate') {
                return closedtitle;
            } else if (this.props.btype == 'close') {
                return finishtitle;
            } else return totaltitle;
        };

        return (
            <Card className={classes.card}>
                <CardActionArea onClick={this.props.onClick && (() => this.props.onClick())} component={this.props.component && (this.props.component)}>

                <div className={classes.details}>
                <CardContent>
                    <Typography className={classes.stats} variant="h1" component="h1">
                    {titlefunctin()}
                    </Typography>                         
                </CardContent>
                </div>
                </CardActionArea>
            </Card>
        );
    }
}

(sActionButton as React.ComponentClass<Props>).propTypes = {
    classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
    return {
        selectedCompany: state.companyReducer.selectedCompany,
        jobgradeList: state.jobgradeReducer.jobgradeList,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(sActionButton));
    