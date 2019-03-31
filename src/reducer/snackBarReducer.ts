import { SnackBarState } from "../interface/snackBarInterface";


export function snackBarReducer(state: SnackBarState = {
    open: false,
    message: ''
}, action) {
    switch (action.type) {
        case 'SHOW_SNACKBAR': return { open: true, message: 'TEST' }
        case 'CLOSS_SNACKBAR': return { open: false, message: '' }

        case 'CREATE_USER_SUCCESS': return { open: true, message: 'CREATE_USER_SUCCESS' }
        case 'CREATE_USER_FAILURE': return { open: true, message: 'CREATE_USER_FAILURE' }
        case 'UPDATE_USER_SUCCESS': return { open: true, message: 'UPDATE_USER_SUCCESS' }
        case 'UPDATE_USER_FAILURE': return { open: true, message: 'UPDATE_USER_FAILURE' }
        case 'DELETE_USER_SUCCESS': return { open: true, message: 'DELETE_USER_SUCCESS' }
        case 'DELETE_USER_FAILURE': return { open: true, message: 'DELETE_USER_FAILURE' }

        case 'CREATE_JOBFUNCTION_SUCCESS': return { open: true, message: 'CREATE_JOBFUNCTION_SUCCESS' }
        case 'CREATE_JOBFUNCTION_FAILURE': return { open: true, message: 'CREATE_JOBFUNCTION_FAILURE' }
        case 'CREATE_SUBJOBFUNCTION_SUCCESS': return { open: true, message: 'CREATE_SUBJOBFUNCTION_SUCCESS' }
        case 'CREATE_SUBJOBFUNCTION_FAILURE': return { open: true, message: 'CREATE_SUBJOBFUNCTION_FAILURE' }
        case 'UPDATE_JOBFUNCTION_SUCCESS': return { open: true, message: 'UPDATE_JOBFUNCTION_SUCCESS' }
        case 'UPDATE_JOBFUNCTION_FAILURE': return { open: true, message: 'UPDATE_JOBFUNCTION_FAILURE' }
        case 'UPDATE_SUBJOBFUNCTION_SUCCESS': return { open: true, message: 'UPDATE_SUBJOBFUNCTION_SUCCESS' }
        case 'UPDATE_SUBJOBFUNCTION_FAILURE': return { open: true, message: 'UPDATE_SUBJOBFUNCTION_FAILURE' }
        case 'DELETE_JOBFUNCTION_SUCCESS': return { open: true, message: 'DELETE_JOBFUNCTION_SUCCESS' }
        case 'DELETE_JOBFUNCTION_FAILURE': return { open: true, message: 'DELETE_JOBFUNCTION_FAILURE' }
        case 'DELETE_SUBJOBFUNCTION_SUCCESS': return { open: true, message: 'DELETE_SUBJOBFUNCTION_SUCCESS' }
        case 'DELETE_SUBJOBFUNCTION_FAILURE': return { open: true, message: 'DELETE_SUBJOBFUNCTION_FAILURE' }

        case 'CREATE_COMPANY_SUCCESS': return { open: true, message: 'CREATE_COMPANY_SUCCESS' }
        case 'CREATE_COMPANY_FAILURE': return { open: true, message: 'CREATE_COMPANY_FAILURE' }
        case 'UPDATE_COMPANY_SUCCESS': return { open: true, message: 'UPDATE_COMPANY_SUCCESS' }
        case 'UPDATE_COMPANY_FAILURE': return { open: true, message: 'UPDATE_COMPANY_FAILURE' }
        case 'DELETE_COMPANY_SUCCESS': return { open: true, message: 'DELETE_COMPANY_SUCCESS' }
        case 'DELETE_COMPANY_FAILURE': return { open: true, message: 'DELETE_COMPANY_FAILURE' }

        case 'CREATE_UNIT_SUCCESS': return { open: true, message: 'CREATE_UNIT_SUCCESS' }
        case 'CREATE_UNIT_FAILURE': return { open: true, message: 'CREATE_UNIT_FAILURE' }
        case 'CREATE_SUBUNIT_SUCCESS': return { open: true, message: 'CREATE_SUBUNIT_SUCCESS' }
        case 'CREATE_SUBUNIT_FAILURE': return { open: true, message: 'CREATE_SUBUNIT_FAILURE' }
        case 'CREATE_CHILDUNIT_SUCCESS': return { open: true, message: 'CREATE_CHILDUNIT_SUCCESS' }
        case 'CREATE_CHILDUNIT_FAILURE': return { open: true, message: 'CREATE_CHILDUNIT_FAILURE' }
        case 'UPDATE_UNIT_SUCCESS': return { open: true, message: 'UPDATE_UNIT_SUCCESS' }
        case 'UPDATE_UNIT_FAILURE': return { open: true, message: 'UPDATE_UNIT_FAILURE' }
        case 'UPDATE_SUBUNIT_SUCCESS': return { open: true, message: 'UPDATE_SUBUNIT_SUCCESS' }
        case 'UPDATE_SUBUNIT_FAILURE': return { open: true, message: 'UPDATE_SUBUNIT_FAILURE' }
        case 'UPDATE_CHILDUNIT_SUCCESS': return { open: true, message: 'UPDATE_CHILDUNIT_SUCCESS' }
        case 'UPDATE_CHILDUNIT_FAILURE': return { open: true, message: 'UPDATE_CHILDUNIT_FAILURE' }
        case 'DELETE_UNIT_SUCCESS': return { open: true, message: 'DELETE_UNIT_SUCCESS' }
        case 'DELETE_UNIT_FAILURE': return { open: true, message: 'DELETE_UNIT_FAILURE' }
        case 'DELETE_SUBUNIT_SUCCESS': return { open: true, message: 'DELETE_SUBUNIT_SUCCESS' }
        case 'DELETE_SUBUNIT_FAILURE': return { open: true, message: 'DELETE_SUBUNIT_FAILURE' }
        case 'DELETE_CHILDUNIT_SUCCESS': return { open: true, message: 'DELETE_CHILDUNIT_SUCCESS' }
        case 'DELETE_CHILDUNIT_FAILURE': return { open: true, message: 'DELETE_CHILDUNIT_FAILURE' }

        case 'CREATE_REGION_SUCCESS': return { open: true, message: 'CREATE_REGION_SUCCESS' }
        case 'UPDATE_REGION_SUCCESS': return { open: true, message: 'UPDATE_REGION_SUCCESS' }
        case 'DELETE_REGION_SUCCESS': return { open: true, message: 'DELETE_REGION_SUCCESS' }
        case 'CREATE_REGION_FAILURE': return { open: true, message: 'CREATE_REGION_FAILURE' }
        case 'UPDATE_REGION_FAILURE': return { open: true, message: 'UPDATE_REGION_FAILURE' }
        case 'DELETE_REGION_FAILURE': return { open: true, message: 'DELETE_REGION_FAILURE' }


        default:
            return state
    }
}