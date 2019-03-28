import { createAction, createAsyncAction } from "typesafe-actions"
import { LOGINCRED } from "../interface/credInterface";



const SET_CURRENT_USER = "SET_CURRENT_USER"
export const setCurrentUser = createAction(SET_CURRENT_USER, action => {
  return (params: string) => action(params)
})

const LOG_IN_REQUEST = "LOG_IN_REQUEST"
const LOG_IN_SUCCESS = "LOG_IN_SUCCESS"
const LOG_IN_FAILURE = "LOG_IN_FAILURE"
export const loginAction = createAsyncAction(
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE
)<LOGINCRED, string, void>()

const LOG_OUT = "LOG_OUT"
export const logoutAction = createAction(LOG_OUT,
  action => {
    return () => action()
  })
