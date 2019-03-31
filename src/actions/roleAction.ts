import { createAsyncAction, createAction } from "typesafe-actions";
import { Role, CREATEROLE, UPDATEROLE, RoleFunction } from "../interface/roleInterface";

const SELECT_ROLE = "SELECT_ROLE"
export const selectRoleAction = createAction(SELECT_ROLE,
    action => {
        return (role: Role) => action(role)
    })

const GET_ROLE_LIST_REQUEST = "GET_ROLE_LIST_REQUEST"
const GET_ROLE_LIST_SUCCESS = "GET_ROLE_LIST_SUCCESS"
const GET_ROLE_LIST_FAILURE = "GET_ROLE_LIST_FAILURE"
export const getRoleListAction = createAsyncAction(
    GET_ROLE_LIST_REQUEST,
    GET_ROLE_LIST_SUCCESS,
    GET_ROLE_LIST_FAILURE
)<void, Role[], void>()

const GET_ROLEFUNCTION_LIST_REQUEST = "GET_ROLEFUNCTION_LIST_REQUEST"
const GET_ROLEFUNCTION_LIST_SUCCESS = "GET_ROLEFUNCTION_LIST_SUCCESS"
const GET_ROLEFUNCTION_LIST_FAILURE = "GET_ROLEFUNCTION_LIST_FAILURE"
export const getRoleFunctionListAction = createAsyncAction(
    GET_ROLEFUNCTION_LIST_REQUEST,
    GET_ROLEFUNCTION_LIST_SUCCESS,
    GET_ROLEFUNCTION_LIST_FAILURE
)<void, RoleFunction[], void>()

const CREATE_ROLE_REQUEST = "CREATE_ROLE_REQUEST"
const CREATE_ROLE_SUCCESS = "CREATE_ROLE_SUCCESS"
const CREATE_ROLE_FAILURE = "CREATE_ROLE_FAILURE"
export const createRoleAction = createAsyncAction(
    CREATE_ROLE_REQUEST,
    CREATE_ROLE_SUCCESS,
    CREATE_ROLE_FAILURE
)<CREATEROLE, void, void>()

const UPDATE_ROLE_REQUEST = "UPDATE_ROLE_REQUEST"
const UPDATE_ROLE_SUCCESS = "UPDATE_ROLE_SUCCESS"
const UPDATE_ROLE_FAILURE = "UPDATE_ROLE_FAILURE"
export const updateRoleAction = createAsyncAction(
    UPDATE_ROLE_REQUEST,
    UPDATE_ROLE_SUCCESS,
    UPDATE_ROLE_FAILURE
)<UPDATEROLE, void, void>()

const DELETE_ROLE_REQUEST = "DELETE_ROLE_REQUEST"
const DELETE_ROLE_SUCCESS = "DELETE_ROLE_SUCCESS"
const DELETE_ROLE_FAILURE = "DELETE_ROLE_FAILURE"
export const deleteRoleAction = createAsyncAction(
    DELETE_ROLE_REQUEST,
    DELETE_ROLE_SUCCESS,
    DELETE_ROLE_FAILURE
)<string, void, void>()