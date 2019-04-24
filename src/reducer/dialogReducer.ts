import { DialogState } from "../interface/dialogInterface";


export function dialogReducer(state: DialogState = {
    open: false,
    type: '',
    object: '',
    id: '',
}, action) {
    switch (action.type) {
        case 'LOG_IN_SUCCESS':
            return {
                open: false,
                type: '',
                object: '',
                id: '',
            }
        case 'LOG_OUT':
            return {
                open: false,
                type: '',
                object: '',
                id: '',
            }
        case 'SHOW_DIALOG': return { open: true, type: action.payload.type, object: action.payload.object, id: action.payload.id }
        case 'CLOSS_DIALOG': return { open: false, type: '', object: '', id: '', }
        case 'GET_COMPANY_LIST_FAILURE': return { open: true, type: 'token', object: '', id: '', }
        case 'GET_CHILD_COMPANY_LIST_FAILURE': return { open: true, type: 'token', object: '', id: '', }
        case 'GET_UNIT_LIST_FAILURE': return { open: true, type: 'token', object: '', id: '', }
        case 'GET_CHILD_UNIT_LIST_FAILURE': return { open: true, type: 'token', object: '', id: '', }
        case 'GET_JOBFUNCTION_LIST_FAILURE': return { open: true, type: 'token', object: '', id: '', }
        case 'GET_ROLE_LIST_FAILURE': return { open: true, type: 'token', object: '', id: '', }
        case 'GET_USER_LIST_FAILURE': return { open: true, type: 'token', object: '', id: '', }
        case 'LOG_IN_FAILURE': return { open: true, type: 'exit', object: 'Log in failed, please confirm your email and password', id: '', }

        default:
            return state
    }
}