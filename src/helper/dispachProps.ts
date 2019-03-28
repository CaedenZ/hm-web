import { loginAction, logoutAction, forgetPasswordAction } from "../actions/authenticationAction";
import { getUserListAction, createUserAction } from "../actions/userAction";
import { LOGINCRED } from "../interface/credInterface";
import { SharedDispatchProps } from "../interface/propsInterface";
import { getCompanyListAction, getChildCompanyListAction, selectCompanyAction, createCompanyAction, createUnitAction, getChildUnitListAction, getUnitListAction, selectUnitAction, createSubUnitAction } from "../actions/companyAction";
import { getJobFunctionListAction, createJobFunctionAction, createSubJobFunctionAction, selectJobFunctionAction, deleteJobFunctionAction, deleteSubJobFunctionAction } from "../actions/jobFunctionAction";




export function mapDispatchToProps(dispatch): SharedDispatchProps {
    return {
        login: (payload) => {
            // console.log('scuus')
            dispatch(loginAction.request(payload))
        },
        logout: () => {
            dispatch(logoutAction())
        },
        getUserList: () => {
            dispatch(getUserListAction.request())
        },
        getCompanyList: () => {
            dispatch(getCompanyListAction.request())
        },
        createUser: (payload) => {
            dispatch(createUserAction.request(payload))
        },
        getChildCompanyList: () => {
            dispatch(getChildCompanyListAction.request())
        },
        selectCompany: (payload) => {
            dispatch(selectCompanyAction(payload))
        },
        createCompany: (payload) => {
            dispatch(createCompanyAction.request(payload))
        },
        getUnitList: () => {
            dispatch(getUnitListAction.request())
        },
        getChildUnitList: () => {
            dispatch(getChildUnitListAction.request())
        },
        selectUnit: (payload) => {
            dispatch(selectUnitAction(payload))
        },
        createUnit: (payload) => {
            dispatch(createUnitAction.request(payload))
        },
        createSubUnit: (payload) => {
            dispatch(createSubUnitAction.request(payload))
        },
        getJobFunctionList: () => {
            dispatch(getJobFunctionListAction.request())
        },
        createJobFunction: (payload) => {
            dispatch(createJobFunctionAction.request(payload))
        },
        createSubJobFunction: (payload) => {
            dispatch(createSubJobFunctionAction.request(payload))
        },
        selectJobFunction: (payload) => {
            dispatch(selectJobFunctionAction(payload))
        },
        forgetPassword: (payload) => {
            dispatch(forgetPasswordAction.request(payload))
        },
        deleteJobFunction: (payload) => {
            dispatch(deleteJobFunctionAction.request(payload))
        },
        deleteSubJobFunction: (payload) => {
            dispatch(deleteSubJobFunctionAction.request(payload))
        },
    }
}