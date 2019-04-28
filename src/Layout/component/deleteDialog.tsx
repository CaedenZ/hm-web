import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { RootState } from '../../reducer';
import { mapDispatchToProps } from '../../helper/dispachProps';
import { connect } from 'react-redux';
import { SharedDispatchProps } from '../../interface/propsInterface';
import { DialogState } from '../../interface/dialogInterface';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { history } from '../../store';

const styles = theme => ({
    close: {
        padding: theme.spacing.unit / 2,
    },
});

export interface Props extends InState, SharedDispatchProps, WithStyles<typeof styles>, InState { }

interface State { }

interface InState {
    deleteDialog: DialogState
}
class AlertDialog extends React.Component<Props, State> {

    state = {
        open: false,
        type: '',
        object: '',
        id: '',
    }
    componentDidMount() {
        this.setState(this.props.deleteDialog)
    }
    handleClose = () => {
        console.log("close")
        this.props.closeDialog()
    };
    handleExpired = () => {
        console.log("close")
        this.props.closeDialog()
        this.props.logout()
        history.push('/login')
    };

    handleConfirm = () => {
        console.log("close")
        switch (this.props.deleteDialog.object) {
            case 'company':
                this.props.deleteCompany(this.props.deleteDialog.id)
                break
            case 'subcompany':
                this.props.deleteEntity(this.props.deleteDialog.id)
                break
            case 'unit':
                this.props.deleteUnit(this.props.deleteDialog.id)
                break
            case 'subunit':
                this.props.deleteSubUnit(this.props.deleteDialog.id)
                break
            case 'childunit':
                this.props.deleteChildUnit(this.props.deleteDialog.id)
                break
            case 'region':
                this.props.deleteRegion(this.props.deleteDialog.id)
                break
            case 'role':
                this.props.deleteRole(this.props.deleteDialog.id)
                break
            case 'jobfunction':
                this.props.deleteJobFunction(this.props.deleteDialog.id)
                break
            case 'jobgrade':
                this.props.deleteJobGrade(this.props.deleteDialog.id)
                break
            case 'subjobfunction':
                this.props.deleteSubJobFunction(this.props.deleteDialog.id)
                break
            case 'user':
                this.props.deleteUser(this.props.deleteDialog.id)
                break
            case 'sector':
                this.props.deleteSector(this.props.deleteDialog.id)
                break
            case 'industry':
                this.props.deleteIndustry(this.props.deleteDialog.id)
                break
            default:
                break
        }
        this.props.closeDialog()
    };

    render() {
        const { classes } = this.props;


        switch (this.props.deleteDialog.type) {
            case 'delete': {
                return (
                    <Dialog
                        open={this.props.deleteDialog.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Confirm delete"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Do you confirm to delete the selected object?
                    </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                No
                    </Button>
                            <Button onClick={this.handleConfirm} color="primary" autoFocus>
                                Yes
                    </Button>
                        </DialogActions>
                    </Dialog>
                )
            }
            case 'token': {
                return (
                    <Dialog
                        open={this.props.deleteDialog.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Token expired"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Return to login page
                    </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleExpired} color="primary" autoFocus>
                                Confirm
                    </Button>
                        </DialogActions>
                    </Dialog>
                )
            }
            case 'warning': {
                return (
                    <Dialog
                        open={this.props.deleteDialog.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Message"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {this.props.deleteDialog.object}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary" autoFocus>
                                Confirm
                    </Button>
                        </DialogActions>
                    </Dialog>
                )
            }
            case 'exit': {
                return (
                    <Dialog
                        open={this.props.deleteDialog.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Message"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {this.props.deleteDialog.object}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleExpired} color="primary" autoFocus>
                                Confirm
                    </Button>
                        </DialogActions>
                    </Dialog>
                )
            }
            default: {
                return <div />
            }
        }


    }
}

function mapStateToProps(state: RootState) {
    return {
        deleteDialog: state.dialogReducer,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AlertDialog));