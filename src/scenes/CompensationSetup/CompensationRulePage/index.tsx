import React from "react";
import PropTypes from "prop-types";
import { createStyles, withStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { RootState } from "../../../reducer";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import $axios from "../../../plugin/axios";
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Group, Sort, Filter, VirtualScroll, ColumnChooser, CommandModel, CommandClickEventArgs, CommandColumn, Edit, EditSettingsModel } from "@syncfusion/ej2-react-grids";
import { enableRipple, getValue } from '@syncfusion/ej2-base';
import moment from "moment";
import { Paper, Grid, Button, Typography } from "@material-ui/core";
import { DropDownListComponent, MultiSelectComponent } from "@syncfusion/ej2-react-dropdowns";
import { JobGrade } from "../../../interface/jobgradeInterface";
import { arrayUnique } from "../../../helper/uniqeArray";
import { JobFunction } from "../../../interface/jobfunctionInterface";
import { Company } from "../../../interface/companyInterface";

enableRipple(true);
let refresh: Boolean;

const styles = (theme: Theme) =>
  createStyles({
    main: {
      width: "100%",
      padding: "1rem",
    },
    root: {
      width: "100%",
      height: "100%",
      marginTop: theme.spacing.unit * 1,
      overflowX: "auto"
    },
    title: {
      fontSize: 24,
      color: '#f44336',
      marginBottom: '1rem',
      fontWeight: 'bold'
    },
    qns: {
      marginBottom: '1.5rem',
      width: "100%"
    },
    subtitle: {
      fontSize: 16,
      marginBottom: '1rem',
      fontWeight: 'bold'
    },
    headlabel: {
      fontSize: 12,
      marginBottom: '0.5rem',
      fontWeight: 'bold'
    },
    label: {
      fontSize: 16,
      marginBottom: '1rem'
    },
    paper: {
      padding: '5px',
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
  selectedCompany: Company;
  jobgradeList: JobGrade[];
  jobfunctionList: JobFunction[];
}

class CompensationRulesPage extends React.Component<Props, State> {
  state: State = {

  }

  componentDidMount() {
    console.log("JobPosition Page Mounted");
    if (this.props.selectedCompany.company_id === "") {
      let data = {
        type: "warning",
        object: "Please Select a Company first",
        id: "1"
      };
      this.props.showDialog(data);
    } else 
    {
      this.props.getJobGradeList();
      this.props.getJobFunctionList();
    }
  }

  public load() {
      refresh = (this as any).refreshing;
  }

  onSubmit = (e, data) => {
    //TO DO
  }

  private fields: Object = { text: 'name', value: 'id' };

  gRatiotypeTypes() {
    const type = []
    let newItem0: { [key: string]: Object; } = {'name': 'NA', 'id': '100' };
    type.push(newItem0)
    let newItem: { [key: string]: Object; } = {'name': '0%', 'id': '0' };
    type.push(newItem)
    let newItem2: { [key: string]: Object; } = {'name': '10%', 'id': '10' };
    type.push(newItem2)
    let newItem3: { [key: string]: Object; } = {'name': '25%', 'id': '25' };
    type.push(newItem3)
    let newItem4: { [key: string]: Object; } = {'name': '50%', 'id': '50' };
    type.push(newItem4)
    let newItem5: { [key: string]: Object; } = {'name': '65%', 'id': '65' };
    type.push(newItem5)
    let newItem6: { [key: string]: Object; } = {'name': '75%', 'id': '75' };
    type.push(newItem6)
    let newItem7: { [key: string]: Object; } = {'name': '90%', 'id': '90' };
    type.push(newItem7)

    console.log(type);
    return type;
  };

  jobgradeTypes() {
    const type = []
    let uJobgrade = arrayUnique( this.props.jobgradeList)

    uJobgrade.forEach(element => {
      let newItem: { [key: string]: Object; } = {'name': element.jobgrade_name, 'id': element.jobgrade_name };
      type.push(newItem)
    });
    console.log(type);
    return type
  };

  jobFunctionTypes() {
    const type = []
    this.props.jobfunctionList.forEach(element => {
      let newItem: { [key: string]: Object; } = {'name': element.job_name, 'id': element.jobfunction_id };
      type.push(newItem)
    });
    console.log(type);
    return type
  };

  render() {
    const { classes } = this.props
    const that = this

    return (
      <main>
        <Paper className={classes.paper}>              
        <form onSubmit={e => this.onSubmit(e, this.state)}>
          <Grid container justify="flex-start" spacing={16}
            alignItems="flex-start" direction="row" className={classes.main}>

                <Grid item xs={12} className={classes.qns}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Compensation Rule Kit
                    </Typography>
                    <Typography className={classes.subtitle} color="textSecondary" gutterBottom>
                    Total Offering Modeller
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.qns}>
                    <Typography className={classes.headlabel} color="textSecondary" gutterBottom>
                    Business Rules
                    </Typography>
                    <Typography className={classes.label} color="textSecondary" gutterBottom>
                    1. Select your benchmarking Industry or Sector
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.qns}>
                    <Typography className={classes.headlabel} color="textSecondary" gutterBottom>
                    Business Rules
                    </Typography>
                    <Typography className={classes.label} color="textSecondary" gutterBottom>
                    2. Select your specific benchmarking for business division
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.qns}>
                    <Typography className={classes.headlabel} color="textSecondary" gutterBottom>
                    Business Rules
                    </Typography>
                    <Typography className={classes.label} color="textSecondary" gutterBottom>
                    3. Select your country specific benchmarking
                    </Typography>
                </Grid>
                <Grid item xs={6} className={classes.qns}>
                    <Typography className={classes.headlabel} color="textSecondary" gutterBottom>
                    Compensation Rules
                    </Typography>
                    <Typography className={classes.label} color="textSecondary" gutterBottom>
                    4. Approval needed for Base Salary if above Compa-Ratio of is higher than
                    </Typography>                               
                </Grid>
                <Grid item xs={6} className={classes.qns}>
                    <Typography className={classes.headlabel} color="textSecondary" gutterBottom>
                    Compa-Ratio
                    </Typography>
                    <DropDownListComponent id="qns4" dataSource={this.gRatiotypeTypes()} fields={this.fields} popupHeight="200px" width="60px" popupWidth="140px" value='100' />
                </Grid>
                <Grid item xs={6} className={classes.qns}>
                    <Typography className={classes.headlabel} color="textSecondary" gutterBottom>
                    Compensation Rules
                    </Typography>
                    <Typography className={classes.label} color="textSecondary" gutterBottom>
                    5. Approval needed for Base Salary if above Market-Ratio of higher than
                    </Typography>
                </Grid>
                <Grid item xs={6} className={classes.qns}>
                    <Typography className={classes.headlabel} color="textSecondary" gutterBottom>
                    Market-Ratio
                    </Typography>
                    <DropDownListComponent id="qns5" dataSource={this.gRatiotypeTypes()} fields={this.fields} popupHeight="200px" width="60px" popupWidth="140px" value='100' />
                    <Typography className={classes.headlabel} color="textSecondary" gutterBottom>
                    Grade
                    </Typography>
                    <MultiSelectComponent id="qns5_1" dataSource={this.jobgradeTypes()} mode="Default" fields={this.fields} placeholder="Grade" />
                    <Typography className={classes.headlabel} color="textSecondary" gutterBottom>
                    Job Function
                    </Typography>
                    <MultiSelectComponent id="qns5_2" dataSource={this.jobFunctionTypes()} mode="Default" fields={this.fields} placeholder="Job Function" />
                </Grid>
                <Grid item xs={12} className={classes.qns}>
                    <Typography className={classes.headlabel} color="textSecondary" gutterBottom>
                    Compensation Rules
                    </Typography>
                    <Typography className={classes.label} color="textSecondary" gutterBottom>
                    6. Select priority preference for Base Salary Offer
                    </Typography>
                </Grid>
                <Grid item xs={6} className={classes.qns}>
                    <Typography className={classes.headlabel} color="textSecondary" gutterBottom>
                    Compensation Rules
                    </Typography>
                    <Typography className={classes.label} color="textSecondary" gutterBottom>
                    7. Exclude the following from Comp Rules
                    </Typography>
                </Grid>
                <Grid item xs={6} className={classes.qns}>
                  <Typography className={classes.headlabel} color="textSecondary" gutterBottom>
                    Grade
                    </Typography>
                    <MultiSelectComponent id="qns7" dataSource={this.jobgradeTypes()} mode="Default" fields={this.fields} placeholder="Grade" />
                    <Typography className={classes.headlabel} color="textSecondary" gutterBottom>
                    Job Function
                    </Typography>
                    <MultiSelectComponent id="qns7_1" dataSource={this.jobFunctionTypes()} mode="Default" fields={this.fields} placeholder="Job Function" />
                </Grid>
                <Grid item xs={6} className={classes.qns}>
                    <Typography className={classes.headlabel} color="textSecondary" gutterBottom>
                    Talent Rules
                    </Typography>
                    <Typography className={classes.label} color="textSecondary" gutterBottom>
                    8. Minimum Compa-Ratio for Critical Position
                    </Typography>
                </Grid>
                <Grid item xs={6} className={classes.qns}>
                    <Typography className={classes.headlabel} color="textSecondary" gutterBottom>
                    Compa-Ratio
                    </Typography>
                    <DropDownListComponent id="qns8" dataSource={this.gRatiotypeTypes()} fields={this.fields} popupHeight="200px" width="60px" popupWidth="140px" value='100' />
                </Grid>
                <Grid item xs={6} className={classes.qns}>
                    <Typography className={classes.headlabel} color="textSecondary" gutterBottom>
                    Talent Rules
                    </Typography>
                    <Typography className={classes.label} color="textSecondary" gutterBottom>
                    9. Select minimum Base Pay increment for same grade transfer or promotion
                    </Typography>
                </Grid>
                <Grid item xs={6} className={classes.qns}>
                    <Typography className={classes.headlabel} color="textSecondary" gutterBottom>
                    Increment
                    </Typography>
                    <DropDownListComponent id="qns9" dataSource={this.gRatiotypeTypes()} fields={this.fields} popupHeight="200px" width="60px" popupWidth="140px" value='100' />
                </Grid>
                <Grid item xs={6} className={classes.qns}>
                    <Typography className={classes.headlabel} color="textSecondary" gutterBottom>
                    Talent Rules
                    </Typography>
                    <Typography className={classes.label} color="textSecondary" gutterBottom>
                    10. Select minimum Base Pay increment for grade promotion
                    </Typography>
                </Grid>
                <Grid item xs={6} className={classes.qns}>
                    <Typography className={classes.headlabel} color="textSecondary" gutterBottom>
                    Increment
                    </Typography>
                    <DropDownListComponent id="qns10" dataSource={this.gRatiotypeTypes()} fields={this.fields} popupHeight="200px" width="60px" popupWidth="140px" value='100' />
                </Grid>
                <Grid item xs={6}>  
                </Grid>
                <Grid item xs={6}>      
                  <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ marginLeft: "auto" }}
                  >
                    Submit
                </Button>
                </Grid>              
          </Grid>
        </form>
        </Paper>       
      </main>
    );
  }
}

(CompensationRulesPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    sessionkey: state.authenticationReducer.token,
    companyid: state.companyReducer.selectedCompany.company_id,
    jobgradeList: state.jobgradeReducer.jobgradeList,
    jobfunctionList: state.jobFunctionReducer.jobFunctionList,
    selectedCompany: state.companyReducer.selectedCompany,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CompensationRulesPage));
