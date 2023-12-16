import { View, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useContext } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { UserContext } from '../contexts/UserContext';
import { ChoiceContext, NavChoiceActions } from '../contexts/ModalContext';
import SideNavBarDialog from './dialogs/navbar/SideNavBarDialog';

const NavBar = () => {
    const { user } = useContext(UserContext)
    const { setChoice } = useContext(ChoiceContext)
    return (
        <>
            <View style={{ paddingTop: 20 }}>
                <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image style={{ height: 40, marginTop: 10, width: 40, borderRadius: 50 }} source={{ uri: user?.dp?.public_url || "https://www.bo.agarson.in/logo.png" }} />
                    <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                        <TouchableOpacity>
                            <Pressable onPress={() => setChoice({ type: NavChoiceActions.view_home_sidebar })}>
                                <Ionicons name="md-menu" size={50} color='rgba(0,0,0,0.4)' />
                            </Pressable>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <SideNavBarDialog />
        </>
    )
}

export default NavBar