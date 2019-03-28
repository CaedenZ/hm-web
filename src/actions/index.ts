import { ActionType } from "typesafe-actions"
import * as Authentication from "./authenticationAction"
// import * as CurrentReport from "./currentReportActions"
export type AuthenticationAction = ActionType<typeof Authentication>
// export type CurrentReportActions = ActionType<typeof CurrentReport>
export type ActionTypes = AuthenticationAction 
// | CurrentReportActions
