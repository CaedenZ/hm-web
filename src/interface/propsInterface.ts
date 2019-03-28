import { LOGINCRED, CREATEUSERCRED } from "./credInterface";
import { CreateUserState } from "../scenes/UserPage/create";
import { Company, Unit } from "./companyInterface";
import { CreateCompanyState } from "../scenes/CompanyPage/create";
import { CreateUnitState } from "../scenes/UnitPage/create";

export interface SharedDispatchProps {
    login: (cred: LOGINCRED) => void,
    getUserList: () => void,
    getCompanyList: () => void,
    getChildCompanyList: () => void,
    createUser: (cred: CreateUserState) => void,
    selectCompany: (company: Company) => void,
    createCompany: (cred: CreateCompanyState) => void,
    getUnitList: () => void,
    getChildUnitList: () => void,
    selectUnit: (unit: Unit) => void,
    createUnit: (cred: CreateUnitState) => void,
}