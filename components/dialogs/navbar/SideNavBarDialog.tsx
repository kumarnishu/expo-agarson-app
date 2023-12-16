import React, { useContext, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useMutation } from 'react-query';
import { ChoiceContext, NavChoiceActions } from '../../../contexts/ModalContext';
import { Logout } from '../../../services/UserServices';
import { UserContext } from '../../../contexts/UserContext';
import Drawer from '../../styled/Drawer';

const SideNavBarDialog = () => {
    const { choice, setChoice } = useContext(ChoiceContext)
    const { setUser } = useContext(UserContext)
    const { mutate, isSuccess } = useMutation(Logout)

    useEffect(() => {
        if (isSuccess)
            setUser(undefined)
    }, [isSuccess])

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
                <Pressable style={{ flexDirection: 'row', gap: 5, alignItems: 'center', padding: 10 }} onPress={() => {
                    mutate()
                    setChoice({ type: NavChoiceActions.close_nav })
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