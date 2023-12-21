import { Slot } from 'expo-router';
import { UserProvider } from '../contexts/UserContext';
import { ChoiceProvider } from '../contexts/ModalContext';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { QueryClientProvider, QueryClient } from "react-query";
import { LocationProvider } from '../contexts/LocationContext';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'tomato',
        secondary: 'yellow',
    },
};
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
        <LocationProvider>
            <QueryClientProvider client={queryClient}>
                <PaperProvider theme={theme}>
                    <ChoiceProvider>
                        <UserProvider>
                            <Slot />
                        </UserProvider>
                    </ChoiceProvider>
                </PaperProvider>
            </QueryClientProvider>
        </LocationProvider>
    );
}
