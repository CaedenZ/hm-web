import { CountryState, Country, Currency, Industry, Sector } from "../interface/countryInterface";
import { Epic } from "redux-observable";
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { getCountryListAction, getCurrencyListAction, getIndustryListAction, getSectorListAction } from "../actions/countryAction";
import { from, of } from "rxjs";
import { getCountryList, getCurrencyList, getIndustryList, getSectorList } from "../api/countryApi";

export function countryReducer(state: CountryState = {
    countryList: [],
    currencyList: [],
    sectorList: [],
    industryList: [],
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
        case 'GET_SECTOR_LIST_SUCCESS':
            return {
                ...state,
                sectorList: action.payload
            }
        case 'GET_INDUSTRY_LIST_SUCCESS':
            return {
                ...state,
                industryList: action.payload
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
export const getIndustryListEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(getIndustryListAction.request)),
        switchMap((action) =>
            from(getIndustryList(state$.value.authenticationReducer.token)).pipe(
                map((IndustryList: Industry[]) => getIndustryListAction.success(IndustryList)),
                catchError(error => of(getIndustryListAction.failure(error.message)))
            )
        )
    )
export const getSectorListEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(getSectorListAction.request)),
        switchMap((action) =>
            from(getSectorList(state$.value.authenticationReducer.token)).pipe(
                map((SectorList: Sector[]) => getSectorListAction.success(SectorList)),
                catchError(error => of(getSectorListAction.failure(error.message)))
            )
        )
    )