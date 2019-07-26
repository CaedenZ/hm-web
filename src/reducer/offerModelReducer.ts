import { OfferModelState, OfferModel } from "../interface/offerModelInterface";
import { Epic } from "redux-observable";
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { getOfferModelListAction, createOfferModelAction, updateOfferModelAction, deleteOfferModelAction } from "../actions/offerModelAction";
import { from, of } from "rxjs";
import { getOfferModelList, createOfferModel, updateOfferModel, deleteOfferModel } from "../api/offerModelApi";

export function jobPositionReducer(state: OfferModelState = {
    offermodelList: [],
}, action) {
    switch (action.type) {
        case 'LOG_IN_SUCCESS':
            return {
                offermodelList: [],
            }
        case 'LOG_OUT':
            return {
                offermodelList: [],
            }
        case 'SELECT_OFFERMODEL':
            return {
                ...state,
                selectedOfferModel: action.payload
            }
        case 'GET_OFFERMODEL_LIST_SUCCESS':
            return {
                ...state,
                offermodelList: action.payload
            }
        case 'CREATE_OFFERMODEL_SUCCESS':
            action.asyncDispatch(getOfferModelListAction.request())
            return {
                ...state,
            }
        case 'UPDATE_OFFERMODEL_SUCCESS':
            action.asyncDispatch(getOfferModelListAction.request())
            return {
                ...state,
            }
        case 'DELETE_OFFERMODEL_SUCCESS':
            action.asyncDispatch(getOfferModelListAction.request())
            return {
                ...state,
            }
        default:
            return state
    }
}

export const getOfferModelListEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(getOfferModelListAction.request)),
        switchMap((action) =>
            from(getOfferModelList(state$.value.authenticationReducer.token, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map((OfferModelList: OfferModel[]) => getOfferModelListAction.success(OfferModelList)),
                catchError(error => of(getOfferModelListAction.failure(error.message)))
            )
        )
    )

export const createOfferModelEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(createOfferModelAction.request)),
        switchMap((action) =>
            from(createOfferModel(state$.value.authenticationReducer.token, action.payload, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map(() => createOfferModelAction.success()),
                catchError(error => of(createOfferModelAction.failure(error.message)))
            )
        )
    )

export const updateOfferModelEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(updateOfferModelAction.request)),
        switchMap((action) =>
            from(updateOfferModel(state$.value.authenticationReducer.token, action.payload, state$.value.companyReducer.selectedCompany.company_id)).pipe(
                map(() => updateOfferModelAction.success()),
                catchError(error => of(updateOfferModelAction.failure(error.message)))
            )
        )
    )

export const deleteOfferModelEpic: Epic<any, any, any, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(deleteOfferModelAction.request)),
        switchMap((action) =>
            from(deleteOfferModel(state$.value.authenticationReducer.token, action.payload)).pipe(
                map(() => deleteOfferModelAction.success()),
                catchError(error => of(deleteOfferModelAction.failure(error.message)))
            )
        )
    )
