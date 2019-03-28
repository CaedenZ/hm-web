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
import { CompanyState, Company } from "../interface/companyInterface";
import { getCompanyList, getChildCompanyList, createCompany } from "../api/companyAPIs";
import { getCompanyListAction, getChildCompanyListAction, createCompanyAction } from "../actions/companyAction";
import { isActionOf } from "typesafe-actions";


export function companyReducer(state: CompanyState = {
    companyList: [],
    childCompanyList: [],
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
