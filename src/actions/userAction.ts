import { createAction, createAsyncAction } from "typesafe-actions"
import { User } from "../interface/userInterface";
import { CREATEUSERCRED } from "../interface/credInterface";
import { CreateUserState } from "../scenes/UserPage/create";
import { UpdateUserState } from "../scenes/UserPage/update";

interface GETUSERLISTCRED {
    session_key: string
}

const SELECT_USER = "SELECT_USER"
export const selectUserAction = createAction(SELECT_USER,
    action => {
        return (unit: User) => action(unit)
    })

const GET_USER_LIST_REQUEST = "GET_USER_LIST_REQUEST"
const GET_USER_LIST_SUCCESS = "GET_USER_LIST_SUCCESS"
const GET_USER_LIST_FAILURE = "GET_USER_LIST_FAILURE"
export const getUserListAction = createAsyncAction(
    GET_USER_LIST_REQUEST,
    GET_USER_LIST_SUCCESS,
    GET_USER_LIST_FAILURE
)<void, User[], void>()


const CREATE_USER_REQUEST = "CREATE_USER_REQUEST"
const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS"
const CREATE_USER_FAILURE = "CREATE_USER_FAILURE"
export const createUserAction = createAsyncAction(
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE
)<CreateUserState, void, void>()

const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST"
const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS"
const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE"
export const updateUserAction = createAsyncAction(
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE
)<UpdateUserState, void, void>()

const DELETE_USER_REQUEST = "DELETE_USER_REQUEST"
const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS"
const DELETE_USER_FAILURE = "DELETE_USER_FAILURE"
export const deleteUserAction = createAsyncAction(
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE
)<string, void, void>()