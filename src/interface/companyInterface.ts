import { Country } from "./countryInterface";
import { Sector, Industry } from "./sectorInterface";

export interface Company {
    company_id: string,
    logo_main: string,
    logo_small: string,
    company_name: string,
    industry: Industry[],
    sector: Sector[],
    location: string,
    address: string,
    postal_code: string,
    country: any,
    contact_person: string,
    contact_number: string,
    contact_email: string,
    hq_name: string,
    entity_name?: string,
    registration_number?: string,
    base_currency_id: string,
    parentcompany_id: string,
    webpage_url: string,
    financialyr_dt: string,
}

export interface UPDATECOMPANYCRED {
    company_id: string;
    location: string;
    company_name: string;
    industry: string;
    sector: Sector;
    country: Country[];
    address: string;
    postal_code: string;
    logo_small: string;
    contact_person: string;
    contact_number: string;
    contact_email: string;
    hq_name: string;
    base_currency_id: string;
    logo_main: string;
    webpage_url: string;
    entity_name?: string;
    registration_number?: string;
}

export interface CREATECOMPANYCRED {
    logo_main: string;
    logo_small: string;
    company_name: string;
    hq_name: string;
    webpage_url: string;
    location: string;
    industry: string;
    sector: Sector;
    country: Country[];
    address: string;
    postal_code: string;
    contact_person: string;
    contact_number: string;
    contact_email: string;
    base_currency_id: string;
    entity_name?: string;
    registration_number?: string;
}

export interface CREATEUNITCRED {
    unit_name: string,
    unit_type: string,
    unit_data: string,
    parent_unit: string,
    main_unit: string,
    company_id: string,
}

export interface UPDATEUNITCRED {
    unit_id: string,
    unit_name: string,
    unit_type: string,
    unit_data: string,
    parent_unit: string,
    main_unit: string,
    company_id: string,
}


export interface Unit {
    unit_id: string,
    unit_name: string,
    unit_type: string,
    unit_data: string,
    parent_unit: string,
    main_unit: string,
    company_id: string,
}

export interface Entity {
    company_id: string,
    logo_main: string,
    logo_small: string,
    company_name: string,
    address: string,
    postal_code: string,
    country: string,
    contact_person: string,
    contact_number: string,
    contact_email: string,
    hq_name: string,
    entity_name: string,
    registration_number: string,
    base_currency_id: string,
    parentcompany_id: string,
    webpage_url: string,
    financialyr_dt: string,
}

export interface CREATEENTITYCRED {
    logo_main: string,
    logo_small: string,
    company_name: string,
    address: string,
    postal_code: string,
    country: string,
    contact_person: string,
    contact_number: string,
    contact_email: string,
    hq_name: string,
    entity_name?: string,
    registration_number?: string,
    base_currency_id: string,
    parentcompany_id: string,
    webpage_url: string,
    financialyr_dt: string,
}

export interface UPDATEENTITYCRED {
    company_id: string,
    logo_main: string,
    logo_small: string,
    company_name: string,
    address: string,
    postal_code: string,
    country: Country,
    contact_person: string,
    contact_number: string,
    contact_email: string,
    hq_name: string,
    entity_name?: string,
    registration_number?: string,
    base_currency_id: string,
    parentcompany_id: string,
    webpage_url: string,
    financialyr_dt: string,
}

export interface Division {
    unit_id: string,
    unit_name: string,
    unit_type: string,
    unit_data: string,
    parent_unit: string,
    main_unit: string,
    company_id: string,
    sub_unit: [{
        unit_id: string,
        unit_name: string,
        unit_type: string,
        unit_data: string,
        parent_unit: string,
        main_unit: string,
        company_id: string,
        sub_sub_unit: [{
            unit_id: string,
            unit_name: string,
            unit_type: string,
            unit_data: string,
            parent_unit: string,
            main_unit: string,
            company_id: string,
        }]
    }]
}

export interface CompanyState {
    unitList: Unit[],
    subUnitList: Unit[],
    childUnitList: Unit[],
    companyList: Company[],
    childCompanyList: Company[],
    selectedCompany?: Company,
    selectedUnit?: Unit,
    selectedSubUnit?: Unit,
    selectUpdateCompany?: Company,
    selectUpdateEntity?: Entity,
    selectUpdateUnit?: Unit,
    selectedIndex?: number,
    unitEntity: Company[],
    divisionList: Division[],
}

