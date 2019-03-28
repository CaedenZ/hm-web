import { combineReducers } from "redux"
import { authenticationReducer, loginEpic } from "./authenticationReducer"
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
import { companyReducer, getCompanyListEpic, getChildCompanyListEpic, createCompanyEpic } from "./companyReducer";
import { initReducer } from "./initReducer";

export const rootReducer = combineReducers({
    authenticationReducer,
    userReducer,
    companyReducer,
    initReducer,
    //   userDetail,
    //   currentReport,
})

export const rootEpic = combineEpics(
    loginEpic,
    getUserListEpic,
    getCompanyListEpic,
    createUserEpic,
    getChildCompanyListEpic,
    createCompanyEpic,
    //   generateReportEpic,
    //   sendEmailEpic,
    //   completeReportEpic,
    //   checkExpireDateEpics
)

// export type DetailState = DetailState
// export type CurrentReportState = CurrentReportState
export type RootState = StateType<typeof rootReducer>

// export default 's'