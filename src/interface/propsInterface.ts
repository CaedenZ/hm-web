import { LOGINCRED, CREATEUSERCRED, FORGETPWCRED } from "./credInterface";
import { CreateUserState } from "../scenes/UserPage/create";
import { Company, Unit } from "./companyInterface";
import { CreateCompanyState } from "../scenes/CompanyPage/create";
import { CreateUnitState } from "../scenes/UnitPage/create";
import { CreateJobFunctionState } from "../scenes/JobFunctionPage/create";
import { CreateSubJobFunctionState } from "../scenes/JobFunctionPage/createsub";
import { JobFunction } from "./jobfunctionInterface";

export interface SharedDispatchProps {
    login: (cred: LOGINCRED) => void,
    logout: () => void,
    getUserList: () => void,
    getCompanyList: () => void,
    getChildCompanyList: () => void,
    getRegionList: () => void,
    getCountryList: () => void,
    createUser: (cred: CreateUserState) => void,
    selectCompany: (company: Company) => void,
    createCompany: (cred: CreateCompanyState) => void,
    getUnitList: () => void,
    getChildUnitList: () => void,
    selectUnit: (unit: Unit) => void,
    createUnit: (cred: CreateUnitState) => void,
    createSubUnit: (cred: CreateUnitState) => void,
    getJobFunctionList: () => void,
    createJobFunction: (cred: CreateJobFunctionState) => void,
    createSubJobFunction: (cred: CreateSubJobFunctionState) => void,
    selectJobFunction: (jf: JobFunction) => void,
    forgetPassword: (cred: FORGETPWCRED) => void,
    deleteJobFunction: (id: string) => void,
    deleteSubJobFunction: (id: string) => void,
}