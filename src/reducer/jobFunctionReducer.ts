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
import { JobFunction, JobFunctionState } from "../interface/jobfunctionInterface";
import { getJobFunctionList, createJobFunction, createSubJobFunction, deleteSubJobFunction, deleteJobFunction } from "../api/jobFunctionAPIs";
import { getJobFunctionListAction, createJobFunctionAction, createSubJobFunctionAction, deleteSubJobFunctionAction, deleteJobFunctionAction } from "../actions/jobFunctionAction";
import { isActionOf } from "typesafe-actions";


export function jobFunctionReducer(state: JobFunctionState = {
    jobFunctionList: [],
    selectedJobFunction: ''
}, action) {
    switch (action.type) {
        case 'GET_JOBFUNCTION_LIST_SUCCESS':
            return {
                ...state,
                jobFunctionList: action.payload
            }
        case 'SELECT_JOBFUNCTION':
            return {
                ...state,
                selectedJobFunction: action.payload.jobfunction_id
            }
        case 'DELETE_JOBFUNCTION_SUCCESS':
            return {
                ...state,
            }
        case 'DELETE_SUBJOBFUNCTION_SUCCESS':
            return {
                ...state,
            }
        default:
            return state
    }
}

export const getJobFunctionListEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(getJobFunctionListAction.request)),
        switchMap((action) =>
            from(getJobFunctionList(state$.value.authenticationReducer.token)).pipe(
                map((jobFunctionList: JobFunction[]) => getJobFunctionListAction.success(jobFunctionList)),
                catchError(error => of(getJobFunctionListAction.failure(error.message)))
            )
        )
    )

export const createJobFunctionEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(createJobFunctionAction.request)),
        switchMap((action) =>
            from(createJobFunction(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => createJobFunctionAction.success()),
                catchError(error => of(createJobFunctionAction.failure(error.message)))
            )
        )
    )

export const createSubJobFunctionEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(createSubJobFunctionAction.request)),
        switchMap((action) =>
            from(createSubJobFunction(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => createSubJobFunctionAction.success()),
                catchError(error => of(createSubJobFunctionAction.failure(error.message)))
            )
        )
    )

export const deleteJobFunctionEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(deleteJobFunctionAction.request)),
        switchMap((action) =>
            from(deleteJobFunction(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => deleteJobFunctionAction.success(action.payload)),
                catchError(error => of(deleteJobFunctionAction.failure(error.message)))
            )
        )
    )

export const deleteSubJobFunctionEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(deleteSubJobFunctionAction.request)),
        switchMap((action) =>
            from(deleteSubJobFunction(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => deleteSubJobFunctionAction.success(action.payload)),
                catchError(error => of(deleteSubJobFunctionAction.failure(error.message)))
            )
        )
    )