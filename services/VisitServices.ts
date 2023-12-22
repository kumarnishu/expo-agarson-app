import axios from "axios"
import { BaseURL } from "./baseUrl"

export const getMyTodayVisit = async () => {
    return await axios.get(`${BaseURL}/visit/today`)
}

export const StartMyDay = async (body: FormData) => {
    return await axios.post(`${BaseURL}/day/start`, body, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const EndMyDay = async ({ id, body }: { id: string, body: FormData }) => {
    return await axios.patch(`${BaseURL}/day/end/${id}`, body, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const MakeVisitIn = async ({ id, body }: { id: string, body: FormData }) => {
    return await axios.post(`${BaseURL}/visit/in/${id}`, body, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
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
    return await axios.patch(`${BaseURL}/visit/summary/${id}`, body)
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
    return await axios.patch(`${BaseURL}/visit/summary/edit/${id}`, body)
}

export const MakeVisitOut = async ({ id, body }: { id: string, body: FormData }) => {
    return await axios.patch(`${BaseURL}/visit/out/${id}`, body, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}