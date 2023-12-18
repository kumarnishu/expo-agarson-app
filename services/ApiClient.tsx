import axios from "axios";
const VITE_SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL
import * as SecureStore from 'expo-secure-store';
import { router } from "expo-router";


let BaseURL = "/api/v1/"
if (VITE_SERVER_URL)
    BaseURL = VITE_SERVER_URL + BaseURL

async function getValueFor(key: string) {
    let result = await SecureStore.getItemAsync(key);
    return result
}

export async function getApiClient() {
    let token = await getValueFor("accessToken")
    const apiClient = axios.create({
        baseURL: BaseURL,
        withCredentials: true,
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })

    apiClient.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (error.response.data.message === "please login to access this resource" || error.response.data.message === "login again ! session expired") {
            router.replace("/")
        }
        return Promise.reject(error);
    });
    return apiClient
}

export {
    BaseURL
}