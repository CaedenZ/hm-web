import { Role } from "./roleInterface";

export interface Info {
    company_id: string,
    company_name: string,
    primary: number,
    roles: Role[]
}

export interface User {
    email: string,
    firstname: string,
    lastname: string,
    alias: string,
    employee_id: string,
    image: string,
    contact: string,
    jobfunction: string,
    country: string,
    address: string,
    postal_code: string,
    status: string,
    remarks: string,
}

export interface UserState {
    userList: User[],
    user: User,
    profileInfo?: Info,
}
export interface UserProfile {
    email: string,
    firstname: string,
    lastname: string,
    alias: string,
    employee_id: string,
    image: string,
    contact: string,
    jobfunction: string,
    country: string,
    address: string,
    postal_code: string,
    status: string,
    remarks: string,
    info: Info,
}