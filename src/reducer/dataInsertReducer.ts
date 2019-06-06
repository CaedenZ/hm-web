import { Epic } from "redux-observable";
import { insertDataAction } from "../actions/dataInsertAction";
import { insertData } from "../api/dataInsertAPI";
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { from, of } from "rxjs";

export const insertDataEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(insertDataAction.request)),
        switchMap((action) =>
            from(insertData(state$.value.authenticationReducer.token, action.payload, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map(() => insertDataAction.success()),
                catchError(error => of(insertDataAction.failure(error.message)))
            )
        )
    )