import React from "react";
import PropTypes from "prop-types";
import {
    createStyles,
    Theme,
    withStyles,
    WithStyles
} from "@material-ui/core/styles";
import { RootState } from "../../../reducer";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { Signons } from "../../../interface/signonsInterface";
import { Button } from "@material-ui/core";
import { Company } from "../../../interface/companyInterface";
import { Country } from "../../../interface/countryInterface";


import $axios from "../../../plugin/axios";

import axios from "axios"


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
        },
    });

export interface Props extends WithStyles<typeof styles>, SharedDispatchProps, InState { }

interface State {
    country: string,
    data: any,
}

interface InState {
    countryList: Country[],
    selectedCompany: Company,
    signonsList: Signons[],
}
class PayrollUploadPage extends React.Component<Props, State> {

    state = {
        country: '',
        data: {},
    }



    readFile = (e: any) => {
        this.setState({ data: e.target.files[0] })
        console.dir(e.target.files[0])
        const formData = new FormData();
        formData.append('avatar', e.target.files[0])
        $axios.post('/company/uploadExceldata', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    upload = () => {
        axios.post('http://lb-api-c2e1f3118d091bad.elb.ap-southeast-1.amazonaws.com:3002/profile', this.state.data)
    }

    render() {

        return (
            <main>
                <input
                    accept="*"
                    id="text-button-file"
                    multiple
                    type="file"
                    onChange={this.readFile}
                    name='avatar'
                />
                <Button onClick={this.upload} component="span" >
                    Upload
                    </Button>
            </main >
        );
    }
}

(PayrollUploadPage as React.ComponentClass<Props>).propTypes = {
    classes: PropTypes.object.isRequired
} as any;

function mapStateToProps(state: RootState) {
    return {
        countryList: state.countryReducer.countryList,
        selectedCompany: state.companyReducer.selectedCompany,
        signonsList: state.signonsReducer.signonsList,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PayrollUploadPage));
