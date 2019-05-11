import { Epic, ofType } from "redux-observable";
import { AuthenticationAction } from "../actions";
import {
    switchMap,
    map,
    catchError,
    filter,
    tap,
    flatMap,
} from "rxjs/operators"
import { of, from } from "rxjs"
import { ShortIncentiveState, ShortIncentive } from "../interface/shortIncentiveInterface";
import { getShortIncentiveList, createShortIncentive, deleteShortIncentive, updateShortIncentive } from "../api/shortIncentiveAPI";
import { getShortIncentiveListAction, createShortIncentiveAction, deleteShortIncentiveAction, updateShortIncentiveAction } from "../actions/shortIncentiveAction";
import { isActionOf } from "typesafe-actions";


export function shortIncentiveReducer(state: ShortIncentiveState = {
    shortincentiveList: [],
    selectShortIncentive: {
        shortterm_incentive_id: '',
        jobgrade_id: '',
        jobgrade_name: '',
        type: '',
        global: 0,
        country: '',
        value: '',
        isOptional: 0,
        value_type: 0,
    },
}, action) {
    switch (action.type) {
        case 'LOG_IN_SUCCESS':
            return {
                shortincentiveList: [],
                selectShortIncentive: {
                    shortterm_incentive_id: '',
                    jobgrade_id: '',
                    type: '',
                    global: 0,
                    country: '',
                    value: '',
                    isOptional: 0,
                },
            }
        case 'LOG_OUT':
            return {
                shortincentiveList: [],
                selectShortIncentive: {
                    shortterm_incentive_id: '',
                    jobgrade_id: '',
                    type: '',
                    global: 0,
                    country: '',
                    value: '',
                    isOptional: 0,
                },
            }
        case 'SELECT_SHORTINCENTIVE':
            return {
                ...state,
                selectShortIncentive: action.payload
            }
        case 'GET_SHORTINCENTIVE_LIST_SUCCESS':
            return {
                ...state,
                shortincentiveList: action.payload
            }
        case 'DELETE_SHORTINCENTIVE_SUCCESS':
            action.asyncDispatch(getShortIncentiveListAction.request())
            return {
                ...state
            }
        case 'UPDATE_SHORTINCENTIVE_SUCCESS':
            action.asyncDispatch(getShortIncentiveListAction.request())
            return {
                ...state
            }
        case 'CREATE_SHORTINCENTIVE_SUCCESS':
            action.asyncDispatch(getShortIncentiveListAction.request())
            return {
                ...state
            }
        default:
            return state
    }
}

export const getShortIncentiveListEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(getShortIncentiveListAction.request)),
        switchMap((action) =>
            from(getShortIncentiveList(state$.value.authenticationReducer.token, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map((shortincentiveList: ShortIncentive[]) => getShortIncentiveListAction.success(shortincentiveList)),
                catchError(error => of(getShortIncentiveListAction.failure(error.message)))
            )
        )
    )

export const createShortIncentiveEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(createShortIncentiveAction.request)),
        switchMap((action) =>
            from(createShortIncentive(state$.value.authenticationReducer.token, action.payload, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map(() => createShortIncentiveAction.success()),
                catchError(error => of(createShortIncentiveAction.failure(error.message)))
            )
        )
    )

export const updateShortIncentiveEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(updateShortIncentiveAction.request)),
        switchMap((action) =>
            from(updateShortIncentive(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => updateShortIncentiveAction.success()),
                catchError(error => of(updateShortIncentiveAction.failure(error.message)))
            )
        )
    )

export const deleteShortIncentiveEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(deleteShortIncentiveAction.request)),
        switchMap((action) =>
            from(deleteShortIncentive(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => deleteShortIncentiveAction.success()),
                catchError(error => of(deleteShortIncentiveAction.failure(error.message)))
            )
        )
    )
