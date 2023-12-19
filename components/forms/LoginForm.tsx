import { View, StyleSheet, TextInput, ScrollView, Image, Button, Pressable, Text, TouchableOpacity } from 'react-native'
import { Formik } from 'formik'
import * as yup from "yup";
import { useContext, useState } from 'react';
import { BackendError } from '../..';
import { Login } from '../../services/UserServices';
import { UserContext } from '../../contexts/UserContext';
import { router } from 'expo-router';


const LoginFormSchema = yup.object({
    username: yup.string().required("required field"),
    password: yup.string().min(4, 'password should be minimum 8 characters').required('required field')
})
const LoginForm = () => {
    const { user, setUser } = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<BackendError>()
    return (
        <>
            {error && alert(error.response.data.message)}
            <Formik
                initialValues={{ username: 'nishu', password: 'nishu' }}
                validationSchema={LoginFormSchema}
                onSubmit={async (values) => {
                    setLoading(true)
                    await Login({
                        ...values,
                        multi_login_token: "hshdihi"
                    }).then((data) => {
                        setUser(data.data.user);
                        router.replace("/")
                    })
                        .catch((err: BackendError) => setError(err))
                    setLoading(false)
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
                                <Pressable style={styles.btn} onPress={() => handleSubmit()}>
                                    <Text style={{ fontSize: 20, textAlign: 'center', color: 'white' }}>{loading ? "Logging in..." : "Login"}</Text>
                                </Pressable>
                            </TouchableOpacity>
                        </ScrollView>
                    </>
                )}
            </Formik >
        </>

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