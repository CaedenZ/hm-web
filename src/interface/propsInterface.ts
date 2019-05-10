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
import { Allowances, CREATEALLOWANCESCRED, UPDATEALLOWANCESCRED } from "./allowanceInterface";
import { SalaryRange, CREATESALARYRANGECRED, UPDATESALARYRANGECRED } from "./salaryrangeInterface";
import { TargetBonus, CREATETARGETBONUSCRED, UPDATETARGETBONUSCRED } from "./targetbonusInterface";
import { Signons, CREATESIGNONSCRED, UPDATESIGNONSCRED } from "./signonsInterface";
import { LongIncentive, CREATELONGINCENTIVECRED, UPDATELONGINCENTIVECRED } from "./longincentiveInterface";
import { ShortIncentive, CREATESHORTINCENTIVECRED, UPDATESHORTINCENTIVECRED } from "./shortincentiveInterface";
import { EquityRange, CREATEEQUITYRANGECRED, UPDATEEQUITYRANGECRED } from "./equityRangeInterface";

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

    // phrase 2
    getJobGradeList: () => void,
    selectJobGrade: (jg: JobGrade) => void,
    createJobGrade: (cred: CREATEJOBGRADECRED) => void,
    updateJobGrade: (cred: UPDATEJOBGRADECRED) => void,
    deleteJobGrade: (cred: string) => void,

    getAllowancesList: () => void,
    selectAllowances: (jg: Allowances) => void,
    createAllowances: (cred: CREATEALLOWANCESCRED) => void,
    updateAllowances: (cred: UPDATEALLOWANCESCRED) => void,
    deleteAllowances: (cred: string) => void,

    getSalaryRangeList: () => void,
    selectSalaryRange: (jg: SalaryRange) => void,
    createSalaryRange: (cred: CREATESALARYRANGECRED) => void,
    updateSalaryRange: (cred: UPDATESALARYRANGECRED) => void,
    deleteSalaryRange: (cred: string) => void,

    getTargetBonusList: () => void,
    selectTargetBonus: (jg: TargetBonus) => void,
    createTargetBonus: (cred: CREATETARGETBONUSCRED) => void,
    updateTargetBonus: (cred: UPDATETARGETBONUSCRED) => void,
    deleteTargetBonus: (cred: string) => void,

    getSignonsList: () => void,
    selectSignons: (jg: Signons) => void,
    createSignons: (cred: CREATESIGNONSCRED) => void,
    updateSignons: (cred: UPDATESIGNONSCRED) => void,
    deleteSignons: (cred: string) => void,

    getLongIncentiveList: () => void,
    selectLongIncentive: (jg: LongIncentive) => void,
    createLongIncentive: (cred: CREATELONGINCENTIVECRED) => void,
    updateLongIncentive: (cred: UPDATELONGINCENTIVECRED) => void,
    deleteLongIncentive: (cred: string) => void,

    getShortIncentiveList: () => void,
    selectShortIncentive: (jg: ShortIncentive) => void,
    createShortIncentive: (cred: CREATESHORTINCENTIVECRED) => void,
    updateShortIncentive: (cred: UPDATESHORTINCENTIVECRED) => void,
    deleteShortIncentive: (cred: string) => void,

    getEquityRangeList: () => void,
    selectEquityRange: (jg: EquityRange) => void,
    createEquityRange: (cred: CREATEEQUITYRANGECRED) => void,
    updateEquityRange: (cred: UPDATEEQUITYRANGECRED) => void,
    deleteEquityRange: (cred: string) => void,
}