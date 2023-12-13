import { Text, View } from 'react-native';
import { Button } from '@rneui/base';
import { UserContext } from '../../contexts/UserContext';
import { useContext, useEffect } from 'react';
import { useMutation } from 'react-query';
import { Logout } from '../../services/UserServices';
import { Link } from 'expo-router';

export default function Index() {
    const { setUser, user } = useContext(UserContext)
    const { mutate, isSuccess } = useMutation(Logout)
    useEffect(() => {
        if (isSuccess) {
            setUser(undefined)
        }
    }, [isSuccess])
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View>
                <Text>DASHBOARD</Text>
            </View>
            <View>
                <Link href="/crm">Crm</Link>
            </View>
            <View>
                <Link href="/bot">Bot</Link>
            </View>

            <Button onPress={() => mutate()} title=" Sign Out" />
        </View>
    );
}
