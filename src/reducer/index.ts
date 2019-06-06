import { combineReducers } from "redux";
import {
  authenticationReducer,
  loginEpic,
  forgetPasswordEpic,
  getUserProfileEpic,
  updateUserProfileEpic,
  updatePasswordEpic
} from "./authenticationReducer";
// // import currentReport, {
// //   CurrentReportState,
// //   generateReportEpic,
// //   sendEmailEpic,
// //   completeReportEpic,
// // } from "./currentReportReducer"

// import { StateType } from "typesafe-actions"
import { combineEpics } from "redux-observable";
import {
  userReducer,
  getUserListEpic,
  createUserEpic,
  deleteUserEpic,
  updateUserEpic
} from "./userReducer";
import {
  companyReducer,
  getCompanyListEpic,
  getChildCompanyListEpic,
  createCompanyEpic,
  getUnitListEpic,
  getChildUnitListEpic,
  createUnitEpic,
  createSubUnitEpic,
  updateUnitEpic,
  deleteUnitEpic,
  updateSubUnitEpic,
  deleteSubUnitEpic,
  getSubUnitListEpic,
  createChildUnitEpic,
  updateChildUnitEpic,
  deleteChildUnitEpic,
  createEntityEpic,
  updateCompanyEpic,
  updateEntityEpic,
  deleteCompanyEpic,
  deleteEntityEpic,
  getCompanyByCountryEpic,
  getCompanyByRegionEpic,
  getDivisionListEpic
} from "./companyReducer";
import { initReducer } from "./initReducer";
import {
  jobFunctionReducer,
  getJobFunctionListEpic,
  createJobFunctionEpic,
  createSubJobFunctionEpic,
  deleteSubJobFunctionEpic,
  deleteJobFunctionEpic
} from "./jobFunctionReducer";
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import {
  getCountryListEpic,
  countryReducer,
  getCurrencyListEpic,
  getDistintCurrencyListEpic
} from "./countryReducer";
import {
  regionReducer,
  getRegionListEpic,
  createRegionEpic,
  deleteRegionEpic,
  updateRegionEpic
} from "./regionReducer";
import { snackBarReducer } from "./snackBarReducer";
import {
  getRoleListEpic,
  getRoleFunctionListEpic,
  updateRoleEpic,
  createRoleEpic,
  deleteRoleEpic,
  roleReducer
} from "./roleReducer";
import { dialogReducer } from "./dialogReducer";
import {
  getSectorListEpic,
  createSectorEpic,
  createIndustryEpic,
  updateSectorEpic,
  updateIndustryEpic,
  deleteSectorEpic,
  deleteIndustryEpic,
  sectorReducer
} from "./sectorReducer";
import {
  jobgradeReducer,
  createJobGradeEpic,
  getJobGradeListEpic,
  updateJobGradeEpic,
  deleteJobGradeEpic
} from "./jobgradeReducer";
import {
  allowancesReducer,
  createAllowancesEpic,
  getAllowancesListEpic,
  updateAllowancesEpic,
  deleteAllowancesEpic
} from "./allowanceReducer";
import {
  signonsReducer,
  createSignonsEpic,
  getSignonsListEpic,
  updateSignonsEpic,
  deleteSignonsEpic
} from "./signonsReducer";
import {
  targetBonusReducer,
  createTargetBonusEpic,
  getTargetBonusListEpic,
  updateTargetBonusEpic,
  deleteTargetBonusEpic
} from "./targetBonusReducer";
import {
  longIncentiveReducer,
  createLongIncentiveEpic,
  getLongIncentiveListEpic,
  updateLongIncentiveEpic,
  deleteLongIncentiveEpic
} from "./longIncentiveReducer";
import {
  shortIncentiveReducer,
  createShortIncentiveEpic,
  getShortIncentiveListEpic,
  updateShortIncentiveEpic,
  deleteShortIncentiveEpic
} from "./shortIncentiveReducer";
import {
  salaryRangeReducer,
  createSalaryRangeEpic,
  getSalaryRangeListEpic,
  updateSalaryRangeEpic,
  deleteSalaryRangeEpic
} from "./salaryRangeReducer";
import {
  equityrangeReducer,
  createEquityRangeEpic,
  getEquityRangeListEpic,
  updateEquityRangeEpic,
  deleteEquityRangeEpic
} from "./equityRangeReducer";
import {
  jobchartReducer,
  getJobChartListEpic,
  updateCellEpic
} from "./jobchartReducer";
import {
  locationReducer,
  createLocationEpic,
  getLocationListEpic,
  updateLocationEpic,
  deleteLocationEpic
} from "./locationReducer";
import { insertDataEpic } from "./dataInsertReducer";

export const history = createBrowserHistory();

export const rootReducer = combineReducers({
  authenticationReducer,
  userReducer,
  companyReducer,
  initReducer,
  jobFunctionReducer,
  countryReducer,
  regionReducer,
  locationReducer,
  snackBarReducer,
  dialogReducer,
  roleReducer,
  sectorReducer,
  jobgradeReducer,
  allowancesReducer,
  longIncentiveReducer,
  shortIncentiveReducer,
  salaryRangeReducer,
  signonsReducer,
  targetBonusReducer,
  equityrangeReducer,
  jobchartReducer,
  router: connectRouter(history)
  //   userDetail,
  //   currentReport,
});

export const rootEpic = combineEpics(
  loginEpic,
  forgetPasswordEpic,
  updatePasswordEpic,
  getUserProfileEpic,
  updateUserProfileEpic,

  getUserListEpic,
  createUserEpic,
  deleteUserEpic,
  updateUserEpic,

  getCountryListEpic,
  getCurrencyListEpic,
  getDistintCurrencyListEpic,

  createRegionEpic,
  getRegionListEpic,
  updateRegionEpic,
  deleteRegionEpic,

  createLocationEpic,
  getLocationListEpic,
  updateLocationEpic,
  deleteLocationEpic,

  getRoleListEpic,
  getRoleFunctionListEpic,
  createRoleEpic,
  updateRoleEpic,
  deleteRoleEpic,

  getCompanyListEpic,
  getChildCompanyListEpic,
  createCompanyEpic,
  createEntityEpic,
  updateCompanyEpic,
  updateEntityEpic,
  deleteCompanyEpic,
  deleteEntityEpic,

  getJobFunctionListEpic,
  createJobFunctionEpic,
  createSubJobFunctionEpic,
  // updateJobFunctionEpic,
  // updateSubJobFunctionEpic,
  deleteJobFunctionEpic,
  deleteSubJobFunctionEpic,

  getSectorListEpic,
  createSectorEpic,
  createIndustryEpic,
  updateSectorEpic,
  updateIndustryEpic,
  deleteSectorEpic,
  deleteIndustryEpic,

  getDivisionListEpic,
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

  getCompanyByCountryEpic,
  getCompanyByRegionEpic,

  // phrase 2
  createJobGradeEpic,
  getJobGradeListEpic,
  updateJobGradeEpic,
  deleteJobGradeEpic,

  createSalaryRangeEpic,
  getSalaryRangeListEpic,
  updateSalaryRangeEpic,
  deleteSalaryRangeEpic,

  createAllowancesEpic,
  getAllowancesListEpic,
  updateAllowancesEpic,
  deleteAllowancesEpic,

  createTargetBonusEpic,
  getTargetBonusListEpic,
  updateTargetBonusEpic,
  deleteTargetBonusEpic,

  createLongIncentiveEpic,
  getLongIncentiveListEpic,
  updateLongIncentiveEpic,
  deleteLongIncentiveEpic,

  createShortIncentiveEpic,
  getShortIncentiveListEpic,
  updateShortIncentiveEpic,
  deleteShortIncentiveEpic,

  createSignonsEpic,
  getSignonsListEpic,
  updateSignonsEpic,
  deleteSignonsEpic,

  createEquityRangeEpic,
  getEquityRangeListEpic,
  updateEquityRangeEpic,
  deleteEquityRangeEpic,

  getJobChartListEpic,
  updateCellEpic,

  insertDataEpic,
);

// export type DetailState = DetailState
// export type CurrentReportState = CurrentReportState
export type RootState = any;

// export default 's'
