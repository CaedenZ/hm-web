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
import { userReducer, getUserListEpic, createUserEpic } from "./userReducer";
import { companyReducer, getCompanyListEpic, getChildCompanyListEpic, createCompanyEpic, getUnitListEpic, getChildUnitListEpic, createUnitEpic, createSubUnitEpic } from "./companyReducer";
import { initReducer } from "./initReducer";
import { jobFunctionReducer, getJobFunctionListEpic, createJobFunctionEpic, createSubJobFunctionEpic, deleteSubJobFunctionEpic, deleteJobFunctionEpic } from "./jobFunctionReducer";
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from "history";
import { getCountryListEpic, countryReducer } from "./countryReducer";
import { regionReducer, getRegionListEpic } from "./regionReducer";


export const history = createBrowserHistory()

export const rootReducer = combineReducers({
    authenticationReducer,
    userReducer,
    companyReducer,
    initReducer,
    jobFunctionReducer,
    countryReducer,
    regionReducer,
    router: connectRouter(history),
    //   userDetail,
    //   currentReport,
})

export const rootEpic = combineEpics(
    loginEpic,
    forgetPasswordEpic,
    getUserListEpic,
    getCompanyListEpic,
    createUserEpic,
    getChildCompanyListEpic,
    createCompanyEpic,
    getUnitListEpic,
    getChildUnitListEpic,
    createUnitEpic,
    createSubUnitEpic,
    getJobFunctionListEpic,
    createJobFunctionEpic,
    createSubJobFunctionEpic,
    deleteJobFunctionEpic,
    deleteSubJobFunctionEpic,
    getCountryListEpic,
    getRegionListEpic,
    //   generateReportEpic,
    //   sendEmailEpic,
    //   completeReportEpic,
    //   checkExpireDateEpics
)

// export type DetailState = DetailState
// export type CurrentReportState = CurrentReportState
export type RootState = any

// export default 's'