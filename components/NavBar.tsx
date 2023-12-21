import { View, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useContext } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { UserContext } from '../contexts/UserContext';
import { ChoiceContext, NavChoiceActions } from '../contexts/ModalContext';
import SideNavBarDialog from './dialogs/SideNavBarDialog';
import { Avatar, MD2Colors } from "react-native-paper"
const NavBar = () => {
    const { user } = useContext(UserContext)
    const { setChoice } = useContext(ChoiceContext)
    return (
        <>
            <View style={{ paddingTop: 20, backgroundColor: MD2Colors.red600 }}>
                <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Avatar.Image size={40} source={{ uri: user?.dp?.public_url || "https://www.bo.agarson.in/logo.png" }} />
                    <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                        <TouchableOpacity>
                            <Pressable onPress={() => setChoice({ type: NavChoiceActions.view_home_sidebar })}>
                                <Ionicons name="md-menu" size={50} color={MD2Colors.white} />
                            </Pressable>
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
            <SideNavBarDialog />
        </>
    )
}

export default NavBar