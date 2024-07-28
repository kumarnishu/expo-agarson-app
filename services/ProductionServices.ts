import { apiClient } from "./AxiosInterceptor"

export const CreateShoeWeight = async ({ body }: { body: FormData }) => {
    return await apiClient.post(`weights`, body, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}


export const GetMachines = async () => {
    return await apiClient.get(`machines`);
};

export const GetDyeById = async (id: string) => {
    return await apiClient.get(`dyes/${id}`);
};

export const GetDyes = async (hidden?: string) => {
    if (hidden)
        return await apiClient.get(`dyes?hidden=${hidden}`);
    else
        return await apiClient.get(`dyes`);
};

export const GetArticles = async (hidden?: string) => {
    if (hidden)
        return await apiClient.get(`articles?hidden=${hidden}`);
    else
        return await apiClient.get(`articles`);
};


export const GetMyProductions = async ({ date, machine }: { date: string, machine?: string }) => {
    if (machine)
        return await apiClient.get(`productions/me/?date=${date}&machine=${machine}`);
    else
        return await apiClient.get(`productions/me/?date=${date}`);
}

export const CreateProduction = async (body: {
    machine: string,
    thekedar: string,
    articles: string[],
    manpower: number,
    production: number,
    big_repair: number,
    small_repair: number,
    production_hours: number,
    date: String
}) => {
    return await apiClient.post(`productions`, body);
}


export const GetProductions = async ({ limit, page, start_date, end_date, id }: { limit: number | undefined, page: number | undefined, start_date?: string, end_date?: string, id?: string }) => {
    if (id)
        return await apiClient.get(`productions/?id=${id}&start_date=${start_date}&end_date=${end_date}&limit=${limit}&page=${page}`)
    else
        return await apiClient.get(`productions/?start_date=${start_date}&end_date=${end_date}&limit=${limit}&page=${page}`)

}

export const GetShoeWeights = async () => {
    return await apiClient.get(`weights`);
}


