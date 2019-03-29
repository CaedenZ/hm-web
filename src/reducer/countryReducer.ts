import { CountryState, Country } from "../interface/countryInterface";
import { Epic } from "redux-observable";
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { getCountryListAction } from "../actions/countryAction";
import { from, of } from "rxjs";
import { getCountryList } from "../api/countryApi";

export function countryReducer(state: CountryState = {
    countryList: [],
}, action) {
    switch (action.type) {
        case 'GET_COUNTRY_LIST_SUCCESS':
            return {
                ...state,
                countryList: action.payload
            }
        default:
            return state
    }
}

export const getCountryListEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(getCountryListAction.request)),
        switchMap((action) =>
            from(getCountryList(state$.value.authenticationReducer.token)).pipe(
                map((CountryList: Country[]) => getCountryListAction.success(CountryList)),
                catchError(error => of(getCountryListAction.failure(error.message)))
            )
        )
    )