import { createAsyncAction, createAction } from "typesafe-actions";
import { Signons, CREATESIGNONSCRED, UPDATESIGNONSCRED } from "../interface/signonsInterface";

const SELECT_SIGNONS = "SELECT_SIGNONS"
export const selectSignonsAction = createAction(SELECT_SIGNONS,
    action => {
        return (signons: Signons) => action(signons)
    })

const GET_SIGNONS_LIST_REQUEST = "GET_SIGNONS_LIST_REQUEST"
const GET_SIGNONS_LIST_SUCCESS = "GET_SIGNONS_LIST_SUCCESS"
const GET_SIGNONS_LIST_FAILURE = "GET_SIGNONS_LIST_FAILURE"
export const getSignonsListAction = createAsyncAction(
    GET_SIGNONS_LIST_REQUEST,
    GET_SIGNONS_LIST_SUCCESS,
    GET_SIGNONS_LIST_FAILURE
)<void, Signons[], void>()

const CREATE_SIGNONS_REQUEST = "CREATE_SIGNONS_REQUEST"
const CREATE_SIGNONS_SUCCESS = "CREATE_SIGNONS_SUCCESS"
const CREATE_SIGNONS_FAILURE = "CREATE_SIGNONS_FAILURE"
export const createSignonsAction = createAsyncAction(
    CREATE_SIGNONS_REQUEST,
    CREATE_SIGNONS_SUCCESS,
    CREATE_SIGNONS_FAILURE
)<CREATESIGNONSCRED, void, void>()

const UPDATE_SIGNONS_REQUEST = "UPDATE_SIGNONS_REQUEST"
const UPDATE_SIGNONS_SUCCESS = "UPDATE_SIGNONS_SUCCESS"
const UPDATE_SIGNONS_FAILURE = "UPDATE_SIGNONS_FAILURE"
export const updateSignonsAction = createAsyncAction(
    UPDATE_SIGNONS_REQUEST,
    UPDATE_SIGNONS_SUCCESS,
    UPDATE_SIGNONS_FAILURE
)<UPDATESIGNONSCRED, void, void>()

const DELETE_SIGNONS_REQUEST = "DELETE_SIGNONS_REQUEST"
const DELETE_SIGNONS_SUCCESS = "DELETE_SIGNONS_SUCCESS"
const DELETE_SIGNONS_FAILURE = "DELETE_SIGNONS_FAILURE"
export const deleteSignonsAction = createAsyncAction(
    DELETE_SIGNONS_REQUEST,
    DELETE_SIGNONS_SUCCESS,
    DELETE_SIGNONS_FAILURE
)<string, void, void>()
