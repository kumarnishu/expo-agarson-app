import { apiClient } from "./ApiClient";

export const Login = async (
    body: {
        username: string,
        password: string,
        multi_login_token?: string
    }
) => {
    return await apiClient.post("login", body);
};

export const Logout = async () => {
    return await apiClient.post("logout");
};
export const GetProfile = async () => {
    return await apiClient.get("profile");
};
export const UpdateProfile = async (body: FormData) => {
    return await apiClient.put("profile", body);
};

export const UpdatePassword = async (body: { oldPassword: string, newPassword: string, confirmPassword: string }) => {
    return await apiClient.patch("password/update", body)
};

export const VerifyEmail = async (token: string) => {
    return await apiClient.patch(`email/verify/${token}`)
};

export const SendVerifyEmail = async ({ email }:
    {
        email: string
    }) => {
    return await apiClient.post(`email/verify`, { email: email })
};

