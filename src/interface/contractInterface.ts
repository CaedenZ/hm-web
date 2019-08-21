
export interface Contract {
    contract_id: string,
	date_issue: string,
	employee_nric: string,
	start_date: string,
	duty: string,
	duration: string,
	working_hour: string,
	salary_period: string,
	workplace: string,
	working_day: string,
	rest_day: string,
	ot_payment: string,
	salary_date: string,
	deduction: Deduction[],
	ot_rate: string,
	salary_component: SalaryComponent[]
	annual_leave: string,
	sick_leave: string,
	hospitalisation_leave: string,
	medical_benefits: string,
	other_leave: Leave[],
	birthday_leave: string,
	notice_period: string,
	probation: string,
	probation_start_date: string,
	probation_end_date: string
}


interface SalaryComponent{
    type:string;
}

interface Leave{
    name:string;
}

interface Deduction{
    type:string;
    value:string;
}

export interface NameValueType{
    name:string;
    value:string;
    type:string;
}

export interface ContractState {
    contractList: Contract[],
    selectedContract?: Contract,
}

export interface CREATECONTRACTCRED {
	date_issue: string,
	employee_nric: string,
	start_date: string,
	duty: string,
	duration: string,
	working_hour: string,
	salary_period: string,
	workplace: string,
	working_day: string,
	rest_day: string,
	ot_payment: string,
	salary_date: string,
	deduction: Deduction[],
	ot_rate: string,
	salary_component: SalaryComponent[]
	annual_leave: string,
	sick_leave: string,
	hospitalisation_leave: string,
	medical_benefits: string,
	other_leave: Leave[],
	birthday_leave: string,
	notice_period: string,
	probation: string,
	probation_start_date: string,
	probation_end_date: string
}

export interface UPDATECONTRACTCRED {
    contract_id: string,
	date_issue: string,
	employee_nric: string,
	start_date: string,
	duty: string,
	duration: string,
	working_hour: string,
	salary_period: string,
	workplace: string,
	working_day: string,
	rest_day: string,
	ot_payment: string,
	salary_date: string,
	deduction: Deduction[],
	ot_rate: string,
	salary_component: SalaryComponent[]
	annual_leave: string,
	sick_leave: string,
	hospitalisation_leave: string,
	medical_benefits: string,
	other_leave: Leave[],
	birthday_leave: string,
	notice_period: string,
	probation: string,
	probation_start_date: string,
	probation_end_date: string
}
