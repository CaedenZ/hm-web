import { SnackBarState } from "../interface/snackBarInterface";


export function snackBarReducer(state: SnackBarState = {
    open: false,
    message: ''
}, action) {
    switch (action.type) {
        case 'SHOW_SNACKBAR': return { open: true, message: 'ERROR' }
        case 'CLOSS_SNACKBAR': return { open: false, message: '' }


        default:
            return { open: true, message: action.type }
    }
}