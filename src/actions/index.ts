import { ActionType } from "typesafe-actions"
import * as Authentication from "./authenticationAction"
import * as Company from "./companyAction"
import * as User from "./userAction"
import * as JobFunction from "./jobFunctionAction"
// import * as CurrentReport from "./currentReportActions"
export type AuthenticationAction = ActionType<typeof Authentication>
export type CompanyAction = ActionType<typeof Company>
export type UserAction = ActionType<typeof User>
export type JobFunctionAction = ActionType<typeof JobFunction>
// export type CurrentReportActions = ActionType<typeof CurrentReport>
export type ActionTypes = AuthenticationAction | CompanyAction | UserAction | JobFunctionAction
// | CurrentReportActions
