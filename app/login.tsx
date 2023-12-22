import React, { useContext, useEffect } from 'react'
import { router } from 'expo-router';
import { UserContext } from '../contexts/UserContext';
import { BackendError } from '..';
import { Formik } from 'formik'
import * as yup from "yup";
import { Login } from '../services/UserServices';
import { Image, ScrollView, View } from 'react-native';
import { Button, Snackbar, Text, TextInput } from 'react-native-paper';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import { IUser } from '../types/user.types';


const LoginFormSchema = yup.object({
  username: yup.string().required("required field"),
  password: yup.string().required('required field')
})

const login = () => {
  const {  setUser } = useContext(UserContext)
  const { mutate, data, isSuccess, isLoading, error } = useMutation
    <AxiosResponse<{ user: IUser, token: string }>,
      BackendError,
      { username: string, password: string, multi_login_token?: string }
    >(Login)



  useEffect(() => {
    if (isSuccess) {
      setUser(data.data.user)
      router.replace("/")
    }
  }, [isSuccess])


  return (
    <>
      <Formik
        initialValues={{ username: 'nishu', password: 'nishu' }}
        validationSchema={LoginFormSchema}
        onSubmit={async (values) => {
          mutate({
            ...values,
            multi_login_token: "akknahkh"
          })
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <ScrollView contentContainerStyle={{ flex: 1, marginTop: 60, justifyContent: 'center', padding: 10 }}>
              <Snackbar
                visible={Boolean(error)}
                onDismiss={() => null}
                action={{
                  label: 'Undo',
                  onPress: () => {
                    null
                  },
                }}>
                {error && error.response.data.message || ""}
              </Snackbar>

              <View style={{ flex: 1, gap: 15 }}>
                <View style={{ alignItems: 'center' }}>
                  <Image style={{ height: 200, width: 200 }} source={require("../assets/logo.png")} />
                </View>

                <TextInput
                  mode="outlined"
                  style={{ borderRadius: 10, borderWidth: 2, borderColor: MD2Colors.red500, padding: 5, fontSize: 20 }}
                  contentStyle={{ fontSize: 20 }}
                  outlineStyle={{ display: 'none' }}
                  label="Username,email or mobile"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  autoCapitalize='none'
                  value={values.username}
                />
                <TextInput
                  mode="outlined"
                  style={{ borderRadius: 10, borderWidth: 2, borderColor: MD2Colors.red500, padding: 5, fontSize: 20 }}
                  contentStyle={{ fontSize: 20 }}
                  outlineStyle={{ display: 'none' }}
                  label='Password'
                  autoCorrect={false}
                  autoCapitalize='none'
                  secureTextEntry={true}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                {isLoading && <ActivityIndicator size={'large'} animating={true} color={MD2Colors.red500} />}
                {!isLoading && <Button
                  mode="contained"
                  disabled={isLoading}
                  style={{ padding: 10, borderRadius: 10 }}
                  onPress={() => handleSubmit()}>
                  <Text style={{ color: 'white', fontSize: 20 }}>Login</Text>
                </Button>}
              </View>
            </ScrollView>
          </>
        )}
      </Formik >
    </>
  )
}



export default login