import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet } from 'react-native'
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
                    <View style={{ padding: 20 }}>
                        <TextInput style={styles.input}
                            placeholder='username or username'
                            autoCapitalize='none'
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                        />
                        <Text style={styles.errorText} >
                            {errors.username && touched.username && errors.username ? errors.username : ""}
                        </Text>
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

                        <Button onPress={() => handleSubmit()} disabled={isLoading} title={isLoading ? "Logging in..." : "Log in"} />
                    </View>

                    {/* bottom view */}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 25 }}>
                        <Text>Don't have an account?
                        </Text>
                        <TouchableOpacity
                            onPress={() => router.replace('/')}            >
                            <Text style={{ color: '#6880F5', fontWeight: '600', marginLeft: 2 }}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </Formik >
    )
}
const styles = StyleSheet.create({
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        fontSize: 16,
        backgroundColor: 'rgba(0,0,0,0.04)'
    },
    errorText: {
        color: 'red',
    }
})
export default LoginForm