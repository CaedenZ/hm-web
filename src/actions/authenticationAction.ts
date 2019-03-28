import { createAction, createAsyncAction } from "typesafe-actions"
import { LOGINCRED, FORGETPWCRED } from "../interface/credInterface";



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

const FORGET_PASSWORD_REQUEST = "FORGET_PASSWORD_REQUEST"
const FORGET_PASSWORD_SUCCESS = "FORGET_PASSWORD_SUCCESS"
const FORGET_PASSWORD_FAILURE = "FORGET_PASSWORD_FAILURE"
export const forgetPasswordAction = createAsyncAction(
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAILURE
)<FORGETPWCRED, void, void>()