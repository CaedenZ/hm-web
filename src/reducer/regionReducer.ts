import { RegionState, Region } from "../interface/regionInterface";
import { Epic } from "redux-observable";
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { getRegionListAction } from "../actions/regionAction";
import { from, of } from "rxjs";
import { getRegionList } from "../api/regionApi";

export function regionReducer(state: RegionState = {
    regionList: [],
}, action) {
    switch (action.type) {
        case 'GET_REGION_LIST_SUCCESS':
            return {
                ...state,
                regionList: action.payload
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