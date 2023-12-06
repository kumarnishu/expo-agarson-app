import { Redirect, Stack } from 'expo-router';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { LoadingContext } from '../../contexts/LoadingContext';
import { Text } from 'react-native';

export default function AppLayout() {
    const { user } = useContext(UserContext);
    const { loading } = useContext(LoadingContext)
    if (loading) {
        return <Text>Loading...</Text>;
    }
    if (!user) {
        return <Redirect href="/login" />;
    }
    return <Stack screenOptions={{
        title: "DASHBOARD",
        animation: 'none',
        headerShown: true,
        headerStyle: {
            backgroundColor: 'blue',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }} />
}
