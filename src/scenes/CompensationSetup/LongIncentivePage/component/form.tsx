import React, { Component } from "react";
import {
  Typography,
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Grid,
  Paper,
  TextField,
  Divider,
  Checkbox,
  FormControlLabel,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableCell,
  Table,
  TableHead,
  TableRow,
  TableBody,
  IconButton
} from "@material-ui/core";
import { mapDispatchToProps } from "../../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../../interface/propsInterface";
import { RootState } from "../../../../reducer";
import { Country } from "../../../../interface/countryInterface";
import { JobGrade } from "../../../../interface/jobgradeInterface";
import { Company } from "../../../../interface/companyInterface";

const styles = (theme: Theme) =>
  createStyles({
    textField: {
      width: "20rem",
      margin: "1rem"
    },
    table: {
      minWidth: 700
    },
    row: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.background.default
      }
    },
  });

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  },
}))(TableCell);

interface FormState {
  type: string;
  value: string;
  isBonus: boolean;
  isOptional: boolean;
  year: number;
  investing_type: string;
  investing_breakdown: BreakdownItem[];
  share_symbol: string;
  share_exchange: string;
  currency: string;
}

interface BreakdownItem {
  year: string,
  value: string,
}
interface Props
  extends InState,
  WithStyles<typeof styles>,
  SharedDispatchProps { }

interface InState {
  countryList: Country[];
  jobgradeList: JobGrade[];
  selectedCompany: Company;
  create: boolean;
  updateData: any;
  onSubmit: any;
}

class FormPage extends Component<Props, FormState> {
  state: FormState = {
    year: 2,
    type: "",
    value: "",
    isBonus: false,
    isOptional: false,
    investing_type: "",
    investing_breakdown: [{ year: '', value: '' }, { year: '', value: '' }, { year: '', value: '' }, { year: '', value: '' }, { year: '', value: '' }, { year: '', value: '' }, { year: '', value: '' }, { year: '', value: '' }, { year: '', value: '' }, { year: '', value: '' }],
    share_symbol: "",
    share_exchange: "",
    currency: ""
  };
  componentDidMount() {
    if (!this.props.create) {
      this.setState(this.props.updateData);
      console.log(this.props.updateData);
    }
  }

  handleChange = (statekay: keyof FormState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ [statekay]: event.target.value } as any);
  };

  handleChangeSelect = (statekay: keyof FormState) => (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    this.setState(({ [statekay]: event.target.value } as unknown) as Pick<
      FormState,
      keyof FormState
    >);
  };

  handleChangeCheckisBonus = () => {
    this.setState({ isBonus: !this.state.isBonus } as any);
  };

  handleChangeCheckisOptional = () => {
    this.setState({ isOptional: !this.state.isOptional } as any);
  };

  handleChangebreakdownyear = (i) => (e) => {
    const result = {
      ...this.state.investing_breakdown,
    }
    result[i].year = e.target.value
    this.setState({ investing_breakdown: result })
  }

  handleChangebreakdownvalue = (i) => (e) => {
    const result = {
      ...this.state.investing_breakdown,
    }
    result[i].value = e.target.value
    this.setState({ investing_breakdown: result })
  }

  handleChangeYear = (e) => {
    if (e.target.value < 10) {
      this.setState({ year: e.target.value })
    }
  }
  render() {
    const { classes } = this.props;

    let tablerow: any[] = [];
    for (let i = 0; i < this.state.year; i++) {
      console.log(i)
      tablerow.push(<TableRow>
        <CustomTableCell>
          <TextField
            id="breakdownyear"
            label="breakdownyear"
            className={classes.textField}
            value={this.state.investing_breakdown[i].year}
            onChange={this.handleChangebreakdownyear(i)}
            margin="normal"
            variant="outlined"
          />
        </CustomTableCell>
        <CustomTableCell>
          <TextField
            id="breakdownvalue"
            label="breakdownvalue"
            className={classes.textField}
            value={this.state.investing_breakdown[i].value}
            onChange={this.handleChangebreakdownvalue(i)}
            margin="normal"
            variant="outlined"
          />
        </CustomTableCell>
      </TableRow>
      )
    }
    return (
      <Paper style={{ marginTop: "2rem" }}>
        <form
          onSubmit={e => this.props.onSubmit(e, this.state)}
          style={{ padding: "2rem" }}
        >
          <Typography component="h1" variant="h6">
            Long Term Incentive Infomation
          </Typography>
          <Grid justify="center" container>
            <Grid justify={"center"} container item>
              <TextField
                id="year"
                label="year"
                type="number"
                InputProps={{ inputProps: { min: 0, max: 10 } }}
                className={classes.textField}
                value={this.state.year}
                onChange={this.handleChangeYear}
                margin="normal"
              />
            </Grid>
            <Grid justify={"center"} container item>
              <TextField
                id="type"
                label="type"
                className={classes.textField}
                value={this.state.type}
                onChange={this.handleChange("type")}
                margin="normal"
              />
            </Grid>
            <Grid justify={"center"} container item>
              <TextField
                id="value"
                label="value"
                className={classes.textField}
                value={this.state.value}
                onChange={this.handleChange("value")}
                margin="normal"
              />
            </Grid>
            <Grid justify={"center"} container item>
              <FormControl >
                <InputLabel style={{ marginLeft: "20px" }} required>investing_type</InputLabel>
                <Select
                  value={this.state.investing_type}
                  className={classes.textField}
                  onChange={this.handleChangeSelect("investing_type")}
                  inputProps={{
                    name: "investing_type",
                    id: "investing_type-simple"
                  }}
                >
                  <MenuItem
                    value="Cliff"
                  >
                    Cliff
                    </MenuItem>
                  <MenuItem
                    value="Fixed"
                  >
                    Fixed
                    </MenuItem>
                </Select>
              </FormControl>

            </Grid>
            <Paper>
              <Typography style={{ margin: "1rem" }} variant='h5'>Investing breakdown</Typography>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <CustomTableCell align="left">Yeay</CustomTableCell>
                    <CustomTableCell align="left">Value</CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tablerow}
                </TableBody>
              </Table>
            </Paper>
            <Grid justify={"center"} container item>
              <TextField
                id="share_symbol"
                label="share_symbol"
                className={classes.textField}
                value={this.state.share_symbol}
                onChange={this.handleChange("share_symbol")}
                margin="normal"
              />
            </Grid>
            <Grid justify={"center"} container item>
              <TextField
                id="share_exchange"
                label="share_exchange"
                className={classes.textField}
                value={this.state.share_exchange}
                onChange={this.handleChange("share_exchange")}
                margin="normal"
              />
            </Grid>
            <Grid justify={"center"} container item>
              <TextField
                id="currency"
                label="currency"
                className={classes.textField}
                value={this.state.currency}
                onChange={this.handleChange("currency")}
                margin="normal"
              />
            </Grid>
            <Grid justify={"center"} container item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.isOptional}
                    onChange={this.handleChangeCheckisOptional}
                    color="primary"
                  />
                }
                label="isOptional"
              />
            </Grid>
          </Grid>

          <Divider />
          <Divider />
          <div
            style={{
              display: "flex",
              paddingTop: "1rem"
            }}
          >
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginLeft: "auto" }}
            >
              Submit
            </Button>
          </div>
        </form>
      </Paper>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    selectedCompany: state.companyReducer.selectedCompany,
    countryList: state.countryReducer.countryList,
    jobgradeList: state.jobgradeReducer.jobgradeList
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FormPage));
