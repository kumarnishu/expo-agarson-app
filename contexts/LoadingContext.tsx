import React, { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "../types/user.types";
import { UserContext } from "./UserContext";
import { GetProfile } from "../services/UserServices";
import { BackendError } from "..";

function useRemoteLoading() {
    const [user, setUser] = useState<IUser | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<BackendError>()

    useEffect(() => {
        async function fetchProfile() {
            await GetProfile().then((data) => {
                setUser(data.data.user)
            }).catch((err) => {
                setError(err)
            })
            setLoading(false)
        }
        fetchProfile()
    }, [])
    return { remoteUser: user, remoteLoading: loading, error: error }
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
    const { remoteUser, remoteLoading, error } = useRemoteLoading()
    const [loading, setLoading] = useState(remoteLoading);
    const { setUser } = useContext(UserContext)

    useEffect(() => {
        if (remoteUser) {
            setLoading(false)
            setUser(remoteUser)
        }
        if (error) {
            setLoading(false)
            setUser(undefined)
        }
    }, [remoteUser, error])

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {props.children}
        </LoadingContext.Provider>
    );
}
