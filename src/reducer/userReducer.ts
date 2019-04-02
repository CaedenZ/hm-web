import { Epic, ofType } from "redux-observable";
import { AuthenticationAction } from "../actions";
import {
    switchMap,
    map,
    catchError,
    filter,
    tap,
    flatMap,
} from "rxjs/operators"
import { of, from } from "rxjs"
import { login } from "../api/authenticationAPI";
import { loginAction } from "../actions/authenticationAction";
import { UserState, User } from "../interface/userInterface";
import { getUserList, createUser, deleteUser, updateUser } from "../api/userAPIs";
import { getUserListAction, createUserAction, deleteUserAction, updateUserAction } from "../actions/userAction";
import { isActionOf } from "typesafe-actions";


export function userReducer(state: UserState = {
    userList: [],
    user: {
        image: '',
        email: '',
        firstname: '',
        lastname: '',
        employee_id: '',
        alias: '',
        country: '',
        address: '',
        postal_code: '',
        remarks: '',
        status: '',
        jobfunction: '',
        contact: '',
    },
}, action) {
    switch (action.type) {
        case 'SELECT_USER':
            return {
                ...state,
                user: action.payload
            }
        case 'GET_USER_LIST_SUCCESS':
            return {
                ...state,
                userList: action.payload
            }
        case 'DELETE_USER_SUCCESS':
            action.asyncDispatch(getUserListAction.request())
            return {
                ...state
            }
        case 'UPDATE_USER_SUCCESS':
            action.asyncDispatch(getUserListAction.request())
            return {
                ...state
            }
        case 'CREATE_USER_SUCCESS':
            action.asyncDispatch(getUserListAction.request())
            return {
                ...state
            }
        default:
            return state
    }
}

export const getUserListEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(getUserListAction.request)),
        switchMap((action) =>
            from(getUserList(state$.value.authenticationReducer.token, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map((userList: User[]) => getUserListAction.success(userList)),
                catchError(error => of(getUserListAction.failure(error.message)))
            )
        )
    )

export const createUserEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(createUserAction.request)),
        switchMap((action) =>
            from(createUser(state$.value.authenticationReducer.token, action.payload, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map(() => createUserAction.success()),
                catchError(error => of(createUserAction.failure(error.message)))
            )
        )
    )

export const updateUserEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(updateUserAction.request)),
        switchMap((action) =>
            from(updateUser(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => updateUserAction.success()),
                catchError(error => of(updateUserAction.failure(error.message)))
            )
        )
    )

export const deleteUserEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(deleteUserAction.request)),
        switchMap((action) =>
            from(deleteUser(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => deleteUserAction.success()),
                catchError(error => of(deleteUserAction.failure(error.message)))
            )
        )
    )
