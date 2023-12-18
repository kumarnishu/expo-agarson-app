import { View, Alert, StyleSheet, TextInput, ScrollView, Image, Button, Pressable, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Formik } from 'formik'
import * as yup from "yup";
import { UserContext } from '../../contexts/UserContext';
import { router } from 'expo-router';
import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import { IUser } from '../../types/user.types';
import { BackendError } from '../..';
import { Login } from '../../services/UserServices';
import * as SecureStore from 'expo-secure-store';

const LoginFormSchema = yup.object({
    username: yup.string().required("required field"),
    password: yup.string().min(4, 'password should be minimum 8 characters').required('required field')
})
const LoginForm = () => {
    const { setUser } = useContext(UserContext)
    const { mutate, data, isSuccess, isLoading, isError } = useMutation
        <AxiosResponse<{ user: IUser, token: string }>,
            BackendError,
            { username: string, password: string, multi_login_token?: string }
        >(Login)


    useEffect(() => {
        if (isSuccess) {
            async function save() {
                await SecureStore.setItemAsync("accessToken", data?.data.token || "");
            }
            setTimeout(() => {
                setUser(data.data.user)
                save()
                router.replace("/")
            }, 400)
        }
    }, [setUser, isSuccess, data])

    useEffect(() => {
        if (isError) {
            Alert.alert("invalid username or password")
        }
    }, [isError])

    return (
        <Formik
            initialValues={{ username: 'nishu', password: 'nishu' }}
            validationSchema={LoginFormSchema}
            onSubmit={async (values) => {
                mutate(values)
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <>
                    <ScrollView contentContainerStyle={styles.container}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ borderRadius: 10, height: 150, width: 150 }} source={require("../../assets/icon.png")} />
                        </View>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="Username,email or mobile"
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                autoCapitalize='none'
                                value={values.username}
                            />
                        </View>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder='Password'
                                autoCorrect={false}
                                autoCapitalize='none'
                                secureTextEntry={true}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />

                        </View>
                        <TouchableOpacity>
                            <Pressable style={styles.btn} disabled={isLoading} onPress={() => handleSubmit()}>
                                <Text style={{ fontSize: 20, textAlign: 'center', color: 'white' }}>{isLoading ? "loading..." : "Log In"}</Text>
                            </Pressable>
                        </TouchableOpacity>
                    </ScrollView>
                </>
            )}
        </Formik >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100,
        flexDirection: 'column',
        width: '100%',
        gap: 10,
        padding: 20
    },
    input: {
        borderRadius: 10,
        padding: 20,
        fontSize: 20,
        backgroundColor: 'rgba(0,0,0,0.04)'
    },
    errorText: {
        color: 'grey',
        fontSize: 10,
        paddingLeft: 5
    },
    btn: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.7)'
    }
})
export default LoginForm