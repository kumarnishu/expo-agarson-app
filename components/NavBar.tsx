import { View, TouchableOpacity, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import { UserContext } from '../contexts/UserContext';
import { Avatar, MD2Colors, Text } from "react-native-paper"
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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: MD2Colors.blue800,padding:10 }}>
                    {user?.dp && user?.dp?.public_url ? <Avatar.Image size={45} source={{ uri: user?.dp?.public_url }} /> : <Text variant='displaySmall' style={{ color: 'white' }}>{user?.username.slice(0, 8).toUpperCase()}</Text>}
                    <Pressable style={{ flexDirection: 'row', gap: 5, alignItems: 'center', padding: 10 }} onPress={async () => {
                        await Logout().then(() => {
                            setUser(undefined)
                        }).catch((err) => setError(err))
                    }}>
                        <MaterialIcons name="logout" color={MD2Colors.white} size={35} />
                    </Pressable>
                </View>
            </SafeAreaView >
        </>
    )
}

export default NavBar