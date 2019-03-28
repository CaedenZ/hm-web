import { createAction, createAsyncAction } from "typesafe-actions"
import { User } from "../interface/userInterface";
import { CREATEUSERCRED } from "../interface/credInterface";
import { CreateUserState } from "../scenes/UserPage/create";

interface GETUSERLISTCRED {
    session_key: string
}



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