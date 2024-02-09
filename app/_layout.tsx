import { Slot } from 'expo-router';
import { UserProvider } from '../contexts/UserContext';
import { ChoiceProvider } from '../contexts/ModalContext';
import { MD3LightTheme as DefaultTheme, MD2Colors, PaperProvider } from 'react-native-paper';
import { QueryClientProvider, QueryClient } from "react-query";
import { LoadingProvider } from '../contexts/LoadingContext';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: MD2Colors.blue400,
        secondary: MD2Colors.grey400,
    },
};
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnReconnect: true,
            refetchOnMount: true,
            refetchOnWindowFocus: true,
            retry: false,
            staleTime: 200
        }
    }
});
export default function Root() {
    return (
        <QueryClientProvider client={queryClient}>
            <PaperProvider theme={theme}>
                <ChoiceProvider>
                    <LoadingProvider>
                        <UserProvider>
                            <Slot />
                        </UserProvider>
                    </LoadingProvider>
                </ChoiceProvider>
            </PaperProvider>
        </QueryClientProvider>
    );
}
