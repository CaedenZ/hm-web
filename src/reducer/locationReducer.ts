import { LocationState, Location } from "../interface/locationInterface";
import { Epic } from "redux-observable";
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { getLocationListAction, createLocationAction, updateLocationAction, deleteLocationAction } from "../actions/locationAction";
import { from, of } from "rxjs";
import { getLocationList, createLocation, updateLocation, deleteLocation } from "../api/locationApi";

export function locationReducer(state: LocationState = {
    locationList: [],
}, action) {
    switch (action.type) {
        case 'LOG_IN_SUCCESS':
            return {
                locationList: [],
            }
        case 'LOG_OUT':
            return {
                locationList: [],
            }
        case 'SELECT_LOCATION':
            return {
                ...state,
                selectedLocation: action.payload
            }
        case 'GET_LOCATION_LIST_SUCCESS':
            return {
                ...state,
                locationList: action.payload
            }
        case 'CREATE_LOCATION_SUCCESS':
            action.asyncDispatch(getLocationListAction.request())
            return {
                ...state,
            }
        case 'UPDATE_LOCATION_SUCCESS':
            action.asyncDispatch(getLocationListAction.request())
            return {
                ...state,
            }
        case 'DELETE_LOCATION_SUCCESS':
            action.asyncDispatch(getLocationListAction.request())
            return {
                ...state,
            }
        default:
            return state
    }
}

export const getLocationListEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(getLocationListAction.request)),
        switchMap((action) =>
            from(getLocationList(state$.value.authenticationReducer.token, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map((LocationList: Location[]) => getLocationListAction.success(LocationList)),
                catchError(error => of(getLocationListAction.failure(error.message)))
            )
        )
    )

export const createLocationEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(createLocationAction.request)),
        switchMap((action) =>
            from(createLocation(state$.value.authenticationReducer.token, action.payload, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map(() => createLocationAction.success()),
                catchError(error => of(createLocationAction.failure(error.message)))
            )
        )
    )

export const updateLocationEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(updateLocationAction.request)),
        switchMap((action) =>
            from(updateLocation(state$.value.authenticationReducer.token, action.payload, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map(() => updateLocationAction.success()),
                catchError(error => of(updateLocationAction.failure(error.message)))
            )
        )
    )

export const deleteLocationEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(deleteLocationAction.request)),
        switchMap((action) =>
            from(deleteLocation(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => deleteLocationAction.success()),
                catchError(error => of(deleteLocationAction.failure(error.message)))
            )
        )
    )
