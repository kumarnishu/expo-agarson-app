import { Slot } from 'expo-router';
import { UserProvider } from '../contexts/UserContext';
import { LoadingProvider } from '../contexts/LoadingContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChoiceProvider } from '../contexts/ModalContext';


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
    return (
        <QueryClientProvider client={queryClient}>
            <LoadingProvider>
                <UserProvider>
                    <ChoiceProvider>
                        <Slot />
                    </ChoiceProvider>
                </UserProvider>
            </LoadingProvider>
        </QueryClientProvider>
    );
}
