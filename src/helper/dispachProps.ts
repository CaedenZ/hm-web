import { loginAction, logoutAction, forgetPasswordAction, updatePasswordAction } from "../actions/authenticationAction";
import { getUserListAction, createUserAction, deleteUserAction, updateUserAction, selectUserAction } from "../actions/userAction";
import { SharedDispatchProps } from "../interface/propsInterface";
import { getCompanyListAction, getChildCompanyListAction, selectCompanyAction, createCompanyAction, createUnitAction, getChildUnitListAction, getUnitListAction, selectUnitAction, createSubUnitAction, deleteUnitAction, updateSubUnitAction, deleteSubUnitAction, updateUnitAction, selectSubUnitAction, getSubUnitListAction, createChildUnitAction, updateChildUnitAction, deleteChildUnitAction, createEntityAction, selectUpdateCompanyAction, updateCompanyAction, deleteCompanyAction, updateEntityAction, deleteEntityAction, selectUpdateUnitAction, selectIndexAction, getCompanyByCountryAction, getCompanyByRegionAction, selectUpdateEntityAction, getDivisionListAction } from "../actions/companyAction";
import { getJobFunctionListAction, createJobFunctionAction, createSubJobFunctionAction, selectJobFunctionAction, deleteJobFunctionAction, deleteSubJobFunctionAction } from "../actions/jobFunctionAction";
import { getRegionListAction, createRegionAction, updateRegionAction, deleteRegionAction, selectRegionAction } from "../actions/regionAction";
import { getCountryListAction, getCurrencyListAction, getDistintCurrencyListAction } from "../actions/countryAction";
import { closeSnackBarAction, showSnackBarAction } from "../actions/snackBarAction";
import { selectRoleAction, createRoleAction, updateRoleAction, deleteRoleAction, getRoleListAction, getRoleFunctionListAction } from "../actions/roleAction";
import { showDialogAction, closeDialogAction } from "../actions/deleteDialogAction";
import { createSectorAction, createIndustryAction, updateSectorAction, updateIndustryAction, selectSectorAction, deleteSectorAction, deleteIndustryAction, getSectorListAction } from "../actions/sectorAction";
import { selectJobGradeAction, createJobGradeAction, updateJobGradeAction, deleteJobGradeAction, getJobGradeListAction } from "../actions/jobgradeAction";
import { selectAllowancesAction, createAllowancesAction, updateAllowancesAction, deleteAllowancesAction, getAllowancesListAction } from "../actions/allowanceAction";
import { selectSalaryRangeAction, createSalaryRangeAction, updateSalaryRangeAction, deleteSalaryRangeAction, getSalaryRangeListAction } from "../actions/salaryRangeAction";
import { selectTargetBonusAction, createTargetBonusAction, updateTargetBonusAction, deleteTargetBonusAction, getTargetBonusListAction } from "../actions/targetBonusAction";
import { selectSignonsAction, createSignonsAction, updateSignonsAction, deleteSignonsAction, getSignonsListAction } from "../actions/signonsAction";
import { selectLongIncentiveAction, createLongIncentiveAction, updateLongIncentiveAction, deleteLongIncentiveAction, getLongIncentiveListAction } from "../actions/longIncentiveAction";
import { selectShortIncentiveAction, createShortIncentiveAction, updateShortIncentiveAction, deleteShortIncentiveAction, getShortIncentiveListAction } from "../actions/shortIncentiveAction";
import { selectEquityRangeAction, createEquityRangeAction, updateEquityRangeAction, deleteEquityRangeAction, getEquityRangeListAction } from "../actions/equityRangeAction";
import { getJobChartListAction, updateCellAction } from "../actions/jobchartAction";




export function mapDispatchToProps(dispatch): SharedDispatchProps {
    return {
        showSnackBar: () => { dispatch(showSnackBarAction()) },
        closeSnackBar: () => { dispatch(closeSnackBarAction()) },
        showDialog: (payload) => { dispatch(showDialogAction(payload)) },
        closeDialog: () => { dispatch(closeDialogAction()) },


        login: (payload) => { dispatch(loginAction.request(payload)) },
        logout: () => { dispatch(logoutAction()) },
        forgetPassword: (payload) => { dispatch(forgetPasswordAction.request(payload)) },
        updatePassword: (payload) => { dispatch(updatePasswordAction.request(payload)) },

        getCountryList: () => { dispatch(getCountryListAction.request()) },
        getCurrencyList: () => { dispatch(getCurrencyListAction.request()) },
        getDistintCurrencyList: () => { dispatch(getDistintCurrencyListAction.request()) },
        // getSectorList: () => { dispatch(getSectorListAction.request()) },

        getUserList: () => { dispatch(getUserListAction.request()) },
        createUser: (payload) => { dispatch(createUserAction.request(payload)) },
        selectUser: (payload) => { dispatch(selectUserAction(payload)) },
        updateUser: (payload) => { dispatch(updateUserAction.request(payload)) },
        deleteUser: (payload) => { dispatch(deleteUserAction.request(payload)) },

        selectIndex: (payload) => { dispatch(selectIndexAction(payload)) },
        selectCompany: (payload) => { dispatch(selectCompanyAction(payload)) },
        selectUpdateCompany: (payload) => { dispatch(selectUpdateCompanyAction(payload)) },
        selectUpdateEntity: (payload) => { dispatch(selectUpdateEntityAction(payload)) },
        getCompanyList: () => { dispatch(getCompanyListAction.request()) },
        getChildCompanyList: () => { dispatch(getChildCompanyListAction.request()) },
        createCompany: (payload) => { dispatch(createCompanyAction.request(payload)) },
        updateCompany: (payload) => { dispatch(updateCompanyAction.request(payload)) },
        deleteCompany: (payload) => { dispatch(deleteCompanyAction.request(payload)) },
        createEntity: (payload) => { dispatch(createEntityAction.request(payload)) },
        updateEntity: (payload) => { dispatch(updateEntityAction.request(payload)) },
        deleteEntity: (payload) => { dispatch(deleteEntityAction.request(payload)) },

        getDivisionList: () => { dispatch(getDivisionListAction.request()) },
        getUnitList: () => { dispatch(getUnitListAction.request()) },
        getSubUnitList: () => { dispatch(getSubUnitListAction.request()) },
        getChildUnitList: () => { dispatch(getChildUnitListAction.request()) },
        selectUnit: (payload) => { dispatch(selectUnitAction(payload)) },
        selectSubUnit: (payload) => { dispatch(selectSubUnitAction(payload)) },
        selectUpdateUnit: (payload) => { dispatch(selectUpdateUnitAction(payload)) },
        createUnit: (payload) => { dispatch(createUnitAction.request(payload)) },
        updateUnit: (payload) => { dispatch(updateUnitAction.request(payload)) },
        createSubUnit: (payload) => { dispatch(createSubUnitAction.request(payload)) },
        updateSubUnit: (payload) => { dispatch(updateSubUnitAction.request(payload)) },
        deleteSubUnit: (payload) => { dispatch(deleteSubUnitAction.request(payload)) },
        createChildUnit: (payload) => { dispatch(createChildUnitAction.request(payload)) },
        updateChildUnit: (payload) => { dispatch(updateChildUnitAction.request(payload)) },
        deleteChildUnit: (payload) => { dispatch(deleteChildUnitAction.request(payload)) },
        deleteUnit: (payload) => { dispatch(deleteUnitAction.request(payload)) },

        getJobFunctionList: () => { dispatch(getJobFunctionListAction.request()) },
        createJobFunction: (payload) => { dispatch(createJobFunctionAction.request(payload)) },
        createSubJobFunction: (payload) => { dispatch(createSubJobFunctionAction.request(payload)) },
        selectJobFunction: (payload) => { dispatch(selectJobFunctionAction(payload)) },
        deleteJobFunction: (payload) => { dispatch(deleteJobFunctionAction.request(payload)) },
        deleteSubJobFunction: (payload) => { dispatch(deleteSubJobFunctionAction.request(payload)) },

        getSectorList: () => { dispatch(getSectorListAction.request()) },
        createSector: (payload) => { dispatch(createSectorAction.request(payload)) },
        createIndustry: (payload) => { dispatch(createIndustryAction.request(payload)) },
        updateSector: (payload) => { dispatch(updateSectorAction.request(payload)) },
        updateIndustry: (payload) => { dispatch(updateIndustryAction.request(payload)) },
        selectSector: (payload) => { dispatch(selectSectorAction(payload)) },
        deleteSector: (payload) => { dispatch(deleteSectorAction.request(payload)) },
        deleteIndustry: (payload) => { dispatch(deleteIndustryAction.request(payload)) },

        selectRegion: (payload) => { dispatch(selectRegionAction(payload)) },
        createRegion: (payload) => { dispatch(createRegionAction.request(payload)) },
        updateRegion: (payload) => { dispatch(updateRegionAction.request(payload)) },
        deleteRegion: (payload) => { dispatch(deleteRegionAction.request(payload)) },
        getRegionList: () => { dispatch(getRegionListAction.request()) },

        selectRole: (payload) => { dispatch(selectRoleAction(payload)) },
        createRole: (payload) => { dispatch(createRoleAction.request(payload)) },
        updateRole: (payload) => { dispatch(updateRoleAction.request(payload)) },
        deleteRole: (payload) => { dispatch(deleteRoleAction.request(payload)) },
        getRoleList: () => { dispatch(getRoleListAction.request()) },
        getRoleFunctionList: () => { dispatch(getRoleFunctionListAction.request()) },

        getCompanyByCountry: (payload) => { dispatch(getCompanyByCountryAction.request(payload)) },
        getCompanyByRegion: (payload) => { dispatch(getCompanyByRegionAction.request(payload)) },

        // phrase 2
        selectJobGrade: (payload) => { dispatch(selectJobGradeAction(payload)) },
        createJobGrade: (payload) => { dispatch(createJobGradeAction.request(payload)) },
        updateJobGrade: (payload) => { dispatch(updateJobGradeAction.request(payload)) },
        deleteJobGrade: (payload) => { dispatch(deleteJobGradeAction.request(payload)) },
        getJobGradeList: () => { dispatch(getJobGradeListAction.request()) },

        selectAllowances: (payload) => { dispatch(selectAllowancesAction(payload)) },
        createAllowances: (payload) => { dispatch(createAllowancesAction.request(payload)) },
        updateAllowances: (payload) => { dispatch(updateAllowancesAction.request(payload)) },
        deleteAllowances: (payload) => { dispatch(deleteAllowancesAction.request(payload)) },
        getAllowancesList: () => { dispatch(getAllowancesListAction.request()) },

        selectSalaryRange: (payload) => { dispatch(selectSalaryRangeAction(payload)) },
        createSalaryRange: (payload) => { dispatch(createSalaryRangeAction.request(payload)) },
        updateSalaryRange: (payload) => { dispatch(updateSalaryRangeAction.request(payload)) },
        deleteSalaryRange: (payload) => { dispatch(deleteSalaryRangeAction.request(payload)) },
        getSalaryRangeList: () => { dispatch(getSalaryRangeListAction.request()) },

        selectTargetBonus: (payload) => { dispatch(selectTargetBonusAction(payload)) },
        createTargetBonus: (payload) => { dispatch(createTargetBonusAction.request(payload)) },
        updateTargetBonus: (payload) => { dispatch(updateTargetBonusAction.request(payload)) },
        deleteTargetBonus: (payload) => { dispatch(deleteTargetBonusAction.request(payload)) },
        getTargetBonusList: () => { dispatch(getTargetBonusListAction.request()) },

        selectSignons: (payload) => { dispatch(selectSignonsAction(payload)) },
        createSignons: (payload) => { dispatch(createSignonsAction.request(payload)) },
        updateSignons: (payload) => { dispatch(updateSignonsAction.request(payload)) },
        deleteSignons: (payload) => { dispatch(deleteSignonsAction.request(payload)) },
        getSignonsList: () => { dispatch(getSignonsListAction.request()) },

        selectLongIncentive: (payload) => { dispatch(selectLongIncentiveAction(payload)) },
        createLongIncentive: (payload) => { dispatch(createLongIncentiveAction.request(payload)) },
        updateLongIncentive: (payload) => { dispatch(updateLongIncentiveAction.request(payload)) },
        deleteLongIncentive: (payload) => { dispatch(deleteLongIncentiveAction.request(payload)) },
        getLongIncentiveList: () => { dispatch(getLongIncentiveListAction.request()) },

        selectShortIncentive: (payload) => { dispatch(selectShortIncentiveAction(payload)) },
        createShortIncentive: (payload) => { dispatch(createShortIncentiveAction.request(payload)) },
        updateShortIncentive: (payload) => { dispatch(updateShortIncentiveAction.request(payload)) },
        deleteShortIncentive: (payload) => { dispatch(deleteShortIncentiveAction.request(payload)) },
        getShortIncentiveList: () => { dispatch(getShortIncentiveListAction.request()) },

        selectEquityRange: (payload) => { dispatch(selectEquityRangeAction(payload)) },
        createEquityRange: (payload) => { dispatch(createEquityRangeAction.request(payload)) },
        updateEquityRange: (payload) => { dispatch(updateEquityRangeAction.request(payload)) },
        deleteEquityRange: (payload) => { dispatch(deleteEquityRangeAction.request(payload)) },
        getEquityRangeList: () => { dispatch(getEquityRangeListAction.request()) },

        getJobChartList: () => { dispatch(getJobChartListAction.request()) },
        updateCell: (payload) => { dispatch(updateCellAction.request(payload)) },
    }
}