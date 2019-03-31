export interface Company {
    company_id: string,
    logo_main: string,
    logo_small: string,
    company_name: string,
    industry: string,
    sector: string,
    location: string,
    address: string,
    postal_code: string,
    country: string,
    contact_person: string,
    contact_number: string,
    contact_email: string,
    hq_name: string,
    base_currency_id: string,
    parentcompany_id: string,
    webpage_url: string,
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
    selectUpdateUnit?: Unit,
}