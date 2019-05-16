import { Epic } from "redux-observable";
import {
    switchMap,
    map,
    catchError,
    filter,
} from "rxjs/operators"
import { of, from } from "rxjs"
import { TargetBonusState, TargetBonus } from "../interface/targetBonusInterface";
import { getTargetBonusList, createTargetBonus, deleteTargetBonus, updateTargetBonus } from "../api/targetBonusAPI";
import { getTargetBonusListAction, createTargetBonusAction, deleteTargetBonusAction, updateTargetBonusAction } from "../actions/targetBonusAction";
import { isActionOf } from "typesafe-actions";


export function targetBonusReducer(state: TargetBonusState = {
    targetbonusList: [],
    selectTargetBonus: {
        target_bonus_id: '',
        jobgrade_id: '',
        jobgrade_global: 0,
        jobgrade_name: '',
        country: '',
        min: '',
        mid: '',
        max: '',
        isGlobal: 0,
    },
}, action) {
    switch (action.type) {
        case 'LOG_IN_SUCCESS':
            return {
                targetbonusList: [],
                selectTargetBonus: {
                    target_bonus_id: '',
                    jobgrade_id: '',
                    global: 0,
                    country: '',
                    min: '',
                    mid: '',
                    max: '',
                },
            }
        case 'LOG_OUT':
            return {
                targetbonusList: [],
                selectTargetBonus: {
                    targetbonus_id: '',
                    targetbonus_name: '',
                    type: '',
                    global: 0,
                    country: '',
                    salary_range: '',
                    allowance: '',
                    target_bonus: '',
                },
            }
        case 'SELECT_TARGETBONUS':
            return {
                ...state,
                selectTargetBonus: action.payload
            }
        case 'GET_TARGETBONUS_LIST_SUCCESS':
            return {
                ...state,
                targetbonusList: action.payload
            }
        case 'DELETE_TARGETBONUS_SUCCESS':
            action.asyncDispatch(getTargetBonusListAction.request())
            return {
                ...state
            }
        case 'UPDATE_TARGETBONUS_SUCCESS':
            action.asyncDispatch(getTargetBonusListAction.request())
            return {
                ...state
            }
        case 'CREATE_TARGETBONUS_SUCCESS':
            action.asyncDispatch(getTargetBonusListAction.request())
            return {
                ...state
            }
        default:
            return state
    }
}

export const getTargetBonusListEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(getTargetBonusListAction.request)),
        switchMap(() =>
            from(getTargetBonusList(state$.value.authenticationReducer.token, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map((targetbonusList: TargetBonus[]) => getTargetBonusListAction.success(targetbonusList)),
                catchError(error => of(getTargetBonusListAction.failure(error.message)))
            )
        )
    )

export const createTargetBonusEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(createTargetBonusAction.request)),
        switchMap((action) =>
            from(createTargetBonus(state$.value.authenticationReducer.token, action.payload, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map(() => createTargetBonusAction.success()),
                catchError(error => of(createTargetBonusAction.failure(error.message)))
            )
        )
    )

export const updateTargetBonusEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(updateTargetBonusAction.request)),
        switchMap((action) =>
            from(updateTargetBonus(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => updateTargetBonusAction.success()),
                catchError(error => of(updateTargetBonusAction.failure(error.message)))
            )
        )
    )

export const deleteTargetBonusEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(deleteTargetBonusAction.request)),
        switchMap((action) =>
            from(deleteTargetBonus(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => deleteTargetBonusAction.success()),
                catchError(error => of(deleteTargetBonusAction.failure(error.message)))
            )
        )
    )
