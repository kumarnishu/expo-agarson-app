import { Redirect, Stack } from 'expo-router';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import * as React from 'react';
import NavBar from '../../components/NavBar';
import { StatusBar } from 'expo-status-bar';
import { LoadingContext } from '../../contexts/LoadingContext';

export default function AppLayout() {
    const { user } = useContext(UserContext)
    const { loading } = useContext(LoadingContext)
    

    if (!loading && user)
        return <>
           
            <StatusBar style="auto" />
            <NavBar />
            <Stack screenOptions={{ headerShown: false, animation: 'none' }} >
            </Stack>
        </>
    if (!loading && !user)
        return <Redirect href="/login" />;
}







