import { JobPositionState, JobPosition } from "../interface/jobpositionInterface";
import { Epic } from "redux-observable";
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { getJobPositionListAction, createJobPositionAction, updateJobPositionAction, deleteJobPositionAction } from "../actions/jobPositionAction";
import { from, of } from "rxjs";
import { getJobPositionList, createJobPosition, updateJobPosition, deleteJobPosition } from "../api/jobPositionApi";

export function jobPositionReducer(state: JobPositionState = {
    jobpositionList: [],
}, action) {
    switch (action.type) {
        case 'LOG_IN_SUCCESS':
            return {
                jobpositionList: [],
            }
        case 'LOG_OUT':
            return {
                jobpositionList: [],
            }
        case 'SELECT_JOBPOSITION':
            return {
                ...state,
                selectedJobPosition: action.payload
            }
        case 'GET_JOBPOSITION_LIST_SUCCESS':
            return {
                ...state,
                jobpositionList: action.payload
            }
        case 'CREATE_JOBPOSITION_SUCCESS':
            action.asyncDispatch(getJobPositionListAction.request())
            return {
                ...state,
            }
        case 'UPDATE_JOBPOSITION_SUCCESS':
            action.asyncDispatch(getJobPositionListAction.request())
            return {
                ...state,
            }
        case 'DELETE_JOBPOSITION_SUCCESS':
            action.asyncDispatch(getJobPositionListAction.request())
            return {
                ...state,
            }
        default:
            return state
    }
}

export const getJobPositionListEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(getJobPositionListAction.request)),
        switchMap((action) =>
            from(getJobPositionList(state$.value.authenticationReducer.token, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map((JobPositionList: JobPosition[]) => getJobPositionListAction.success(JobPositionList)),
                catchError(error => of(getJobPositionListAction.failure(error.message)))
            )
        )
    )

export const createJobPositionEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(createJobPositionAction.request)),
        switchMap((action) =>
            from(createJobPosition(state$.value.authenticationReducer.token, action.payload, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map(() => createJobPositionAction.success()),
                catchError(error => of(createJobPositionAction.failure(error.message)))
            )
        )
    )

export const updateJobPositionEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(updateJobPositionAction.request)),
        switchMap((action) =>
            from(updateJobPosition(state$.value.authenticationReducer.token, action.payload, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map(() => updateJobPositionAction.success()),
                catchError(error => of(updateJobPositionAction.failure(error.message)))
            )
        )
    )

export const deleteJobPositionEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(deleteJobPositionAction.request)),
        switchMap((action) =>
            from(deleteJobPosition(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => deleteJobPositionAction.success()),
                catchError(error => of(deleteJobPositionAction.failure(error.message)))
            )
        )
    )
