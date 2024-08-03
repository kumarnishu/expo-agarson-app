import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import { BackendError } from "..";
import { IUser } from "../types/user";
import { UserContext } from "./UserContext";
import { GetProfile } from "../services/UserServices";

function useRemoteLoading() {
    const [user, setUser] = useState<IUser | null>(null)
    const { data, isSuccess, isLoading, isError } = useQuery<AxiosResponse<IUser>, BackendError>("profile", GetProfile)

    useEffect(() => {
        if (data)
            setUser(data.data)
    }, [isSuccess])
    
    return { remoteUser: user, remoteLoading: isLoading, isError: isError }
}

// usercontext
type Context = {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
};
export const LoadingContext = createContext<Context>({
    loading: true,
    setLoading: () => null,
});


// user provider
export function LoadingProvider(props: { children: JSX.Element }) {
    const { remoteUser, remoteLoading, isError } = useRemoteLoading()
    const [loading, setLoading] = useState(remoteLoading);
    const { setUser } = useContext(UserContext)

    useEffect(() => {
        if (remoteUser) {
            setLoading(false)
            setUser(remoteUser)
        }
        if (isError) {
            setLoading(false)
            setUser(undefined)
        }
    }, [remoteUser, isError])
    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {props.children}
        </LoadingContext.Provider>
    );
}