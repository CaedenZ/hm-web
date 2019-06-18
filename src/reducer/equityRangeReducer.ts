import { Epic } from "redux-observable";
import {
    switchMap,
    map,
    catchError,
    filter,
} from "rxjs/operators"
import { of, from } from "rxjs"
import { EquityRangeState, EquityRange } from "../interface/equityRangeInterface";
import { getEquityRangeList, createEquityRange, deleteEquityRange, updateEquityRange } from "../api/equityRangeAPI";
import { getEquityRangeListAction, createEquityRangeAction, deleteEquityRangeAction, updateEquityRangeAction } from "../actions/equityRangeAction";
import { isActionOf } from "typesafe-actions";


export function equityrangeReducer(state: EquityRangeState = {
    equityrangeList: [],
    selectEquityRange: {
        equity_range_id: '',
        lti_id: '',
        jobgrade_id: '',
        jobgrade_name: '',
        type: '',
        min: '',
        mid: '',
        max: '',
        country: '',
        jobgrade_global: '',
        value_type: 0,
    },
}, action) {
    switch (action.type) {
        case 'LOG_IN_SUCCESS':
            return {
                equityrangeList: [],
                selectEquityRange: {
                    equity_range_id: '',
                    lti_id: '',
                    jobgrade_id: '',
                    type: '',
                    min: '',
                    mid: '',
                    max: '',
                    country: '',
                },
            }
        case 'LOG_OUT':
            return {
                equityrangeList: [],
                selectEquityRange: {
                    equity_range_id: '',
                    lti_id: '',
                    jobgrade_id: '',
                    type: '',
                    min: '',
                    mid: '',
                    max: '',
                    country: '',
                },
            }
        case 'SELECT_EQUITYRANGE':
            return {
                ...state,
                selectEquityRange: action.payload
            }
        case 'GET_EQUITYRANGE_LIST_SUCCESS':
            return {
                ...state,
                equityrangeList: action.payload
            }
        case 'DELETE_EQUITYRANGE_SUCCESS':
            action.asyncDispatch(getEquityRangeListAction.request())
            return {
                ...state
            }
        case 'UPDATE_EQUITYRANGE_SUCCESS':
            action.asyncDispatch(getEquityRangeListAction.request())
            return {
                ...state
            }
        case 'CREATE_EQUITYRANGE_SUCCESS':
            action.asyncDispatch(getEquityRangeListAction.request())
            return {
                ...state
            }
        default:
            return state
    }
}

export const getEquityRangeListEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(getEquityRangeListAction.request)),
        switchMap(() =>
            from(getEquityRangeList(state$.value.authenticationReducer.token, state$.value.longIncentiveReducer.selectLongIncentive)).pipe(
                map((equityrangeList: EquityRange[]) => getEquityRangeListAction.success(equityrangeList)),
                catchError(error => of(getEquityRangeListAction.failure(error.message)))
            )
        )
    )

export const createEquityRangeEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(createEquityRangeAction.request)),
        switchMap((action) =>
            from(createEquityRange(state$.value.authenticationReducer.token, action.payload, state$.value.longIncentiveReducer.selectLongIncentive)).pipe(
                map(() => createEquityRangeAction.success()),
                catchError(error => of(createEquityRangeAction.failure(error.message)))
            )
        )
    )

export const updateEquityRangeEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(updateEquityRangeAction.request)),
        switchMap((action) =>
            from(updateEquityRange(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => updateEquityRangeAction.success()),
                catchError(error => of(updateEquityRangeAction.failure(error.message)))
            )
        )
    )

export const deleteEquityRangeEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(deleteEquityRangeAction.request)),
        switchMap((action) =>
            from(deleteEquityRange(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => deleteEquityRangeAction.success()),
                catchError(error => of(deleteEquityRangeAction.failure(error.message)))
            )
        )
    )
