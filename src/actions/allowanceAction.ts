import { createAsyncAction, createAction } from "typesafe-actions";
import { Allowances, CREATEALLOWANCESCRED, UPDATEALLOWANCESCRED } from "../interface/allowanceInterface";

const SELECT_ALLOWANCES = "SELECT_ALLOWANCES"
export const selectAllowancesAction = createAction(SELECT_ALLOWANCES,
    action => {
        return (allowances: Allowances) => action(allowances)
    })

const GET_ALLOWANCES_LIST_REQUEST = "GET_ALLOWANCES_LIST_REQUEST"
const GET_ALLOWANCES_LIST_SUCCESS = "GET_ALLOWANCES_LIST_SUCCESS"
const GET_ALLOWANCES_LIST_FAILURE = "GET_ALLOWANCES_LIST_FAILURE"
export const getAllowancesListAction = createAsyncAction(
    GET_ALLOWANCES_LIST_REQUEST,
    GET_ALLOWANCES_LIST_SUCCESS,
    GET_ALLOWANCES_LIST_FAILURE
)<void, Allowances[], void>()

const CREATE_ALLOWANCES_REQUEST = "CREATE_ALLOWANCES_REQUEST"
const CREATE_ALLOWANCES_SUCCESS = "CREATE_ALLOWANCES_SUCCESS"
const CREATE_ALLOWANCES_FAILURE = "CREATE_ALLOWANCES_FAILURE"
export const createAllowancesAction = createAsyncAction(
    CREATE_ALLOWANCES_REQUEST,
    CREATE_ALLOWANCES_SUCCESS,
    CREATE_ALLOWANCES_FAILURE
)<CREATEALLOWANCESCRED, void, void>()

const UPDATE_ALLOWANCES_REQUEST = "UPDATE_ALLOWANCES_REQUEST"
const UPDATE_ALLOWANCES_SUCCESS = "UPDATE_ALLOWANCES_SUCCESS"
const UPDATE_ALLOWANCES_FAILURE = "UPDATE_ALLOWANCES_FAILURE"
export const updateAllowancesAction = createAsyncAction(
    UPDATE_ALLOWANCES_REQUEST,
    UPDATE_ALLOWANCES_SUCCESS,
    UPDATE_ALLOWANCES_FAILURE
)<UPDATEALLOWANCESCRED, void, void>()

const DELETE_ALLOWANCES_REQUEST = "DELETE_ALLOWANCES_REQUEST"
const DELETE_ALLOWANCES_SUCCESS = "DELETE_ALLOWANCES_SUCCESS"
const DELETE_ALLOWANCES_FAILURE = "DELETE_ALLOWANCES_FAILURE"
export const deleteAllowancesAction = createAsyncAction(
    DELETE_ALLOWANCES_REQUEST,
    DELETE_ALLOWANCES_SUCCESS,
    DELETE_ALLOWANCES_FAILURE
)<string, void, void>()