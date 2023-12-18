import { getApiClient } from "./ApiClient";

export const Login = async (
    body: {
        username: string,
        password: string,
        multi_login_token?: string
    }
) => {
    let client = await getApiClient()
    return await client.post("login", body);
};

export const Logout = async () => {
    let client = await getApiClient()
    return await client.post("logout");
};
export const GetProfile = async () => {
    let client = await getApiClient()
    return await client.get("profile");
};
export const UpdateProfile = async (body: FormData) => {
    let client = await getApiClient()
    return await client.put("profile", body);
};

export const UpdatePassword = async (body: { oldPassword: string, newPassword: string, confirmPassword: string }) => {
    let client = await getApiClient()
    return await client.patch("password/update", body)
};

export const VerifyEmail = async (token: string) => {
    let client = await getApiClient()
    return await client.patch(`email/verify/${token}`)
};

export const SendVerifyEmail = async ({ email }:
    {
        email: string
    }) => {
    let client = await getApiClient()
    return await client.post(`email/verify`, { email: email })
};

