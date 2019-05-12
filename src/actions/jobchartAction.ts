import { createAsyncAction, createAction } from "typesafe-actions";
import { JobChart, UPDATECELL  } from "../interface/jobchartInterface";

const SELECT_JOBCHART = "SELECT_JOBCHART"
export const selectJobChartAction = createAction(SELECT_JOBCHART,
    action => {
        return (jobchart: JobChart) => action(jobchart)
    })

const GET_JOBCHART_LIST_REQUEST = "GET_JOBCHART_LIST_REQUEST"
const GET_JOBCHART_LIST_SUCCESS = "GET_JOBCHART_LIST_SUCCESS"
const GET_JOBCHART_LIST_FAILURE = "GET_JOBCHART_LIST_FAILURE"
export const getJobChartListAction = createAsyncAction(
    GET_JOBCHART_LIST_REQUEST,
    GET_JOBCHART_LIST_SUCCESS,
    GET_JOBCHART_LIST_FAILURE
)<void, JobChart[], void>()

const UPDATE_CELL_REQUEST = "UPDATE_CELL_REQUEST"
const UPDATE_CELL_SUCCESS = "UPDATE_CELL_SUCCESS"
const UPDATE_CELL_FAILURE = "UPDATE_CELL_FAILURE"
export const updateCellAction = createAsyncAction(
    UPDATE_CELL_REQUEST,
    UPDATE_CELL_SUCCESS,
    UPDATE_CELL_FAILURE
)<UPDATECELL, void, void>()
