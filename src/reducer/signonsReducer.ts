import { Epic } from "redux-observable";
import {
    switchMap,
    map,
    catchError,
    filter,
} from "rxjs/operators"
import { of, from } from "rxjs"
import { SignonsState, Signons } from "../interface/signonsInterface";
import { getSignonsList, createSignons, deleteSignons, updateSignons } from "../api/signonsAPI";
import { getSignonsListAction, createSignonsAction, deleteSignonsAction, updateSignonsAction } from "../actions/signonsAction";
import { isActionOf } from "typesafe-actions";


export function signonsReducer(state: SignonsState = {
    signonsList: [],
    selectSignons: {
        signons_id: '',
        company_id: '',
        type: '',
        value: '',
        isOptional: 0,
        signons_breakdown: '',
    },
}, action) {
    switch (action.type) {
        case 'LOG_IN_SUCCESS':
            return {
                signonsList: [],
                selectSignons: {
                    company_id: '',
                    type: '',
                    value: '',
                    isOptional: 0,
                    signons_breakdown: '',
                },
            }
        case 'LOG_OUT':
            return {
                signonsList: [],
                selectSignons: {
                    company_id: '',
                    type: '',
                    value: '',
                    isOptional: 0,
                    signons_breakdown: '',
                },
            }
        case 'SELECT_SIGNONS':
            return {
                ...state,
                selectSignons: action.payload
            }
        case 'GET_SIGNONS_LIST_SUCCESS':
            return {
                ...state,
                signonsList: action.payload
            }
        case 'DELETE_SIGNONS_SUCCESS':
            action.asyncDispatch(getSignonsListAction.request())
            return {
                ...state
            }
        case 'UPDATE_SIGNONS_SUCCESS':
            action.asyncDispatch(getSignonsListAction.request())
            return {
                ...state
            }
        case 'CREATE_SIGNONS_SUCCESS':
            action.asyncDispatch(getSignonsListAction.request())
            return {
                ...state
            }
        default:
            return state
    }
}

export const getSignonsListEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(getSignonsListAction.request)),
        switchMap(() =>
            from(getSignonsList(state$.value.authenticationReducer.token, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map((signonsList: Signons[]) => getSignonsListAction.success(signonsList)),
                catchError(error => of(getSignonsListAction.failure(error.message)))
            )
        )
    )

export const createSignonsEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(createSignonsAction.request)),
        switchMap((action) =>
            from(createSignons(state$.value.authenticationReducer.token, action.payload, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map(() => createSignonsAction.success()),
                catchError(error => of(createSignonsAction.failure(error.message)))
            )
        )
    )

export const updateSignonsEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(updateSignonsAction.request)),
        switchMap((action) =>
            from(updateSignons(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => updateSignonsAction.success()),
                catchError(error => of(updateSignonsAction.failure(error.message)))
            )
        )
    )

export const deleteSignonsEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(deleteSignonsAction.request)),
        switchMap((action) =>
            from(deleteSignons(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => deleteSignonsAction.success()),
                catchError(error => of(deleteSignonsAction.failure(error.message)))
            )
        )
    )
