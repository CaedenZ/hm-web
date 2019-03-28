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

export const rootReducer = combineReducers({
    authenticationReducer,
    userReducer,
    companyReducer,
    initReducer,
    jobFunctionReducer,
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
    //   generateReportEpic,
    //   sendEmailEpic,
    //   completeReportEpic,
    //   checkExpireDateEpics
)

// export type DetailState = DetailState
// export type CurrentReportState = CurrentReportState
export type RootState = StateType<typeof rootReducer>

// export default 's'