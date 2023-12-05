import { Redirect, Stack } from 'expo-router';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

export default function AppLayout() {
    const { user } = useContext(UserContext);

    if (!user) {
        return <Redirect href="/login" />;
    }
    return <Stack />;
}
