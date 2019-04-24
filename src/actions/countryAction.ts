import { createAsyncAction } from "typesafe-actions";
import { Country, Currency, DistintCurrency } from "../interface/countryInterface";

const GET_COUNTRY_LIST_REQUEST = "GET_COUNTRY_LIST_REQUEST"
const GET_COUNTRY_LIST_SUCCESS = "GET_COUNTRY_LIST_SUCCESS"
const GET_COUNTRY_LIST_FAILURE = "GET_COUNTRY_LIST_FAILURE"
export const getCountryListAction = createAsyncAction(
    GET_COUNTRY_LIST_REQUEST,
    GET_COUNTRY_LIST_SUCCESS,
    GET_COUNTRY_LIST_FAILURE
)<void, Country[], void>()

const GET_CURRENCY_LIST_REQUEST = "GET_CURRENCY_LIST_REQUEST"
const GET_CURRENCY_LIST_SUCCESS = "GET_CURRENCY_LIST_SUCCESS"
const GET_CURRENCY_LIST_FAILURE = "GET_CURRENCY_LIST_FAILURE"
export const getCurrencyListAction = createAsyncAction(
    GET_CURRENCY_LIST_REQUEST,
    GET_CURRENCY_LIST_SUCCESS,
    GET_CURRENCY_LIST_FAILURE
)<void, Currency[], void>()

const GET_DISTINT_CURRENCY_LIST_REQUEST = "GET_DISTINT_CURRENCY_LIST_REQUEST"
const GET_DISTINT_CURRENCY_LIST_SUCCESS = "GET_DISTINT_CURRENCY_LIST_SUCCESS"
const GET_DISTINT_CURRENCY_LIST_FAILURE = "GET_DISTINT_CURRENCY_LIST_FAILURE"
export const getDistintCurrencyListAction = createAsyncAction(
    GET_DISTINT_CURRENCY_LIST_REQUEST,
    GET_DISTINT_CURRENCY_LIST_SUCCESS,
    GET_DISTINT_CURRENCY_LIST_FAILURE
)<void, DistintCurrency[], void>()