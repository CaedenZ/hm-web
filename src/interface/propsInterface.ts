import { LOGINCRED, CREATEUSERCRED } from "./credInterface";
import { CreateUserState } from "../scenes/UserPage/create";
import { Company } from "./companyInterface";
import { CreateCompanyState } from "../scenes/CompanyPage/create";

export interface SharedDispatchProps {
    login: (cred: LOGINCRED) => void,
    getUserList: () => void,
    getCompanyList: () => void,
    getChildCompanyList: () => void,
    createUser: (cred: CreateUserState) => void,
    selectCompany: (company: Company) => void,
    createCompany: (cred: CreateCompanyState) => void,
}