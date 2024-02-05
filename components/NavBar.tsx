import { View, TouchableOpacity, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import { UserContext } from '../contexts/UserContext';
import { Avatar, MD2Colors } from "react-native-paper"
import { MaterialIcons } from '@expo/vector-icons';
import { BackendError } from '..';
import { Logout } from '../services/UserServices';

const NavBar = () => {
    const { user } = useContext(UserContext)
    const { setUser } = useContext(UserContext)
    const [error, setError] = useState<BackendError>()
    if (error)
        alert(error.response.data.message)
    return (
        <>
            <View style={{ paddingTop: 20, backgroundColor: MD2Colors.blue400 }}>
                <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Avatar.Image size={40} source={{ uri: user?.dp?.public_url || "https://www.bo.agarson.in/logo.png" }} />
                    <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                        <TouchableOpacity>
                            <Pressable style={{ flexDirection: 'row', gap: 5, alignItems: 'center', padding: 10 }} onPress={async () => {
                                await Logout().then(() => {
                                    setUser(undefined)
                                }).catch((err) => setError(err))
                            }}>
                                <MaterialIcons name="logout" color={MD2Colors.white} size={35} />
                            </Pressable>
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        </>
    )
}

export default NavBar