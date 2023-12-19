import { Redirect, Stack } from 'expo-router';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { LoadingContext } from '../../contexts/LoadingContext';
import * as React from 'react';
import { Text, View } from 'react-native';
import NavBar from '../../components/NavBar';
import { StatusBar } from 'expo-status-bar';

export default function AppLayout() {
    const { user } = useContext(UserContext);
    const { loading } = useContext(LoadingContext)

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ padding: 40, fontSize: 40 }}>Loading...</Text>
            </View>
        )
    }
    if (!user) {
        return <Redirect href="/login" />;
    }
    return (
        <>
            <StatusBar style="auto" />
            <NavBar />
            <Stack screenOptions={{ headerShown: false, animation: 'none' }} />
        </>
    )
}
