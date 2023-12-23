import { Redirect, Stack } from 'expo-router';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import * as React from 'react';
import NavBar from '../../components/NavBar';
import { StatusBar } from 'expo-status-bar';

export default function AppLayout() {
    const { user } = useContext(UserContext);

    if (!user) {
        return <Redirect href="/login" />;
    }
    if (user)
        return (
            <>
                <StatusBar style="auto" />
                <NavBar />
                <Stack screenOptions={{ headerShown: false, animation: 'none' }} />
            </>
        )
}
