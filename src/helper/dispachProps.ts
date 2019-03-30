import { loginAction, logoutAction, forgetPasswordAction } from "../actions/authenticationAction";
import { getUserListAction, createUserAction, deleteUserAction, updateUserAction, selectUserAction } from "../actions/userAction";
import { LOGINCRED } from "../interface/credInterface";
import { SharedDispatchProps } from "../interface/propsInterface";
import { getCompanyListAction, getChildCompanyListAction, selectCompanyAction, createCompanyAction, createUnitAction, getChildUnitListAction, getUnitListAction, selectUnitAction, createSubUnitAction, deleteUnitAction, updateSubUnitAction, deleteSubUnitAction, updateUnitAction, selectSubUnitAction, getSubUnitListAction, createChildUnitAction, updateChildUnitAction, deleteChildUnitAction, createSubCompanyAction } from "../actions/companyAction";
import { getJobFunctionListAction, createJobFunctionAction, createSubJobFunctionAction, selectJobFunctionAction, deleteJobFunctionAction, deleteSubJobFunctionAction } from "../actions/jobFunctionAction";
import { getRegionListAction } from "../actions/regionAction";
import { getCountryListAction } from "../actions/countryAction";
import { closeSnackBarAction, showSnackBarAction } from "../actions/snackBarAction";




export function mapDispatchToProps(dispatch): SharedDispatchProps {
    return {
        showSnackBar: () => {
            dispatch(showSnackBarAction())
        },
        closeSnackBar: () => {
            dispatch(closeSnackBarAction())
        },
        login: (payload) => {
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
        getRegionList: () => {
            dispatch(getRegionListAction.request())
        },
        getCountryList: () => {
            dispatch(getCountryListAction.request())
        },
        createUser: (payload) => {
            dispatch(createUserAction.request(payload))
        },
        selectUser: (payload) => {
            dispatch(selectUserAction(payload))
        },
        updateUser: (payload) => {
            dispatch(updateUserAction.request(payload))
        },
        deleteUser: (payload) => {
            dispatch(deleteUserAction.request(payload))
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
        createSubCompany: (payload) => {
            dispatch(createSubCompanyAction.request(payload))
        },
        getUnitList: () => {
            dispatch(getUnitListAction.request())
        },
        getSubUnitList: () => {
            dispatch(getSubUnitListAction.request())
        },
        getChildUnitList: () => {
            dispatch(getChildUnitListAction.request())
        },
        selectUnit: (payload) => {
            dispatch(selectUnitAction(payload))
        },
        selectSubUnit: (payload) => {
            dispatch(selectSubUnitAction(payload))
        },
        createUnit: (payload) => {
            dispatch(createUnitAction.request(payload))
        },
        updateUnit: (payload) => {
            dispatch(updateUnitAction.request(payload))
        },
        createSubUnit: (payload) => {
            dispatch(createSubUnitAction.request(payload))
        },
        updateSubUnit: (payload) => {
            dispatch(updateSubUnitAction.request(payload))
        },
        deleteSubUnit: (payload) => {
            dispatch(deleteSubUnitAction.request(payload))
        },
        createChildUnit: (payload) => {
            dispatch(createChildUnitAction.request(payload))
        },
        updateChildUnit: (payload) => {
            dispatch(updateChildUnitAction.request(payload))
        },
        deleteChildUnit: (payload) => {
            dispatch(deleteChildUnitAction.request(payload))
        },
        deleteUnit: (payload) => {
            dispatch(deleteUnitAction.request(payload))
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