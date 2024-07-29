import { View, Pressable, Image, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { UserContext } from '../contexts/UserContext';
import { MaterialIcons } from '@expo/vector-icons';
import { BackendError } from '..';
import { Logout } from '../services/UserServices';
import { SafeAreaView } from 'react-native-safe-area-context';

const NavBar = () => {
    const { user } = useContext(UserContext)
    const { setUser } = useContext(UserContext)
    const [error, setError] = useState<BackendError>()
    if (error)
        alert(error.response.data.message)
    return (
        <>
            <SafeAreaView>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    {user?.dp && user?.dp?.public_url ? <Image source={{ uri: user?.dp?.public_url }} style={{ width: 40, height: 40 }} /> : <Text>{user?.username.slice(0, 8).toUpperCase()}</Text>}
                    <Pressable style={{ flexDirection: 'row', gap: 5, alignItems: 'center', padding: 10 }} onPress={async () => {
                        await Logout().then(() => {
                            setUser(undefined)
                        }).catch((err) => setError(err))
                    }}>
                        <MaterialIcons name="logout" size={35} />
                    </Pressable>
                </View>
            </SafeAreaView >
        </>
    )
}

export default NavBar