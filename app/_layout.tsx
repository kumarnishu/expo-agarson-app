import { Slot } from 'expo-router';
import { UserProvider } from '../contexts/UserContext';
import { LoadingProvider } from '../contexts/LoadingContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnReconnect: true,
            refetchOnMount: true,
            retry: false,
            staleTime: 200
        }
    }
});

export default function Root() {
    let multi_login_token = undefined

    async () => {
        let token = await AsyncStorage.getItem('multi_login_token')
        multi_login_token = token
    };
    if (!multi_login_token)
        async () => {
            await AsyncStorage.setItem('multi_login_token', "shdsididiwie")

        };
    return (
        <QueryClientProvider client={queryClient}>
            <LoadingProvider>
                <UserProvider>
                    <Slot />
                </UserProvider>
            </LoadingProvider>
        </QueryClientProvider>
    );
}
