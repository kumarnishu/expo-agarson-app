import React, { useContext, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { ChoiceContext, NavChoiceActions } from '../../../contexts/ModalContext';
import Drawer from '../../styled/Drawer';
import { Logout } from '../../../services/UserServices';
import { BackendError } from '../../..';
import { UserContext } from '../../../contexts/UserContext';

const SideNavBarDialog = () => {
    const { setUser } = useContext(UserContext)
    const [error, setError] = useState<BackendError>()
    const { choice, setChoice } = useContext(ChoiceContext)
    if (error)
        alert(error.response.data.message)
    return (
        <Drawer visible={choice === NavChoiceActions.view_home_sidebar} handleClose={() => setChoice({ type: NavChoiceActions.close_nav })} position='left'>

            <View style={{ flexDirection: 'column', gap: 10, width: '100%' }}>
                <Pressable style={{ flexDirection: 'row', gap: 5, alignItems: 'center', padding: 10 }} onPress={() => {
                    setChoice({ type: NavChoiceActions.close_nav })
                    router.push("/")
                }}>
                    <AntDesign name="home" size={24} color="grey" />
                    <Text style={styles.menu}> HOME</Text>
                </Pressable>
                <Pressable style={{ flexDirection: 'row', gap: 5, alignItems: 'center', padding: 10 }} onPress={() => {
                    setChoice({ type: NavChoiceActions.close_nav })
                    router.push("/leads")
                }}>
                    <MaterialIcons name="developer-board" size={24} color="grey" />
                    <Text style={styles.menu}> LEADS</Text>
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
                    <MaterialIcons name="logout" size={24} color="grey" />
                    <Text style={styles.menu}>Logout</Text>
                </Pressable>
            </View>
        </Drawer>
    );
};

const styles = StyleSheet.create({
    menu: {
        width: '100%',
        padding: 10,
        fontSize: 16,
        color: 'grey',
        fontWeight: 'bold',
    }
});

export default SideNavBarDialog;