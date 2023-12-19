import { Slot } from 'expo-router';
import { UserProvider } from '../contexts/UserContext';
import { LoadingProvider } from '../contexts/LoadingContext';
import { ChoiceProvider } from '../contexts/ModalContext';


export default function Root() {
    return (
        <LoadingProvider>
            <UserProvider>
                <ChoiceProvider>
                    <Slot />
                </ChoiceProvider>
            </UserProvider>
        </LoadingProvider>
    );
}
