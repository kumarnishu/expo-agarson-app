import { Redirect, Stack } from 'expo-router';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import * as React from 'react';
import NavBar from '../../components/NavBar';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View, Text } from 'react-native';

SplashScreen.preventAutoHideAsync();


export default function AppLayout() {
    const { user } = useContext(UserContext);
    const [fontsLoaded, fontError] = useFonts({
        'Roboto-Regular': require("../../assets/Roboto-Regular.ttf"),
    });

    const onLayoutRootView = React.useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }
    else {
        if (!user) {
            return <Redirect href="/login" />;
        }
        if (user)
            return (
                <View  onLayout={onLayoutRootView}>
                    <StatusBar style="auto" />
                    <NavBar />
                    <Stack screenOptions={{ headerShown: false, animation: 'none' }} />
                </View>
            )
    }


}
