import { combineReducers } from "redux"
import { authenticationReducer, loginEpic, forgetPasswordEpic, getUserProfileEpic } from "./authenticationReducer"
// // import currentReport, {
// //   CurrentReportState,
// //   generateReportEpic,
// //   sendEmailEpic,
// //   completeReportEpic,
// // } from "./currentReportReducer"

// import { StateType } from "typesafe-actions"
import { combineEpics } from "redux-observable"
import { StateType } from "typesafe-actions";
import { userReducer, getUserListEpic, createUserEpic, deleteUserEpic, updateUserEpic } from "./userReducer";
import { companyReducer, getCompanyListEpic, getChildCompanyListEpic, createCompanyEpic, getUnitListEpic, getChildUnitListEpic, createUnitEpic, createSubUnitEpic, updateUnitEpic, deleteUnitEpic, updateSubUnitEpic, deleteSubUnitEpic, getSubUnitListEpic, createChildUnitEpic, updateChildUnitEpic, deleteChildUnitEpic, createSubCompanyEpic, updateCompanyEpic, updateSubCompanyEpic, deleteCompanyEpic, deleteSubCompanyEpic } from "./companyReducer";
import { initReducer } from "./initReducer";
import { jobFunctionReducer, getJobFunctionListEpic, createJobFunctionEpic, createSubJobFunctionEpic, deleteSubJobFunctionEpic, deleteJobFunctionEpic } from "./jobFunctionReducer";
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from "history";
import { getCountryListEpic, countryReducer, getCurrencyListEpic, getIndustryListEpic, getSectorListEpic } from "./countryReducer";
import { regionReducer, getRegionListEpic, createRegionEpic, deleteRegionEpic, updateRegionEpic } from "./regionReducer";
import { snackBarReducer } from "./snackBarReducer";
import { getRoleListEpic, getRoleFunctionListEpic, updateRoleEpic, createRoleEpic, deleteRoleEpic, roleReducer } from "./roleReducer";
import { dialogReducer } from "./dialogReducer";


export const history = createBrowserHistory()

export const rootReducer = combineReducers({
    authenticationReducer,
    userReducer,
    companyReducer,
    initReducer,
    jobFunctionReducer,
    countryReducer,
    regionReducer,
    snackBarReducer,
    dialogReducer,
    roleReducer,
    router: connectRouter(history),
    //   userDetail,
    //   currentReport,
})

export const rootEpic = combineEpics(
    loginEpic,
    forgetPasswordEpic,
    getUserProfileEpic,

    getUserListEpic,
    createUserEpic,
    deleteUserEpic,
    updateUserEpic,

    getCountryListEpic,
    getCurrencyListEpic,
    getIndustryListEpic,
    getSectorListEpic,

    createRegionEpic,
    getRegionListEpic,
    updateRegionEpic,
    deleteRegionEpic,

    getRoleListEpic,
    getRoleFunctionListEpic,
    createRoleEpic,
    updateRoleEpic,
    deleteRoleEpic,

    getCompanyListEpic,
    getChildCompanyListEpic,
    createCompanyEpic,
    createSubCompanyEpic,
    updateCompanyEpic,
    updateSubCompanyEpic,
    deleteCompanyEpic,
    deleteSubCompanyEpic,

    getJobFunctionListEpic,
    createJobFunctionEpic,
    createSubJobFunctionEpic,
    // updateJobFunctionEpic,
    // updateSubJobFunctionEpic,
    deleteJobFunctionEpic,
    deleteSubJobFunctionEpic,

    getUnitListEpic,
    getSubUnitListEpic,
    getChildUnitListEpic,

    createUnitEpic,
    updateUnitEpic,
    deleteUnitEpic,

    createSubUnitEpic,
    updateSubUnitEpic,
    deleteSubUnitEpic,

    createChildUnitEpic,
    updateChildUnitEpic,
    deleteChildUnitEpic,
    //   generateReportEpic,
    //   sendEmailEpic,
    //   completeReportEpic,
    //   checkExpireDateEpics
)

// export type DetailState = DetailState
// export type CurrentReportState = CurrentReportState
export type RootState = any

// export default 's'