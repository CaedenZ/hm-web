import { createAsyncAction } from "typesafe-actions";
import { Region } from "../interface/regionInterface";
import { CreateRegionState } from "../scenes/RegionPage/create";

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