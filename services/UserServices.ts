import axios, { AxiosResponse } from "axios";
import { BaseURL } from "./baseUrl";
import { IUser } from "../types/user.types";

export const Login = async (
    body: {
        username: string,
        password: string,
        multi_login_token?: string
    }
): Promise<AxiosResponse<{ user: IUser, token: string }, any>> => {
    return await axios.post(`${BaseURL}/login`, body);
};

export const Logout = async (): Promise<AxiosResponse<any, any>> => {

    return await axios.post(`${BaseURL}/logout`);
};
export const GetProfile = async (): Promise<AxiosResponse<{ user: IUser, token: string }, any>> => {
    return await axios.get(`${BaseURL}/profile`);
};
export const UpdateProfile = async (body: FormData): Promise<AxiosResponse<any, any>> => {
    return await axios.put(`${BaseURL}/profile`, body);
};

export const UpdatePassword = async (body: { oldPassword: string, newPassword: string, confirmPassword: string }): Promise<AxiosResponse<any, any>> => {
    return await axios.patch(`${BaseURL}/password/update`, body)
};

export const VerifyEmail = async (token: string): Promise<AxiosResponse<any, any>> => {
    return await axios.patch(`${BaseURL}/email/verify/${token}`)
};

export const SendVerifyEmail = async ({ email }:
    {
        email: string
    }): Promise<AxiosResponse<any, any>> => {
    return await axios.post(`${BaseURL}/email/verify`, { email: email })
};

