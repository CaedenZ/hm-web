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
import { login, forgetPassword } from "../api/authenticationAPI";
import { loginAction, forgetPasswordAction } from "../actions/authenticationAction";
import { isActionOf } from "typesafe-actions";


interface AuthenticationState {
    email: string;
    firstName: string;
    lastName: string;
    token: string;
}

export function authenticationReducer(state: AuthenticationState = {
    email: '',
    firstName: '',
    lastName: '',
    token: '',
}, action) {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                email: action.payload
            }
        case 'LOG_IN_SUCCESS':
            return {
                ...state,
                token: action.payload
            }
        case 'LOG_OUT':
            return {
                ...state,
                token: null
            }
        default:
            return state
    }
}

export const loginEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf([loginAction.request])),
        switchMap((action) =>
            from(login(action.payload)).pipe(
                map((token: string) => loginAction.success(token)),
                catchError(error => of(loginAction.failure(error.message)))
            )
        )
    )

export const forgetPasswordEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf([forgetPasswordAction.request])),
        switchMap((action) =>
            from(forgetPassword(action.payload)).pipe(
                map(() => forgetPasswordAction.success()),
                catchError(error => of(forgetPasswordAction.failure(error.message)))
            )
        )
    )

export const createUserEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf([loginAction.request])),
        switchMap((action) =>
            from(login(action.payload)).pipe(
                map((token: string) => loginAction.success(token)),
                catchError(error => of(loginAction.failure(error.message)))
            )
        )
    )
export const updateProfileEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        ofType("LOG_IN_REQUEST"),
        switchMap((action) =>
            from(login(action.payload)).pipe(
                map((token: string) => loginAction.success(token)),
                catchError(error => of(loginAction.failure(error.message)))
            )
        )
    )
export const getProfileEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        ofType("LOG_IN_REQUEST"),
        switchMap((action) =>
            from(login(action.payload)).pipe(
                map((token: string) => loginAction.success(token)),
                catchError(error => of(loginAction.failure(error.message)))
            )
        )
    )
export const updatePasswordEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        ofType("LOG_IN_REQUEST"),
        switchMap((action) =>
            from(login(action.payload)).pipe(
                map((token: string) => loginAction.success(token)),
                catchError(error => of(loginAction.failure(error.message)))
            )
        )
    )

