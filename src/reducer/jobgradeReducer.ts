import { Epic } from "redux-observable";
import {
    switchMap,
    map,
    catchError,
    filter,
} from "rxjs/operators"
import { of, from } from "rxjs"
import { JobGradeState, JobGrade } from "../interface/jobgradeInterface";
import { getJobGradeList, createJobGrade, deleteJobGrade, updateJobGrade } from "../api/jobgradeAPI";
import { getJobGradeListAction, createJobGradeAction, deleteJobGradeAction, updateJobGradeAction } from "../actions/jobgradeAction";
import { isActionOf } from "typesafe-actions";


export function jobgradeReducer(state: JobGradeState = {
    jobgradeList: [],
    selectJobGrade: {
        jobgrade_id: '',
        jobgrade_name: '',
        type: '',
        global: 'N',
        country: '',
        salary_range: '',
        allowance: '',
        target_bonus: '',
    },
}, action) {
    switch (action.type) {
        case 'LOG_IN_SUCCESS':
            return {
                jobgradeList: [],
                selectJobGrade: {
                    jobgrade_id: '',
                    jobgrade_name: '',
                    type: '',
                    global: 0,
                    country: '',
                    salary_range: '',
                    allowance: '',
                    target_bonus: '',
                },
            }
        case 'LOG_OUT':
            return {
                jobgradeList: [],
                selectJobGrade: {
                    jobgrade_id: '',
                    jobgrade_name: '',
                    type: '',
                    global: 0,
                    country: '',
                    salary_range: '',
                    allowance: '',
                    target_bonus: '',
                },
            }
        case 'SELECT_JOBGRADE':
            return {
                ...state,
                selectJobGrade: action.payload
            }
        case 'GET_JOBGRADE_LIST_SUCCESS':
            return {
                ...state,
                jobgradeList: action.payload
            }
        case 'DELETE_JOBGRADE_SUCCESS':
            action.asyncDispatch(getJobGradeListAction.request())
            return {
                ...state
            }
        case 'UPDATE_JOBGRADE_SUCCESS':
            action.asyncDispatch(getJobGradeListAction.request())
            return {
                ...state
            }
        case 'CREATE_JOBGRADE_SUCCESS':
            action.asyncDispatch(getJobGradeListAction.request())
            return {
                ...state
            }
        default:
            return state
    }
}

export const getJobGradeListEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(getJobGradeListAction.request)),
        switchMap(() =>
            from(getJobGradeList(state$.value.authenticationReducer.token, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map((jobgradeList: JobGrade[]) => getJobGradeListAction.success(jobgradeList)),
                catchError(error => of(getJobGradeListAction.failure(error.message)))
            )
        )
    )

export const createJobGradeEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(createJobGradeAction.request)),
        switchMap((action) =>
            from(createJobGrade(state$.value.authenticationReducer.token, action.payload, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map(() => createJobGradeAction.success()),
                catchError(error => of(createJobGradeAction.failure(error.message)))
            )
        )
    )

export const updateJobGradeEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(updateJobGradeAction.request)),
        switchMap((action) =>
            from(updateJobGrade(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => updateJobGradeAction.success()),
                catchError(error => of(updateJobGradeAction.failure(error.message)))
            )
        )
    )

export const deleteJobGradeEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(deleteJobGradeAction.request)),
        switchMap((action) =>
            from(deleteJobGrade(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => deleteJobGradeAction.success()),
                catchError(error => of(deleteJobGradeAction.failure(error.message)))
            )
        )
    )
