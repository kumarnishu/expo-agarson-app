import { Redirect } from 'expo-router';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { LoadingContext } from '../../contexts/LoadingContext';
import { LinearProgress } from '@rneui/themed/dist/LinearProgress';
import { Drawer } from 'expo-router/drawer';

const Profile = () => {
    const { user } = useContext(UserContext);
    return user?.username
}
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
    return <Drawer >
        <Drawer.Screen
            name="index"
            options={{
                drawerLabel: user.username,
                title: 'Home',
            }}
        />
        <Drawer.Screen
            name="catalouge"
            options={{
                drawerLabel: 'Catalouge',
                title: 'Catalouge',
            }}
        />
        <Drawer.Screen
            name="customers"
            options={{
                drawerLabel: 'Customers',
                title: 'Customers',
            }}
        />
        <Drawer.Screen
            name="orders"
            options={{
                drawerLabel: 'Orders',
                title: 'Orders',
            }}
        />
        <Drawer.Screen
            name="ledger"
            options={{
                drawerLabel: 'Ledgers',
                title: 'Ledgers',
            }}
        />
        <Drawer.Screen
            name="privacy"
            options={{
                drawerLabel: 'Privacy Policy',
                title: 'Privacy Policy',
            }}
        />
        <Drawer.Screen
            name="signout"
            options={{
                drawerLabel: 'Sign Out',
                title: 'Sign Out',
            }}
        />
    </Drawer>
}
