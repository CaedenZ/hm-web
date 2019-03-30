import { SnackBarState } from "../interface/snackBarInterface";


export function snackBarReducer(state: SnackBarState = {
    open: false,
    message: ''
}, action) {
    switch (action.type) {
        case 'SHOW_SNACKBAR':
            return {
                open: true,
                message: 'TEST'
            }
        case 'CLOSS_SNACKBAR':
            return {
                open: false,
                message: ''
            }
        case 'CREATE_USER_SUCCESS':
            return {
                open: true,
                message: 'CREATE_USER_SUCCESS'
            }
        case 'CREATE_USER_FAILURE':
            return {
                open: true,
                message: 'CREATE_USER_FAILURE'
            }
        case 'CREATE_JOBFUNCTION_SUCCESS':
            return {
                open: true,
                message: 'CREATE_JOBFUNCTION_SUCCESS'
            }
        case 'CREATE_JOBFUNCTION_FAILURE':
            return {
                open: true,
                message: 'CREATE_JOBFUNCTION_FAILURE'
            }
        case 'CREATE_SUBJOBFUNCTION_SUCCESS':
            return {
                open: true,
                message: 'CREATE_SUBJOBFUNCTION_SUCCESS'
            }
        case 'CREATE_SUBJOBFUNCTION_FAILURE':
            return {
                open: true,
                message: 'CREATE_SUBJOBFUNCTION_FAILURE'
            }
        case 'DELETE_JOBFUNCTION_SUCCESS':
            return {
                open: true,
                message: 'DELETE_JOBFUNCTION_SUCCESS'
            }
        case 'DELETE_JOBFUNCTION_FAILURE':
            return {
                open: true,
                message: 'DELETE_JOBFUNCTION_FAILURE'
            }
        case 'DELETE_SUBJOBFUNCTION_SUCCESS':
            return {
                open: true,
                message: 'DELETE_SUBJOBFUNCTION_SUCCESS'
            }
        case 'DELETE_SUBJOBFUNCTION_FAILURE':
            return {
                open: true,
                message: 'DELETE_SUBJOBFUNCTION_FAILURE'
            }
        case 'CREATE_COMPANY_SUCCESS':
            return {
                open: true,
                message: 'CREATE_COMPANY_SUCCESS'
            }
        case 'CREATE_COMPANY_FAILURE':
            return {
                open: true,
                message: 'CREATE_COMPANY_FAILURE'
            }
        case 'CREATE_UNIT_SUCCESS':
            return {
                open: true,
                message: 'CREATE_UNIT_SUCCESS'
            }
        case 'CREATE_UNIT_FAILURE':
            return {
                open: true,
                message: 'CREATE_UNIT_FAILURE'
            }
        case 'CREATE_SUBUNIT_SUCCESS':
            return {
                open: true,
                message: 'CREATE_SUBUNIT_SUCCESS'
            }
        case 'CREATE_SUBUNIT_FAILURE':
            return {
                open: true,
                message: 'CREATE_SUBUNIT_FAILURE'
            }
        case 'CREATE_CHILDUNIT_SUCCESS':
            return {
                open: true,
                message: 'CREATE_CHILDUNIT_SUCCESS'
            }
        case 'CREATE_CHILDUNIT_FAILURE':
            return {
                open: true,
                message: 'CREATE_CHILDUNIT_FAILURE'
            }
        case 'UPDATE_USER_SUCCESS':
            return {
                open: true,
                message: 'UPDATE_USER_SUCCESS'
            }
        case 'UPDATE_USER_FAILURE':
            return {
                open: true,
                message: 'UPDATE_USER_FAILURE'
            }
        case 'DELETE_USER_SUCCESS':
            return {
                open: true,
                message: 'DELETE_USER_SUCCESS'
            }
        case 'DELETE_USER_FAILURE':
            return {
                open: true,
                message: 'DELETE_USER_FAILURE'
            }
        default:
            return state
    }
}