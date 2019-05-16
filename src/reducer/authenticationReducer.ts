import { Epic, ofType } from "redux-observable";
import {
    switchMap,
    map,
    catchError,
    filter,
} from "rxjs/operators"
import { of, from } from "rxjs"
import { login, forgetPassword, getUserProfile, updatePassword } from "../api/authenticationAPI";
import { loginAction, forgetPasswordAction, getUserProfileAction, updatePasswordAction } from "../actions/authenticationAction";
import { isActionOf } from "typesafe-actions";
import { Profile } from "../interface/authInterface";


interface AuthenticationState {
    email: string;
    firstName: string;
    lastName: string;
    token: string;
    profile: Profile;
}

export function authenticationReducer(state: AuthenticationState = {
    email: '',
    firstName: '',
    lastName: '',
    token: '',
    profile: {
        email: '',
        firstname: '',
        lastname: '',
        alias: '',
        employee_id: '',
        image: '',
        jobfunction: '',
        country: '',
        address: '',
        postal_code: '',
        status: '',
        remarks: '',
        info: ''
    }
}, action) {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                email: action.payload
            }
        case 'LOG_IN_SUCCESS':
            action.asyncDispatch(getUserProfileAction.request(action.payload.email))
            return {
                ...state,
                email: action.payload.email,
                token: action.payload.session_key
            }
        case 'LOG_OUT':
            return {
                ...state,
                token: "",
            }
        case 'GET_USER_PROFILE_SUCCESS':
            return {
                ...state,
                profile: action.payload
            }
        default:
            return state
    }
}

export const loginEpic: Epic<any, any, any, any> = (action$) =>
    action$.pipe(
        filter(isActionOf([loginAction.request])),
        switchMap((action) =>
            from(login(action.payload)).pipe(
                map((token: string) => loginAction.success(token)),
                catchError(error => of(loginAction.failure(error.message)))
            )
        )
    )

export const forgetPasswordEpic: Epic<any, any, any, any> = (action$) =>
    action$.pipe(
        filter(isActionOf([forgetPasswordAction.request])),
        switchMap((action) =>
            from(forgetPassword(action.payload)).pipe(
                map(() => forgetPasswordAction.success()),
                catchError(error => of(forgetPasswordAction.failure(error.message)))
            )
        )
    )

export const createUserEpic: Epic<any, any, any, any> = (action$) =>
    action$.pipe(
        filter(isActionOf([loginAction.request])),
        switchMap((action) =>
            from(login(action.payload)).pipe(
                map((token: string) => loginAction.success(token)),
                catchError(error => of(loginAction.failure(error.message)))
            )
        )
    )
export const updateProfileEpic: Epic<any, any, any, any> = (action$) =>
    action$.pipe(
        ofType("LOG_IN_REQUEST"),
        switchMap((action) =>
            from(login(action.payload)).pipe(
                map((token: string) => loginAction.success(token)),
                catchError(error => of(loginAction.failure(error.message)))
            )
        )
    )
export const getUserProfileEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(getUserProfileAction.request)),
        switchMap((action) =>
            from(getUserProfile(state$.value.authenticationReducer.token, action.payload)).pipe(
                map((profile: Profile) => getUserProfileAction.success(profile)),
                catchError(error => of(getUserProfileAction.failure(error.message)))
            )
        )
    )
export const updatePasswordEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(updatePasswordAction.request)),
        switchMap((action) =>
            from(updatePassword(state$.value.authenticationReducer.token, state$.value.userReducer.user.email, action.payload)).pipe(
                map(() => updatePasswordAction.success()),
                catchError(error => of(updatePasswordAction.failure(error.message)))
            )
        )
    )

