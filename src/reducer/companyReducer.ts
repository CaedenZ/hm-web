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
import { getCompanyList, getChildCompanyList, createCompany, getUnitList, createUnit, updateUnit, deleteUnit, createSubCompany, deleteSubCompany, deleteCompany, updateSubCompany, updateCompany } from "../api/companyAPIs";
import { getCompanyListAction, getChildCompanyListAction, createCompanyAction, getUnitListAction, getChildUnitListAction, createUnitAction, createSubUnitAction, updateUnitAction, deleteUnitAction, updateSubUnitAction, deleteSubUnitAction, updateChildUnitAction, deleteChildUnitAction, getSubUnitListAction, createChildUnitAction, createSubCompanyAction, deleteSubCompanyAction, deleteCompanyAction, updateCompanyAction, updateSubCompanyAction } from "../actions/companyAction";
import { isActionOf } from "typesafe-actions";


export function companyReducer(state: CompanyState = {
    companyList: [],
    childCompanyList: [],
    unitList: [],
    subUnitList: [],
    childUnitList: [],
    selectedCompany: {
        company_id: '',
        sector: '',
        location: '',
        company_name: '',
        industry: '',
        country: '',
        address: '',
        postal_code: '',
        logo_small: '',
        contact_person: '',
        contact_number: '',
        contact_email: '',
        hq_name: '',
        base_currency_id: '',
        logo_main: '',
        parentcompany_id: '',
        webpage_url: '',
    },
}, action) {
    switch (action.type) {
        case 'SELECT_COMPANY':
            return {
                ...state,
                selectedCompany: action.payload
            }
        case 'SELECT_UPDATE_COMPANY':
            return {
                ...state,
                selectedUpdateCompany: action.payload
            }
        case 'SELECT_UNIT':
            return {
                ...state,
                selectedUnit: action.payload
            }
        case 'SELECT_SUBUNIT':
            return {
                ...state,
                selectedSubUnit: action.payload
            }
        case 'SELECT_UPDATE_UNIT':
            return {
                ...state,
                selectUpdateUnit: action.payload
            }
        case 'GET_COMPANY_LIST_SUCCESS':
            return {
                ...state,
                companyList: action.payload,
                // selectedCompany: action.payload[0]
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
        case 'GET_SUBUNIT_LIST_SUCCESS':
            return {
                ...state,
                subUnitList: action.payload
            }
        case 'GET_CHILD_UNIT_LIST_SUCCESS':
            return {
                ...state,
                childUnitList: action.payload
            }
        case 'DELETE_COMPANY_SUCCESS':
            action.asyncDispatch(getCompanyListAction.request())
            return {
                ...state
            }
        case 'UPDATE_COMPANY_SUCCESS':
            action.asyncDispatch(getCompanyListAction.request())
            return {
                ...state
            }
        case 'CREATE_COMPANY_SUCCESS':
            action.asyncDispatch(getCompanyListAction.request())
            return {
                ...state
            }
        case 'DELETE_SUBCOMPANY_SUCCESS':
            action.asyncDispatch(getChildCompanyListAction.request())
            return {
                ...state
            }
        case 'UPDATE_SUBCOMPANY_SUCCESS':
            action.asyncDispatch(getChildCompanyListAction.request())
            return {
                ...state
            }
        case 'CREATE_SUBCOMPANY_SUCCESS':
            action.asyncDispatch(getChildCompanyListAction.request())
            return {
                ...state
            }
        case 'DELETE_UNIT_SUCCESS':
            action.asyncDispatch(getUnitListAction.request())
            return {
                ...state
            }
        case 'UPDATE_UNIT_SUCCESS':
            action.asyncDispatch(getUnitListAction.request())
            return {
                ...state
            }
        case 'CREATE_UNIT_SUCCESS':
            action.asyncDispatch(getUnitListAction.request())
            return {
                ...state
            }
        case 'DELETE_SUBUNIT_SUCCESS':
            action.asyncDispatch(getSubUnitListAction.request())
            return {
                ...state
            }
        case 'UPDATE_SUBUNIT_SUCCESS':
            action.asyncDispatch(getSubUnitListAction.request())
            return {
                ...state
            }
        case 'CREATE_SUBUNIT_SUCCESS':
            action.asyncDispatch(getSubUnitListAction.request())
            return {
                ...state
            }
        case 'DELETE_CHILDUNIT_SUCCESS':
            action.asyncDispatch(getChildUnitListAction.request())
            return {
                ...state
            }
        case 'UPDATE_CHILDUNIT_SUCCESS':
            action.asyncDispatch(getChildUnitListAction.request())
            return {
                ...state
            }
        case 'CREATE_CHILDUNIT_SUCCESS':
            action.asyncDispatch(getChildUnitListAction.request())
            return {
                ...state
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
export const createSubCompanyEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(createSubCompanyAction.request)),
        switchMap((action) =>
            from(createCompany(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => createSubCompanyAction.success()),
                catchError(error => of(createSubCompanyAction.failure(error.message)))
            )
        )
    )

export const updateCompanyEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(updateCompanyAction.request)),
        switchMap((action) =>
            from(updateCompany(state$.value.authenticationReducer.token, 0, action.payload)).pipe(
                map(() => updateCompanyAction.success()),
                catchError(error => of(updateCompanyAction.failure(error.message)))
            )
        )
    )
export const updateSubCompanyEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(updateSubCompanyAction.request)),
        switchMap((action) =>
            from(updateCompany(state$.value.authenticationReducer.token, 1, action.payload)).pipe(
                map(() => updateSubCompanyAction.success()),
                catchError(error => of(updateSubCompanyAction.failure(error.message)))
            )
        )
    )

export const deleteCompanyEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(deleteCompanyAction.request)),
        switchMap((action) =>
            from(deleteCompany(state$.value.authenticationReducer.token, 0, action.payload)).pipe(
                map(() => deleteCompanyAction.success()),
                catchError(error => of(deleteCompanyAction.failure(error.message)))
            )
        )
    )
export const deleteSubCompanyEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(deleteSubCompanyAction.request)),
        switchMap((action) =>
            from(deleteCompany(state$.value.authenticationReducer.token, 1, action.payload)).pipe(
                map(() => deleteSubCompanyAction.success()),
                catchError(error => of(deleteSubCompanyAction.failure(error.message)))
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

export const getSubUnitListEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(getSubUnitListAction.request)),
        switchMap((action) =>
            from(getUnitList(state$.value.authenticationReducer.token, 1, state$.value.companyReducer.selectedUnit.unit_id)).pipe(
                map((UnitList: Unit[]) => getSubUnitListAction.success(UnitList)),
                catchError(error => of(getSubUnitListAction.failure(error.message)))
            )
        )
    )

export const getChildUnitListEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(getChildUnitListAction.request)),
        switchMap((action) =>
            from(getUnitList(state$.value.authenticationReducer.token, 2, state$.value.companyReducer.selectedSubUnit.unit_id)).pipe(
                map((UnitList: Unit[]) => getChildUnitListAction.success(UnitList)),
                catchError(error => of(getChildUnitListAction.failure(error.message)))
            )
        )
    )

export const createUnitEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(createUnitAction.request)),
        switchMap((action) =>
            from(createUnit(state$.value.authenticationReducer.token, 0, action.payload)).pipe(
                map(() => createUnitAction.success()),
                catchError(error => of(createUnitAction.failure(error.message)))
            )
        )
    )

export const createSubUnitEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(createSubUnitAction.request)),
        switchMap((action) =>
            from(createUnit(state$.value.authenticationReducer.token, 1, action.payload)).pipe(
                map(() => createSubUnitAction.success()),
                catchError(error => of(createSubUnitAction.failure(error.message)))
            )
        )
    )

export const createChildUnitEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(createChildUnitAction.request)),
        switchMap((action) =>
            from(createUnit(state$.value.authenticationReducer.token, 2, action.payload)).pipe(
                map(() => createChildUnitAction.success()),
                catchError(error => of(createChildUnitAction.failure(error.message)))
            )
        )
    )

export const updateUnitEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(updateUnitAction.request)),
        switchMap((action) =>
            from(updateUnit(state$.value.authenticationReducer.token, 0, action.payload)).pipe(
                map(() => updateUnitAction.success()),
                catchError(error => of(updateUnitAction.failure(error.message)))
            )
        )
    )

export const updateSubUnitEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(updateSubUnitAction.request)),
        switchMap((action) =>
            from(updateUnit(state$.value.authenticationReducer.token, 1, action.payload)).pipe(
                map(() => updateSubUnitAction.success()),
                catchError(error => of(updateSubUnitAction.failure(error.message)))
            )
        )
    )

export const deleteUnitEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(deleteUnitAction.request)),
        switchMap((action) =>
            from(deleteUnit(state$.value.authenticationReducer.token, 0, action.payload)).pipe(
                map(() => deleteUnitAction.success()),
                catchError(error => of(deleteUnitAction.failure(error.message)))
            )
        )
    )

export const deleteSubUnitEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(deleteSubUnitAction.request)),
        switchMap((action) =>
            from(deleteUnit(state$.value.authenticationReducer.token, 1, action.payload)).pipe(
                map(() => deleteSubUnitAction.success()),
                catchError(error => of(deleteSubUnitAction.failure(error.message)))
            )
        )
    )

export const updateChildUnitEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(updateChildUnitAction.request)),
        switchMap((action) =>
            from(updateUnit(state$.value.authenticationReducer.token, 2, action.payload)).pipe(
                map(() => updateChildUnitAction.success()),
                catchError(error => of(updateChildUnitAction.failure(error.message)))
            )
        )
    )

export const deleteChildUnitEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(deleteChildUnitAction.request)),
        switchMap((action) =>
            from(deleteUnit(state$.value.authenticationReducer.token, 2, action.payload)).pipe(
                map(() => deleteChildUnitAction.success()),
                catchError(error => of(deleteChildUnitAction.failure(error.message)))
            )
        )
    )

