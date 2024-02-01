import { apiClient } from "./AxiosInterceptor";


// login
export const Login = async (
    body: {
        username: string,
        password: string,
        multi_login_token?: string
    }
) => {
    return await apiClient.post("login", body);
};

// logout
export const Logout = async () => {
    return await apiClient.post("logout");
};


// get profile
export const GetProfile = async () => {
    return await apiClient.get("profile");
};
// update profile
export const UpdateProfile = async (body: FormData) => {
    return await apiClient.put("profile", body, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

// //update password
export const UpdatePassword = async (body: { oldPassword: string, newPassword: string, confirmPassword: string }) => {
    return await apiClient.patch("password/update", body)
};

// //update password
export const ResetPassword = async ({ token, body }:
    {
        token: string,
        body: { newPassword: string, confirmPassword: string }
    }) => {
    return await apiClient.patch(`password/reset/${token}`, body)
};

// send reset password
export const ResetPasswordSendMail = async ({ email }:
    {
        email: string
    }) => {
    return await apiClient.post(`password/reset`, { email: email })
};

// verify email
export const VerifyEmail = async (token: string) => {
    return await apiClient.patch(`email/verify/${token}`)
};

// send verification main
export const SendVerifyEmail = async ({ email }:
    {
        email: string
    }) => {
    return await apiClient.post(`email/verify`, { email: email })
};
