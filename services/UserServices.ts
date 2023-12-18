import { getApiClient } from "./ApiClient";


const client = async () => {
    await getApiClient()
}
if(client){
    
}
export const Login = async (
    body: {
        username: string,
        password: string,
        multi_login_token?: string
    }
) => {
    return await client.post("login", body);
};

export const Logout = async () => {
    return await client.post("logout");
};
export const GetProfile = async () => {
    return await client.get("profile");
};
export const UpdateProfile = async (body: FormData) => {
    return await client.put("profile", body);
};

export const UpdatePassword = async (body: { oldPassword: string, newPassword: string, confirmPassword: string }) => {
    return await client.patch("password/update", body)
};

export const VerifyEmail = async (token: string) => {
    return await client.patch(`email/verify/${token}`)
};

export const SendVerifyEmail = async ({ email }:
    {
        email: string
    }) => {
    return await client.post(`email/verify`, { email: email })
};

