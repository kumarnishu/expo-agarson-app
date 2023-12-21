const VITE_SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL

let BaseURL = "/api/v1"
if (VITE_SERVER_URL)
    BaseURL = VITE_SERVER_URL + BaseURL

export {
    BaseURL
}