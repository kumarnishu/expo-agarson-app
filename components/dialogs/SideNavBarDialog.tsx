import React, { useContext, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ChoiceContext, NavChoiceActions } from '../../contexts/ModalContext';
import Drawer from '../styled/Drawer';
import { Logout } from '../../services/UserServices';
import { BackendError } from '../..';
import { UserContext } from '../../contexts/UserContext';
import { MD2Colors } from 'react-native-paper';

const SideNavBarDialog = () => {
    const { setUser } = useContext(UserContext)
    const [error, setError] = useState<BackendError>()
    const { choice, setChoice } = useContext(ChoiceContext)
    if (error)
        alert(error.response.data.message)
    return (
        <Drawer visible={choice === NavChoiceActions.view_home_sidebar} handleClose={() => setChoice({ type: NavChoiceActions.close_nav })} position='right'>
            <View style={{ flex: 1, width: '100%', justifyContent: 'space-between', backgroundColor: MD2Colors.red400, paddingTop: 20 }}>
                <View style={{ flexDirection: 'column', gap: 10, width: '100%' }}>
                    <Pressable style={{ flexDirection: 'row', gap: 5, alignItems: 'center', padding: 10 }} onPress={() => {
                        setChoice({ type: NavChoiceActions.close_nav })
                        router.push("/")
                    }}>

                        <Text style={{ color: MD2Colors.white, fontSize: 20 }}> My Visit</Text>
                    </Pressable>

                    <Pressable style={{ flexDirection: 'row', gap: 5, alignItems: 'center', padding: 10 }} onPress={() => {
                        setChoice({ type: NavChoiceActions.close_nav })
                        router.push("/leads")
                    }}>
                        <Text style={{ color: MD2Colors.white, fontSize: 20 }}> LEADS</Text>
                    </Pressable>
                </View>

                <View style={{ padding: 20 }}>
                    <Pressable style={{ flexDirection: 'row', gap: 5, alignItems: 'center', padding: 10 }} onPress={async () => {
                        setChoice({ type: NavChoiceActions.close_nav })
                        await Logout().then(() => {
                            setUser(undefined)
                        }).catch((err) => setError(err))
                        router.replace("/")

                    }}>
                        <MaterialIcons name="logout" size={25} color={MD2Colors.white} />
                        <Text style={{ color: MD2Colors.white, fontSize: 20 }}>Logout</Text>
                    </Pressable>
                </View>
            </View>
        </Drawer>
    );
};



export default SideNavBarDialog;