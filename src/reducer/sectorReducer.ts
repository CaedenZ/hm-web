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
import { login } from "../api/authenticationAPI";
import { loginAction } from "../actions/authenticationAction";
import { Sector, SectorState } from "../interface/sectorInterface";
import { getSectorList, createSector, createIndustry, deleteIndustry, deleteSector, updateSector, updateIndustry } from "../api/sectorAPIs";
import { getSectorListAction, createSectorAction, createIndustryAction, deleteIndustryAction, deleteSectorAction, updateSectorAction, updateIndustryAction } from "../actions/sectorAction";
import { isActionOf } from "typesafe-actions";


export function sectorReducer(state: SectorState = {
    sectorList: [],
    selectedSector: ''
}, action) {
    switch (action.type) {
        case 'GET_SECTOR_LIST_SUCCESS':
            return {
                ...state,
                sectorList: action.payload
            }
        case 'SELECT_SECTOR':
            return {
                ...state,
                selectedSector: action.payload.sector_id
            }
        case 'CREATE_SECTOR_SUCCESS':
            action.asyncDispatch(getSectorListAction.request())
            return {
                ...state,
            }
        case 'CREATE_INDUSTRY_SUCCESS':
            action.asyncDispatch(getSectorListAction.request())
            return {
                ...state,
            }
        case 'UPDATE_SECTOR_SUCCESS':
            action.asyncDispatch(getSectorListAction.request())
            return {
                ...state,
            }
        case 'UPDATE_INDUSTRY_SUCCESS':
            action.asyncDispatch(getSectorListAction.request())
            return {
                ...state,
            }
        case 'DELETE_SECTOR_SUCCESS':
            action.asyncDispatch(getSectorListAction.request())
            return {
                ...state,
            }
        case 'DELETE_INDUSTRY_SUCCESS':
            action.asyncDispatch(getSectorListAction.request())
            return {
                ...state,
            }
        default:
            return state
    }
}

export const getSectorListEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(getSectorListAction.request)),
        switchMap((action) =>
            from(getSectorList(state$.value.authenticationReducer.token)).pipe(
                map((sectorList: Sector[]) => getSectorListAction.success(sectorList)),
                catchError(error => of(getSectorListAction.failure(error.message)))
            )
        )
    )

export const createSectorEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(createSectorAction.request)),
        switchMap((action) =>
            from(createSector(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => createSectorAction.success()),
                catchError(error => of(createSectorAction.failure(error.message)))
            )
        )
    )

export const createIndustryEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(createIndustryAction.request)),
        switchMap((action) =>
            from(createIndustry(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => createIndustryAction.success()),
                catchError(error => of(createIndustryAction.failure(error.message)))
            )
        )
    )

export const updateSectorEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(updateSectorAction.request)),
        switchMap((action) =>
            from(updateSector(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => updateSectorAction.success()),
                catchError(error => of(updateSectorAction.failure(error.message)))
            )
        )
    )

export const updateIndustryEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(updateIndustryAction.request)),
        switchMap((action) =>
            from(updateIndustry(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => updateIndustryAction.success()),
                catchError(error => of(updateIndustryAction.failure(error.message)))
            )
        )
    )

export const deleteSectorEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(deleteSectorAction.request)),
        switchMap((action) =>
            from(deleteSector(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => deleteSectorAction.success(action.payload)),
                catchError(error => of(deleteSectorAction.failure(error.message)))
            )
        )
    )

export const deleteIndustryEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(deleteIndustryAction.request)),
        switchMap((action) =>
            from(deleteIndustry(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => deleteIndustryAction.success(action.payload)),
                catchError(error => of(deleteIndustryAction.failure(error.message)))
            )
        )
    )