import React from "react";
import PropTypes from "prop-types";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { IconButton, MenuItem, Menu } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { history } from "../../../../store";
import UpdateIcon from "@material-ui/icons/PlaylistAddCheck";
import { SharedDispatchProps } from "../../../../interface/propsInterface";
import { Company } from "../../../../interface/companyInterface";
import { SalaryRange } from "../../../../interface/salaryRangeInterface";
import { RootState } from "../../../../reducer";
import { mapDispatchToProps } from "../../../../helper/dispachProps";
import { connect } from "react-redux";
import ReactDataGrid from "react-data-grid";
import { Editors } from "react-data-grid-addons";

const { DropDownEditor } = Editors;
  

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginTop: theme.spacing.unit * 3,
      overflowX: "auto"
    },
    table: {
      minWidth: 700
    },
    row: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.background.default
      }
    },
    logo: {
      height: "20px"
    }
  });

export interface Props
  extends WithStyles<typeof styles>,
  SharedDispatchProps,
  InState { }

interface State { }

interface InState {
  selectedCompany: Company;
  salaryrangeList: SalaryRange[];
}
class CustomizedTable extends React.Component<Props, State> {
  state = {
    country: "",
    global: false,
    anchorEl: null
  };

  componentDidMount() {
    console.log("SalaryRangePage MOunt");
    if (this.props.selectedCompany.company_id === "") {
      let data = {
        type: "warning",
        object: "Please Select a Company first",
        id: "1"
      };
      this.props.showDialog(data);
    } else this.props.getSalaryRangeList();
  }

  handleUpdateButtonClick = salaryrange => {
    this.props.selectSalaryRange(salaryrange);
    history.push("/salaryrange/update");
    console.log("clicked");
  };

  handleDelete = (id) => {
    const payload = {
      type: "delete",
      object: "salaryrange",
      id: id
    };
    this.props.showDialog(payload);
  };

  handleListButtonClick = (event, row) => {
    this.setState({ anchorEl: event.currentTarget });
    this.props.selectSalaryRange(row);
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleRedirect = path => {
    history.push("/salaryrange/" + path);
  };

  
  typeEditor = <DropDownEditor options={[...this.props.selectedCompany.country,'']} />;
  globalEditor = <DropDownEditor options={['Y','N']} />;

  

  
  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
      const row = this.props.salaryrangeList.slice();
      for (let i = fromRow; i <= toRow; i++) {
        row[i] = { ...row[i], ...updated };
        console.log(row[i])
        this.props.updateSalaryRange(row[i])
      }
      return { row };
  };

  render() {
    const { classes } = this.props;
    const that = this;


    const columns: any = [
      {key:'jobgrade_name',name:"jobgrade_name", editable: true},
      {key:'type',name:"type", editable: true},
      {key:'min',name:"min", editable: true},
      {key:'mid',name:"mid", editable: true},
      {key:'max',name:"max", editable: true},
      {key:'jobgrade_global',name:"global", editor: this.globalEditor},
      {key:'jobgrade_country',name:"country", editor: this.typeEditor},
      {key:'action',name:"action"},
    ]

    function actions(row){
      return[
        {
          icon: <DeleteIcon />,
          callback: () => {
            that.handleDelete(row.jobgrade_id);
          }
        },
        
      ];
    }  

    function getCellActions(column, row) {
      const cellActions = {
        action: actions(row)
      };
      return cellActions[column.key];
    }

    return (
      <Paper className={classes.root}>
        <ReactDataGrid
            columns = {columns}
            rowGetter = {i => this.props.salaryrangeList[i]}
            rowsCount = {this.props.salaryrangeList.length}
            getCellActions={getCellActions}
            onGridRowsUpdated={this.onGridRowsUpdated}
            enableCellSelect={true} />
      </Paper>
    );
  }
}

(CustomizedTable as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
  return {
    selectedCompany: state.companyReducer.selectedCompany
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CustomizedTable));
