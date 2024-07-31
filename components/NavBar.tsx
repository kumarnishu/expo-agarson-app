import { View, Pressable, Image, Text, StyleSheet } from 'react-native'
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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',height:80,borderBottomWidth:1,backgroundColor:'blue' }}>
                    {user?.dp && user?.dp?.public_url ? <Image source={{ uri: user?.dp?.public_url }} style={style.picture} /> : <Text style={style.text}>{user?.username.slice(0, 8).toUpperCase()}</Text>}
                    <Pressable style={{ flexDirection: 'row', gap: 5, alignItems: 'center', padding: 10 }} onPress={async () => {
                        await Logout().then(() => {
                            setUser(undefined)
                        }).catch((err) => setError(err))
                    }}>
                        <MaterialIcons color={'white'} name="logout" size={36} />
                    </Pressable>
                </View>
            </SafeAreaView >
        </>
    )
}
const style=StyleSheet.create({
    picture:{
        marginLeft:10,
        width: 45,
        height: 45 ,
        borderRadius:50,
        borderColor:'white',
        borderWidth:1
    },
    text:{
        color:'white',
        fontSize:30,
        paddingLeft:10,
        fontWeight:'bold'
    }
})

export default NavBar