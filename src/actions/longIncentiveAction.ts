import { createAsyncAction, createAction } from "typesafe-actions";
import { LongIncentive, CREATELONGINCENTIVECRED, UPDATELONGINCENTIVECRED } from "../interface/longincentiveInterface";

const SELECT_LONGINCENTIVE = "SELECT_LONGINCENTIVE"
export const selectLongIncentiveAction = createAction(SELECT_LONGINCENTIVE,
    action => {
        return (longincentive: LongIncentive) => action(longincentive)
    })

const GET_LONGINCENTIVE_LIST_REQUEST = "GET_LONGINCENTIVE_LIST_REQUEST"
const GET_LONGINCENTIVE_LIST_SUCCESS = "GET_LONGINCENTIVE_LIST_SUCCESS"
const GET_LONGINCENTIVE_LIST_FAILURE = "GET_LONGINCENTIVE_LIST_FAILURE"
export const getLongIncentiveListAction = createAsyncAction(
    GET_LONGINCENTIVE_LIST_REQUEST,
    GET_LONGINCENTIVE_LIST_SUCCESS,
    GET_LONGINCENTIVE_LIST_FAILURE
)<void, LongIncentive[], void>()

const CREATE_LONGINCENTIVE_REQUEST = "CREATE_LONGINCENTIVE_REQUEST"
const CREATE_LONGINCENTIVE_SUCCESS = "CREATE_LONGINCENTIVE_SUCCESS"
const CREATE_LONGINCENTIVE_FAILURE = "CREATE_LONGINCENTIVE_FAILURE"
export const createLongIncentiveAction = createAsyncAction(
    CREATE_LONGINCENTIVE_REQUEST,
    CREATE_LONGINCENTIVE_SUCCESS,
    CREATE_LONGINCENTIVE_FAILURE
)<CREATELONGINCENTIVECRED, void, void>()

const UPDATE_LONGINCENTIVE_REQUEST = "UPDATE_LONGINCENTIVE_REQUEST"
const UPDATE_LONGINCENTIVE_SUCCESS = "UPDATE_LONGINCENTIVE_SUCCESS"
const UPDATE_LONGINCENTIVE_FAILURE = "UPDATE_LONGINCENTIVE_FAILURE"
export const updateLongIncentiveAction = createAsyncAction(
    UPDATE_LONGINCENTIVE_REQUEST,
    UPDATE_LONGINCENTIVE_SUCCESS,
    UPDATE_LONGINCENTIVE_FAILURE
)<UPDATELONGINCENTIVECRED, void, void>()

const DELETE_LONGINCENTIVE_REQUEST = "DELETE_LONGINCENTIVE_REQUEST"
const DELETE_LONGINCENTIVE_SUCCESS = "DELETE_LONGINCENTIVE_SUCCESS"
const DELETE_LONGINCENTIVE_FAILURE = "DELETE_LONGINCENTIVE_FAILURE"
export const deleteLongIncentiveAction = createAsyncAction(
    DELETE_LONGINCENTIVE_REQUEST,
    DELETE_LONGINCENTIVE_SUCCESS,
    DELETE_LONGINCENTIVE_FAILURE
)<string, void, void>()