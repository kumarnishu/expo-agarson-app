import { apiClient } from "./ApiClient"


export const getMyTodayVisit = async () => {
    return await apiClient.get("visit/today")
}

export const StartMyDay = async (body: FormData) => {
    return await apiClient.post("day/start", body)
}

export const EndMyDay = async ({ id, body }: { id: string, body: FormData }) => {
    return await apiClient.patch(`day/end/${id}`, body)
}

export const MakeVisitIn = async ({ id, body }: { id: string, body: FormData }) => {
    return await apiClient.post(`visit/in/${id}`, body)
}
export const AddVisitSummary = async ({ id, body }: {
    id: string, body: {
        summary: string
        is_old_party: boolean
        dealer_of: string
        refs_given: string
        reviews_taken: number,
        turnover: string
    }
}) => {
    return await apiClient.patch(`visit/summary/${id}`, body)
}

export const EditVisitSummary = async ({ id, body }: {
    id: string, body: {
        summary: string
        is_old_party: boolean
        dealer_of: string
        refs_given: string
        reviews_taken: number,
        turnover: string
    }
}) => {
    return await apiClient.patch(`visit/summary/edit/${id}`, body)
}

export const MakeVisitOut = async ({ id, body }: { id: string, body: FormData }) => {
    return await apiClient.patch(`visit/out/${id}`, body)
}