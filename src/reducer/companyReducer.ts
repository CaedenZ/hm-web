import { Epic } from "redux-observable";
import { switchMap, map, catchError, filter } from "rxjs/operators";
import { of, from } from "rxjs";
import { CompanyState, Company, Unit } from "../interface/companyInterface";
import {
  getCompanyList,
  getChildCompanyList,
  createCompany,
  getUnitList,
  createUnit,
  updateUnit,
  deleteUnit,
  createEntity,
  deleteCompany,
  updateEntity,
  updateCompany,
  getCompanyByRegion,
  getCompanyByCountry,
  getDivisionList
} from "../api/companyAPIs";
import {
  getCompanyListAction,
  getChildCompanyListAction,
  createCompanyAction,
  getUnitListAction,
  getChildUnitListAction,
  createUnitAction,
  createSubUnitAction,
  updateUnitAction,
  deleteUnitAction,
  updateSubUnitAction,
  deleteSubUnitAction,
  updateChildUnitAction,
  deleteChildUnitAction,
  getSubUnitListAction,
  createChildUnitAction,
  createEntityAction,
  deleteEntityAction,
  deleteCompanyAction,
  updateCompanyAction,
  updateEntityAction,
  selectCompanyAction,
  getCompanyByCountryAction,
  getCompanyByRegionAction,
  getDivisionListAction
} from "../actions/companyAction";
import { isActionOf } from "typesafe-actions";
import { getRegionListAction } from "../actions/regionAction";
import { getUserListAction } from "../actions/userAction";
import { getRoleListAction } from "../actions/roleAction";
import { getJobGradeListAction } from "../actions/jobgradeAction";
import { getSalaryRangeListAction } from "../actions/salaryRangeAction";
import { getAllowancesListAction } from "../actions/allowanceAction";
import { getLongIncentiveListAction } from "../actions/longIncentiveAction";
import { getShortIncentiveListAction } from "../actions/shortIncentiveAction";
import { getSignonsListAction } from "../actions/signonsAction";
import { getLocationListAction } from "../actions/locationAction";
import { getJobPositionListAction } from "../actions/jobPositionAction";

export function companyReducer(
  state: CompanyState = {
    companyList: [],
    childCompanyList: [],
    unitList: [],
    subUnitList: [],
    childUnitList: [],
    unitEntity: [],
    divisionList: [],
    selectedCompany: {
      company_id: "",
      sector: [],
      company_name: "",
      industry: [],
      country: [],
      logo_small: "",
      base_currency_id: "",
      logo_main: "",
      parentcompany_id: "",
      webpage_url: "",
      financialyr_dt: ""
    }
  },
  action
) {
  switch (action.type) {
    case "LOG_IN_SUCCESS":
      return {
        companyList: [],
        childCompanyList: [],
        unitList: [],
        subUnitList: [],
        childUnitList: [],
        unitEntity: [],
        divisionList: [],
        selectedCompany: {
          company_id: "",
          sector: [],
          location: "",
          company_name: "",
          industry: [],
          country: [],
          address: "",
          postal_code: "",
          logo_small: "",
          contact_person: "",
          contact_number: "",
          contact_email: "",
          hq_name: "",
          base_currency_id: "",
          logo_main: "",
          parentcompany_id: "",
          webpage_url: "",
          financialyr_dt: ""
        }
      };
    case "LOG_OUT":
      return {
        companyList: [],
        childCompanyList: [],
        unitList: [],
        subUnitList: [],
        childUnitList: [],
        unitEntity: [],
        divisionList: [],
        selectedCompany: {
          company_id: "",
          sector: [],
          location: "",
          company_name: "",
          industry: [],
          country: [],
          address: "",
          postal_code: "",
          logo_small: "",
          contact_person: "",
          contact_number: "",
          contact_email: "",
          hq_name: "",
          base_currency_id: "",
          logo_main: "",
          parentcompany_id: "",
          webpage_url: "",
          financialyr_dt: ""
        }
      };
    case "SELECT_INDEX":
      return {
        ...state,
        selectedIndex: action.payload
      };
    case "SELECT_COMPANY":
      action.asyncDispatch(getChildCompanyListAction.request());
      action.asyncDispatch(getRegionListAction.request());
      action.asyncDispatch(getDivisionListAction.request());
      action.asyncDispatch(getUnitListAction.request());
      action.asyncDispatch(getRoleListAction.request());
      action.asyncDispatch(getUserListAction.request());
      action.asyncDispatch(getJobGradeListAction.request());
      action.asyncDispatch(getSalaryRangeListAction.request());
      action.asyncDispatch(getAllowancesListAction.request());
      action.asyncDispatch(getLongIncentiveListAction.request());
      action.asyncDispatch(getShortIncentiveListAction.request());
      action.asyncDispatch(getSignonsListAction.request());
      action.asyncDispatch(getLocationListAction.request());
      action.asyncDispatch(getJobPositionListAction.request());
      return {
        ...state,
        selectedCompany: action.payload
      };
    case "SELECT_UPDATE_COMPANY":
      return {
        ...state,
        selectedUpdateCompany: action.payload
      };
    case "SELECT_UPDATE_ENTITY":
      return {
        ...state,
        selectedUpdateEntity: action.payload
      };
    case "SELECT_UNIT":
      return {
        ...state,
        selectedUnit: action.payload
      };
    case "SELECT_SUBUNIT":
      return {
        ...state,
        selectedSubUnit: action.payload
      };
    case "SELECT_UPDATE_UNIT":
      return {
        ...state,
        selectUpdateUnit: action.payload
      };
    case "GET_COMPANY_LIST_SUCCESS":
      if (
        action.payload.length === 1 ||
        state.selectedCompany.company_id === ""
      ) {
        action.asyncDispatch(selectCompanyAction(action.payload[0]));
      }
      return {
        ...state,
        companyList: action.payload
        // selectedCompany: action.payload[0]
      };
    case "GET_COMPANY_BY_COUNTRY_SUCCESS":
      return {
        ...state,
        unitEntity: action.payload
      };
    case "GET_COMPANY_BY_REGION_SUCCESS":
      return {
        ...state,
        unitEntity: action.payload
      };
    case "GET_CHILD_COMPANY_LIST_SUCCESS":
      return {
        ...state,
        childCompanyList: action.payload
      };
    case "GET_DIVISION_LIST_SUCCESS":
      return {
        ...state,
        divisionList: action.payload
      };
    case "GET_UNIT_LIST_SUCCESS":
      return {
        ...state,
        unitList: action.payload
      };
    case "GET_SUBUNIT_LIST_SUCCESS":
      return {
        ...state,
        subUnitList: action.payload
      };
    case "GET_CHILD_UNIT_LIST_SUCCESS":
      return {
        ...state,
        childUnitList: action.payload
      };
    case "DELETE_COMPANY_SUCCESS":
      action.asyncDispatch(getCompanyListAction.request());
      return {
        ...state
      };
    case "UPDATE_COMPANY_SUCCESS":
      action.asyncDispatch(getCompanyListAction.request());
      return {
        ...state
      };
    case "CREATE_COMPANY_SUCCESS":
      action.asyncDispatch(getCompanyListAction.request());
      return {
        ...state
      };
    case "DELETE_ENTITY_SUCCESS":
      action.asyncDispatch(getChildCompanyListAction.request());
      return {
        ...state
      };
    case "UPDATE_ENTITY_SUCCESS":
      action.asyncDispatch(getChildCompanyListAction.request());
      return {
        ...state
      };
    case "CREATE_ENTITY_SUCCESS":
      action.asyncDispatch(getChildCompanyListAction.request());
      return {
        ...state
      };
    case "DELETE_UNIT_SUCCESS":
      // action.asyncDispatch(getUnitListAction.request())
      action.asyncDispatch(getDivisionListAction.request());
      return {
        ...state
      };
    case "UPDATE_UNIT_SUCCESS":
      // action.asyncDispatch(getUnitListAction.request())
      action.asyncDispatch(getDivisionListAction.request());
      return {
        ...state
      };
    case "CREATE_UNIT_SUCCESS":
      // action.asyncDispatch(getUnitListAction.request())
      action.asyncDispatch(getDivisionListAction.request());
      return {
        ...state
      };
    case "DELETE_SUBUNIT_SUCCESS":
      // action.asyncDispatch(getSubUnitListAction.request())
      action.asyncDispatch(getDivisionListAction.request());
      return {
        ...state
      };
    case "UPDATE_SUBUNIT_SUCCESS":
      // action.asyncDispatch(getSubUnitListAction.request())
      action.asyncDispatch(getDivisionListAction.request());
      return {
        ...state
      };
    case "CREATE_SUBUNIT_SUCCESS":
      // action.asyncDispatch(getSubUnitListAction.request())
      action.asyncDispatch(getDivisionListAction.request());
      return {
        ...state
      };
    case "DELETE_CHILDUNIT_SUCCESS":
      // action.asyncDispatch(getChildUnitListAction.request())
      action.asyncDispatch(getDivisionListAction.request());
      return {
        ...state
      };
    case "UPDATE_CHILDUNIT_SUCCESS":
      // action.asyncDispatch(getChildUnitListAction.request())
      action.asyncDispatch(getDivisionListAction.request());
      return {
        ...state
      };
    case "CREATE_CHILDUNIT_SUCCESS":
      // action.asyncDispatch(getChildUnitListAction.request())
      action.asyncDispatch(getDivisionListAction.request());
      return {
        ...state
      };
    default:
      return state;
  }
}

export const getCompanyListEpic: Epic<any, any, any, any> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(getCompanyListAction.request)),
    switchMap(() =>
      from(getCompanyList(state$.value.authenticationReducer.token)).pipe(
        map((CompanyList: Company[]) =>
          getCompanyListAction.success(CompanyList)
        ),
        catchError(error => of(getCompanyListAction.failure(error.message)))
      )
    )
  );

export const getCompanyByCountryEpic: Epic<any, any, any, any> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isActionOf(getCompanyByCountryAction.request)),
    switchMap(action =>
      from(
        getCompanyByCountry(
          state$.value.authenticationReducer.token,
          state$.value.companyReducer.selectedCompany.company_id,
          action.payload
        )
      ).pipe(
        map((CompanyList: Company[]) =>
          getCompanyByCountryAction.success(CompanyList)
        ),
        catchError(error =>
          of(getCompanyByCountryAction.failure(error.message))
        )
      )
    )
  );

export const getCompanyByRegionEpic: Epic<any, any, any, any> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isActionOf(getCompanyByRegionAction.request)),
    switchMap(action =>
      from(
        getCompanyByRegion(
          state$.value.authenticationReducer.token,
          state$.value.companyReducer.selectedCompany.company_id,
          action.payload
        )
      ).pipe(
        map((CompanyList: Company[]) =>
          getCompanyByRegionAction.success(CompanyList)
        ),
        catchError(error => of(getCompanyByRegionAction.failure(error.message)))
      )
    )
  );

export const getChildCompanyListEpic: Epic<any, any, any, any> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isActionOf(getChildCompanyListAction.request)),
    switchMap(() =>
      from(
        getChildCompanyList(
          state$.value.authenticationReducer.token,
          state$.value.companyReducer.selectedCompany.company_id
        )
      ).pipe(
        map((CompanyList: Company[]) =>
          getChildCompanyListAction.success(CompanyList)
        ),
        catchError(error =>
          of(getChildCompanyListAction.failure(error.message))
        )
      )
    )
  );

export const createCompanyEpic: Epic<any, any, any, any> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(createCompanyAction.request)),
    switchMap(action =>
      from(
        createCompany(state$.value.authenticationReducer.token, action.payload)
      ).pipe(
        map(() => createCompanyAction.success()),
        catchError(error => of(createCompanyAction.failure(error.message)))
      )
    )
  );
export const createEntityEpic: Epic<any, any, any, any> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(createEntityAction.request)),
    switchMap(action =>
      from(
        createEntity(state$.value.authenticationReducer.token, action.payload)
      ).pipe(
        map(() => createEntityAction.success()),
        catchError(error => of(createEntityAction.failure(error.message)))
      )
    )
  );

export const updateCompanyEpic: Epic<any, any, any, any> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(updateCompanyAction.request)),
    switchMap(action =>
      from(
        updateCompany(state$.value.authenticationReducer.token, action.payload)
      ).pipe(
        map(() => updateCompanyAction.success()),
        catchError(error => of(updateCompanyAction.failure(error.message)))
      )
    )
  );
export const updateEntityEpic: Epic<any, any, any, any> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(updateEntityAction.request)),
    switchMap(action =>
      from(
        updateEntity(state$.value.authenticationReducer.token, action.payload)
      ).pipe(
        map(() => updateEntityAction.success()),
        catchError(error => of(updateEntityAction.failure(error.message)))
      )
    )
  );

export const deleteCompanyEpic: Epic<any, any, any, any> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(deleteCompanyAction.request)),
    switchMap(action =>
      from(
        deleteCompany(
          state$.value.authenticationReducer.token,
          0,
          action.payload
        )
      ).pipe(
        map(() => deleteCompanyAction.success()),
        catchError(error => of(deleteCompanyAction.failure(error.message)))
      )
    )
  );
export const deleteEntityEpic: Epic<any, any, any, any> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(deleteEntityAction.request)),
    switchMap(action =>
      from(
        deleteCompany(
          state$.value.authenticationReducer.token,
          1,
          action.payload
        )
      ).pipe(
        map(() => deleteEntityAction.success()),
        catchError(error => of(deleteEntityAction.failure(error.message)))
      )
    )
  );

export const getDivisionListEpic: Epic<any, any, any, any> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isActionOf(getDivisionListAction.request)),
    switchMap(() =>
      from(
        getDivisionList(
          state$.value.authenticationReducer.token,
          state$.value.companyReducer.selectedCompany.company_id
        )
      ).pipe(
        map((UnitList: Unit[]) => getDivisionListAction.success(UnitList)),
        catchError(error => of(getDivisionListAction.failure(error.message)))
      )
    )
  );

export const getUnitListEpic: Epic<any, any, any, any> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(getUnitListAction.request)),
    switchMap(() =>
      from(
        getUnitList(
          state$.value.authenticationReducer.token,
          0,
          state$.value.companyReducer.selectedCompany.company_id
        )
      ).pipe(
        map((UnitList: Unit[]) => getUnitListAction.success(UnitList)),
        catchError(error => of(getUnitListAction.failure(error.message)))
      )
    )
  );

export const getSubUnitListEpic: Epic<any, any, any, any> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(getSubUnitListAction.request)),
    switchMap(() =>
      from(
        getUnitList(
          state$.value.authenticationReducer.token,
          1,
          state$.value.companyReducer.selectedUnit.unit_id
        )
      ).pipe(
        map((UnitList: Unit[]) => getSubUnitListAction.success(UnitList)),
        catchError(error => of(getSubUnitListAction.failure(error.message)))
      )
    )
  );

export const getChildUnitListEpic: Epic<any, any, any, any> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isActionOf(getChildUnitListAction.request)),
    switchMap(() =>
      from(
        getUnitList(
          state$.value.authenticationReducer.token,
          2,
          state$.value.companyReducer.selectedSubUnit.unit_id
        )
      ).pipe(
        map((UnitList: Unit[]) => getChildUnitListAction.success(UnitList)),
        catchError(error => of(getChildUnitListAction.failure(error.message)))
      )
    )
  );

export const createUnitEpic: Epic<any, any, any, any> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(createUnitAction.request)),
    switchMap(action =>
      from(
        createUnit(state$.value.authenticationReducer.token, 0, action.payload)
      ).pipe(
        map(() => createUnitAction.success()),
        catchError(error => of(createUnitAction.failure(error.message)))
      )
    )
  );

export const createSubUnitEpic: Epic<any, any, any, any> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(createSubUnitAction.request)),
    switchMap(action =>
      from(
        createUnit(state$.value.authenticationReducer.token, 1, action.payload)
      ).pipe(
        map(() => createSubUnitAction.success()),
        catchError(error => of(createSubUnitAction.failure(error.message)))
      )
    )
  );

export const createChildUnitEpic: Epic<any, any, any, any> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isActionOf(createChildUnitAction.request)),
    switchMap(action =>
      from(
        createUnit(state$.value.authenticationReducer.token, 2, action.payload)
      ).pipe(
        map(() => createChildUnitAction.success()),
        catchError(error => of(createChildUnitAction.failure(error.message)))
      )
    )
  );

export const updateUnitEpic: Epic<any, any, any, any> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(updateUnitAction.request)),
    switchMap(action =>
      from(
        updateUnit(state$.value.authenticationReducer.token, 0, action.payload)
      ).pipe(
        map(() => updateUnitAction.success()),
        catchError(error => of(updateUnitAction.failure(error.message)))
      )
    )
  );

export const updateSubUnitEpic: Epic<any, any, any, any> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(updateSubUnitAction.request)),
    switchMap(action =>
      from(
        updateUnit(state$.value.authenticationReducer.token, 1, action.payload)
      ).pipe(
        map(() => updateSubUnitAction.success()),
        catchError(error => of(updateSubUnitAction.failure(error.message)))
      )
    )
  );

export const deleteUnitEpic: Epic<any, any, any, any> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(deleteUnitAction.request)),
    switchMap(action =>
      from(
        deleteUnit(state$.value.authenticationReducer.token, 0, action.payload)
      ).pipe(
        map(() => deleteUnitAction.success()),
        catchError(error => of(deleteUnitAction.failure(error.message)))
      )
    )
  );

export const deleteSubUnitEpic: Epic<any, any, any, any> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(deleteSubUnitAction.request)),
    switchMap(action =>
      from(
        deleteUnit(state$.value.authenticationReducer.token, 1, action.payload)
      ).pipe(
        map(() => deleteSubUnitAction.success()),
        catchError(error => of(deleteSubUnitAction.failure(error.message)))
      )
    )
  );

export const updateChildUnitEpic: Epic<any, any, any, any> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isActionOf(updateChildUnitAction.request)),
    switchMap(action =>
      from(
        updateUnit(state$.value.authenticationReducer.token, 2, action.payload)
      ).pipe(
        map(() => updateChildUnitAction.success()),
        catchError(error => of(updateChildUnitAction.failure(error.message)))
      )
    )
  );

export const deleteChildUnitEpic: Epic<any, any, any, any> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isActionOf(deleteChildUnitAction.request)),
    switchMap(action =>
      from(
        deleteUnit(state$.value.authenticationReducer.token, 2, action.payload)
      ).pipe(
        map(() => deleteChildUnitAction.success()),
        catchError(error => of(deleteChildUnitAction.failure(error.message)))
      )
    )
  );
