import { createAction, createAsyncAction } from "typesafe-actions"
import { Company, Unit } from "../interface/companyInterface";
import { CreateCompanyState } from "../scenes/CompanyPage/create";
import { CreateUnitState } from "../scenes/UnitPage/create";

interface GETCOMPANYLISTCRED {
    session_key: string
}

const SELECT_COMPANY = "SELECT_COMPANY"
export const selectCompanyAction = createAction(SELECT_COMPANY,
    action => {
        return (company: Company) => action(company)
    })

const SELECT_UNIT = "SELECT_UNIT"
export const selectUnitAction = createAction(SELECT_UNIT,
    action => {
        return (unit: Unit) => action(unit)
    })

const GET_COMPANY_LIST_REQUEST = "GET_COMPANY_LIST_REQUEST"
const GET_COMPANY_LIST_SUCCESS = "GET_COMPANY_LIST_SUCCESS"
const GET_COMPANY_LIST_FAILURE = "GET_COMPANY_LIST_FAILURE"
export const getCompanyListAction = createAsyncAction(
    GET_COMPANY_LIST_REQUEST,
    GET_COMPANY_LIST_SUCCESS,
    GET_COMPANY_LIST_FAILURE
)<void, Company[], void>()

const GET_CHILD_COMPANY_LIST_REQUEST = "GET_CHILD_COMPANY_LIST_REQUEST"
const GET_CHILD_COMPANY_LIST_SUCCESS = "GET_CHILD_COMPANY_LIST_SUCCESS"
const GET_CHILD_COMPANY_LIST_FAILURE = "GET_CHILD_COMPANY_LIST_FAILURE"
export const getChildCompanyListAction = createAsyncAction(
    GET_CHILD_COMPANY_LIST_REQUEST,
    GET_CHILD_COMPANY_LIST_SUCCESS,
    GET_CHILD_COMPANY_LIST_FAILURE
)<void, Company[], void>()

const CREATE_COMPANY_REQUEST = "CREATE_COMPANY_REQUEST"
const CREATE_COMPANY_SUCCESS = "CREATE_COMPANY_SUCCESS"
const CREATE_COMPANY_FAILURE = "CREATE_COMPANY_FAILURE"
export const createCompanyAction = createAsyncAction(
    CREATE_COMPANY_REQUEST,
    CREATE_COMPANY_SUCCESS,
    CREATE_COMPANY_FAILURE
)<CreateCompanyState, void, void>()

const GET_UNIT_LIST_REQUEST = "GET_UNIT_LIST_REQUEST"
const GET_UNIT_LIST_SUCCESS = "GET_UNIT_LIST_SUCCESS"
const GET_UNIT_LIST_FAILURE = "GET_UNIT_LIST_FAILURE"
export const getUnitListAction = createAsyncAction(
    GET_UNIT_LIST_REQUEST,
    GET_UNIT_LIST_SUCCESS,
    GET_UNIT_LIST_FAILURE
)<void, Unit[], void>()

const GET_CHILD_UNIT_LIST_REQUEST = "GET_CHILD_UNIT_LIST_REQUEST"
const GET_CHILD_UNIT_LIST_SUCCESS = "GET_CHILD_UNIT_LIST_SUCCESS"
const GET_CHILD_UNIT_LIST_FAILURE = "GET_CHILD_UNIT_LIST_FAILURE"
export const getChildUnitListAction = createAsyncAction(
    GET_CHILD_UNIT_LIST_REQUEST,
    GET_CHILD_UNIT_LIST_SUCCESS,
    GET_CHILD_UNIT_LIST_FAILURE
)<void, Unit[], void>()

const CREATE_UNIT_REQUEST = "CREATE_UNIT_REQUEST"
const CREATE_UNIT_SUCCESS = "CREATE_UNIT_SUCCESS"
const CREATE_UNIT_FAILURE = "CREATE_UNIT_FAILURE"
export const createUnitAction = createAsyncAction(
    CREATE_UNIT_REQUEST,
    CREATE_UNIT_SUCCESS,
    CREATE_UNIT_FAILURE
)<CreateUnitState, void, void>()

const CREATE_SUBUNIT_REQUEST = "CREATE_SUBUNIT_REQUEST"
const CREATE_SUBUNIT_SUCCESS = "CREATE_SUBUNIT_SUCCESS"
const CREATE_SUBUNIT_FAILURE = "CREATE_SUBUNIT_FAILURE"
export const createSubUnitAction = createAsyncAction(
    CREATE_SUBUNIT_REQUEST,
    CREATE_SUBUNIT_SUCCESS,
    CREATE_SUBUNIT_FAILURE
)<CreateUnitState, void, void>()

const CREATE_CHILDUNIT_REQUEST = "CREATE_CHILDUNIT_REQUEST"
const CREATE_CHILDUNIT_SUCCESS = "CREATE_CHILDUNIT_SUCCESS"
const CREATE_CHILDUNIT_FAILURE = "CREATE_CHILDUNIT_FAILURE"
export const createChildUnitAction = createAsyncAction(
    CREATE_CHILDUNIT_REQUEST,
    CREATE_CHILDUNIT_SUCCESS,
    CREATE_CHILDUNIT_FAILURE
)<CreateUnitState, void, void>()
