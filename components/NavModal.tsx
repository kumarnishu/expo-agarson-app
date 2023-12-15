import React, { useContext, useEffect } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { ChoiceContext, NavChoiceActions } from '../contexts/ModalContext';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useMutation } from 'react-query';
import { Logout } from '../services/UserServices';
import { UserContext } from '../contexts/UserContext';

const NavModal = () => {
    const { choice, setChoice } = useContext(ChoiceContext)
    const { setUser } = useContext(UserContext)
    const { mutate, isSuccess } = useMutation(Logout)

    useEffect(() => {
        if (isSuccess)
            setUser(undefined)
    }, [isSuccess])

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={choice === NavChoiceActions.view_home_sidebar}
            onRequestClose={() => {
                setChoice({ type: NavChoiceActions.close_nav })
            }}>
            <View style={styles.sidebar}>
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
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    sidebar: {
        marginLeft: 150,
        paddingTop: 20,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
    },
    menu: {
        width: '100%',
        padding: 10,
        fontSize: 16,
        color: 'grey',
        fontWeight: 'bold',
    }
});

export default NavModal;