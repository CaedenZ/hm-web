import { createAsyncAction, createAction } from "typesafe-actions";
import { Region } from "../interface/regionInterface";
import { CreateRegionState } from "../scenes/RegionPage/create";
import { UpdateRegionState } from "../scenes/RegionPage/update";

const SELECT_REGION = "SELECT_REGION"
export const selectRegionAction = createAction(SELECT_REGION,
    action => {
        return (region: Region) => action(region)
    })

const GET_REGION_LIST_REQUEST = "GET_REGION_LIST_REQUEST"
const GET_REGION_LIST_SUCCESS = "GET_REGION_LIST_SUCCESS"
const GET_REGION_LIST_FAILURE = "GET_REGION_LIST_FAILURE"
export const getRegionListAction = createAsyncAction(
    GET_REGION_LIST_REQUEST,
    GET_REGION_LIST_SUCCESS,
    GET_REGION_LIST_FAILURE
)<void, Region[], void>()

const CREATE_REGION_REQUEST = "CREATE_REGION_REQUEST"
const CREATE_REGION_SUCCESS = "CREATE_REGION_SUCCESS"
const CREATE_REGION_FAILURE = "CREATE_REGION_FAILURE"
export const createRegionAction = createAsyncAction(
    CREATE_REGION_REQUEST,
    CREATE_REGION_SUCCESS,
    CREATE_REGION_FAILURE
)<CreateRegionState, void, void>()

const UPDATE_REGION_REQUEST = "UPDATE_REGION_REQUEST"
const UPDATE_REGION_SUCCESS = "UPDATE_REGION_SUCCESS"
const UPDATE_REGION_FAILURE = "UPDATE_REGION_FAILURE"
export const updateRegionAction = createAsyncAction(
    UPDATE_REGION_REQUEST,
    UPDATE_REGION_SUCCESS,
    UPDATE_REGION_FAILURE
)<UpdateRegionState, void, void>()

const DELETE_REGION_REQUEST = "DELETE_REGION_REQUEST"
const DELETE_REGION_SUCCESS = "DELETE_REGION_SUCCESS"
const DELETE_REGION_FAILURE = "DELETE_REGION_FAILURE"
export const deleteRegionAction = createAsyncAction(
    DELETE_REGION_REQUEST,
    DELETE_REGION_SUCCESS,
    DELETE_REGION_FAILURE
)<string, void, void>()