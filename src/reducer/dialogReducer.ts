import { DialogState } from "../interface/dialogInterface";


export function dialogReducer(state: DialogState = {
    open: false,
    type: '',
    object: '',
    id: '',
}, action) {
    switch (action.type) {
        case 'SHOW_DIALOG': return { open: true, type: action.payload.type, object: action.payload.object, id: action.payload.id }
        case 'CLOSS_DIALOG': return { open: false, type: '', object: '', id: '', }

        default:
            return state
    }
}