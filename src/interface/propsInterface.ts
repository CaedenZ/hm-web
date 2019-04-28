import { LOGINCRED, FORGETPWCRED } from "./credInterface";
import { Company, Unit, CREATECOMPANYCRED, UPDATECOMPANYCRED, CREATEUNITCRED, UPDATEUNITCRED, CREATEENTITYCRED, UPDATEENTITYCRED, Entity } from "./companyInterface";
import { CreateJobFunctionState } from "../scenes/JobFunctionPage/create";
import { CreateSubJobFunctionState } from "../scenes/JobFunctionPage/createsub";
import { JobFunction } from "./jobfunctionInterface";
import { UpdateUserState } from "../scenes/UserPage/update";
import { User, CREATEUSERCRED } from "./userInterface";
import { Region, CREATEREGIONCRED, UPDATEREGIONCRED } from "./regionInterface";
import { CREATEROLE, UPDATEROLE, Role } from "./roleInterface";
import { CREATESECTORCRED, CREATEINDUSTRYCRED, Sector, UPDATESECTORCRED, UPDATEINDUSTRYCRED } from "./sectorInterface";
import { JobGrade, CREATEJOBGRADECRED, UPDATEJOBGRADECRED } from "./jobgradeInterface";

export interface SharedDispatchProps {
    showSnackBar: () => void,
    closeSnackBar: () => void,
    showDialog: (payload) => void,
    closeDialog: () => void,

    login: (cred: LOGINCRED) => void,
    logout: () => void,
    forgetPassword: (cred: FORGETPWCRED) => void,
    updatePassword: (cred: string) => void,

    getUserList: () => void,
    getCompanyList: () => void,
    getChildCompanyList: () => void,

    getRegionList: () => void,
    selectRegion: (region: Region) => void,
    createRegion: (cred: CREATEREGIONCRED) => void,
    updateRegion: (cred: UPDATEREGIONCRED) => void,
    deleteRegion: (cred: string) => void,

    getJobGradeList: () => void,
    selectJobGrade: (jg: JobGrade) => void,
    createJobGrade: (cred: CREATEJOBGRADECRED) => void,
    updateJobGrade: (cred: UPDATEJOBGRADECRED) => void,
    deleteJobGrade: (cred: string) => void,

    getRoleList: () => void,
    getRoleFunctionList: () => void,
    selectRole: (role: Role) => void,
    createRole: (cred: CREATEROLE) => void,
    updateRole: (cred: UPDATEROLE) => void,
    deleteRole: (cred: string) => void,

    getCountryList: () => void,
    // getIndustryList: () => void,
    getCurrencyList: () => void,
    getDistintCurrencyList: () => void,
    // getSectorList: () => void,

    createUser: (cred: CREATEUSERCRED) => void,
    selectUser: (user: User) => void,
    updateUser: (cred: UpdateUserState) => void,
    deleteUser: (id: string) => void,

    selectIndex: (index: number) => void,
    selectCompany: (company: Company) => void,
    selectUpdateCompany: (company: Company) => void,
    selectUpdateEntity: (entity: Entity) => void,

    createCompany: (cred: CREATECOMPANYCRED) => void,
    updateCompany: (cred: UPDATECOMPANYCRED) => void,
    deleteCompany: (id: string) => void,
    createEntity: (cred: CREATEENTITYCRED) => void,
    updateEntity: (cred: UPDATEENTITYCRED) => void,
    deleteEntity: (id: string) => void,

    getDivisionList: () => void,
    getUnitList: () => void,
    getSubUnitList: () => void,
    getChildUnitList: () => void,
    selectUnit: (unit: Unit) => void,
    selectSubUnit: (unit: Unit) => void,
    selectUpdateUnit: (unit: Unit) => void,
    createUnit: (cred: CREATEUNITCRED) => void,
    updateUnit: (cred: UPDATEUNITCRED) => void,
    deleteUnit: (id: string) => void,
    createSubUnit: (cred: CREATEUNITCRED) => void,
    updateSubUnit: (cred: UPDATEUNITCRED) => void,
    deleteSubUnit: (id: string) => void,
    createChildUnit: (cred: CREATEUNITCRED) => void,
    updateChildUnit: (cred: UPDATEUNITCRED) => void,
    deleteChildUnit: (id: string) => void,

    getJobFunctionList: () => void,
    createJobFunction: (cred: CreateJobFunctionState) => void,
    createSubJobFunction: (cred: CreateSubJobFunctionState) => void,
    selectJobFunction: (jf: JobFunction) => void,
    deleteJobFunction: (id: string) => void,
    deleteSubJobFunction: (id: string) => void,

    getSectorList: () => void,
    createSector: (cred: CREATESECTORCRED) => void,
    createIndustry: (cred: CREATEINDUSTRYCRED) => void,
    updateSector: (cred: UPDATESECTORCRED) => void,
    updateIndustry: (cred: UPDATEINDUSTRYCRED) => void,
    selectSector: (sc: Sector) => void,
    deleteSector: (id: string) => void,
    deleteIndustry: (id: string) => void,

    getCompanyByCountry: (id: string) => void,
    getCompanyByRegion: (id: string) => void,
}