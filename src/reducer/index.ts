import { combineReducers } from "redux"
import { authenticationReducer, loginEpic, forgetPasswordEpic } from "./authenticationReducer"
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
import { companyReducer, getCompanyListEpic, getChildCompanyListEpic, createCompanyEpic, getUnitListEpic, getChildUnitListEpic, createUnitEpic, createSubUnitEpic, updateUnitEpic, deleteUnitEpic, updateSubUnitEpic, deleteSubUnitEpic, getSubUnitListEpic, createChildUnitEpic, updateChildUnitEpic, deleteChildUnitEpic } from "./companyReducer";
import { initReducer } from "./initReducer";
import { jobFunctionReducer, getJobFunctionListEpic, createJobFunctionEpic, createSubJobFunctionEpic, deleteSubJobFunctionEpic, deleteJobFunctionEpic } from "./jobFunctionReducer";
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from "history";
import { getCountryListEpic, countryReducer } from "./countryReducer";
import { regionReducer, getRegionListEpic } from "./regionReducer";
import { snackBarReducer } from "./snackBarReducer";


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
    router: connectRouter(history),
    //   userDetail,
    //   currentReport,
})

export const rootEpic = combineEpics(
    loginEpic,
    forgetPasswordEpic,

    getUserListEpic,
    getCompanyListEpic,
    getChildCompanyListEpic,
    getCountryListEpic,
    getRegionListEpic,
    getJobFunctionListEpic,

    getUnitListEpic,
    getSubUnitListEpic,
    getChildUnitListEpic,

    createCompanyEpic,

    createJobFunctionEpic,
    createSubJobFunctionEpic,
    deleteJobFunctionEpic,
    deleteSubJobFunctionEpic,

    createUserEpic,
    deleteUserEpic,
    updateUserEpic,

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