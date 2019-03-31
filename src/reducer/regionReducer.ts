import { RegionState, Region } from "../interface/regionInterface";
import { Epic } from "redux-observable";
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { getRegionListAction, createRegionAction, updateRegionAction, deleteRegionAction } from "../actions/regionAction";
import { from, of } from "rxjs";
import { getRegionList, createRegion, updateRegion, deleteRegion } from "../api/regionApi";

export function regionReducer(state: RegionState = {
    regionList: [],
}, action) {
    switch (action.type) {
        case 'SELECT_REGION':
            return {
                ...state,
                selectedRegion: action.payload
            }
        case 'GET_REGION_LIST_SUCCESS':
            return {
                ...state,
                regionList: action.payload
            }
        case 'CREATE_REGION_SUCCESS':
            action.asyncDispatch(getRegionListAction.request())
            return {
                ...state,
            }
        case 'UPDATE_REGION_SUCCESS':
            action.asyncDispatch(getRegionListAction.request())
            return {
                ...state,
            }
        case 'DELETE_REGION_SUCCESS':
            action.asyncDispatch(getRegionListAction.request())
            return {
                ...state,
            }
        default:
            return state
    }
}

export const getRegionListEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(getRegionListAction.request)),
        switchMap((action) =>
            from(getRegionList(state$.value.authenticationReducer.token, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map((RegionList: Region[]) => getRegionListAction.success(RegionList)),
                catchError(error => of(getRegionListAction.failure(error.message)))
            )
        )
    )

export const createRegionEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(createRegionAction.request)),
        switchMap((action) =>
            from(createRegion(state$.value.authenticationReducer.token, action.payload, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map(() => createRegionAction.success()),
                catchError(error => of(createRegionAction.failure(error.message)))
            )
        )
    )

export const updateRegionEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(updateRegionAction.request)),
        switchMap((action) =>
            from(updateRegion(state$.value.authenticationReducer.token, action.payload, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map(() => updateRegionAction.success()),
                catchError(error => of(updateRegionAction.failure(error.message)))
            )
        )
    )

export const deleteRegionEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(deleteRegionAction.request)),
        switchMap((action) =>
            from(deleteRegion(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => deleteRegionAction.success()),
                catchError(error => of(deleteRegionAction.failure(error.message)))
            )
        )
    )