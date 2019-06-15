import { Epic } from "redux-observable";
import {
    switchMap,
    map,
    catchError,
    filter,
} from "rxjs/operators"
import { of, from } from "rxjs"
import { SalaryRangeState, SalaryRange } from "../interface/salaryRangeInterface";
import { getSalaryRangeList, createSalaryRange, deleteSalaryRange, updateSalaryRange } from "../api/salaryRangeAPI";
import { getSalaryRangeListAction, createSalaryRangeAction, deleteSalaryRangeAction, updateSalaryRangeAction } from "../actions/salaryRangeAction";
import { isActionOf } from "typesafe-actions";


export function salaryRangeReducer(state: SalaryRangeState = {
    salaryrangeList: [],
    selectSalaryRange: {
        salary_range_id: '',
        jobgrade_id: '',
        jobgrade_name: '',
        type: '',
        jobgrade_global: '',
        country: '',
        min: '',
        mid: '',
        max: '',
    },
}, action) {
    switch (action.type) {
        case 'LOG_IN_SUCCESS':
            return {
                salaryrangeList: [],
                selectSalaryRange: {
                    salary_range_id: '',
                    jobgrade_id: '',
                    type: '',
                    global: 0,
                    country: '',
                    min: '',
                    mid: '',
                    max: '',
                },
            }
        case 'LOG_OUT':
            return {
                salaryrangeList: [],
                selectSalaryRange: {
                    salaryrange_id: '',
                    salaryrange_name: '',
                    type: '',
                    global: 0,
                    country: '',
                    salary_range: '',
                    allowance: '',
                    target_bonus: '',
                },
            }
        case 'SELECT_SALARYRANGE':
            return {
                ...state,
                selectSalaryRange: action.payload
            }
        case 'GET_SALARYRANGE_LIST_SUCCESS':
            return {
                ...state,
                salaryrangeList: action.payload
            }
        case 'DELETE_SALARYRANGE_SUCCESS':
            action.asyncDispatch(getSalaryRangeListAction.request())
            return {
                ...state
            }
        case 'UPDATE_SALARYRANGE_SUCCESS':
            action.asyncDispatch(getSalaryRangeListAction.request())
            return {
                ...state
            }
        case 'CREATE_SALARYRANGE_SUCCESS':
            action.asyncDispatch(getSalaryRangeListAction.request())
            return {
                ...state
            }
        default:
            return state
    }
}

export const getSalaryRangeListEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(getSalaryRangeListAction.request)),
        switchMap(() =>
            from(getSalaryRangeList(state$.value.authenticationReducer.token, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map((salaryrangeList: SalaryRange[]) => getSalaryRangeListAction.success(salaryrangeList)),
                catchError(error => of(getSalaryRangeListAction.failure(error.message)))
            )
        )
    )

export const createSalaryRangeEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(createSalaryRangeAction.request)),
        switchMap((action) =>
            from(createSalaryRange(state$.value.authenticationReducer.token, action.payload, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map(() => createSalaryRangeAction.success()),
                catchError(error => of(createSalaryRangeAction.failure(error.message)))
            )
        )
    )

export const updateSalaryRangeEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(updateSalaryRangeAction.request)),
        switchMap((action) =>
            from(updateSalaryRange(state$.value.authenticationReducer.token, action.payload, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map(() => updateSalaryRangeAction.success()),
                catchError(error => of(updateSalaryRangeAction.failure(error.message)))
            )
        )
    )

export const deleteSalaryRangeEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(deleteSalaryRangeAction.request)),
        switchMap((action) =>
            from(deleteSalaryRange(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => deleteSalaryRangeAction.success()),
                catchError(error => of(deleteSalaryRangeAction.failure(error.message)))
            )
        )
    )
