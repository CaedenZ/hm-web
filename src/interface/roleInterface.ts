
export interface Role {
    role_id: string,
    role_name: string,
    role_description: string,
    role_function: Function[]
}
export interface Function {
    function_id: string
}
export interface RoleState {
    roleList: Role[],
    roleFunctionList: RoleFunction[],
    selectUpdateRole?: Role,
}
export interface RoleFunction {
    function_id: string,
    function_name: string,
    function_description: string,
}

export interface CREATEROLE {
    role_name: string,
    role_description: string,
    role_function: Function[]
}

export interface UPDATEROLE {
    role_id: string,
    role_name: string,
    role_description: string,
    role_function: Function[]
}