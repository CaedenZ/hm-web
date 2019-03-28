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
import { CompanyState, Company, Unit } from "../interface/companyInterface";
import { getCompanyList, getChildCompanyList, createCompany, getUnitList, createUnit } from "../api/companyAPIs";
import { getCompanyListAction, getChildCompanyListAction, createCompanyAction, getUnitListAction, getChildUnitListAction, createUnitAction } from "../actions/companyAction";
import { isActionOf } from "typesafe-actions";


export function companyReducer(state: CompanyState = {
    companyList: [],
    childCompanyList: [],
    unitList: [],
    subUnitList: [],
}, action) {
    switch (action.type) {
        case 'SELECT_COMPANY':
            return {
                ...state,
                selectedCompany: action.payload
            }
        case 'GET_COMPANY_LIST_SUCCESS':
            return {
                ...state,
                companyList: action.payload
            }
        case 'GET_CHILD_COMPANY_LIST_SUCCESS':
            return {
                ...state,
                childCompanyList: action.payload
            }
        case 'GET_UNIT_LIST_SUCCESS':
            return {
                ...state,
                unitList: action.payload
            }
        case 'GET_CHILD_UNIT_LIST_SUCCESS':
            return {
                ...state,
                childUnitList: action.payload
            }
        default:
            return state
    }
}

export const getCompanyListEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(getCompanyListAction.request)),
        switchMap((action) =>
            from(getCompanyList(state$.value.authenticationReducer.token)).pipe(
                map((CompanyList: Company[]) => getCompanyListAction.success(CompanyList)),
                catchError(error => of(getCompanyListAction.failure(error.message)))
            )
        )
    )

export const getChildCompanyListEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(getChildCompanyListAction.request)),
        switchMap((action) =>
            from(getChildCompanyList(state$.value.authenticationReducer.token, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map((CompanyList: Company[]) => getChildCompanyListAction.success(CompanyList)),
                catchError(error => of(getChildCompanyListAction.failure(error.message)))
            )
        )
    )

export const createCompanyEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(createCompanyAction.request)),
        switchMap((action) =>
            from(createCompany(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => createCompanyAction.success()),
                catchError(error => of(createCompanyAction.failure(error.message)))
            )
        )
    )

export const getUnitListEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(getUnitListAction.request)),
        switchMap((action) =>
            from(getUnitList(state$.value.authenticationReducer.token, 0, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map((UnitList: Unit[]) => getUnitListAction.success(UnitList)),
                catchError(error => of(getUnitListAction.failure(error.message)))
            )
        )
    )

export const getChildUnitListEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(getChildUnitListAction.request)),
        switchMap((action) =>
            from(getUnitList(state$.value.authenticationReducer.token, 1, action.payload)).pipe(
                map((UnitList: Unit[]) => getChildUnitListAction.success(UnitList)),
                catchError(error => of(getChildUnitListAction.failure(error.message)))
            )
        )
    )

export const createUnitEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(createUnitAction.request)),
        switchMap((action) =>
            from(createUnit(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => createUnitAction.success()),
                catchError(error => of(createUnitAction.failure(error.message)))
            )
        )
    )

