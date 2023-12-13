import { View, Text, TextInput, Button, Alert, StyleSheet, Pressable } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Formik } from 'formik'
import * as yup from "yup";
import { UserContext } from '../contexts/UserContext';
import { router } from 'expo-router';
import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import { IUser } from '../types/user.types';
import { BackendError } from '..';
import { Login } from '../services/UserServices';

const LoginFormSchema = yup.object({
    username: yup.string().required("required field"),
    password: yup.string().min(4, 'password should be minimum 8 characters').required('required field')
})
const LoginForm = () => {
    const { setUser } = useContext(UserContext)
    const { mutate, data, isSuccess, isLoading, isError, error } = useMutation
        <AxiosResponse<IUser>,
            BackendError,
            { username: string, password: string, multi_login_token?: string }
        >(Login)


    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                setUser(data.data)
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
            initialValues={{ username: '', password: '' }}
            validationSchema={LoginFormSchema}
            onSubmit={async (values) => {
                mutate(values)
            }}
        >
            {({ handleChange, errors, touched, handleBlur, handleSubmit, values }) => (
                <>
                    <View style={styles.container}>
                        <View>
                            <TextInput style={styles.input}
                                placeholder='Username,email or mobile'
                                autoCapitalize='none'
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                            />
                            <Text style={styles.errorText} >
                                {errors.username && touched.username && errors.username ? errors.username : ""}
                            </Text>
                        </View>
                        <View>
                            <TextInput style={styles.input}
                                placeholder='Password'
                                autoCapitalize='none'
                                autoCorrect={false}
                                secureTextEntry={true}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                            <Text style={styles.errorText} >
                                {errors.password && touched.password && errors.password ? errors.password : ""}
                            </Text>
                        </View>

                        <Pressable style={styles.btn} onPress={() => handleSubmit()} disabled={isLoading} >
                            <Text style={{ fontSize: 25, alignItems: 'center', textAlign: 'center', color: 'white' }}>
                                {isLoading ? "Signing in ..." : "Sign In"}
                            </Text>
                        </Pressable>
                    </View>
                </>
            )}
        </Formik >
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexDirection: 'column',
        gap: 5
    },
    input: {
        padding: 15,
        fontSize: 25,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
        gap: 5,
        backgroundColor: 'rgba(0,0,0,0.04)'
    },
    errorText: {
        color: 'red',
        fontSize: 10
    },
    btn: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
        gap: 5,
        backgroundColor: 'rgba(0,0,0,0.8)'
    }
})
export default LoginForm