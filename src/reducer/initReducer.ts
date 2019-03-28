import { InitState } from "../interface/initInterface";

export function initReducer(state: InitState = {
    init: false,
}, action) {
    switch (action.type) {
        case 'persist/REHYDRATE':
            return {
                init: true
            }
        default:
            return state
    }
}