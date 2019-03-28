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
import { getUserList, createUser } from "../api/userAPIs";
import { getUserListAction, createUserAction } from "../actions/userAction";
import { isActionOf } from "typesafe-actions";


export function userReducer(state: UserState = {
    userList: [],
}, action) {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                email: action.payload
            }
        case 'GET_USER_LIST_SUCCESS':
            return {
                ...state,
                userList: action.payload
            }
        default:
            return state
    }
}

export const getUserListEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(getUserListAction.request)),
        switchMap((action) =>
            from(getUserList(state$.value.authenticationReducer.token)).pipe(
                map((userList: User[]) => getUserListAction.success(userList)),
                catchError(error => of(getUserListAction.failure(error.message)))
            )
        )
    )

export const createUserEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(createUserAction.request)),
        switchMap((action) =>
            from(createUser(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => createUserAction.success()),
                catchError(error => of(createUserAction.failure(error.message)))
            )
        )
    )
