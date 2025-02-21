import { Epic } from "redux-observable";
import {
    switchMap,
    map,
    catchError,
    filter,
} from "rxjs/operators"
import { of, from } from "rxjs"
import { LongIncentiveState, LongIncentive } from "../interface/longIncentiveInterface";
import { getLongIncentiveList, createLongIncentive, deleteLongIncentive, updateLongIncentive } from "../api/longIncentiveAPI";
import { getLongIncentiveListAction, createLongIncentiveAction, deleteLongIncentiveAction, updateLongIncentiveAction } from "../actions/longIncentiveAction";
import { isActionOf } from "typesafe-actions";


export function longIncentiveReducer(state: LongIncentiveState = {
    longincentiveList: [],
    selectLongIncentive: {
        longterm_incentive_id: '',
        value: '',
        type: '',
        investing_type: '',
        country: '',
        equity_type: '',
        job_grade: '',
        min: 0,
        mid: 0,
        max: 0,
        year1: 0,
        year2: 0,
        year3: 0,
        year4: 0,
        year5: 0,
        year6: 0,
        share_symbol: '',
        share_exchange: '',
        share_price: 0,
        currency: '',
        isOptional: '',
    },
}, action) {
    switch (action.type) {
        case 'LOG_IN_SUCCESS':
            return {
                longincentiveList: [],
                selectLongIncentive: {
                    longincentive_id: '',
                    longincentive_name: '',
                    type: '',
                    global: 0,
                    country: '',
                    salary_range: '',
                    allowance: '',
                    target_bonus: '',
                },
            }
        case 'LOG_OUT':
            return {
                longincentiveList: [],
                selectLongIncentive: {
                    longincentive_id: '',
                    longincentive_name: '',
                    type: '',
                    global: 0,
                    country: '',
                    salary_range: '',
                    allowance: '',
                    target_bonus: '',
                },
            }
        case 'SELECT_LONGINCENTIVE':
            return {
                ...state,
                selectLongIncentive: action.payload
            }
        case 'GET_LONGINCENTIVE_LIST_SUCCESS':
            return {
                ...state,
                longincentiveList: action.payload
            }
        case 'DELETE_LONGINCENTIVE_SUCCESS':
            action.asyncDispatch(getLongIncentiveListAction.request())
            return {
                ...state
            }
        case 'UPDATE_LONGINCENTIVE_SUCCESS':
            action.asyncDispatch(getLongIncentiveListAction.request())
            return {
                ...state
            }
        case 'CREATE_LONGINCENTIVE_SUCCESS':
            action.asyncDispatch(getLongIncentiveListAction.request())
            return {
                ...state
            }
        default:
            return state
    }
}

export const getLongIncentiveListEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(getLongIncentiveListAction.request)),
        switchMap(() =>
            from(getLongIncentiveList(state$.value.authenticationReducer.token, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map((longincentiveList: LongIncentive[]) => getLongIncentiveListAction.success(longincentiveList)),
                catchError(error => of(getLongIncentiveListAction.failure(error.message)))
            )
        )
    )

export const createLongIncentiveEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(createLongIncentiveAction.request)),
        switchMap((action) =>
            from(createLongIncentive(state$.value.authenticationReducer.token, action.payload, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map(() => createLongIncentiveAction.success()),
                catchError(error => of(createLongIncentiveAction.failure(error.message)))
            )
        )
    )

export const updateLongIncentiveEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(updateLongIncentiveAction.request)),
        switchMap((action) =>
            from(updateLongIncentive(state$.value.authenticationReducer.token, action.payload, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map(() => updateLongIncentiveAction.success()),
                catchError(error => of(updateLongIncentiveAction.failure(error.message)))
            )
        )
    )

export const deleteLongIncentiveEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(deleteLongIncentiveAction.request)),
        switchMap((action) =>
            from(deleteLongIncentive(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => deleteLongIncentiveAction.success()),
                catchError(error => of(deleteLongIncentiveAction.failure(error.message)))
            )
        )
    )
