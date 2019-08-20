import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    Typography,
    createStyles,
    WithStyles,
    withStyles,
    Button
} from "@material-ui/core";
import { mapDispatchToProps } from "../../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../../interface/propsInterface";
import { history } from "../../../store";
import OfferSheet from "../Component/report";
import ReactDOM from 'react-dom';
import ReactPDF , { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import html2canvas from "html2canvas"
import jsPDF from "jspdf";
import { renderToString } from "react-dom/server";


const styles = () =>
    createStyles({
        root: {
            flexGrow: 1
        }
    });

export interface State { }
export interface Props extends WithStyles<typeof styles>, SharedDispatchProps { }

class OfferSheetPage extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.handleCreatePDF = this.handleCreatePDF.bind(this);
    }


    handleCreatePDF = () => {

        const pdfstring = renderToString(<OfferSheet />);
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.fromHTML(pdfstring);
        pdf.save("pdf");
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <OfferSheet />
                <div
                    style={{
                        display: "flex",
                        paddingTop: "1rem"
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginLeft: "auto" }}
                        onClick={() => this.handleCreatePDF()}
                    >
                        Generate PDF
            </Button>
                </div>
            </div>
        );
    }
}

(OfferSheetPage as React.ComponentClass<Props>).propTypes = {
    classes: PropTypes.object.isRequired
} as any;

export default connect(
    null,
    mapDispatchToProps
)(withStyles(styles)(OfferSheetPage));
