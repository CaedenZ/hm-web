import { loginAction, logoutAction } from "../actions/authenticationAction";
import { getUserListAction, createUserAction } from "../actions/userAction";
import { LOGINCRED } from "../interface/credInterface";
import { SharedDispatchProps } from "../interface/propsInterface";
import { getCompanyListAction, getChildCompanyListAction, selectCompanyAction, createCompanyAction, createUnitAction, getChildUnitListAction, getUnitListAction, selectUnitAction, createSubUnitAction } from "../actions/companyAction";




export function mapDispatchToProps(dispatch): SharedDispatchProps {
    return {
        login: (payload) => {
            // console.log('scuus')
            dispatch(loginAction.request(payload))
        },
        logout: () => {
            dispatch(logoutAction())
        },
        getUserList: () => {
            // console.log('scuus')
            dispatch(getUserListAction.request())
        },
        getCompanyList: () => {
            dispatch(getCompanyListAction.request())
        },
        createUser: (payload) => {
            dispatch(createUserAction.request(payload))
        },
        getChildCompanyList: () => {
            dispatch(getChildCompanyListAction.request())
        },
        selectCompany: (payload) => {
            dispatch(selectCompanyAction(payload))
        },
        createCompany: (payload) => {
            dispatch(createCompanyAction.request(payload))
        },
        getUnitList: () => {
            dispatch(getUnitListAction.request())
        },
        getChildUnitList: () => {
            dispatch(getChildUnitListAction.request())
        },
        selectUnit: (payload) => {
            dispatch(selectUnitAction(payload))
        },
        createUnit: (payload) => {
            dispatch(createUnitAction.request(payload))
        },
        createSubUnit: (payload) => {
            dispatch(createSubUnitAction.request(payload))
        },
    }
}