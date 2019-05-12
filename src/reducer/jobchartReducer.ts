import { Epic } from "redux-observable";
import {
    switchMap,
    map,
    catchError,
    filter,
} from "rxjs/operators"
import { of, from } from "rxjs"
import { JobChartState, JobChart } from "../interface/jobchartInterface";
import { getJobChartList, updateCell} from "../api/jobchartAPI";
import { getJobChartListAction, updateCellAction } from "../actions/jobchartAction";
import { isActionOf } from "typesafe-actions";


export function jobchartReducer(state: JobChartState = {
    jobchartList: [],
}, action) {
    switch (action.type) {
        case 'LOG_IN_SUCCESS':
            return {
                jobchartList: [],
            }
        case 'LOG_OUT':
            return {
                jobchartList: [],
            }
        case 'GET_JOBCHART_LIST_SUCCESS':
            return {
                ...state,
                jobchartList: action.payload
            }
        case 'UPDATE_JOBCHART_SUCCESS':
            action.asyncDispatch(getJobChartListAction.request())
            return {
                ...state
            }
        default:
            return state
    }
}

export const getJobChartListEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(getJobChartListAction.request)),
        switchMap(() =>
            from(getJobChartList(state$.value.authenticationReducer.token, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map((jobchartList: JobChart[]) => getJobChartListAction.success(jobchartList)),
                catchError(error => of(getJobChartListAction.failure(error.message)))
            )
        )
    )

export const updateCellEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(updateCellAction.request)),
        switchMap((action) =>
            from(updateCell(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => updateCellAction.success()),
                catchError(error => of(updateCellAction.failure(error.message)))
            )
        )
    )
