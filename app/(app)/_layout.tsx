import { Redirect } from 'expo-router';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { LoadingContext } from '../../contexts/LoadingContext';
import { Stack } from 'expo-router';
import { ProgressBar } from 'react-native-paper';
import * as React from 'react';
import { Appbar } from 'react-native-paper';

const Profile = () => {
    const { user } = useContext(UserContext);
    return user?.username
}
export default function AppLayout() {
    const { user } = useContext(UserContext);
    const { loading } = useContext(LoadingContext)
    if (loading) {
        return (
            <ProgressBar />
        )
    }
    if (!user) {
        return <Redirect href="/login" />;
    }
    return (
        <>
            <Appbar.Header>
                <Appbar.Action icon="menu" onPress={() => { }} />
                <Appbar.Content title="" />
                <Appbar.Action icon="label" color="green" onPress={() => { }} />
                <Appbar.Action icon="cart" color='red' onPress={() => { }} />
            </Appbar.Header>

            <Stack>
                <Stack.Screen
                    name="index"
                    options={{
                        headerShown: false,

                    }}
                />
                <Stack.Screen
                    name="catalouge"
                    options={{
                        headerShown: false,
                        animation:'none'
                    }}
                />
                <Stack.Screen
                    name="customers"
                    options={{
                        headerShown: false,
                        animation:'none'
                    }}
                />
                <Stack.Screen
                    name="orders"
                    options={{
                        headerShown: false,
                        animation:'none'
                    }}
                />
                <Stack.Screen
                    name="ledger"
                    options={{
                        headerShown: false,
                        animation:'none'
                    }}
                />
                <Stack.Screen
                    name="privacy"
                    options={{
                        headerShown: false,
                        animation:'none'
                    }}
                />
                <Stack.Screen
                    name="signout"
                    options={{
                        headerShown: false,
                        animation:'none'
                    }}
                />
            </Stack>
        </>
    )
}
