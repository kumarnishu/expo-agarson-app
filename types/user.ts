import { Asset } from "./asset"

export type ICRMCity = {
    _id: string,
    city: string,
    state: string,
    created_at: Date,
    updated_at: Date,
    created_by: IUser,
    updated_by: IUser
}
export type ICRMState = {
    _id: string,
    state: string,
    created_at: Date,
    updated_at: Date,
    created_by: IUser,
    updated_by: IUser
}
export type IState = {
    _id: string,
    state: string,
    apr: number,
    may: number,
    jun: number,
    jul: number,
    aug: number,
    sep: number,
    oct: number,
    nov: number,
    dec: number,
    jan: number,
    feb: number,
    mar: number,
    created_at: Date,
    updated_at: Date,
    created_by: IUser,
    updated_by: IUser
}
export type IUser = {
    _id: string,
    username: string,
    password: string,
    email: string,
    mobile: string,
    dp: Asset,
    client_id: string,
    connected_number: string,
    is_admin: Boolean,
    email_verified: Boolean,
    mobile_verified: Boolean,
    show_only_visiting_card_leads: boolean,
    is_active: Boolean,
    last_login: Date,
    multi_login_token: string | null,
    is_multi_login: boolean,
    assigned_users: IUser[]
    assigned_states: IState[]
    assigned_crm_states: ICRMState[]
    assigned_crm_cities: ICRMCity[],
    assigned_permissions: string[],
    created_at: Date,
    updated_at: Date,
    created_by: IUser,
    updated_by: IUser
    resetPasswordToken: string | null,
    resetPasswordExpire: Date | null,
    emailVerifyToken: string | null,
    emailVerifyExpire: Date | null
}
