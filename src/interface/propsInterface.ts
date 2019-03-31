import { LOGINCRED, CREATEUSERCRED, FORGETPWCRED } from "./credInterface";
import { CreateUserState } from "../scenes/UserPage/create";
import { Company, Unit } from "./companyInterface";
import { CreateCompanyState } from "../scenes/CompanyPage/create";
import { CreateUnitState } from "../scenes/UnitPage/create";
import { CreateJobFunctionState } from "../scenes/JobFunctionPage/create";
import { CreateSubJobFunctionState } from "../scenes/JobFunctionPage/createsub";
import { JobFunction } from "./jobfunctionInterface";
import { UpdateUserState } from "../scenes/UserPage/update";
import { User } from "./userInterface";
import { UpdateUnitState } from "../scenes/UnitPage/update";
import { CreateRegionState } from "../scenes/RegionPage/create";
import { UpdateCompanyState } from "../scenes/CompanyPage/update";
import { UpdateRegionState } from "../scenes/RegionPage/update";
import { Region } from "./regionInterface";
import { CREATEROLE, UPDATEROLE, Role } from "./roleInterface";

export interface SharedDispatchProps {
    showSnackBar: () => void,
    closeSnackBar: () => void,
    login: (cred: LOGINCRED) => void,
    logout: () => void,

    getUserList: () => void,
    getCompanyList: () => void,
    getChildCompanyList: () => void,

    getRegionList: () => void,
    selectRegion: (region: Region) => void,
    createRegion: (cred: CreateRegionState) => void,
    updateRegion: (cred: UpdateRegionState) => void,
    deleteRegion: (cred: string) => void,

    getRoleList: () => void,
    getRoleFunctionList: () => void,
    selectRole: (role: Role) => void,
    createRole: (cred: CREATEROLE) => void,
    updateRole: (cred: UPDATEROLE) => void,
    deleteRole: (cred: string) => void,

    getCountryList: () => void,

    createUser: (cred: CreateUserState) => void,
    selectUser: (user: User) => void,
    updateUser: (cred: UpdateUserState) => void,
    deleteUser: (id: string) => void,

    selectCompany: (company: Company) => void,
    selectUpdateCompany: (company: Company) => void,

    createCompany: (cred: CreateCompanyState) => void,
    updateCompany: (cred: UpdateCompanyState) => void,
    deleteCompany: (id: string) => void,
    createSubCompany: (cred: CreateCompanyState) => void,
    updateSubCompany: (cred: UpdateCompanyState) => void,
    deleteSubCompany: (id: string) => void,

    getUnitList: () => void,
    getSubUnitList: () => void,
    getChildUnitList: () => void,
    selectUnit: (unit: Unit) => void,
    selectSubUnit: (unit: Unit) => void,
    selectUpdateUnit: (unit: Unit) => void,
    createUnit: (cred: CreateUnitState) => void,
    updateUnit: (cred: UpdateUnitState) => void,
    deleteUnit: (id: string) => void,
    createSubUnit: (cred: CreateUnitState) => void,
    updateSubUnit: (cred: UpdateUnitState) => void,
    deleteSubUnit: (id: string) => void,
    createChildUnit: (cred: CreateUnitState) => void,
    updateChildUnit: (cred: UpdateUnitState) => void,
    deleteChildUnit: (id: string) => void,
    getJobFunctionList: () => void,
    createJobFunction: (cred: CreateJobFunctionState) => void,
    createSubJobFunction: (cred: CreateSubJobFunctionState) => void,
    selectJobFunction: (jf: JobFunction) => void,
    forgetPassword: (cred: FORGETPWCRED) => void,
    deleteJobFunction: (id: string) => void,
    deleteSubJobFunction: (id: string) => void,
}