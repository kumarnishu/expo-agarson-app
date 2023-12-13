import { Redirect } from 'expo-router';
import { useContext } from 'react';
import { LinearProgress } from '@rneui/themed/dist/LinearProgress';
import { Stack } from 'expo-router/Stack';
import { UserContext } from '../../../contexts/UserContext';
import { LoadingContext } from '../../../contexts/LoadingContext';


export default function AppLayout() {
    const { user } = useContext(UserContext);
    const { loading } = useContext(LoadingContext)
    if (loading) {
        return (
            <LinearProgress />
        )
    }
    if (!user) {
        return <Redirect href="/login" />;
    }
    return <Stack >
        <Stack.Screen
            name="index"
            options={{
                headerShown:true,
                title: 'Cart'

            }}
        />
    </Stack>
}
