import { createAsyncAction } from "typesafe-actions";
import { Country } from "../interface/countryInterface";

const GET_COUNTRY_LIST_REQUEST = "GET_COUNTRY_LIST_REQUEST"
const GET_COUNTRY_LIST_SUCCESS = "GET_COUNTRY_LIST_SUCCESS"
const GET_COUNTRY_LIST_FAILURE = "GET_COUNTRY_LIST_FAILURE"
export const getCountryListAction = createAsyncAction(
    GET_COUNTRY_LIST_REQUEST,
    GET_COUNTRY_LIST_SUCCESS,
    GET_COUNTRY_LIST_FAILURE
)<void, Country[], void>()