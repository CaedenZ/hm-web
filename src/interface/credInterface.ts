export interface LOGINCRED {
    app_key: string;
    email: string;
    password: string;
}


export interface CREATEUSERCRED {
    session_key: string,
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    alias: string;
    employee_id: string;
    image: string;
    contact: string;
    jobfunction: string;
    country: string;
    address: string;
    postalcode: string;
    status: string;
    remarks: string;
}