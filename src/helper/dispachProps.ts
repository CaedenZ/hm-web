import { loginAction, logoutAction, forgetPasswordAction } from "../actions/authenticationAction";
import { getUserListAction, createUserAction, deleteUserAction, updateUserAction, selectUserAction } from "../actions/userAction";
import { SharedDispatchProps } from "../interface/propsInterface";
import { getCompanyListAction, getChildCompanyListAction, selectCompanyAction, createCompanyAction, createUnitAction, getChildUnitListAction, getUnitListAction, selectUnitAction, createSubUnitAction, deleteUnitAction, updateSubUnitAction, deleteSubUnitAction, updateUnitAction, selectSubUnitAction, getSubUnitListAction, createChildUnitAction, updateChildUnitAction, deleteChildUnitAction, createSubCompanyAction, selectUpdateCompanyAction, updateCompanyAction, deleteCompanyAction, updateSubCompanyAction, deleteSubCompanyAction, selectUpdateUnitAction } from "../actions/companyAction";
import { getJobFunctionListAction, createJobFunctionAction, createSubJobFunctionAction, selectJobFunctionAction, deleteJobFunctionAction, deleteSubJobFunctionAction } from "../actions/jobFunctionAction";
import { getRegionListAction, createRegionAction, updateRegionAction, deleteRegionAction, selectRegionAction } from "../actions/regionAction";
import { getCountryListAction, getIndustryListAction, getCurrencyListAction, getSectorListAction } from "../actions/countryAction";
import { closeSnackBarAction, showSnackBarAction } from "../actions/snackBarAction";
import { selectRoleAction, createRoleAction, updateRoleAction, deleteRoleAction, getRoleListAction, getRoleFunctionListAction } from "../actions/roleAction";
import { showDialogAction, closeDialogAction } from "../actions/deleteDialogAction";




export function mapDispatchToProps(dispatch): SharedDispatchProps {
    return {
        showSnackBar: () => { dispatch(showSnackBarAction()) },
        closeSnackBar: () => { dispatch(closeSnackBarAction()) },
        showDialog: (payload) => { dispatch(showDialogAction(payload)) },
        closeDialog: () => { dispatch(closeDialogAction()) },


        login: (payload) => { dispatch(loginAction.request(payload)) },
        logout: () => { dispatch(logoutAction()) },
        forgetPassword: (payload) => { dispatch(forgetPasswordAction.request(payload)) },

        getCountryList: () => { dispatch(getCountryListAction.request()) },
        getIndustryList: () => { dispatch(getIndustryListAction.request()) },
        getCurrencyList: () => { dispatch(getCurrencyListAction.request()) },
        getSectorList: () => { dispatch(getSectorListAction.request()) },

        getUserList: () => { dispatch(getUserListAction.request()) },
        createUser: (payload) => { dispatch(createUserAction.request(payload)) },
        selectUser: (payload) => { dispatch(selectUserAction(payload)) },
        updateUser: (payload) => { dispatch(updateUserAction.request(payload)) },
        deleteUser: (payload) => { dispatch(deleteUserAction.request(payload)) },

        selectCompany: (payload) => { dispatch(selectCompanyAction(payload)) },
        selectUpdateCompany: (payload) => { dispatch(selectUpdateCompanyAction(payload)) },
        getCompanyList: () => { dispatch(getCompanyListAction.request()) },
        getChildCompanyList: () => { dispatch(getChildCompanyListAction.request()) },
        createCompany: (payload) => { dispatch(createCompanyAction.request(payload)) },
        updateCompany: (payload) => { dispatch(updateCompanyAction.request(payload)) },
        deleteCompany: (payload) => { dispatch(deleteCompanyAction.request(payload)) },
        createSubCompany: (payload) => { dispatch(createSubCompanyAction.request(payload)) },
        updateSubCompany: (payload) => { dispatch(updateSubCompanyAction.request(payload)) },
        deleteSubCompany: (payload) => { dispatch(deleteSubCompanyAction.request(payload)) },

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
    }
}