import { apiClient } from "./AxiosInterceptor"

export const CreateShoeWeight = async ({ body }: { body: FormData }) => {
    return await apiClient.post(`weights`, body, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
