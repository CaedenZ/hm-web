import { ContractState, Contract } from "../interface/contractInterface";
import { Epic } from "redux-observable";
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { getContractListAction, createContractAction, updateContractAction, deleteContractAction } from "../actions/contractAction";
import { from, of } from "rxjs";
import { getContractList, createContract, updateContract, deleteContract } from "../api/contractApi";

export function contractReducer(state: ContractState = {
    contractList: [],
}, action) {
    switch (action.type) {
        case 'LOG_IN_SUCCESS':
            return {
                contractList: [],
            }
        case 'LOG_OUT':
            return {
                contractList: [],
            }
        case 'SELECT_CONTRACT':
            return {
                ...state,
                selectedContract: action.payload
            }
        case 'GET_CONTRACT_LIST_SUCCESS':
            return {
                ...state,
                contractList: action.payload
            }
        case 'CREATE_CONTRACT_SUCCESS':
            action.asyncDispatch(getContractListAction.request())
            return {
                ...state,
            }
        case 'UPDATE_CONTRACT_SUCCESS':
            action.asyncDispatch(getContractListAction.request())
            return {
                ...state,
            }
        case 'DELETE_CONTRACT_SUCCESS':
            action.asyncDispatch(getContractListAction.request())
            return {
                ...state,
            }
        default:
            return state
    }
}

export const getContractListEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(getContractListAction.request)),
        switchMap((action) =>
            from(getContractList(state$.value.authenticationReducer.token, state$.value.jobPositionReducer.selectedJobPosition.jobposition_id)).pipe(
                map((ContractList: Contract[]) => getContractListAction.success(ContractList)),
                catchError(error => of(getContractListAction.failure(error.message)))
            )
        )
    )

export const createContractEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(createContractAction.request)),
        switchMap((action) =>
            from(createContract(state$.value.authenticationReducer.token, action.payload, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map(() => createContractAction.success()),
                catchError(error => of(createContractAction.failure(error.message)))
            )
        )
    )

export const updateContractEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(updateContractAction.request)),
        switchMap((action) =>
            from(updateContract(state$.value.authenticationReducer.token, action.payload, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map(() => updateContractAction.success()),
                catchError(error => of(updateContractAction.failure(error.message)))
            )
        )
    )

export const deleteContractEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(deleteContractAction.request)),
        switchMap((action) =>
            from(deleteContract(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => deleteContractAction.success()),
                catchError(error => of(deleteContractAction.failure(error.message)))
            )
        )
    )
