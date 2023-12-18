import { getApiClient } from "./ApiClient";


export const getMyTodayVisit = async () => {
    let client = await getApiClient()
    return await client.get("visit/today")
}

export const StartMyDay = async (body: FormData) => {
    let client = await getApiClient()
    return await client.post("day/start", body)
}

export const EndMyDay = async ({ id, body }: { id: string, body: FormData }) => {
    let client = await getApiClient()
    return await client.patch(`day/end/${id}`, body)
}

export const MakeVisitIn = async ({ id, body }: { id: string, body: FormData }) => {
    let client = await getApiClient()
    return await client.post(`visit/in/${id}`, body)
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
    let client = await getApiClient()
    return await client.patch(`visit/summary/${id}`, body)
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
    return await client.patch(`visit/summary/edit/${id}`, body)
}

export const MakeVisitOut = async ({ id, body }: { id: string, body: FormData }) => {
    return await client.patch(`visit/out/${id}`, body)
}