import { RoleState, Role, RoleFunction } from "../interface/roleInterface";
import { Epic } from "redux-observable";
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { getRoleListAction, createRoleAction, updateRoleAction, deleteRoleAction, getRoleFunctionListAction } from "../actions/roleAction";
import { from, of } from "rxjs";
import { getRoleList, createRole, updateRole, deleteRole, getRoleFunctionList } from "../api/roleAPIs";

export function roleReducer(state: RoleState = {
    roleList: [],
    roleFunctionList: [],
}, action) {
    switch (action.type) {
        case 'SELECT_ROLE':
            return {
                ...state,
                selectUpdateRole: action.payload
            }
        case 'GET_ROLE_LIST_SUCCESS':
            return {
                ...state,
                roleList: action.payload
            }
        case 'GET_ROLEFUNCTION_LIST_SUCCESS':
            return {
                ...state,
                roleFunctionList: action.payload
            }
        case 'CREATE_ROLE_SUCCESS':
            action.asyncDispatch(getRoleListAction.request())
            return {
                ...state,
            }
        case 'UPDATE_ROLE_SUCCESS':
            action.asyncDispatch(getRoleListAction.request())
            return {
                ...state,
            }
        case 'DELETE_ROLE_SUCCESS':
            action.asyncDispatch(getRoleListAction.request())
            return {
                ...state,
            }
        default:
            return state
    }
}

export const getRoleListEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(getRoleListAction.request)),
        switchMap((action) =>
            from(getRoleList(state$.value.authenticationReducer.token, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map((RoleList: Role[]) => getRoleListAction.success(RoleList)),
                catchError(error => of(getRoleListAction.failure(error.message)))
            )
        )
    )

export const getRoleFunctionListEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(getRoleFunctionListAction.request)),
        switchMap((action) =>
            from(getRoleFunctionList(state$.value.authenticationReducer.token)).pipe(
                map((RoleFunctionList: RoleFunction[]) => getRoleFunctionListAction.success(RoleFunctionList)),
                catchError(error => of(getRoleFunctionListAction.failure(error.message)))
            )
        )
    )

export const createRoleEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(createRoleAction.request)),
        switchMap((action) =>
            from(createRole(state$.value.authenticationReducer.token, action.payload, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map(() => createRoleAction.success()),
                catchError(error => of(createRoleAction.failure(error.message)))
            )
        )
    )

export const updateRoleEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(updateRoleAction.request)),
        switchMap((action) =>
            from(updateRole(state$.value.authenticationReducer.token, action.payload, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map(() => updateRoleAction.success()),
                catchError(error => of(updateRoleAction.failure(error.message)))
            )
        )
    )

export const deleteRoleEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(deleteRoleAction.request)),
        switchMap((action) =>
            from(deleteRole(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => deleteRoleAction.success()),
                catchError(error => of(deleteRoleAction.failure(error.message)))
            )
        )
    )