import { createAsyncAction } from "typesafe-actions";

const INSERT_DATA_REQUEST = "INSERT_DATA_REQUEST"
const INSERT_DATA_SUCCESS = "INSERT_DATA_SUCCESS"
const INSERT_DATA_FAILURE = "INSERT_DATA_FAILURE"
export const insertDataAction = createAsyncAction(
    INSERT_DATA_REQUEST,
    INSERT_DATA_SUCCESS,
    INSERT_DATA_FAILURE
)<any, void, void>()