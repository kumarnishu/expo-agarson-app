import { Slot } from 'expo-router';
import { UserProvider } from '../contexts/UserContext';
import { LoadingProvider } from '../contexts/LoadingContext';
import { ChoiceProvider } from '../contexts/ModalContext';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'tomato',
        secondary: 'yellow',
    },
};

export default function Root() {
    return (
        <PaperProvider theme={theme}>
            <LoadingProvider>
                <UserProvider>
                    <ChoiceProvider>
                        <Slot />
                    </ChoiceProvider>
                </UserProvider>
            </LoadingProvider>
        </PaperProvider>
    );
}
