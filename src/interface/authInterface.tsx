
export interface Auth {
    email: string;
    session_key: string;
    firstname: string;
    lastname: string;
    alias: string;
    employee_id: string;
    image: string;
    contact: string;
    jobfunction: string;
    country: string;
    address: string;
    postal_code: string;
    status: string;
    remarks: string;
    role: string;
    company: string;
}

export interface Profile {
    email: string,
    firstname: string,
    lastname: string,
    alias: string,
    employee_id: string,
    image: string,
    jobfunction: string,
    country: string,
    address: string,
    postal_code: string,
    status: string,
    remarks: string,
    info: any
}