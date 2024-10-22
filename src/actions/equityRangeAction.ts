import { createAsyncAction, createAction } from "typesafe-actions";
import { EquityRange, CREATEEQUITYRANGECRED, UPDATEEQUITYRANGECRED } from "../interface/equityRangeInterface";

const SELECT_EQUITYRANGE = "SELECT_EQUITYRANGE"
export const selectEquityRangeAction = createAction(SELECT_EQUITYRANGE,
    action => {
        return (equityrange: EquityRange) => action(equityrange)
    })

const GET_EQUITYRANGE_LIST_REQUEST = "GET_EQUITYRANGE_LIST_REQUEST"
const GET_EQUITYRANGE_LIST_SUCCESS = "GET_EQUITYRANGE_LIST_SUCCESS"
const GET_EQUITYRANGE_LIST_FAILURE = "GET_EQUITYRANGE_LIST_FAILURE"
export const getEquityRangeListAction = createAsyncAction(
    GET_EQUITYRANGE_LIST_REQUEST,
    GET_EQUITYRANGE_LIST_SUCCESS,
    GET_EQUITYRANGE_LIST_FAILURE
)<void, EquityRange[], void>()

const CREATE_EQUITYRANGE_REQUEST = "CREATE_EQUITYRANGE_REQUEST"
const CREATE_EQUITYRANGE_SUCCESS = "CREATE_EQUITYRANGE_SUCCESS"
const CREATE_EQUITYRANGE_FAILURE = "CREATE_EQUITYRANGE_FAILURE"
export const createEquityRangeAction = createAsyncAction(
    CREATE_EQUITYRANGE_REQUEST,
    CREATE_EQUITYRANGE_SUCCESS,
    CREATE_EQUITYRANGE_FAILURE
)<CREATEEQUITYRANGECRED, void, void>()

const UPDATE_EQUITYRANGE_REQUEST = "UPDATE_EQUITYRANGE_REQUEST"
const UPDATE_EQUITYRANGE_SUCCESS = "UPDATE_EQUITYRANGE_SUCCESS"
const UPDATE_EQUITYRANGE_FAILURE = "UPDATE_EQUITYRANGE_FAILURE"
export const updateEquityRangeAction = createAsyncAction(
    UPDATE_EQUITYRANGE_REQUEST,
    UPDATE_EQUITYRANGE_SUCCESS,
    UPDATE_EQUITYRANGE_FAILURE
)<UPDATEEQUITYRANGECRED, void, void>()

const DELETE_EQUITYRANGE_REQUEST = "DELETE_EQUITYRANGE_REQUEST"
const DELETE_EQUITYRANGE_SUCCESS = "DELETE_EQUITYRANGE_SUCCESS"
const DELETE_EQUITYRANGE_FAILURE = "DELETE_EQUITYRANGE_FAILURE"
export const deleteEquityRangeAction = createAsyncAction(
    DELETE_EQUITYRANGE_REQUEST,
    DELETE_EQUITYRANGE_SUCCESS,
    DELETE_EQUITYRANGE_FAILURE
)<string, void, void>()
