import { CountryState, Country, Currency, DistintCurrency } from "../interface/countryInterface";
import { Epic } from "redux-observable";
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { getCountryListAction, getCurrencyListAction, getDistintCurrencyListAction } from "../actions/countryAction";
import { from, of } from "rxjs";
import { getCountryList, getCurrencyList, getDistintCurrencyList } from "../api/countryApi";
import { getSectorListAction } from "../actions/sectorAction";

export function countryReducer(state: CountryState = {
    countryList: [],
    currencyList: [],
    distintCurrencyList: [],
}, action) {
    switch (action.type) {
        case 'GET_COUNTRY_LIST_SUCCESS':
            return {
                ...state,
                countryList: action.payload
            }
        case 'GET_CURRENCY_LIST_SUCCESS':
            return {
                ...state,
                currencyList: action.payload
            }
        case 'GET_DISTINT_CURRENCY_LIST_SUCCESS':
            return {
                ...state,
                distintCurrencyList: action.payload
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
export const getCurrencyListEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(getCurrencyListAction.request)),
        switchMap((action) =>
            from(getCurrencyList(state$.value.authenticationReducer.token)).pipe(
                map((CurrencyList: Currency[]) => getCurrencyListAction.success(CurrencyList)),
                catchError(error => of(getCurrencyListAction.failure(error.message)))
            )
        )
    )

export const getDistintCurrencyListEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(getDistintCurrencyListAction.request)),
        switchMap((action) =>
            from(getDistintCurrencyList(state$.value.authenticationReducer.token)).pipe(
                map((DistintCurrencyList: DistintCurrency[]) => getDistintCurrencyListAction.success(DistintCurrencyList)),
                catchError(error => of(getDistintCurrencyListAction.failure(error.message)))
            )
        )
    )
