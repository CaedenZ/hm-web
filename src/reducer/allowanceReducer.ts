import { Epic } from "redux-observable";
import {
    switchMap,
    map,
    catchError,
    filter,
} from "rxjs/operators"
import { of, from } from "rxjs"
import { AllowancesState, Allowances } from "../interface/allowanceInterface";
import { getAllowancesList, createAllowances, deleteAllowances, updateAllowances } from "../api/allowanceAPI";
import { getAllowancesListAction, createAllowancesAction, deleteAllowancesAction, updateAllowancesAction } from "../actions/allowanceAction";
import { isActionOf } from "typesafe-actions";


export function allowancesReducer(state: AllowancesState = {
    allowancesList: [],
    selectAllowances: {
        allowance_id: '',
        jobgrade_id: '',
        jobgrade_name: '',
        type: '',
        jobgrade_global: 0,
        country: '',
        value: '',
        isBonus: '',
        isOptional: '',
        value_type: 0,
    },
}, action) {
    switch (action.type) {
        case 'LOG_IN_SUCCESS':
            return {
                allowancesList: [],
                selectAllowances: {
                    allowances_id: '',
                    allowances_name: '',
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
                allowancesList: [],
                selectAllowances: {
                    allowances_id: '',
                    allowances_name: '',
                    type: '',
                    global: 0,
                    country: '',
                    salary_range: '',
                    allowance: '',
                    target_bonus: '',
                },
            }
        case 'SELECT_ALLOWANCES':
            return {
                ...state,
                selectAllowances: action.payload
            }
        case 'GET_ALLOWANCES_LIST_SUCCESS':
            return {
                ...state,
                allowancesList: action.payload
            }
        case 'DELETE_ALLOWANCES_SUCCESS':
            action.asyncDispatch(getAllowancesListAction.request())
            return {
                ...state
            }
        case 'UPDATE_ALLOWANCES_SUCCESS':
            action.asyncDispatch(getAllowancesListAction.request())
            return {
                ...state
            }
        case 'CREATE_ALLOWANCES_SUCCESS':
            action.asyncDispatch(getAllowancesListAction.request())
            return {
                ...state
            }
        default:
            return state
    }
}

export const getAllowancesListEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(getAllowancesListAction.request)),
        switchMap(() =>
            from(getAllowancesList(state$.value.authenticationReducer.token, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map((allowancesList: Allowances[]) => getAllowancesListAction.success(allowancesList)),
                catchError(error => of(getAllowancesListAction.failure(error.message)))
            )
        )
    )

export const createAllowancesEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(createAllowancesAction.request)),
        switchMap((action) =>
            from(createAllowances(state$.value.authenticationReducer.token, action.payload, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map(() => createAllowancesAction.success()),
                catchError(error => of(createAllowancesAction.failure(error.message)))
            )
        )
    )

export const updateAllowancesEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(updateAllowancesAction.request)),
        switchMap((action) =>
            from(updateAllowances(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => updateAllowancesAction.success()),
                catchError(error => of(updateAllowancesAction.failure(error.message)))
            )
        )
    )

export const deleteAllowancesEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(deleteAllowancesAction.request)),
        switchMap((action) =>
            from(deleteAllowances(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => deleteAllowancesAction.success()),
                catchError(error => of(deleteAllowancesAction.failure(error.message)))
            )
        )
    )
